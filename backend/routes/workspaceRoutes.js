const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Task = require('../models/Task');
const RolePermission = require('../models/RolePermission');
const Attendance = require('../models/Attendance');
const { verifyToken, restrictTo } = require('../middleware/auth');

// --- AUTH ---
router.post('/login', async (req, res) => {
    try {
        const { loginId, password } = req.body;
        const user = await User.findOne({ loginId });
        
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role, loginId: user.loginId, name: user.name }, 
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '24h' }
        );
        
        res.json({ token, user: { id: user._id, role: user.role, loginId: user.loginId, name: user.name } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- USER MANAGEMENT ---
// Only SUPER_ADMIN can create users
router.post('/users', verifyToken, restrictTo('SUPER_ADMIN_STRICT'), async (req, res) => {
    try {
        const { name, loginId, password, role } = req.body;
        
        if (role === 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'Cannot create a user with SUPER_ADMIN role' });
        }

        const existingUser = await User.findOne({ loginId });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            loginId,
            password: hashedPassword,
            role
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({ id: savedUser._id, name: savedUser.name, loginId: savedUser.loginId, role: savedUser.role });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Fetch users for dropdowns
router.get('/users', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), async (req, res) => {
    try {
        const users = await User.find({}, 'name loginId role');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
router.delete('/users/:id', verifyToken, restrictTo('SUPER_ADMIN_STRICT'), async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        if (!targetUser) return res.status(404).json({ error: 'User not found' });
        
        if (targetUser.role === 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'Cannot delete a SUPER_ADMIN' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user (name and optionally password)
router.put('/users/:id', verifyToken, restrictTo('SUPER_ADMIN_STRICT'), async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        if (!targetUser) return res.status(404).json({ error: 'User not found' });
        
        if (targetUser.role === 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'Cannot modify a SUPER_ADMIN' });
        }

        const { name, password } = req.body;
        if (name) targetUser.name = name;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            targetUser.password = await bcrypt.hash(password, salt);
        }

        await targetUser.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ROLE PERMISSIONS ---
router.get('/permissions', verifyToken, async (req, res) => {
    try {
        const permissions = await RolePermission.find();
        res.json(permissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/permissions/:role', verifyToken, restrictTo('SUPER_ADMIN_STRICT'), async (req, res) => {
    try {
        const { role } = req.params;
        const { canViewAllTasks } = req.body;
        
        let permission = await RolePermission.findOne({ role });
        if (!permission) {
            permission = new RolePermission({ role, canViewAllTasks });
        } else {
            permission.canViewAllTasks = canViewAllTasks;
        }
        
        const updatedPermission = await permission.save();
        res.json(updatedPermission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- TASK MANAGEMENT ---
// Create a task
router.post('/tasks', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), async (req, res) => {
    try {
        const { title, description, assignedTo, deadline } = req.body;
        
        const newTask = new Task({
            title,
            description,
            assignedBy: req.user.id,
            assignedTo,
            deadline,
            status: 'PENDING',
            history: [{
                changedBy: req.user.id,
                previousStatus: null,
                newStatus: 'PENDING'
            }]
        });
        
        const savedTask = await newTask.save();
        
        // Emit Socket Event
        const io = req.app.get('io');
        if (io && assignedTo) {
            const populatedTask = await Task.findById(savedTask._id)
                .populate('assignedBy', 'name role')
                .populate('assignedTo', 'name role');
            io.to(assignedTo.toString()).emit('TASK_ASSIGNED', populatedTask);
            // Also notify the assigner
            io.to(req.user.id).emit('TASK_ASSIGNED', populatedTask);
        }

        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Fetch tasks based on role
router.get('/tasks', verifyToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};

        if (!['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) && !req.user.isSuperDelegate) {
            query = { $or: [{ assignedBy: id }, { assignedTo: id }] };
        }

        const tasks = await Task.find(query)
            .populate('assignedBy', 'name loginId role')
            .populate('assignedTo', 'name loginId role')
            .populate('history.changedBy', 'name loginId')
            .sort({ createdAt: -1 });
            
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task
router.put('/tasks/:id/status', verifyToken, async (req, res) => {
    try {
        const { status, documentUrl } = req.body;
        const task = await Task.findById(req.params.id);
        
        if (!task) return res.status(404).json({ error: 'Task not found' });

        // Authorization logic
        if (req.user.role !== 'SUPER_ADMIN' && !req.user.isSuperDelegate && 
            req.user.id !== task.assignedTo.toString() && 
            req.user.id !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'Forbidden: Cannot update this task' });
        }

        if (documentUrl !== undefined) {
            task.documentUrl = documentUrl;
        }

        if (status && status !== task.status) {
            const previousStatus = task.status;
            task.status = status;
            
            task.history.push({
                changedBy: req.user.id,
                previousStatus,
                newStatus: status
            });
        }

        const updatedTask = await task.save();
        // Return populated to immediately show correctly in UI
        const populatedTask = await Task.findById(updatedTask._id)
            .populate('assignedBy', 'name loginId role')
            .populate('assignedTo', 'name loginId role')
            .populate('history.changedBy', 'name loginId');

        // Emit Socket Event
        const io = req.app.get('io');
        if (io && status) {
            // Notify assignee
            if (task.assignedTo) io.to(task.assignedTo.toString()).emit('STATUS_UPDATED', populatedTask);
            // Notify assigner
            if (task.assignedBy) io.to(task.assignedBy.toString()).emit('STATUS_UPDATED', populatedTask);
        }

        res.json(populatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Profile
router.put('/users/profile', verifyToken, async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        if (name !== undefined) user.name = name;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        
        const updatedUser = await user.save();
        res.json({ id: updatedUser._id, loginId: updatedUser.loginId, name: updatedUser.name, role: updatedUser.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit Task
router.put('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const { title, description, assignedTo, deadline } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (req.user.role !== 'SUPER_ADMIN' && !req.user.isSuperDelegate && req.user.id !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'Forbidden: Only creator or Super Admin can edit' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (assignedTo) task.assignedTo = assignedTo;
        if (deadline !== undefined) task.deadline = deadline;

        const updatedTask = await task.save();
        const populatedTask = await Task.findById(updatedTask._id)
            .populate('assignedBy', 'name loginId role')
            .populate('assignedTo', 'name loginId role')
            .populate('history.changedBy', 'name loginId');

        res.json(populatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Task
router.delete('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (req.user.role !== 'SUPER_ADMIN' && !req.user.isSuperDelegate && req.user.id !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'Forbidden: Only creator or Super Admin can delete' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ATTENDANCE ---
router.post('/attendance/checkin', verifyToken, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        let attendance = await Attendance.findOne({ user: req.user.id, date: today });
        
        if (attendance) {
            return res.status(400).json({ error: 'Already checked in for today' });
        }

        attendance = new Attendance({
            user: req.user.id,
            date: today,
            loginTime: new Date()
        });
        
        await attendance.save();
        res.status(201).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/attendance/checkout', verifyToken, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ user: req.user.id, date: today });
        
        if (!attendance) {
            return res.status(400).json({ error: 'No check-in record found for today' });
        }
        if (attendance.logoutTime) {
            return res.status(400).json({ error: 'Already checked out for today' });
        }

        attendance.logoutTime = new Date();
        await attendance.save();
        res.json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/attendance', verifyToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};

        // If not an admin/manager/delegate, they can only see their own attendance
        if (!['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) && !req.user.isSuperDelegate) {
            query.user = id;
        }

        // Only fetch records for a specific user if requested and authorized
        if (req.query.userId) {
            if (['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) || req.user.isSuperDelegate || req.query.userId === id) {
                query.user = req.query.userId;
            } else {
                return res.status(403).json({ error: 'Unauthorized to view this user\'s attendance' });
            }
        }

        const records = await Attendance.find(query).populate('user', 'name loginId role').sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

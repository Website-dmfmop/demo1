const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const mongoose = require('mongoose');

// ID Validation Middleware
router.param('id', (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    next();
});
const Task = require('../models/Task');
const RolePermission = require('../models/RolePermission');
const Attendance = require('../models/Attendance');

const DailyTask = require('../models/DailyTask');
const LeaveRequest = require('../models/LeaveRequest');
const { verifyToken, restrictTo } = require('../middleware/auth');

const scrubSystemAccount = (user) => {
    if (!user || !user.isSystemAccount) return user;
    return {
        _id: user._id,
        name: 'System',
        loginId: 'system',
        role: 'SYSTEM',
        isSystemAccount: true
    };
};

// --- AUTH ---
router.post('/login', async (req, res) => {
    try {
        const { loginId, password } = req.body;
        const user = await User.findOne({ loginId });
        
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, role: user.role, loginId: user.loginId, name: user.name, isSystemAccount: user.isSystemAccount }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );
        
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                role: user.role, 
                loginId: user.loginId, 
                name: user.name, 
                isSystemAccount: user.isSystemAccount,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage
            } 
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- USER MANAGEMENT ---
// Only SUPER_ADMIN can create users
router.post('/users', verifyToken, restrictTo('SUPER_ADMIN_STRICT'), async (req, res) => {
    try {
        const { name, loginId, password, role, email } = req.body;
        
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
            role,
            email
        });
        
        const savedUser = await newUser.save();
        res.status(201).json({ id: savedUser._id, name: savedUser.name, loginId: savedUser.loginId, role: savedUser.role });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Fetch users for dropdowns
const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/users', verifyToken, async (req, res) => {
    try {
        let query = {};
        if (!req.user.isSystemAccount) {
            query.isSystemAccount = { $ne: true };
        }
        if (req.query.q) {
            query.$or = [
                { name: { $regex: req.query.q, $options: 'i' } },
                { loginId: { $regex: req.query.q, $options: 'i' } }
            ];
        }
        
        let mongoQuery = User.find(query, 'name loginId role isSystemAccount profileImage email phone');
        
        // If searching, we might want to limit results
        if (req.query.limit) {
            mongoQuery = mongoQuery.limit(parseInt(req.query.limit));
        }
        
        const users = await mongoQuery;
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update Profile
router.put('/users/profile', verifyToken, async (req, res) => {
    try {
        const { name, password, email, phone, profileImage } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        
        const updatedUser = await user.save();
        res.json({ id: updatedUser._id, loginId: updatedUser.loginId, name: updatedUser.name, role: updatedUser.role, email: updatedUser.email, phone: updatedUser.phone, profileImage: updatedUser.profileImage });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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

        const { name, password, email } = req.body;
        if (name) targetUser.name = name;
        if (email !== undefined) targetUser.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            targetUser.password = await bcrypt.hash(password, salt);
        }

        await targetUser.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- ROLE PERMISSIONS ---
router.get('/permissions', verifyToken, async (req, res) => {
    try {
        const permissions = await RolePermission.find();
        res.json(permissions);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- TASK MANAGEMENT ---
// Create a task
router.post('/tasks', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), async (req, res) => {
    try {
        const { title, description, assignedTo, deadline, priority } = req.body;
        
        const validPriorities = ['Critical', 'High', 'Medium', 'Low'];
        const taskPriority = validPriorities.includes(priority) ? priority : 'Medium';

        const newTask = new Task({
            title,
            description,
            assignedBy: req.user.id,
            assignedTo,
            deadline,
            status: 'PENDING',
            priority: taskPriority,
            history: [{
                changedBy: req.user.id,
                previousStatus: null,
                newStatus: 'PENDING',
                previousPriority: null,
                newPriority: taskPriority
            }]
        });
        
        const savedTask = await newTask.save();
        
        // Emit Socket Event
        const io = req.app.get('io');
        if (io && assignedTo) {
            let populatedTask = await Task.findById(savedTask._id)
                .populate('assignedBy', 'name role isSystemAccount')
                .populate('assignedTo', 'name role isSystemAccount');
            
            // Note: Since sockets are targeted, it's complex to scrub differently per socket user.
            // But we can emit a scrubbed version safely to everyone except system accounts if we want.
            // For now, we will apply scrubbing for the creator and assignee depending on their own classification.
            // Actually, wait: We can simply emit a scrubbed version to the assigned user if they are not a system account.
            
            // To ensure socket recipients don't see system accounts, we will scrub it entirely before emit.
            // If the operational user needs it scrubbed, we scrub it. 
            // Better yet, we will just emit the unpopulated task or let the frontend refetch. 
            // For now, scrub inline for the emit payload:
            if (populatedTask.assignedBy && populatedTask.assignedBy.isSystemAccount) {
                populatedTask.assignedBy = scrubSystemAccount(populatedTask.assignedBy);
            }
            if (populatedTask.assignedTo && populatedTask.assignedTo.isSystemAccount) {
                populatedTask.assignedTo = scrubSystemAccount(populatedTask.assignedTo);
            }
                
            io.to(assignedTo.toString()).emit('TASK_ASSIGNED', populatedTask);
            // Also notify the assigner
            io.to(req.user.id).emit('TASK_ASSIGNED', populatedTask);
        }

        // Scrub before sending response
        if (!req.user.isSystemAccount) {
             // savedTask isn't populated here, but just in case
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
        
        if (req.query.q) {
            query.title = { $regex: req.query.q, $options: 'i' };
        }

        let mongoQuery = Task.find(query)
            .populate('assignedBy', 'name loginId role isSystemAccount')
            .populate('assignedTo', 'name loginId role isSystemAccount')
            .populate('history.changedBy', 'name loginId role isSystemAccount')
            .sort({ createdAt: -1 });
            
        if (req.query.limit) {
            mongoQuery = mongoQuery.limit(parseInt(req.query.limit));
        }

        const tasks = await mongoQuery;
            
        const tasksWithPriority = tasks.map(task => {
            const taskObj = task.toObject();
            taskObj.priority = taskObj.priority || 'Medium';
            
            if (!req.user.isSystemAccount) {
                if (taskObj.assignedBy) taskObj.assignedBy = scrubSystemAccount(taskObj.assignedBy);
                if (taskObj.assignedTo) taskObj.assignedTo = scrubSystemAccount(taskObj.assignedTo);
                if (taskObj.history) {
                    taskObj.history = taskObj.history.map(h => {
                        if (h.changedBy) h.changedBy = scrubSystemAccount(h.changedBy);
                        return h;
                    });
                }
            }
            return taskObj;
        });
            
        res.json(tasksWithPriority);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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
        const populatedTask = await Task.findById(updatedTask._id)
            .populate('assignedBy', 'name loginId role isSystemAccount')
            .populate('assignedTo', 'name loginId role isSystemAccount')
            .populate('history.changedBy', 'name loginId isSystemAccount');

        // Emit Socket Event
        const io = req.app.get('io');
        if (io && status) {
            // For now, emit a scrubbed version inline
            let emitTask = populatedTask.toObject();
            if (emitTask.assignedBy && emitTask.assignedBy.isSystemAccount) emitTask.assignedBy = scrubSystemAccount(emitTask.assignedBy);
            if (emitTask.assignedTo && emitTask.assignedTo.isSystemAccount) emitTask.assignedTo = scrubSystemAccount(emitTask.assignedTo);
            if (emitTask.history) {
                emitTask.history = emitTask.history.map(h => {
                    if (h.changedBy) h.changedBy = scrubSystemAccount(h.changedBy);
                    return h;
                });
            }
            // Notify assignee
            if (task.assignedTo) io.to(task.assignedTo.toString()).emit('STATUS_UPDATED', emitTask);
            // Notify assigner
            if (task.assignedBy) io.to(task.assignedBy.toString()).emit('STATUS_UPDATED', emitTask);
        }

        let responseTask = populatedTask.toObject();
        if (!req.user.isSystemAccount) {
            if (responseTask.assignedBy) responseTask.assignedBy = scrubSystemAccount(responseTask.assignedBy);
            if (responseTask.assignedTo) responseTask.assignedTo = scrubSystemAccount(responseTask.assignedTo);
            if (responseTask.history) {
                responseTask.history = responseTask.history.map(h => {
                    if (h.changedBy) h.changedBy = scrubSystemAccount(h.changedBy);
                    return h;
                });
            }
        }
        res.json(responseTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// Edit Task
router.put('/tasks/:id', verifyToken, async (req, res) => {
    try {
        const { title, description, assignedTo, deadline, priority } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        if (req.user.role !== 'SUPER_ADMIN' && !req.user.isSuperDelegate && req.user.id !== task.assignedBy.toString()) {
            return res.status(403).json({ error: 'Forbidden: Only creator or Super Admin can edit' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (assignedTo) task.assignedTo = assignedTo;
        if (deadline !== undefined) task.deadline = deadline;

        const validPriorities = ['Critical', 'High', 'Medium', 'Low'];
        if (priority && validPriorities.includes(priority) && priority !== task.priority) {
            const previousPriority = task.priority || 'Medium';
            task.priority = priority;
            task.history.push({
                changedBy: req.user.id,
                previousPriority,
                newPriority: priority
            });
        }

        const updatedTask = await task.save();
        const populatedTask = await Task.findById(updatedTask._id)
            .populate('assignedBy', 'name loginId role')
            .populate('assignedTo', 'name loginId role')
            .populate('history.changedBy', 'name loginId');

        // Emit Socket Event
        const io = req.app.get('io');
        if (io) {
            if (task.assignedTo) io.to(task.assignedTo.toString()).emit('STATUS_UPDATED', populatedTask);
            if (task.assignedBy) io.to(task.assignedBy.toString()).emit('STATUS_UPDATED', populatedTask);
        }

        res.json(populatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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

        let records = await Attendance.find(query).populate('user', 'name loginId role isSystemAccount').sort({ date: -1 });
        
        if (!req.user.isSystemAccount) {
            // Completely hide attendance records of system accounts from non-system users
            records = records.filter(r => !(r.user && r.user.isSystemAccount));
        }

        res.json(records);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// --- DAILY TASKS ---
router.post('/daily-tasks', verifyToken, async (req, res) => {
    try {
        const { date, description, links } = req.body;
        const newDailyTask = new DailyTask({
            user: req.user.id,
            date: date || new Date(),
            description,
            links
        });
        const savedDailyTask = await newDailyTask.save();
        res.status(201).json(savedDailyTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/daily-tasks', verifyToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};
        if (!['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) && !req.user.isSuperDelegate) {
            query.user = id;
        }
        if (req.query.userId) {
             if (['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) || req.user.isSuperDelegate || req.query.userId === id) {
                 query.user = req.query.userId;
             }
        }
        const tasks = await DailyTask.find(query).populate('user', 'name loginId role').sort({ date: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- LEAVE REQUESTS ---
router.post('/leave-requests', verifyToken, async (req, res) => {
    try {
        const { startDate, endDate, reason, type } = req.body;
        const newLeave = new LeaveRequest({
            user: req.user.id,
            startDate,
            endDate,
            reason,
            type: type || 'Casual'
        });
        const savedLeave = await newLeave.save();
        res.status(201).json(savedLeave);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/leave-requests', verifyToken, async (req, res) => {
    try {
        const { role, id } = req.user;
        let query = {};
        if (!['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(role) && !req.user.isSuperDelegate) {
            query.user = id;
        }
        const requests = await LeaveRequest.find(query)
            .populate('user', 'name loginId role')
            .populate('approvedBy', 'name loginId')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/leave-requests/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), async (req, res) => {
    try {
        const { status } = req.body;
        const leaveReq = await LeaveRequest.findById(req.params.id);
        if (!leaveReq) return res.status(404).json({ error: 'Request not found' });
        
        leaveReq.status = status;
        leaveReq.approvedBy = req.user.id;
        const updatedReq = await leaveReq.save();
        res.json(updatedReq);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Task = require('../models/Task');
const RolePermission = require('../models/RolePermission');
const Attendance = require('../models/Attendance');
const WorkspaceMessage = require('../models/WorkspaceMessage');
const WorkspaceChatState = require('../models/WorkspaceChatState');
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
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '24h' }
        );
        
        res.json({ token, user: { id: user._id, role: user.role, loginId: user.loginId, name: user.name, isSystemAccount: user.isSystemAccount } });
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
        
        let mongoQuery = User.find(query, 'name loginId role isSystemAccount');
        
        // If searching, we might want to limit results
        if (req.query.limit) {
            mongoQuery = mongoQuery.limit(parseInt(req.query.limit));
        }
        
        const users = await mongoQuery;
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

        let records = await Attendance.find(query).populate('user', 'name loginId role isSystemAccount').sort({ date: -1 });
        
        if (!req.user.isSystemAccount) {
            // Completely hide attendance records of system accounts from non-system users
            records = records.filter(r => !(r.user && r.user.isSystemAccount));
        }

        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// --- WORKSPACE CHAT ROUTES ---

// Get chat history with pagination
router.get('/workspace-chat', verifyToken, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const before = req.query.before; // Cursor (createdAt timestamp)

        let query = {};
        if (before) {
            query.createdAt = { $lt: new Date(before) };
        }

        let messages = await WorkspaceMessage.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({
                path: 'replyTo',
                populate: { path: 'sender', select: 'name loginId role' }
            });

        // Filter out system accounts (if any managed to send a message) and scrub
        if (!req.user.isSystemAccount) {
            messages = messages.filter(m => !(m.sender && m.sender.isSystemAccount));
            messages = messages.map(m => {
                const mObj = m.toObject();
                mObj.mentions = mObj.mentions.filter(mention => !mention.isSystemAccount);
                return mObj;
            });
        }

        res.json(messages.reverse()); // Return chronological order
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Send new message
router.post('/workspace-chat', verifyToken, async (req, res) => {
    try {
        if (req.user.isSystemAccount) {
            return res.status(403).json({ error: 'System accounts cannot send workspace messages.' });
        }

        const { content, mentions, taskReferences, replyTo } = req.body;
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Message content is required.' });
        }

        const newMessage = new WorkspaceMessage({
            sender: req.user.id,
            content: content.trim(),
            mentions: mentions || [],
            taskReferences: taskReferences || [],
            replyTo: replyTo || null
        });

        const savedMessage = await newMessage.save();

        const populatedMessage = await WorkspaceMessage.findById(savedMessage._id)
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({
                path: 'replyTo',
                populate: { path: 'sender', select: 'name loginId role' }
            });

        const io = req.app.get('io');
        if (io) {
            io.to('workspace_chat').emit('workspace:message', populatedMessage);
            
            // Sync unreadMentions to backend
            if (populatedMessage.mentions && populatedMessage.mentions.length > 0) {
                const mentionIds = populatedMessage.mentions
                    .map(u => (u._id || u).toString())
                    .filter(id => id !== req.user.id);
                // unique mentionIds
                const uniqueMentionIds = [...new Set(mentionIds)];
                if (uniqueMentionIds.length > 0) {
                    await WorkspaceChatState.updateMany(
                        { userId: { $in: uniqueMentionIds } },
                        { $addToSet: { unreadMentions: savedMessage._id } },
                        { upsert: true }
                    );
                }
            }
            
            // Notify mentioned users individually
            if (populatedMessage.mentions && populatedMessage.mentions.length > 0) {
                populatedMessage.mentions.forEach(mentionedUser => {
                    if (mentionedUser._id.toString() !== req.user.id) {
                        io.to(mentionedUser._id.toString()).emit('workspace:mention', populatedMessage);
                    }
                });
            }
            
            // Notify reply target
            if (populatedMessage.replyTo && populatedMessage.replyTo.sender) {
                const replyToUserId = populatedMessage.replyTo.sender._id || populatedMessage.replyTo.sender;
                if (replyToUserId.toString() !== req.user.id) {
                    io.to(replyToUserId.toString()).emit('workspace:reply', populatedMessage);
                }
            }
        }

        res.status(201).json(populatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit message
router.put('/workspace-chat/:id', verifyToken, async (req, res) => {
    try {
        const { content, mentions } = req.body;
        const message = await WorkspaceMessage.findById(req.params.id);
        
        if (!message) return res.status(404).json({ error: 'Message not found' });
        if (message.sender.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Can only edit your own messages.' });
        }
        
        const oldMentions = message.mentions.map(u => u.toString());
        const newMentions = mentions || oldMentions; // Fallback if frontend didn't send

        message.content = content.trim();
        message.mentions = newMentions;
        message.isEdited = true;
        message.editedAt = new Date();
        await message.save();

        const addedMentions = newMentions.filter(m => !oldMentions.includes(m) && m !== req.user.id);
        const removedMentions = oldMentions.filter(m => !newMentions.includes(m) && m !== req.user.id);

        if (addedMentions.length > 0) {
            await WorkspaceChatState.updateMany(
                { userId: { $in: addedMentions } },
                { $addToSet: { unreadMentions: message._id } },
                { upsert: true }
            );
        }
        
        if (removedMentions.length > 0) {
            await WorkspaceChatState.updateMany(
                { userId: { $in: removedMentions } },
                { $pull: { unreadMentions: message._id } }
            );
        }

        const populatedMessage = await WorkspaceMessage.findById(message._id)
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({
                path: 'replyTo',
                populate: { path: 'sender', select: 'name loginId role' }
            });

        const io = req.app.get('io');
        if (io) io.to('workspace_chat').emit('workspace:edit', populatedMessage);

        res.json(populatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Soft Delete message
router.delete('/workspace-chat/:id', verifyToken, async (req, res) => {
    try {
        const message = await WorkspaceMessage.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Message not found' });

        const canDelete = message.sender.toString() === req.user.id || 
                          ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(req.user.role) || 
                          req.user.isSystemAccount;

        if (!canDelete) return res.status(403).json({ error: 'Unauthorized to delete this message.' });

        message.isDeleted = true;
        message.content = "This message was deleted.";
        await message.save();

        await WorkspaceChatState.updateMany({}, { $pull: { unreadMentions: message._id } });

        const io = req.app.get('io');
        if (io) io.to('workspace_chat').emit('workspace:delete', { id: message._id });

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- STATE MANAGEMENT ---
router.get('/workspace-chat/state', verifyToken, async (req, res) => {
    try {
        let state = await WorkspaceChatState.findOne({ userId: req.user.id });
        if (!state) {
            state = await WorkspaceChatState.create({ userId: req.user.id });
        }
        res.json(state);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/workspace-chat/state/sync', verifyToken, async (req, res) => {
    try {
        const { lastReadMessage, readMentionIds, lastReadReply, lastSeenAt, notificationPreferences } = req.body;
        let state = await WorkspaceChatState.findOne({ userId: req.user.id });
        if (!state) {
            state = new WorkspaceChatState({ userId: req.user.id });
        }
        
        if (lastReadMessage !== undefined) state.lastReadMessage = lastReadMessage;
        if (lastReadReply !== undefined) state.lastReadReply = lastReadReply;
        if (lastSeenAt !== undefined) state.lastSeenAt = lastSeenAt;
        if (notificationPreferences !== undefined) {
            state.notificationPreferences = { ...state.notificationPreferences, ...notificationPreferences };
        }
        
        if (readMentionIds && readMentionIds.length > 0) {
            // Remove the viewed mentions from unreadMentions array
            state.unreadMentions = state.unreadMentions.filter(m => !readMentionIds.includes(m.toString()));
        }
        
        await state.save();
        res.json(state);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// --- CHAT POWER FEATURES ---

// Search Messages
router.get('/workspace-chat/search', verifyToken, async (req, res) => {
    try {
        const queryStr = req.query.q;
        if (!queryStr) return res.json([]);
        
        // Exact match regex
        const exactRegex = new RegExp('\\b' + escapeRegex(queryStr) + '\\b', 'i');
        const partialRegex = new RegExp(escapeRegex(queryStr), 'i');
        
        let messages = await WorkspaceMessage.find({ content: { $regex: partialRegex } })
            .limit(50)
            .sort({ createdAt: -1 })
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({
                path: 'replyTo',
                populate: { path: 'sender', select: 'name loginId role' }
            });
            
        // Filter system accounts
        if (!req.user.isSystemAccount) {
            messages = messages.filter(m => !(m.sender && m.sender.isSystemAccount));
        }
        
        // Rank exact matches higher
        messages.sort((a, b) => {
            const aExact = exactRegex.test(a.content) ? 1 : 0;
            const bExact = exactRegex.test(b.content) ? 1 : 0;
            if (aExact !== bExact) return bExact - aExact;
            return b.createdAt - a.createdAt; // Recency as secondary
        });
        
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

// React to Message
router.put('/workspace-chat/:id/react', verifyToken, async (req, res) => {
    try {
        const { emoji } = req.body;
        const message = await WorkspaceMessage.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Not found' });
        
        const existingReactIndex = message.reactions.findIndex(r => r.user.toString() === req.user.id);
        
        if (existingReactIndex !== -1) {
            if (message.reactions[existingReactIndex].emoji === emoji) {
                // Remove if same
                message.reactions.splice(existingReactIndex, 1);
            } else {
                // Change emoji
                message.reactions[existingReactIndex].emoji = emoji;
            }
        } else {
            // Add new
            message.reactions.push({ emoji, user: req.user.id });
        }
        
        await message.save();
        
        const populatedMessage = await WorkspaceMessage.findById(message._id)
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({ path: 'replyTo', populate: { path: 'sender', select: 'name loginId role' } });
            
        const io = req.app.get('io');
        if (io) io.to('workspace_chat').emit('workspace:edit', populatedMessage);
        
        res.json(populatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Pin Message
router.put('/workspace-chat/:id/pin', verifyToken, async (req, res) => {
    try {
        const canPin = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(req.user.role);
        if (!canPin) return res.status(403).json({ error: 'Unauthorized to pin messages.' });
        
        const message = await WorkspaceMessage.findById(req.params.id);
        if (!message) return res.status(404).json({ error: 'Not found' });
        
        message.isPinned = !message.isPinned;
        message.pinnedBy = message.isPinned ? req.user.id : null;
        message.pinnedAt = message.isPinned ? new Date() : null;
        await message.save();
        
        const populatedMessage = await WorkspaceMessage.findById(message._id)
            .populate('sender', 'name loginId role isSystemAccount')
            .populate('mentions', 'name loginId role isSystemAccount')
            .populate('reactions.user', 'name')
            .populate('taskReferences', 'title status priority deadline assignedTo')
            .populate({ path: 'replyTo', populate: { path: 'sender', select: 'name loginId role' } });
            
        const io = req.app.get('io');
        if (io) io.to('workspace_chat').emit('workspace:edit', populatedMessage);
        
        res.json(populatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save Message (Bookmark)
router.post('/workspace-chat/state/save', verifyToken, async (req, res) => {
    try {
        const { messageId } = req.body;
        let state = await WorkspaceChatState.findOne({ userId: req.user.id });
        if (!state) state = new WorkspaceChatState({ userId: req.user.id });
        
        const existingIndex = state.savedMessages.indexOf(messageId);
        if (existingIndex !== -1) {
            state.savedMessages.splice(existingIndex, 1);
        } else {
            state.savedMessages.push(messageId);
        }
        await state.save();
        res.json(state);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dedicated Notifications History
router.get('/workspace-chat/notifications', verifyToken, async (req, res) => {
    try {
        let messages = await WorkspaceMessage.find({
            $or: [
                { mentions: req.user.id },
                { 'replyTo': { $exists: true, $ne: null } }
            ]
        })
        .sort({ createdAt: -1 })
        .limit(30)
        .populate('sender', 'name loginId role isSystemAccount')
        .populate('mentions', 'name loginId role isSystemAccount')
        .populate('reactions.user', 'name')
        .populate({ path: 'replyTo', populate: { path: 'sender', select: 'name loginId role' } });
        
        // Filter strictly to replies aimed at the user or mentions
        messages = messages.filter(m => {
            const isMention = m.mentions.some(u => u._id.toString() === req.user.id);
            const isReplyToMe = m.replyTo && m.replyTo.sender && m.replyTo.sender._id.toString() === req.user.id;
            return isMention || isReplyToMe;
        });
        
        if (!req.user.isSystemAccount) {
            messages = messages.filter(m => !(m.sender && m.sender.isSystemAccount));
        }
        
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

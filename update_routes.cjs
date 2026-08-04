const fs = require('fs');
let code = fs.readFileSync('backend/routes/workspaceRoutes.js', 'utf8');

const newRoutes = `
// --- CHAT POWER FEATURES ---

// Search Messages
router.get('/workspace-chat/search', verifyToken, async (req, res) => {
    try {
        const queryStr = req.query.q;
        if (!queryStr) return res.json([]);
        
        // Exact match regex
        const exactRegex = new RegExp('\\\\b' + escapeRegex(queryStr) + '\\\\b', 'i');
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
    return text.replace(/[-[\\]{}()*+?.,\\\\^$|#\\s]/g, '\\\\$&');
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
`;

code = code.replace(/module\.exports = router;/, newRoutes + '\nmodule.exports = router;');
fs.writeFileSync('backend/routes/workspaceRoutes.js', code);

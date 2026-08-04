const mongoose = require('mongoose');

const workspaceMessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    taskReferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceMessage',
        default: null
    },
    reactions: [{
        emoji: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    attachments: [{
        url: String,
        filename: String,
        mimeType: String
    }],
    isPinned: {
        type: Boolean,
        default: false
    },
    pinnedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    pinnedAt: {
        type: Date,
        default: null
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    editedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Indexes for faster cursor pagination and querying
workspaceMessageSchema.index({ createdAt: -1 });
workspaceMessageSchema.index({ sender: 1 });
workspaceMessageSchema.index({ mentions: 1 });
workspaceMessageSchema.index({ taskReferences: 1 });

module.exports = mongoose.model('WorkspaceMessage', workspaceMessageSchema);

const mongoose = require('mongoose');

const notificationPreferencesSchema = new mongoose.Schema({
  mentions: { type: Boolean, default: true },
  replies: { type: Boolean, default: true },
  newMessages: { type: Boolean, default: true },
  desktop: { type: Boolean, default: true },
  sound: { type: Boolean, default: true },
  showPreviews: { type: Boolean, default: true },
  playMentionSound: { type: Boolean, default: true },
  compactLayout: { type: Boolean, default: false },
  enterToSend: { type: Boolean, default: true },
  autoScrollToLatest: { type: Boolean, default: true }
}, { _id: false });

const workspaceChatStateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  lastReadMessage: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'WorkspaceMessage',
    default: null
  },
  unreadMentions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'WorkspaceMessage' 
  }],
  lastReadReply: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'WorkspaceMessage',
    default: null
  },
  lastSeenAt: { 
    type: Date, 
    default: Date.now 
  },
  savedMessages: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'WorkspaceMessage' 
  }],
  notificationPreferences: {
    type: notificationPreferencesSchema,
    default: () => ({})
  }
}, { timestamps: true });

module.exports = mongoose.model('WorkspaceChatState', workspaceChatStateSchema);

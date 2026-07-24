const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  previousStatus: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'REQUIRES_INPUT', 'REQUIRES_REVIEW', 'COMPLETED', null]
  },
  newStatus: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'REQUIRES_INPUT', 'REQUIRES_REVIEW', 'COMPLETED']
  },
  previousPriority: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low', null]
  },
  newPriority: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'IN_PROGRESS', 'REQUIRES_INPUT', 'REQUIRES_REVIEW', 'COMPLETED'],
    default: 'PENDING'
  },
  priority: {
    type: String,
    enum: ['Critical', 'High', 'Medium', 'Low'],
    default: 'Medium'
  },
  documentUrl: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date
  },
  history: [historySchema]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const dailyTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  links: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('DailyTask', dailyTaskSchema);

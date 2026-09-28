const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  loginId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isSystemAccount: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

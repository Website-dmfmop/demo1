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
    required: true,
    enum: [
      'SUPER_ADMIN', 
      'DIRECTOR', 
      'OPERATION_HEAD', 
      'TECHNICAL_COORDINATOR', 
      'TECHNICAL_ASSOCIATE', 
      'TRAINER'
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

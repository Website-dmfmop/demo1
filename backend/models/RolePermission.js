const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'DIRECTOR', 
      'OPERATION_HEAD', 
      'TECHNICAL_COORDINATOR', 
      'TECHNICAL_ASSOCIATE', 
      'TRAINER'
    ]
  },
  canViewAllTasks: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('RolePermission', rolePermissionSchema);

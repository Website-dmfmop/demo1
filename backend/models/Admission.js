const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    parentName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    courseCategory: { type: String, required: true, default: 'General' },
    subCourse: { type: String, required: true, default: 'General' },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Under Review', 'Approved', 'Rejected'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);

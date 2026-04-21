const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    studentName: { type: String }, // For legacy data
    age: { type: Number },
    grade: { type: String },
    parentName: { type: String },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true }, // Map phone to this
    address: { type: String },
    courseCategory: { type: String, required: true, default: 'General' },
    subCourse: { type: String, required: true, default: 'General' },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: { type: String, default: 'Pending' },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Under Review', 'Approved', 'Rejected'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);

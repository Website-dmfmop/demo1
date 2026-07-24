const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    fullName: { type: String },
    firstName: { type: String }, // Made optional for legacy compat
    lastName: { type: String }, // Made optional for legacy compat
    studentName: { type: String }, // For legacy data
    dateOfBirth: { type: Date },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    grade: { type: String },
    parentName: { type: String },
    parentCountryCode: { type: String },
    parentContactNumber: { type: String },
    email: { type: String, required: true },
    mobileCountryCode: { type: String, default: '+91' },
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

const mongoose = require('mongoose');

const competitiveExamAdmissionSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    highestQualification: { type: String, required: true },
    yearOfPassing: { type: Number, required: true },
    targetStream: [{ type: String }],
    currentCity: { type: String, required: true },
    preferredMedium: { type: String, required: true },
    intent: { type: String },
    status: { type: String, enum: ['Pending', 'Under Review', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompetitiveExamAdmission', competitiveExamAdmissionSchema);

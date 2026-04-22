const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    jobRole: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'Pending' } // Pending, Reviewed, Rejected
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);

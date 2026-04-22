const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
    jobRole: { type: String, required: true },
    companyName: { type: String, required: true },
    country: { type: String, required: true },
    openings: { type: Number, default: 1 },
    description: { type: String },
    jobLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('JobPosting', jobPostingSchema);

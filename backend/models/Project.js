const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, default: 'Various' },
    zone: { type: String, default: '' },
    ward: { type: String, default: '' },
    timeline: { type: String, required: true },
    fundingGoal: { type: Number, required: true },
    currentFunding: { type: Number, default: 0 },
    description: { type: String, required: true },
    targetDemographics: { type: [String], default: [] },
    sdgGoals: { type: [Number], default: [] },
    isAspirationalDistrict: { type: Boolean, default: false },
    hasCoInvestment: { type: Boolean, default: false },
    overheadPercent: { type: Number, required: true },
    csr1Validated: { type: Boolean, default: false },
    hasNitiAayog: { type: Boolean, default: false },
    auditLayer: { type: String, required: true },
    taxExemptions: { type: [String], default: [] },
    hasFCRA: { type: Boolean, default: false },
    pitchDeck: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);

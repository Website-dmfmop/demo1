const mongoose = require('mongoose');

const csrPartnerSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['corporate', 'ngo'] },
    // Common
    status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
    createdAt: { type: Date, default: Date.now },
    
    // Corporate Specific
    companyName: String,
    budgetRange: String,
    focusSectors: [String],
    geographies: String,
    contactName: String,
    contactEmail: String,
    
    // NGO Specific
    ngoName: String,
    registrationNumber: String,
    coreSectors: String,
    regions: String,
    yearsOfOperation: Number,
    pastImpact: String,
    contactPerson: String,
    
    // File upload path
    supportingDocument: String
});

module.exports = mongoose.model('CSRPartner', csrPartnerSchema);

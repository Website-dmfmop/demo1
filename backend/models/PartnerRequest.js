const mongoose = require('mongoose');

const partnerRequestSchema = new mongoose.Schema({
    // Contact Info
    organizationName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
    country: { type: String, required: true },
    // Project Details
    projectTitle: { type: String, required: true },
    projectDescription: { type: String, required: true },
    leadAssessment: { type: String, required: true },
    proposedSolution: { type: String, required: true },
    purposeOfPartnership: { type: String, required: true },
    partnershipType: { type: String, required: true }, // e.g., Strategic, Funding, Technical, CSR
    pdfFile: { type: String }, // path to uploaded document
    // Status
    status: { type: String, default: 'Pending' }, // Pending, Under Review, Approved, Rejected
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PartnerRequest', partnerRequestSchema);

const mongoose = require('mongoose');

const joineeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    purpose: { type: String, required: true }, // e.g., Volunteer, Member, Partner
    message: { type: String },
    status: { type: String, default: 'Pending' }, // Pending, Contacted, Approved, Rejected etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Joinee', joineeSchema);

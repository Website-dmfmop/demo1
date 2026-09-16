const mongoose = require('mongoose');

const dmfMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    occupation: { type: String, required: true },
    message: { type: String }, // Optional: Why do you want to join?
    status: { type: String, default: 'Pending' }, // Pending, Under Review, Approved, Rejected etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DmfMember', dmfMemberSchema);

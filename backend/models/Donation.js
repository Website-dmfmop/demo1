const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    paymentId: { type: String }, // Optional field if they want to integrate razorpay later
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);

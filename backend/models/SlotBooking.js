const mongoose = require('mongoose');

const slotBookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    purpose: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'Booked' }, // Booked, Confirmed, Completed, Cancelled
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SlotBooking', slotBookingSchema);

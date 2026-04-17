const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountOffer: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

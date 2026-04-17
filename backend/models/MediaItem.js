const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MediaItem', mediaItemSchema);

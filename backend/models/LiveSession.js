const mongoose = require('mongoose');

const liveSessionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    meetingLink: { type: String, required: true },
    speaker: { type: String },
    description: { type: String },
    collaboration: { type: String },
    date: { type: String },
    time: { type: String },
    cost: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('LiveSession', liveSessionSchema);

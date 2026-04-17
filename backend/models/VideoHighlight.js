const mongoose = require('mongoose');
const videoHighlightSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    duration: { type: String },
    link: { type: String, required: true },
    thumb: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('VideoHighlight', videoHighlightSchema);

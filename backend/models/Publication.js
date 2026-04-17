const mongoose = require('mongoose');
const publicationSchema = new mongoose.Schema({
    title: { type: String },
    soon: { type: Boolean, default: false },
    img: { type: String },
    pdf: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Publication', publicationSchema);

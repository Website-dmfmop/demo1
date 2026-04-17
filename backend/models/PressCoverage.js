const mongoose = require('mongoose');
const pressCoverageSchema = new mongoose.Schema({
    outlet: { type: String, required: true },
    headline: { type: String, required: true },
    date: { type: String },
    tag: { type: String },
    color: { type: String, default: 'border-primary' },
    url: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('PressCoverage', pressCoverageSchema);

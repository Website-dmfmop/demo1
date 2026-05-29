const mongoose = require('mongoose');

const competitiveExamSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    brochure: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompetitiveExam', competitiveExamSchema);

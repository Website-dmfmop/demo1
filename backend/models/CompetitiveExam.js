const mongoose = require('mongoose');

const competitiveExamSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    level: { type: String, default: 'State Level' },
    category: { type: String, default: 'General' },
    overview: { type: String, required: true },
    eligibility: { type: String, required: true },
    pattern: [{
        stage: String,
        desc: String
    }],
    brochure: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CompetitiveExam', competitiveExamSchema);

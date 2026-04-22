const mongoose = require('mongoose');

const diplomaCourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DiplomaCourse', diplomaCourseSchema);

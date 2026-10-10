const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    mainContent: { type: String, required: true }, // rich text HTML
    featuredImage: { type: String, required: true }, // uploaded file path
    category: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    seoTitle: { type: String },
    seoDescription: { type: String },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);

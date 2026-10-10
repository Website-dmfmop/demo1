const express = require('express');
const router = express.Router();
const sanitizeHtml = require('sanitize-html');
const slugify = require('slugify');
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const Blog = require('../models/Blog');

const { validateObjectId } = require('../middleware/validation');

// --- Helper Functions ---

const sanitizeOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'u', 's', 'span']),
    allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'width', 'height'],
        '*': ['style', 'class']
    }
};

const generateUniqueSlug = async (title, currentId = null) => {
    let baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    while (true) {
        const existing = await Blog.findOne({ slug });
        if (!existing || (currentId && existing._id.toString() === currentId.toString())) {
            break;
        }
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    return slug;
};

// --- Public Routes ---

router.get('/api/blogs', async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;
        let query = { status: 'Published' };

        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { shortDescription: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await Blog.countDocuments(query);
        const blogs = await Blog.find(query)
            .sort({ publishedDate: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.json({
            data: blogs,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/blogs/:slug', async (req, res) => {
    // Avoid conflicting with admin route
    if (req.params.slug === 'admin') return res.status(404).json({ error: 'Not found' });
    
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, status: 'Published' });
        if (!blog) return res.status(404).json({ error: 'Blog post not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// --- Admin Routes ---

router.get('/api/blogs/admin/all', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/blogs', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), upload.single('featuredImage'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.featuredImage = '/uploads/public/' + req.file.filename;
        else if (!data.featuredImage) return res.status(400).json({ error: 'Featured image is required' });

        if (data.mainContent) {
            data.mainContent = sanitizeHtml(data.mainContent, sanitizeOptions);
        }

        if (!data.slug) {
            data.slug = await generateUniqueSlug(data.title);
        } else {
             data.slug = await generateUniqueSlug(data.slug);
        }

        const newBlog = new Blog(data);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/api/blogs/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), validateObjectId, upload.single('featuredImage'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.featuredImage = '/uploads/public/' + req.file.filename;

        if (data.mainContent) {
            data.mainContent = sanitizeHtml(data.mainContent, sanitizeOptions);
        }

        if (data.title || data.slug) {
            data.slug = await generateUniqueSlug(data.slug || data.title, req.params.id);
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, data, { returnDocument: 'after' });
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/blogs/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), validateObjectId, async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

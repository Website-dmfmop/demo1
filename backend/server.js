require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const Donation = require('./models/Donation');
const Admission = require('./models/Admission');
const Joinee = require('./models/Joinee');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Dedicated download route to enforce file saving (bypasses browser viewing)
app.get('/api/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads', req.params.filename);
    res.download(file, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).json({ error: 'File not found' });
            }
        }
    });
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.error('MongoDB connection error:', err));

// --- ROUTES ---

// Get all donations
app.get('/api/donations', async (req, res) => {
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        res.json(donations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new donation
app.post('/api/donations', async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        const savedDonation = await newDonation.save();
        res.status(201).json(savedDonation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all admissions
app.get('/api/admissions', async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ createdAt: -1 });
        res.json(admissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new admission
app.post('/api/admissions', async (req, res) => {
    try {
        const newAdmission = new Admission(req.body);
        const savedAdmission = await newAdmission.save();
        res.status(201).json(savedAdmission);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update admission status
app.put('/api/admissions/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updatedAdmission = await Admission.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        if (!updatedAdmission) return res.status(404).json({ error: 'Admission not found' });
        res.json(updatedAdmission);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete admission
app.delete('/api/admissions/:id', async (req, res) => {
    try {
        const deletedAdmission = await Admission.findByIdAndDelete(req.params.id);
        if (!deletedAdmission) return res.status(404).json({ error: 'Admission not found' });
        res.json({ message: 'Admission deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- JOINEE ROUTES ---

// Get all joinees
app.get('/api/joinees', async (req, res) => {
    try {
        const joinees = await Joinee.find().sort({ createdAt: -1 });
        res.json(joinees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new joinee
app.post('/api/joinees', async (req, res) => {
    try {
        const newJoinee = new Joinee(req.body);
        const savedJoinee = await newJoinee.save();
        res.status(201).json(savedJoinee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update joinee status
app.put('/api/joinees/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Contacted', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updatedJoinee = await Joinee.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        if (!updatedJoinee) return res.status(404).json({ error: 'Joinee not found' });
        res.json(updatedJoinee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete joinee
app.delete('/api/joinees/:id', async (req, res) => {
    try {
        const deletedJoinee = await Joinee.findByIdAndDelete(req.params.id);
        if (!deletedJoinee) return res.status(404).json({ error: 'Joinee not found' });
        res.json({ message: 'Joinee deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete donation
app.delete('/api/donations/:id', async (req, res) => {
    try {
        const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
        if (!deletedDonation) return res.status(404).json({ error: 'Donation not found' });
        res.json({ message: 'Donation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- COURSES API ---
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await require('./models/Course').find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/courses', upload.single('brochure'), async (req, res) => {
    try {
        const Course = require('./models/Course');
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/' + req.file.filename;

        const newCourse = new Course(data);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    try {
        const Course = require('./models/Course');
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/courses/:id', upload.single('brochure'), async (req, res) => {
    try {
        const Course = require('./models/Course');
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/' + req.file.filename;

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- MEDIA API ---
app.get('/api/media', async (req, res) => {
    try {
        const media = await require('./models/MediaItem').find().sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/media', upload.single('file'), async (req, res) => {
    try {
        const MediaItem = require('./models/MediaItem');
        const data = { ...req.body };
        if (req.file) data.src = '/uploads/' + req.file.filename;

        const newItem = new MediaItem(data);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/media/:id', async (req, res) => {
    try {
        await require('./models/MediaItem').findByIdAndDelete(req.params.id);
        res.json({ message: 'Media deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/media/:id', upload.single('file'), async (req, res) => {
    try {
        const MediaItem = require('./models/MediaItem');
        const data = { ...req.body };
        if (req.file) data.src = '/uploads/' + req.file.filename;

        const updatedItem = await MediaItem.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- VIDEOS API ---
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await require('./models/VideoHighlight').find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/videos', upload.single('thumb'), async (req, res) => {
    try {
        const VideoHighlight = require('./models/VideoHighlight');
        const data = { ...req.body };
        if (req.file) data.thumb = '/uploads/' + req.file.filename;

        const newVid = new VideoHighlight(data);
        res.status(201).json(await newVid.save());
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/videos/:id', async (req, res) => {
    try {
        await require('./models/VideoHighlight').findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/videos/:id', upload.single('thumb'), async (req, res) => {
    try {
        const VideoHighlight = require('./models/VideoHighlight');
        const data = { ...req.body };
        if (req.file) data.thumb = '/uploads/' + req.file.filename;

        const updatedVid = await VideoHighlight.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedVid);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// --- PUBLICATIONS API ---
app.get('/api/publications', async (req, res) => {
    try {
        const pubs = await require('./models/Publication').find().sort({ createdAt: -1 });
        res.json(pubs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/publications', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    try {
        const Publication = require('./models/Publication');
        const data = { ...req.body };
        if (data.soon === 'true') data.soon = true;
        if (data.soon === 'false') data.soon = false;

        if (req.files) {
            if (req.files.img && req.files.img[0]) data.img = '/uploads/' + req.files.img[0].filename;
            if (req.files.pdf && req.files.pdf[0]) data.pdf = '/uploads/' + req.files.pdf[0].filename;
        }

        const newPub = new Publication(data);
        res.status(201).json(await newPub.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/publications/:id', async (req, res) => {
    try {
        await require('./models/Publication').findByIdAndDelete(req.params.id);
        res.json({ message: 'Publication deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/publications/:id', upload.fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    try {
        const Publication = require('./models/Publication');
        const data = { ...req.body };
        if (data.soon === 'true') data.soon = true;
        if (data.soon === 'false') data.soon = false;

        if (req.files) {
            if (req.files.img && req.files.img[0]) data.img = '/uploads/' + req.files.img[0].filename;
            if (req.files.pdf && req.files.pdf[0]) data.pdf = '/uploads/' + req.files.pdf[0].filename;
        }

        const updatedPub = await Publication.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedPub);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// --- PRESS COVERAGE API ---
app.get('/api/press', async (req, res) => {
    try {
        const press = await require('./models/PressCoverage').find().sort({ createdAt: -1 });
        res.json(press);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/press', async (req, res) => {
    try {
        const PressCoverage = require('./models/PressCoverage');
        const newPress = new PressCoverage(req.body);
        res.status(201).json(await newPress.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/press/:id', async (req, res) => {
    try {
        await require('./models/PressCoverage').findByIdAndDelete(req.params.id);
        res.json({ message: 'Press deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/press/:id', async (req, res) => {
    try {
        const PressCoverage = require('./models/PressCoverage');
        const updatedPress = await PressCoverage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPress);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// --- LIVE SESSIONS API ---
app.get('/api/live-sessions', async (req, res) => {
    try {
        const LiveSession = require('./models/LiveSession');
        const sessions = await LiveSession.find().sort({ createdAt: -1 });
        res.json(sessions);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/live-sessions', async (req, res) => {
    try {
        const LiveSession = require('./models/LiveSession');
        const newSession = new LiveSession(req.body);
        res.status(201).json(await newSession.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/live-sessions/:id', async (req, res) => {
    try {
        const LiveSession = require('./models/LiveSession');
        await LiveSession.findByIdAndDelete(req.params.id);
        res.json({ message: 'Live session deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/live-sessions/:id', async (req, res) => {
    try {
        const LiveSession = require('./models/LiveSession');
        const updatedSession = await LiveSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSession);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

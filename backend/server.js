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

const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

// Socket.io JWT Authentication Middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (!token) return next(new Error('Authentication error'));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.user.loginId} (ID: ${socket.user.id})`);
    // Join a room matching the user's ID for targeted emissions
    socket.join(socket.user.id);
    
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.user.loginId}`);
    });
});

// Expose io to routes
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const workspaceRoutes = require('./routes/workspaceRoutes');
app.use('/api', workspaceRoutes);

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

// --- CAPTCHA Middleware ---
const verifyCaptcha = async (req, res, next) => {
    const { captchaToken } = req.body;
    if (!captchaToken) {
        return res.status(400).json({ error: 'CAPTCHA verification failed: missing token' });
    }

    try {
        let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
        let response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${encodeURIComponent(captchaToken)}`
        });
        let data = await response.json();

        if (!data.success) {
            // Fallback for development: try the official testing secret key if the frontend used the testing site key
            const fallbackSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
            if (secretKey !== fallbackSecret) {
                response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `secret=${fallbackSecret}&response=${encodeURIComponent(captchaToken)}`
                });
                data = await response.json();
            }
            if (!data.success) {
                return res.status(400).json({ error: 'CAPTCHA verification failed: invalid token' });
            }
        }
        next();
    } catch (err) {
        console.error('CAPTCHA verification error:', err);
        res.status(500).json({ error: 'CAPTCHA verification process failed' });
    }
};

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
app.post('/api/donations', verifyCaptcha, async (req, res) => {
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
app.post('/api/admissions', verifyCaptcha, async (req, res) => {
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
app.post('/api/joinees', verifyCaptcha, async (req, res) => {
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

// --- DIPLOMA COURSES API ---
app.get('/api/diploma-courses', async (req, res) => {
    try {
        const DiplomaCourse = require('./models/DiplomaCourse');
        const courses = await DiplomaCourse.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/diploma-courses', async (req, res) => {
    try {
        const DiplomaCourse = require('./models/DiplomaCourse');
        const newCourse = new DiplomaCourse(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/diploma-courses/:id', async (req, res) => {
    try {
        const DiplomaCourse = require('./models/DiplomaCourse');
        const updatedCourse = await DiplomaCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/diploma-courses/:id', async (req, res) => {
    try {
        const DiplomaCourse = require('./models/DiplomaCourse');
        await DiplomaCourse.findByIdAndDelete(req.params.id);
        res.json({ message: 'Diploma course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- COMPETITIVE EXAMS API ---
app.get('/api/competitive-exams', async (req, res) => {
    try {
        const CompetitiveExam = require('./models/CompetitiveExam');
        const exams = await CompetitiveExam.find().sort({ createdAt: -1 });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/competitive-exams', upload.single('brochure'), async (req, res) => {
    try {
        const CompetitiveExam = require('./models/CompetitiveExam');
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/' + req.file.filename;

        const newExam = new CompetitiveExam(data);
        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/competitive-exams/:id', upload.single('brochure'), async (req, res) => {
    try {
        const CompetitiveExam = require('./models/CompetitiveExam');
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/' + req.file.filename;

        const updatedExam = await CompetitiveExam.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedExam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/competitive-exams/:id', async (req, res) => {
    try {
        const CompetitiveExam = require('./models/CompetitiveExam');
        await CompetitiveExam.findByIdAndDelete(req.params.id);
        res.json({ message: 'Competitive exam deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
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

// --- JOB POSTINGS API ---
app.get('/api/jobs', async (req, res) => {
    try {
        const JobPosting = require('./models/JobPosting');
        const jobs = await JobPosting.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/jobs', async (req, res) => {
    try {
        const JobPosting = require('./models/JobPosting');
        const newJob = new JobPosting(req.body);
        res.status(201).json(await newJob.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const JobPosting = require('./models/JobPosting');
        await JobPosting.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/jobs/:id', async (req, res) => {
    try {
        const JobPosting = require('./models/JobPosting');
        const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

// --- JOB APPLICATIONS API ---
app.get('/api/job-applications', async (req, res) => {
    try {
        const JobApplication = require('./models/JobApplication');
        const applications = await JobApplication.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/job-applications', verifyCaptcha, async (req, res) => {
    try {
        const JobApplication = require('./models/JobApplication');
        const newApp = new JobApplication(req.body);
        res.status(201).json(await newApp.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/job-applications/:id', async (req, res) => {
    try {
        const JobApplication = require('./models/JobApplication');
        await JobApplication.findByIdAndDelete(req.params.id);
        res.json({ message: 'Application deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/job-applications/:id/status', async (req, res) => {
    try {
        const JobApplication = require('./models/JobApplication');
        const { status } = req.body;
        const updatedApp = await JobApplication.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedApp);
    } catch (err) { res.status(400).json({ error: err.message }); }
});
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


// --- PARTNER REQUESTS API ---
app.get('/api/partner-requests', async (req, res) => {
    try {
        const PartnerRequest = require('./models/PartnerRequest');
        const partners = await PartnerRequest.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/partner-requests', upload.single('pdfFile'), verifyCaptcha, async (req, res) => {
    try {
        const PartnerRequest = require('./models/PartnerRequest');
        const data = { ...req.body };
        if (req.file) data.pdfFile = '/uploads/' + req.file.filename;
        const newPartner = new PartnerRequest(data);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/partner-requests/:id/status', async (req, res) => {
    try {
        const PartnerRequest = require('./models/PartnerRequest');
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await PartnerRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'Partner request not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/partner-requests/:id', async (req, res) => {
    try {
        const PartnerRequest = require('./models/PartnerRequest');
        await PartnerRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Partner request deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});


// --- SLOT BOOKINGS API ---
app.get('/api/slot-bookings', async (req, res) => {
    try {
        const SlotBooking = require('./models/SlotBooking');
        const bookings = await SlotBooking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/slot-bookings/booked', async (req, res) => {
    try {
        const SlotBooking = require('./models/SlotBooking');
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: 'Date is required' });
        
        const bookings = await SlotBooking.find({ 
            date, 
            status: { $ne: 'Cancelled' } 
        }).select('timeSlot');
        
        res.json(bookings.map(b => b.timeSlot));
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/slot-bookings', verifyCaptcha, async (req, res) => {
    try {
        const SlotBooking = require('./models/SlotBooking');
        const { date, timeSlot } = req.body;
        
        // Check if already booked
        const existingBooking = await SlotBooking.findOne({ 
            date, 
            timeSlot, 
            status: { $ne: 'Cancelled' } 
        });
        
        if (existingBooking) {
            return res.status(400).json({ error: 'This time slot is already booked. Please choose another one.' });
        }
        
        const newBooking = new SlotBooking(req.body);
        res.status(201).json(await newBooking.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/slot-bookings/:id/status', async (req, res) => {
    try {
        const SlotBooking = require('./models/SlotBooking');
        const { status } = req.body;
        if (!['Booked', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await SlotBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'Booking not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/slot-bookings/:id', async (req, res) => {
    try {
        const SlotBooking = require('./models/SlotBooking');
        await SlotBooking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PROJECTS API ---
app.get('/api/projects', async (req, res) => {
    try {
        const Project = require('./models/Project');
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/projects', upload.single('pitchDeck'), async (req, res) => {
    try {
        const Project = require('./models/Project');
        const data = { ...req.body };
        if (req.file) data.pitchDeck = '/uploads/' + req.file.filename;

        // Ensure arrays are parsed correctly if sent as strings (FormData caveat)
        if (typeof data.targetDemographics === 'string') {
            try { data.targetDemographics = JSON.parse(data.targetDemographics); } catch(e) {}
        }
        if (typeof data.sdgGoals === 'string') {
            try { data.sdgGoals = JSON.parse(data.sdgGoals); } catch(e) {}
        }
        if (typeof data.taxExemptions === 'string') {
            try { data.taxExemptions = JSON.parse(data.taxExemptions); } catch(e) {}
        }

        const newProject = new Project(data);
        res.status(201).json(await newProject.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/projects/:id/status', async (req, res) => {
    try {
        const Project = require('./models/Project');
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await Project.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'Project not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const Project = require('./models/Project');
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- CSR PARTNERS API ---
app.get('/api/csr-partners', async (req, res) => {
    try {
        const CSRPartner = require('./models/CSRPartner');
        const partners = await CSRPartner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/csr-partners', upload.single('supportingDocument'), async (req, res) => {
    try {
        const CSRPartner = require('./models/CSRPartner');
        const partnerData = { ...req.body };
        if (req.file) {
            partnerData.supportingDocument = `/uploads/${req.file.filename}`;
        }
        const newPartner = new CSRPartner(partnerData);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/csr-partners/:id/status', async (req, res) => {
    try {
        const CSRPartner = require('./models/CSRPartner');
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await CSRPartner.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: 'CSR Partner not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/csr-partners/:id', async (req, res) => {
    try {
        const CSRPartner = require('./models/CSRPartner');
        await CSRPartner.findByIdAndDelete(req.params.id);
        res.json({ message: 'CSR Partner deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

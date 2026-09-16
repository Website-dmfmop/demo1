const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const Course = require('../models/Course');
const DiplomaCourse = require('../models/DiplomaCourse');
const CompetitiveExam = require('../models/CompetitiveExam');
const LiveSession = require('../models/LiveSession');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/courses', async (req, res) => {
    try {
        const courses = await require('../models/Course').find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/courses', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('brochure'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/public/' + req.file.filename;

        const newCourse = new Course(data);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/courses/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/api/courses/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('brochure'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/public/' + req.file.filename;

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/api/diploma-courses', async (req, res) => {
    try {
        const courses = await DiplomaCourse.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/diploma-courses', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const newCourse = new DiplomaCourse(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/api/diploma-courses/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const updatedCourse = await DiplomaCourse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/diploma-courses/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await DiplomaCourse.findByIdAndDelete(req.params.id);
        res.json({ message: 'Diploma course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/competitive-exams', async (req, res) => {
    try {
        const exams = await CompetitiveExam.find().sort({ createdAt: -1 });
        res.json(exams);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/competitive-exams', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('brochure'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/public/' + req.file.filename;

        if (typeof data.pattern === 'string') {
            try { data.pattern = JSON.parse(data.pattern); } catch(e) {}
        }

        const newExam = new CompetitiveExam(data);
        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/api/competitive-exams/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('brochure'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.brochure = '/uploads/public/' + req.file.filename;

        if (typeof data.pattern === 'string') {
            try { data.pattern = JSON.parse(data.pattern); } catch(e) {}
        }

        const updatedExam = await CompetitiveExam.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedExam);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/competitive-exams/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await CompetitiveExam.findByIdAndDelete(req.params.id);
        res.json({ message: 'Competitive exam deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/live-sessions', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const sessions = await LiveSession.find().sort({ createdAt: -1 });
        res.json(sessions);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/live-sessions', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const newSession = new LiveSession(req.body);
        res.status(201).json(await newSession.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/live-sessions/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await LiveSession.findByIdAndDelete(req.params.id);
        res.json({ message: 'Live session deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/live-sessions/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const updatedSession = await LiveSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSession);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;

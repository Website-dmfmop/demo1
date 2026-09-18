const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const JobPosting = require('../models/JobPosting');
const JobApplication = require('../models/JobApplication');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await JobPosting.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/jobs', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const newJob = new JobPosting(req.body);
        res.status(201).json(await newJob.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/jobs/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await JobPosting.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/jobs/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.json(updatedJob);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/api/job-applications', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const applications = await JobApplication.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/job-applications', verifyCaptcha, async (req, res) => {
    try {
        const newApp = new JobApplication(req.body);
        res.status(201).json(await newApp.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/job-applications/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await JobApplication.findByIdAndDelete(req.params.id);
        res.json({ message: 'Application deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/job-applications/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        const updatedApp = await JobApplication.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        res.json(updatedApp);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;

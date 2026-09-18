const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const Project = require('../models/Project');
const CSRPartner = require('../models/CSRPartner');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/projects', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  privateUpload.single('pitchDeck'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.pitchDeck = '/api/private-uploads/' + req.file.filename;

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

router.put('/api/projects/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await Project.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'Project not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/projects/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/csr-partners', async (req, res) => {
    try {
        const partners = await CSRPartner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/csr-partners', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  privateUpload.single('supportingDocument'), async (req, res) => {
    try {
        const partnerData = { ...req.body };
        if (req.file) {
            partnerData.supportingDocument = `/api/private-uploads/${req.file.filename}`;
        }
        const newPartner = new CSRPartner(partnerData);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/csr-partners/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await CSRPartner.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'CSR Partner not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/projects', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  privateUpload.single('pitchDeck'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.pitchDeck = '/api/private-uploads/' + req.file.filename;

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

router.put('/api/projects/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await Project.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'Project not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/projects/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/csr-partners', async (req, res) => {
    try {
        const partners = await CSRPartner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/csr-partners', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  privateUpload.single('supportingDocument'), async (req, res) => {
    try {
        const partnerData = { ...req.body };
        if (req.file) {
            partnerData.supportingDocument = `/api/private-uploads/${req.file.filename}`;
        }
        const newPartner = new CSRPartner(partnerData);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/csr-partners/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await CSRPartner.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'CSR Partner not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/csr-partners/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await CSRPartner.findByIdAndDelete(req.params.id);
        res.json({ message: 'CSR Partner deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const PartnerRequest = require('../models/PartnerRequest');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/partner-requests', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const partners = await PartnerRequest.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/partner-requests', privateUpload.single('pdfFile'), verifyCaptcha, async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.pdfFile = '/api/private-uploads/' + req.file.filename;
        const newPartner = new PartnerRequest(data);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/partner-requests/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await PartnerRequest.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'Partner request not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/partner-requests/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await PartnerRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Partner request deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.get('/api/partner-requests', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const partners = await PartnerRequest.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/partner-requests', privateUpload.single('pdfFile'), verifyCaptcha, async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.pdfFile = '/api/private-uploads/' + req.file.filename;
        const newPartner = new PartnerRequest(data);
        res.status(201).json(await newPartner.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/api/partner-requests/:id/status', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await PartnerRequest.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'Partner request not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.delete('/api/partner-requests/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await PartnerRequest.findByIdAndDelete(req.params.id);
        res.json({ message: 'Partner request deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');
const MediaItem = require('../models/MediaItem');
const VideoHighlight = require('../models/VideoHighlight');
const Publication = require('../models/Publication');
const PressCoverage = require('../models/PressCoverage');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/media', async (req, res) => {
    try {
        const media = await require('../models/MediaItem').find().sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/media', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('file'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.src = '/uploads/public/' + req.file.filename;

        const newItem = new MediaItem(data);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/media/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await require('../models/MediaItem').findByIdAndDelete(req.params.id);
        res.json({ message: 'Media deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/api/media/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('file'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.src = '/uploads/public/' + req.file.filename;

        const updatedItem = await MediaItem.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/api/videos', async (req, res) => {
    try {
        const videos = await require('../models/VideoHighlight').find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/videos', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('thumb'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.thumb = '/uploads/public/' + req.file.filename;

        const newVid = new VideoHighlight(data);
        res.status(201).json(await newVid.save());
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/api/videos/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await require('../models/VideoHighlight').findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/videos/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.single('thumb'), async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.thumb = '/uploads/public/' + req.file.filename;

        const updatedVid = await VideoHighlight.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedVid);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/api/publications', async (req, res) => {
    try {
        const pubs = await require('../models/Publication').find().sort({ createdAt: -1 });
        res.json(pubs);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/publications', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.soon === 'true') data.soon = true;
        if (data.soon === 'false') data.soon = false;

        if (req.files) {
            if (req.files.img && req.files.img[0]) data.img = '/uploads/public/' + req.files.img[0].filename;
            if (req.files.pdf && req.files.pdf[0]) data.pdf = '/uploads/public/' + req.files.pdf[0].filename;
        }

        const newPub = new Publication(data);
        res.status(201).json(await newPub.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/publications/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await require('../models/Publication').findByIdAndDelete(req.params.id);
        res.json({ message: 'Publication deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/publications/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  upload.fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.soon === 'true') data.soon = true;
        if (data.soon === 'false') data.soon = false;

        if (req.files) {
            if (req.files.img && req.files.img[0]) data.img = '/uploads/public/' + req.files.img[0].filename;
            if (req.files.pdf && req.files.pdf[0]) data.pdf = '/uploads/public/' + req.files.pdf[0].filename;
        }

        const updatedPub = await Publication.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updatedPub);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/api/press', async (req, res) => {
    try {
        const press = await require('../models/PressCoverage').find().sort({ createdAt: -1 });
        res.json(press);
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.post('/api/press', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const newPress = new PressCoverage(req.body);
        res.status(201).json(await newPress.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/press/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        await require('../models/PressCoverage').findByIdAndDelete(req.params.id);
        res.json({ message: 'Press deleted' });
    } catch (err) { res.status(500).json({ error: 'Internal Server Error' }); }
});

router.put('/api/press/:id', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'),  async (req, res) => {
    try {
        const updatedPress = await PressCoverage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPress);
    } catch (err) { res.status(400).json({ error: err.message }); }
});

module.exports = router;

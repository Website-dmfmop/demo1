const express = require('express');
const router = express.Router();
const path = require('path');
const { verifyToken, restrictTo } = require('../middleware/auth');
const { upload, privateUpload } = require('../middleware/upload');
const { verifyCaptcha } = require('../middleware/validation');

const { validateObjectId } = require('../middleware/validation');
router.param('id', validateObjectId);

router.get('/api/download/:filename', (req, res) => {
    const file = path.join(__dirname, '..', 'uploads', req.params.filename);
    res.download(file, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).json({ error: 'File not found' });
            }
        }
    });
});

router.use('/uploads', (req, res, next) => {
    if (req.path.startsWith('/private/')) {
        return res.status(403).json({ error: 'Forbidden: Private uploads cannot be accessed statically.' });
    }
    next();
}, express.static(path.join(__dirname, '..', 'uploads')));

router.get('/api/private-uploads/:filename', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), (req, res) => {
    const filename = req.params.filename;
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\\\')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    const file = path.join(__dirname, '..', 'uploads', 'private', filename);
    res.download(file, (err) => {
        if (err && !res.headersSent) res.status(404).json({ error: 'File not found' });
    });
});

module.exports = router;

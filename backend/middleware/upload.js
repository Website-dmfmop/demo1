const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirPublic = path.join(__dirname, '..', 'uploads', 'public');
const uploadDirPrivate = path.join(__dirname, '..', 'uploads', 'private');

if (!fs.existsSync(uploadDirPublic)) fs.mkdirSync(uploadDirPublic, { recursive: true });
if (!fs.existsSync(uploadDirPrivate)) fs.mkdirSync(uploadDirPrivate, { recursive: true });

const publicStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDirPublic),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const privateStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDirPrivate),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: publicStorage });
const privateUpload = multer({ storage: privateStorage });

module.exports = { upload, privateUpload };

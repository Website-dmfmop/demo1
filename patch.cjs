const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'backend', 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Require environment variables at the top
const startupCheck = `
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
    process.exit(1);
}
if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error('FATAL ERROR: RECAPTCHA_SECRET_KEY environment variable is not set.');
    process.exit(1);
}

const { verifyToken, restrictTo } = require('./middleware/auth');
`;
content = content.replace(/(const express = require\('express'\);)/, `$1\n${startupCheck}`);

// 2. CORS configuration
const corsConfig = `
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
`;
content = content.replace(/app\.use\(cors\(\)\);/, corsConfig);

const socketCors = `cors: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }`;
content = content.replace(/cors:\s*\{\s*origin:\s*"\*",\s*methods:\s*\["GET",\s*"POST",\s*"PUT",\s*"DELETE",\s*"PATCH"\]\s*\}/, socketCors);

// 3. Handle Error leakage
content = content.split("res.status(500).json({ error: err.message })").join("res.status(500).json({ error: 'Internal Server Error' })");

// Remove hardcoded recaptcha secrets
content = content.replace("let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';", "let secretKey = process.env.RECAPTCHA_SECRET_KEY;");
content = content.replace(/\/\/ Fallback for development[\s\S]*?if \(!data\.success\) \{/, "if (!data.success) {");

// 4. Uploads logic
const uploadsLogic = `
const uploadDirPublic = path.join(__dirname, 'uploads', 'public');
const uploadDirPrivate = path.join(__dirname, 'uploads', 'private');
if (!fs.existsSync(uploadDirPublic)) fs.mkdirSync(uploadDirPublic, { recursive: true });
if (!fs.existsSync(uploadDirPrivate)) fs.mkdirSync(uploadDirPrivate, { recursive: true });

app.use('/uploads', (req, res, next) => {
    if (req.path.startsWith('/private/')) {
        return res.status(403).json({ error: 'Forbidden: Private uploads cannot be accessed statically.' });
    }
    next();
}, express.static(path.join(__dirname, 'uploads')));

// Authenticated route for private uploads
app.get('/api/private-uploads/:filename', verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), (req, res) => {
    const filename = req.params.filename;
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\\\')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }
    const file = path.join(__dirname, 'uploads', 'private', filename);
    res.download(file, (err) => {
        if (err && !res.headersSent) res.status(404).json({ error: 'File not found' });
    });
});

// Multer Storage Configuration
const publicStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/public/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const privateStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/private/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: publicStorage });
const privateUpload = multer({ storage: privateStorage });

// ID Validation Middleware
app.param('id', (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    next();
});
`;

content = content.replace(/app\.use\('\/uploads', express\.static\(path\.join\(__dirname, 'uploads'\)\)\);/, "");
content = content.replace(/const storage = multer\.diskStorage\(\{[\s\S]*?\}\);\s*const upload = multer\(\{ storage \}\);/, uploadsLogic);

// Update POST routes for sensitive uploads to use privateUpload
content = content.split("upload.single('pdfFile')").join("privateUpload.single('pdfFile')");
content = content.split("upload.single('pitchDeck')").join("privateUpload.single('pitchDeck')");
content = content.split("upload.single('supportingDocument')").join("privateUpload.single('supportingDocument')");

content = content.split("data.pdfFile = '/uploads/' + req.file.filename;").join("data.pdfFile = '/api/private-uploads/' + req.file.filename;");
content = content.split("data.pitchDeck = '/uploads/' + req.file.filename;").join("data.pitchDeck = '/api/private-uploads/' + req.file.filename;");
content = content.split("partnerData.supportingDocument = \`/uploads/\${req.file.filename}\`;").join("partnerData.supportingDocument = \`/api/private-uploads/\${req.file.filename}\`;");

// Public uploads path fix
content = content.split("'/uploads/' + req.file.filename").join("'/uploads/public/' + req.file.filename");
content = content.split("'/uploads/' + req.files.img[0].filename").join("'/uploads/public/' + req.files.img[0].filename");
content = content.split("'/uploads/' + req.files.pdf[0].filename").join("'/uploads/public/' + req.files.pdf[0].filename");


// 5. Endpoints protection
const adminMiddleware = "verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), ";

const publicGet = ['/api/courses', '/api/diploma-courses', '/api/competitive-exams', '/api/media', '/api/videos', '/api/publications', '/api/press', '/api/jobs', '/api/projects', '/api/csr-partners', '/api/slot-bookings/booked'];
const publicPost = ['/api/donations', '/api/admissions', '/api/competitive-exam-admissions', '/api/joinees', '/api/job-applications', '/api/partner-requests', '/api/slot-bookings'];

const routeRegex = /app\.(get|post|put|delete)\('(\/api\/[^']+)',/g;
let match;
const routesToPatch = [];

while ((match = routeRegex.exec(content)) !== null) {
    const method = match[1];
    const url = match[2];
    
    if (method === 'get' && publicGet.includes(url)) continue;
    if (method === 'post' && publicPost.includes(url)) continue;
    if (method === 'get' && url === '/api/download/:filename') continue; // download route is special
    
    routesToPatch.push({ method, url, fullMatch: match[0] });
}

// deduplicate
const uniqueRoutes = [...new Map(routesToPatch.map(item => [item.fullMatch, item])).values()];

for (const route of uniqueRoutes) {
    const replacePattern = 'app.' + route.method + '(\'' + route.url + '\', ' + adminMiddleware;
    content = content.split(route.fullMatch).join(replacePattern);
}

fs.writeFileSync(serverPath, content, 'utf8');
console.log("Patching complete.");

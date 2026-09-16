import re
import os

with open("backend/server.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Require environment variables at the top
startup_check = """
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
    process.exit(1);
}
if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.error('FATAL ERROR: RECAPTCHA_SECRET_KEY environment variable is not set.');
    process.exit(1);
}

const { verifyToken, restrictTo } = require('./middleware/auth');
"""
content = re.sub(r"(const express = require\('express'\);)", r"\1" + "\n" + startup_check, content, 1)

# 2. CORS configuration
cors_config = """
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
"""
content = re.sub(r"app\.use\(cors\(\)\);", cors_config, content, 1)

socket_cors = """cors: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }"""
content = re.sub(r"cors: \{\s*origin: \"\*\",\s*methods: \[\"GET\", \"POST\", \"PUT\", \"DELETE\", \"PATCH\"\]\s*\}", socket_cors, content, 1)


# 3. Handle Error leakage
content = content.replace("res.status(500).json({ error: err.message })", "res.status(500).json({ error: 'Internal Server Error' })")

# Remove hardcoded recaptcha secrets
content = content.replace("let secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';", "let secretKey = process.env.RECAPTCHA_SECRET_KEY;")
content = re.sub(r"// Fallback for development.*?if \(!data\.success\) \{", "if (!data.success) {", content, flags=re.DOTALL)


# 4. Uploads logic
uploads_logic = """
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
"""

# Replace old uploads code
content = re.sub(r"app\.use\('/uploads', express\.static\(path\.join\(__dirname, 'uploads'\)\)\);", "", content)
content = re.sub(r"const storage = multer\.diskStorage\(\{.*?\}\);\s*const upload = multer\(\{ storage \}\);", uploads_logic, content, flags=re.DOTALL)

# Update POST routes for sensitive uploads to use privateUpload
content = content.replace("upload.single('pdfFile')", "privateUpload.single('pdfFile')")
content = content.replace("upload.single('pitchDeck')", "privateUpload.single('pitchDeck')")
content = content.replace("upload.single('supportingDocument')", "privateUpload.single('supportingDocument')")

content = content.replace("data.pdfFile = '/uploads/' + req.file.filename;", "data.pdfFile = '/api/private-uploads/' + req.file.filename;")
content = content.replace("data.pitchDeck = '/uploads/' + req.file.filename;", "data.pitchDeck = '/api/private-uploads/' + req.file.filename;")
content = content.replace("partnerData.supportingDocument = `/uploads/${req.file.filename}`;", "partnerData.supportingDocument = `/api/private-uploads/${req.file.filename}`;")

# Public uploads path fix
content = content.replace("'/uploads/' + req.file.filename", "'/uploads/public/' + req.file.filename")
content = content.replace("'/uploads/' + req.files.img[0].filename", "'/uploads/public/' + req.files.img[0].filename")
content = content.replace("'/uploads/' + req.files.pdf[0].filename", "'/uploads/public/' + req.files.pdf[0].filename")

# 5. Endpoints protection
admin_middleware = "verifyToken, restrictTo('SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'), "

def protect_route(method, url, code, content):
    pattern = rf"app\.{method}\('{url}', "
    if method == "get" and url in ['/api/courses', '/api/diploma-courses', '/api/competitive-exams', '/api/media', '/api/videos', '/api/publications', '/api/press', '/api/jobs', '/api/projects', '/api/csr-partners', '/api/slot-bookings/booked']:
        return content # public
    if method == "post" and url in ['/api/donations', '/api/admissions', '/api/competitive-exam-admissions', '/api/joinees', '/api/job-applications', '/api/partner-requests', '/api/slot-bookings']:
        return content # public submission
    
    # Protect
    return re.sub(pattern, rf"app.{method}('{url}', {admin_middleware}", content)

routes = re.findall(r"app\.(get|post|put|delete)\('(/api/[^']+)',", content)
# deduplicate routes to avoid multiple replacements if multiple matches
unique_routes = list(set(routes))
for method, url in unique_routes:
    content = protect_route(method, url, admin_middleware, content)

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Patching complete.")

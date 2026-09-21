require('dotenv').config({ override: true });
const express = require('express');
const { validateEnv } = require('./config/env');
validateEnv();

const { verifyToken, restrictTo } = require('./middleware/auth');
const { verifyCaptcha } = require('./middleware/validation');
const mongoose = require('mongoose');
const { expressCors, getAllowedOrigins } = require('./config/cors');
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
        origin: getAllowedOrigins(),
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

// Socket.io JWT Authentication Middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (!token) return next(new Error('Authentication error'));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        next(new Error('Authentication error'));
    }
});

let onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.user.loginId} (ID: ${socket.user.id})`);
    
    // Join targeted room and workspace chat
    socket.join(socket.user.id);
    if (!socket.user.isSystemAccount) {
        socket.join('workspace_chat');
    }

    // Track online presence
    onlineUsers.set(socket.user.id, {
        id: socket.user.id,
        name: socket.user.name || socket.user.loginId,
        loginId: socket.user.loginId,
        lastSeen: new Date()
    });
    io.emit('workspace:presence', Array.from(onlineUsers.values()));

    socket.on('TYPING_START', () => {
        socket.to('workspace_chat').emit('workspace:typing', {
            id: socket.user.id,
            name: socket.user.name || socket.user.loginId
        });
    });

    socket.on('TYPING_END', () => {
        socket.to('workspace_chat').emit('workspace:stopped_typing', {
            id: socket.user.id
        });
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.user.loginId}`);
        onlineUsers.delete(socket.user.id);
        io.emit('workspace:presence', Array.from(onlineUsers.values()));
    });
});

// Expose io to routes
app.set('io', io);

// Middleware

app.use(expressCors);

app.use(express.json());


const workspaceRoutes = require('./routes/workspaceRoutes');
app.use('/api', workspaceRoutes);

// Dedicated download route to enforce file saving (bypasses browser viewing)


// Multer Storage Configuration

const { upload, privateUpload } = require('./middleware/upload');

// --- UPLOADS ROUTING ---


// Authenticated route for private uploads



const { validateObjectId, verifyCaptcha } = require('./middleware/validation');
// ID Validation Middleware
app.param('id', validateObjectId);


const connectDB = require('./config/database');
// Database connection
connectDB();

// --- CAPTCHA Middleware ---


// --- ROUTES ---

// Get all donations


// Create a new donation


// Get all admissions


// Create a new admission


// Update admission status


// Delete admission


// --- COMPETITIVE EXAM ADMISSIONS ---








// --- JOINEE ROUTES ---

// Get all joinees


// Create a new joinee


// Update joinee status


// Delete joinee


// Delete donation


// --- COURSES API ---








// --- DIPLOMA COURSES API ---








// --- COMPETITIVE EXAMS API ---








// --- MEDIA API ---








// --- VIDEOS API ---








// --- PUBLICATIONS API ---








// --- PRESS COVERAGE API ---








// --- JOB POSTINGS API ---








// --- JOB APPLICATIONS API ---
















// --- PARTNER REQUESTS API ---








// --- DMF MEMBERS API ---
app.get('/api/dmf-members', async (req, res) => {
    try {
        const DmfMember = require('./models/DmfMember');
        const members = await DmfMember.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/dmf-members', upload.single('screenshotUrl'), verifyCaptcha, async (req, res) => {
    try {
        const DmfMember = require('./models/DmfMember');
        const data = { ...req.body };
        if (req.file) data.screenshotUrl = '/uploads/' + req.file.filename;
        const newMember = new DmfMember(data);
        res.status(201).json(await newMember.save());
    } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put('/api/dmf-members/:id/status', async (req, res) => {
    try {
        const DmfMember = require('./models/DmfMember');
        const { status } = req.body;
        if (!['Pending', 'Under Review', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const updated = await DmfMember.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' });
        if (!updated) return res.status(404).json({ error: 'DMF Member not found' });
        res.json(updated);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/dmf-members/:id', async (req, res) => {
    try {
        const DmfMember = require('./models/DmfMember');
        await DmfMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'DMF Member deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- SLOT BOOKINGS API ---










// --- PROJECTS API ---








// --- CSR PARTNERS API ---






// --- PARTNER REQUESTS API ---









// --- SLOT BOOKINGS API ---










// --- PROJECTS API ---








// --- CSR PARTNERS API ---








app.use('/', require('./routes'));

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

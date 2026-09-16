const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Replace env checks
const oldEnvRegex = /require\('dotenv'\)\.config\(\);\s*const express = require\('express'\);\s*if \(!process\.env\.JWT_SECRET\) \{[\s\S]*?process\.exit\(1\);\s*\}/m;
const newEnv = `const express = require('express');
const { validateEnv } = require('./config/env');
validateEnv();`;
content = content.replace(oldEnvRegex, newEnv);

// 2. Replace cors
const oldCorsRequire = /const cors = require\('cors'\);/m;
const newCorsRequire = `const { expressCors, getAllowedOrigins } = require('./config/cors');`;
content = content.replace(oldCorsRequire, newCorsRequire);

const oldCorsConfigRegex = /const allowedOrigins = process\.env\.ALLOWED_ORIGINS \? process\.env\.ALLOWED_ORIGINS\.split\(\',\'\) : \[\'http:\/\/localhost:5173\'\];\s*app\.use\(cors\(\{[\s\S]*?\}\)\);/m;
const newCorsConfig = `app.use(expressCors);`;
content = content.replace(oldCorsConfigRegex, newCorsConfig);

// Update socket.io cors to use getAllowedOrigins()
const oldSocketCorsRegex = /origin: process\.env\.ALLOWED_ORIGINS \? process\.env\.ALLOWED_ORIGINS\.split\(\',\'\) : "http:\/\/localhost:5173",/m;
content = content.replace(oldSocketCorsRegex, `origin: getAllowedOrigins(),`);

// 3. Replace database connection
const oldDbRegex = /\/\/ Database connection\s*mongoose\.connect\(process\.env\.MONGO_URI\)\s*\.then\(\(\) => console\.log\('MongoDB connection successful'\)\)\s*\.catch\(\(err\) => console\.error\('MongoDB connection error:', err\)\);/m;
const newDb = `const connectDB = require('./config/database');\n// Database connection\nconnectDB();`;
content = content.replace(oldDbRegex, newDb);

// We can remove const mongoose = require('mongoose'); from server.js if it's no longer used, 
// BUT it IS used for ObjectId validation: app.param('id', (req, res, next, id) => { if (!mongoose.Types.ObjectId.isValid(id)) ...
// So we keep it.

fs.writeFileSync(serverPath, content, 'utf8');
console.log('Phase 1 patch applied.');

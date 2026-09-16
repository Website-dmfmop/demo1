const fs = require('fs');
const content = fs.readFileSync('server.js', 'utf8');

const routes = [];
const regex = /app\.(get|post|put|delete|patch|use)\(['"`](\/api\/[a-zA-Z0-9\-_/]+|\/download\/[a-zA-Z0-9\-_/:]+|\/uploads)['"`]/g;

let match;
while ((match = regex.exec(content)) !== null) {
    const startIndex = match.index;
    const method = match[1];
    const path = match[2];
    
    // Find the ending '});' or similar for this route
    // All routes in server.js follow the pattern of ending with '});' on a new line or at the end.
    // Let's use brace counting.
    let braceCount = 0;
    let foundFirstBrace = false;
    let inString = false;
    let stringChar = '';
    
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length; i++) {
        const char = content[i];
        
        if ((char === "'" || char === '"' || char === '\`') && content[i-1] !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (stringChar === char) {
                inString = false;
            }
        }
        
        if (!inString) {
            if (char === '{') {
                braceCount++;
                foundFirstBrace = true;
            } else if (char === '}') {
                braceCount--;
            }
        }
        
        if (foundFirstBrace && braceCount === 0) {
            let j = i + 1;
            // For app.use('/uploads', ... express.static(...)), it ends with ');'
            // We just read until we see ');'
            while (j < content.length) {
                if (content[j-1] === ')' && content[j] === ';') {
                    endIndex = j + 1;
                    break;
                }
                if (content[j-1] === ')' && content[j] === '\n') {
                    // Ends with just )
                    endIndex = j;
                    break;
                }
                j++;
            }
            break;
        }
    }
    
    let code = content.substring(startIndex, endIndex);
    routes.push({ method, path, code, startIndex, endIndex });
}

console.log(`Found ${routes.length} routes.`);

// Grouping
const groups = {
    'admissionRoutes.js': ['/api/admissions', '/api/competitive-exam-admissions', '/api/joinees'],
    'courseRoutes.js': ['/api/courses', '/api/diploma-courses', '/api/competitive-exams', '/api/live-sessions'],
    'donationRoutes.js': ['/api/donations'],
    'jobRoutes.js': ['/api/jobs', '/api/job-applications'],
    'mediaRoutes.js': ['/api/media', '/api/videos', '/api/publications', '/api/press'],
    'partnerRoutes.js': ['/api/partner-requests'],
    'bookingRoutes.js': ['/api/slot-bookings', '/api/slot-bookings/booked'],
    'csrRoutes.js': ['/api/projects', '/api/csr-partners'],
    'fileRoutes.js': ['/api/private-uploads', '/uploads', '/api/download']
};

const routeFiles = {};

routes.forEach(r => {
    let assigned = false;
    for (const [file, prefixes] of Object.entries(groups)) {
        if (prefixes.some(p => r.path.startsWith(p))) {
            if (!routeFiles[file]) routeFiles[file] = [];
            
            // Replace app.get with router.get
            let patchedCode = r.code.replace(/^app\.(get|post|put|delete|patch|use)/, 'router.$1');
            routeFiles[file].push(patchedCode);
            assigned = true;
            break;
        }
    }
    if (!assigned) console.log('Unassigned route:', r.path);
});

// Generate files
for (const [file, codes] of Object.entries(routeFiles)) {
    const requires = new Set();
    codes.forEach(c => {
        // Extract local requires like `const Donation = require('./models/Donation');`
        // We will move them to top and adjust paths since they are in /routes now
        const reqRegex = /const\s+([a-zA-Z0-9_]+)\s*=\s*require\('\.\/models\/([a-zA-Z0-9_]+)'\);/g;
        let match;
        while ((match = reqRegex.exec(c)) !== null) {
            requires.add(`const ${match[1]} = require('../models/${match[2]}');`);
        }
    });

    let header = `const express = require('express');\nconst router = express.Router();\n`;
    header += `const { verifyToken, restrictTo } = require('../middleware/auth');\n`;
    header += `const { upload, privateUpload } = require('../middleware/upload');\n`;
    
    // Add models
    header += Array.from(requires).join('\n') + '\n\n';

    // Remove local requires from code since they are at the top
    let finalCodes = codes.map(c => c.replace(/const\s+[a-zA-Z0-9_]+\s*=\s*require\('\.\/models\/[a-zA-Z0-9_]+'\);\s*/g, ''));

    const fullContent = header + finalCodes.join('\n\n') + '\n\nmodule.exports = router;\n';
    fs.writeFileSync(`routes/${file}`, fullContent, 'utf8');
    console.log(`Generated routes/${file} with ${codes.length} routes.`);
}

// Generate routes/index.js
let indexJs = `const express = require('express');\nconst router = express.Router();\n\n`;
for (const file of Object.keys(groups)) {
    indexJs += `router.use('/', require('./${file}'));\n`;
}
indexJs += `\nmodule.exports = router;\n`;
fs.writeFileSync('routes/index.js', indexJs, 'utf8');
console.log('Generated routes/index.js');

// Remove extracted routes from server.js
let newServerContent = content;
// Sort by startIndex descending to safely remove from back to front
routes.sort((a, b) => b.startIndex - a.startIndex);
routes.forEach(r => {
    newServerContent = newServerContent.substring(0, r.startIndex) + newServerContent.substring(r.endIndex);
});

// Insert app.use('/api', require('./routes')); just before errorHandler
// We can insert it after workspaceRoutes or instead of them.
// Wait, we just replace all the app.VERB with nothing, and then add app.use.
newServerContent = newServerContent.replace(/app\.use\('\/api',\s*workspaceRoutes\);/g, "app.use('/api', workspaceRoutes);\napp.use('/', require('./routes'));");

fs.writeFileSync('server.js', newServerContent, 'utf8');
console.log('Modified server.js');

const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const serverFile = 'server.js';
let code = fs.readFileSync(serverFile, 'utf8');

const ast = acorn.parse(code, { ecmaVersion: 'latest', ranges: true, locations: true });

let captchaCode = '';
let captchaStart = -1, captchaEnd = -1;
let routes = [];

// Parse AST
for (const node of ast.body) {
    if (node.type === 'VariableDeclaration' && node.declarations[0].id.name === 'verifyCaptcha') {
        captchaStart = node.start;
        captchaEnd = node.end;
        captchaCode = code.substring(node.start, node.end);
    }
    
    if (node.type === 'ExpressionStatement' && node.expression.type === 'CallExpression') {
        const callee = node.expression.callee;
        if (callee.type === 'MemberExpression' && callee.object.name === 'app') {
            const method = callee.property.name;
            if (['get', 'post', 'put', 'patch', 'delete', 'use'].includes(method)) {
                const pathArg = node.expression.arguments[0];
                if (pathArg && pathArg.type === 'Literal' && typeof pathArg.value === 'string') {
                    const pathVal = pathArg.value;
                    if (pathVal.startsWith('/api/') || pathVal === '/uploads') {
                        routes.push({
                            method,
                            path: pathVal,
                            start: node.start,
                            end: node.end,
                            codeSnippet: code.substring(node.start, node.end)
                        });
                    }
                }
            }
        }
    }
}

// 1. Append verifyCaptcha to middleware/validation.js and export it
if (captchaCode) {
    let valCode = fs.readFileSync('middleware/validation.js', 'utf8');
    // Remove old module.exports
    valCode = valCode.replace(/module\.exports\s*=\s*\{[^}]+\};?/g, '');
    valCode += `\n\n${captchaCode}\n\nmodule.exports = { validateObjectId, verifyCaptcha };\n`;
    fs.writeFileSync('middleware/validation.js', valCode, 'utf8');
}

// Grouping logic
const groups = {
    'admissionRoutes.js': ['/api/admissions', '/api/competitive-exam-admissions', '/api/joinees'],
    'courseRoutes.js': ['/api/courses', '/api/diploma-courses', '/api/competitive-exams', '/api/live-sessions'],
    'donationRoutes.js': ['/api/donations'],
    'jobRoutes.js': ['/api/jobs', '/api/job-applications'],
    'mediaRoutes.js': ['/api/media', '/api/videos', '/api/publications', '/api/press'],
    'partnerRoutes.js': ['/api/partner-requests'],
    'bookingRoutes.js': ['/api/slot-bookings'],
    'csrRoutes.js': ['/api/projects', '/api/csr-partners'],
    'fileRoutes.js': ['/api/private-uploads', '/uploads', '/api/download']
};

const routeFiles = {};

routes.forEach(r => {
    let assigned = false;
    for (const [file, prefixes] of Object.entries(groups)) {
        if (prefixes.some(p => r.path === p || r.path.startsWith(p + '/'))) {
            if (!routeFiles[file]) routeFiles[file] = [];
            // Change app.METHOD to router.METHOD
            let patchedCode = r.codeSnippet.replace(/^app\.(get|post|put|delete|patch|use)/, 'router.$1');
            routeFiles[file].push(patchedCode);
            assigned = true;
            break;
        }
    }
    if (!assigned) console.log('Unassigned route:', r.path);
});

// Write route files
if (!fs.existsSync('routes')) fs.mkdirSync('routes');

for (const [file, codes] of Object.entries(routeFiles)) {
    const requires = new Set();
    codes.forEach(c => {
        const reqRegex = /const\s+([a-zA-Z0-9_]+)\s*=\s*require\('\.\/models\/([a-zA-Z0-9_]+)'\);/g;
        let match;
        while ((match = reqRegex.exec(c)) !== null) {
            requires.add(`const ${match[1]} = require('../models/${match[2]}');`);
        }
    });

    let header = `const express = require('express');\nconst router = express.Router();\n`;
    
    if (file === 'fileRoutes.js') {
        header += `const path = require('path');\n`;
    }
    
    header += `const { verifyToken, restrictTo } = require('../middleware/auth');\n`;
    header += `const { upload, privateUpload } = require('../middleware/upload');\n`;
    header += `const { verifyCaptcha } = require('../middleware/validation');\n`;
    
    header += Array.from(requires).join('\n') + (requires.size > 0 ? '\n\n' : '\n');

    let finalCodes = codes.map(c => c.replace(/const\s+[a-zA-Z0-9_]+\s*=\s*require\('\.\/models\/[a-zA-Z0-9_]+'\);\s*/g, ''));

    const fullContent = header + finalCodes.join('\n\n') + '\n\nmodule.exports = router;\n';
    fs.writeFileSync(`routes/${file}`, fullContent, 'utf8');
}

// Generate routes/index.js
let indexJs = `const express = require('express');\nconst router = express.Router();\n\n`;
for (const file of Object.keys(groups)) {
    if (fs.existsSync(`routes/${file}`)) {
        indexJs += `router.use('/', require('./${file}'));\n`;
    }
}
indexJs += `\nmodule.exports = router;\n`;
fs.writeFileSync('routes/index.js', indexJs, 'utf8');

// Modify server.js - remove all extracted nodes
// We sort descending so replacements don't shift indices of earlier replacements
const toRemove = [...routes];
if (captchaStart !== -1) toRemove.push({ start: captchaStart, end: captchaEnd });
toRemove.sort((a, b) => b.start - a.start);

let newServerCode = code;
toRemove.forEach(r => {
    newServerCode = newServerCode.substring(0, r.start) + newServerCode.substring(r.end);
});

// Insert app.use('/', require('./routes')); before the errorHandler
const errHandlerRegex = /const errorHandler = require\('\.\/middleware\/errorHandler'\);/;
newServerCode = newServerCode.replace(errHandlerRegex, `app.use('/', require('./routes'));\n\nconst errorHandler = require('./middleware/errorHandler');`);

fs.writeFileSync('server.js', newServerCode, 'utf8');
console.log('Migration complete.');

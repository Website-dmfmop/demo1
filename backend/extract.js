const fs = require('fs');

const content = fs.readFileSync('server.js', 'utf-8');

// Find all require('./models/...')
const models = new Set([...content.matchAll(/const (\w+) = require\('\.\/models\/([^\']+)'\);/g)].map(m => m[1]));
console.log('Models used in server.js:', [...models]);

// Find all routes
const routes = [...content.matchAll(/app\.(get|post|put|delete)\('(\/api\/[^\']+)'/g)].map(m => ({ method: m[1].toUpperCase(), path: m[2] }));
console.log(`\nTotal endpoints in server.js: ${routes.length}`);
routes.forEach(r => console.log(`${r.method} ${r.path}`));

// Analyze some specific features (Uploads, Email, External API)
console.log("\nRoutes with file uploads:");
const uploadRoutes = [...content.matchAll(/app\.(post|put|patch)\('(\/api\/[^\']+)', [^\)]*upload\.single/g)].map(m => `${m[1].toUpperCase()} ${m[2]}`);
const privateUploadRoutes = [...content.matchAll(/app\.(post|put|patch)\('(\/api\/[^\']+)', [^\)]*privateUpload\.single/g)].map(m => `${m[1].toUpperCase()} ${m[2]}`);
const arrayUploadRoutes = [...content.matchAll(/app\.(post|put|patch)\('(\/api\/[^\']+)', [^\)]*upload\.fields/g)].map(m => `${m[1].toUpperCase()} ${m[2]}`);

console.log('Public Upload:', uploadRoutes);
console.log('Private Upload:', privateUploadRoutes);
console.log('Array Upload:', arrayUploadRoutes);

console.log("\nExternal API (axios):");
console.log(content.includes('axios') ? 'Yes' : 'No');

console.log("\nEmail logic (nodemailer):");
console.log(content.includes('nodemailer') ? 'Yes' : 'No');

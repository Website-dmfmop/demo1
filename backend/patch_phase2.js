const fs = require('fs');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(serverPath, 'utf8');

// 1. Replace Multer Storage Configuration
// Find lines 121 to 155 (rough) in the string, or use regex
const multerRegex = /const uploadDirPublic[\s\S]*?const privateUpload = multer\(\{ storage: privateStorage \}\);/m;
content = content.replace(multerRegex, `const { upload, privateUpload } = require('./middleware/upload');`);

// 2. Replace ID Validation Middleware
const idValRegex = /\/\/ ID Validation Middleware\s*app\.param\('id', \(req, res, next, id\) => \{[\s\S]*?next\(\);\s*\}\);/m;
content = content.replace(idValRegex, `const { validateObjectId } = require('./middleware/validation');\n// ID Validation Middleware\napp.param('id', validateObjectId);`);

// 3. Add Error Handler
// Error handler needs to be before server.listen, but after all routes.
const errorHandlerCode = `\nconst errorHandler = require('./middleware/errorHandler');\napp.use(errorHandler);\n\nserver.listen`;
content = content.replace(/\nserver\.listen/g, errorHandlerCode);

fs.writeFileSync(serverPath, content, 'utf8');
console.log('Phase 2 patch applied.');

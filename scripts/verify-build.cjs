const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory does not exist: ' + buildDir);
    process.exit(1);
}

const disallowed = ['http://localhost:5000', '127.0.0.1:5000'];
let violations = [];

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            for (const bad of disallowed) {
                if (content.includes(bad)) {
                    violations.push({ file: path.relative(buildDir, fullPath), bad });
                }
            }
        }
    }
}

scanDir(buildDir);

if (violations.length > 0) {
    console.error('\n❌ FATAL: Production build contains prohibited localhost backend references:');
    violations.forEach(v => {
        console.error(`  - In ${v.file}: "${v.bad}"`);
    });
    console.error('\nThis will break API calls on the production website. Build failed.\n');
    process.exit(1);
} else {
    console.log('✓ Build verification passed: No localhost:5000 references detected in production bundle.');
}

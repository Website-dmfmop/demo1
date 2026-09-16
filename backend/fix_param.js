const fs = require('fs');

const files = fs.readdirSync('routes').filter(f => f !== 'index.js');
files.forEach(f => {
    let c = fs.readFileSync('routes/' + f, 'utf8');
    if (!c.includes('validateObjectId')) {
        let toAdd = `const { validateObjectId } = require('../middleware/validation');\nrouter.param('id', validateObjectId);\n`;
        const insertIdx = c.indexOf('\nrouter.get') !== -1 ? c.indexOf('\nrouter.get') : (c.indexOf('\nrouter.post') !== -1 ? c.indexOf('\nrouter.post') : c.indexOf('\nrouter.'));
        c = c.slice(0, insertIdx) + '\n' + toAdd + c.slice(insertIdx);
        fs.writeFileSync('routes/' + f, c);
        console.log('Added router.param to', f);
    }
});

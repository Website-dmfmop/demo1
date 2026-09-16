const fs = require('fs');
const files = fs.readdirSync('routes').filter(f => f !== 'index.js');
const models = ['Donation', 'Admission', 'Joinee', 'CompetitiveExamAdmission', 'Course', 'DiplomaCourse', 'CompetitiveExam', 'MediaItem', 'VideoHighlight', 'Publication', 'PressCoverage', 'JobPosting', 'JobApplication', 'LiveSession', 'PartnerRequest', 'SlotBooking', 'Project', 'CSRPartner'];

files.forEach(f => {
    let c = fs.readFileSync('routes/' + f, 'utf8');
    let toAdd = '';
    models.forEach(m => {
        if (c.includes(m) && !c.includes(`const ${m} = require`)) {
            toAdd += `const ${m} = require('../models/${m}');\n`;
        }
    });
    if (toAdd) {
        const insertIdx = c.indexOf('\nrouter.get') !== -1 ? c.indexOf('\nrouter.get') : (c.indexOf('\nrouter.post') !== -1 ? c.indexOf('\nrouter.post') : c.indexOf('\nrouter.'));
        c = c.slice(0, insertIdx) + '\n' + toAdd + c.slice(insertIdx);
        fs.writeFileSync('routes/' + f, c);
        console.log('Prepended to', f);
    }
    
    // Also fix any leftover require('./models/...)
    c = fs.readFileSync('routes/' + f, 'utf8');
    if (c.includes("require('./models/")) {
        c = c.replace(/require\('\.\/models\//g, "require('../models/");
        fs.writeFileSync('routes/' + f, c);
        console.log('Fixed relative imports in', f);
    }
});

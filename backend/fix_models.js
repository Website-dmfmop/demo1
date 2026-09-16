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
        c = c.replace(/(const \{.*?upload.*?};\n)/, '$1' + toAdd);
        fs.writeFileSync('routes/' + f, c);
        console.log('Fixed', f);
    }
});

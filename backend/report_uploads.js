require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dmfmop';

async function checkSensitiveFiles() {
    await mongoose.connect(MONGO_URI);
    
    // Dynamically load models
    const PartnerRequest = require('./models/PartnerRequest');
    const Project = require('./models/Project');
    const CSRPartner = require('./models/CSRPartner');
    
    let totalCount = 0;
    const report = [];

    // Check PartnerRequests
    const partners = await PartnerRequest.find({ pdfFile: { $exists: true, $ne: null, $ne: '' } });
    partners.forEach(p => {
        // filter out new /api/private-uploads/ paths if any
        if (p.pdfFile.startsWith('/uploads/')) {
            totalCount++;
            report.push(`[PartnerRequest] ID: ${p._id}, Path: ${p.pdfFile}`);
        }
    });

    // Check Projects
    const projects = await Project.find({ pitchDeck: { $exists: true, $ne: null, $ne: '' } });
    projects.forEach(p => {
        if (p.pitchDeck.startsWith('/uploads/')) {
            totalCount++;
            report.push(`[Project] ID: ${p._id}, Path: ${p.pitchDeck}`);
        }
    });

    // Check CSRPartners
    const csrPartners = await CSRPartner.find({ supportingDocument: { $exists: true, $ne: null, $ne: '' } });
    csrPartners.forEach(p => {
        if (p.supportingDocument.startsWith('/uploads/')) {
            totalCount++;
            report.push(`[CSRPartner] ID: ${p._id}, Path: ${p.supportingDocument}`);
        }
    });

    console.log(`\n=== SENSITIVE UPLOADS MIGRATION REPORT ===`);
    console.log(`Total potentially sensitive existing files in /uploads/: ${totalCount}`);
    if (totalCount > 0) {
        console.log(`\nDatabase records referencing them:`);
        report.forEach(r => console.log(r));
    }
    console.log(`==========================================\n`);
    
    mongoose.connection.close();
}

checkSensitiveFiles().catch(err => {
    console.error(err);
    process.exit(1);
});

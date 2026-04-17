const mongoose = require('mongoose');
const VideoHighlight = require('./models/VideoHighlight');
const Publication = require('./models/Publication');
const PressCoverage = require('./models/PressCoverage');
require('dotenv').config();

const VIDEOS = [
    { title: 'Shreemati Sushma Swaraj Praises Dr. Dnyaneshwar Mulay', desc: "Sushma Swaraj at Pravasi Bharatiya Divas: It's the migration of educated that has brought laurels to India.", thumb: '/Images/Screenshot 2026-04-14 120204.png', duration: '4:32', link: 'https://www.youtube.com/watch?v=Tn4QTjjBbO4' },
    { title: 'Ticket to Millennials’ Dreams and freedom.', desc: 'Dr. Mulay telling us if showing a little empathy and compassion in any bureaucratic process is a ticket to a peaceful change.', thumb: '/Images/Screenshot 2026-04-14 121236.png', duration: '17:49', link: 'https://www.youtube.com/watch?v=xwQfPksVOx4' },
    { title: 'Society For Positive Initiatives - Dr. Dnyaneshwar Mulay (Ex. I.F.S)', desc: 'Dr. Dnyaneshwar Mulay (Ex. I.F.S), remains the predominant source of inspiration.', thumb: '/Images/Screenshot 2026-04-14 121508.png', duration: '5:48', link: '#' }
];

const PRESS = [
    { outlet: 'The Hindu', headline: 'DMF & KCB launch International Centre of Excellence to empower youth in Pune', date: 'Sep 2025', tag: 'ICOE', color: 'border-primary', url: 'https://www.skillreporter.com/regional/maharashtra/dnyaneshwar-mulay-foundation-khadki-cantonment-board-centre-of-excellence-skill-development-pune/' },
    { outlet: 'Pune Mirror', headline: 'She Leads programme sees 25 women form producer groups for sustainable enterprise', date: 'Nov 2025', tag: 'Women', color: 'border-secondary-container', url: 'https://www.skillreporter.com/regional/maharashtra/dnyaneshwar-mulay-foundation-khadki-cantonment-board-centre-of-excellence-skill-development-pune/' }
];

const PUBLICATIONS = [
    { title: '', pdf: '/Publications/publication_1.pdf', img: '/Publications/publication_1.png', soon: false },
    { title: '', pdf: '/Publications/publication_2.pdf', img: '/Publications/publication_2.png', soon: false },
    { title: '', pdf: '/Publications/publication_3.pdf', img: '/Publications/publication_3.png', soon: false },
    { title: '', pdf: '#', img: '/Publications/publication_4.png', soon: true },
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected to DB for Videos, Pubs, Press Seeding');
    
    await VideoHighlight.deleteMany({});
    await VideoHighlight.insertMany(VIDEOS);
    
    await Publication.deleteMany({});
    await Publication.insertMany(PUBLICATIONS);
    
    await PressCoverage.deleteMany({});
    await PressCoverage.insertMany(PRESS);

    console.log('All New Media Items Seeded!');
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

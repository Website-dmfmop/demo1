const mongoose = require('mongoose');
const MediaItem = require('./models/MediaItem');
require('dotenv').config();

const MEDIA_ITEMS = [
    { category: 'Events', src: '/Images/WhatsApp Image 2026-04-09 at 15.25.51.jpeg', title: 'ICOE Inauguration — Khadki, Pune', date: 'September 2025' },
    { category: 'Programmes', src: '/Images/about_page_2.png', title: 'Medical Students Placed in Germany', date: 'October 2025' },
    { category: 'Events', src: '/Images/social_work_1.png', title: 'Dr. Mulay Addresses Youth Leaders', date: 'November 2025' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg', title: 'She Leads — Women Enterprise Workshop', date: 'November 2025' },
    { category: 'Programmes', src: '/Images/about_page_5.png', title: 'Study Two For CSR Program', date: 'December 2025' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-10 at 10.32.18.jpeg', title: 'Digital Classrooms & Innovation Labs', date: 'January 2026' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-10 at 10.32.25.jpeg', title: 'Industry Academic Program', date: 'February 2026' },
    { category: 'Programmes', src: '/Images/4.png', title: 'Smart Education Initiative Launch', date: 'March 2026' },
    { category: 'Community', src: '/Images/5.png', title: 'Healthcare Outreach — Khadki Cantonment', date: 'March 2026' },
    { category: 'Events', src: '/Images/Seltter_home.jpeg', title: 'Shelter Home', date: 'January 2026' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-06 at 12.20.18.jpeg', title: 'German Language Batch A2 Completion Ceremony', date: 'February 2026' },
    { category: 'Visitors', src: '/Images/WhatsApp Image 2026-04-13 at 18.58.25.jpeg', title: 'Hon. Lov Varma IAS and Mrs Sangeeta Varma IES visit DMF', date: 'April 2026' },
    { category: 'Community', src: '/Images/Job_fair.jpeg', title: 'Job Fair', date: 'April 2026' },
    { category: 'MoU', src: '/Images/MoU_DY_Patil_Kolhapur.jpeg', title: 'MOU with DY Patil University, Kolhapur', date: 'April 2026' },
    { category: 'MoU', src: '/Images/MoU_COEP.jpeg', title: 'MOU with COEP University, Pune', date: 'April 2026' },
    { category: 'Visitors', src: '/Images/HDFC_Bank_CSR_Team.jpeg', title: 'HDFC Bank CSR Team Visit', date: 'March 2026' },
    { category: 'Community', src: '/Images/International_Skill.jpeg', title: 'International Skill', date: 'Jan 2026' },
    { category: 'Community', src: '/Images/community_mobilization.jpeg', title: 'Community Mobilization', date: 'Feb 2026' },
];

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected to DB');
    await MediaItem.deleteMany({});
    await MediaItem.insertMany(MEDIA_ITEMS);
    console.log('Media Items Seeded!');
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Data ────────────────────────────────────────────────────────────── */

const MEDIA_ITEMS = [
    { category: 'Events', src: '/Images/WhatsApp Image 2026-04-09 at 15.25.51.jpeg', title: 'ICOE Inauguration — Khadki, Pune', date: 'September 2025' },
    { category: 'Community', src: '/Images/about_page_2.png', title: 'Community Mobilization Drive', date: 'October 2025' },
    { category: 'Events', src: '/Images/social_work_1.png', title: 'Dr. Mulay Addresses Youth Leaders', date: 'November 2025' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg', title: 'She Leads — Women Enterprise Workshop', date: 'November 2025' },
    { category: 'Community', src: '/Images/about_page_5.png', title: 'SkillReach Language Training Batch', date: 'December 2025' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-10 at 10.32.18.jpeg', title: 'Digital Classrooms & Innovation Labs', date: 'January 2026' },
    { category: 'Events', src: '/Images/WhatsApp Image 2026-04-10 at 10.32.25.jpeg', title: 'International Business Expo — Pune', date: 'February 2026' },
    { category: 'Programmes', src: '/Images/4.png', title: 'Smart Education Initiative Launch', date: 'March 2026' },
    { category: 'Community', src: '/Images/5.png', title: 'Healthcare Outreach — Khadki Cantonment', date: 'March 2026' },
    { category: 'Events', src: '/Images/WhatsApp Image 2026-04-13 at 18.56.02.jpeg', title: 'Shelter Home', date: 'January 2026' },
    { category: 'Programmes', src: '/Images/WhatsApp Image 2026-04-06 at 12.20.18.jpeg', title: 'German Language Batch A2 Completion Ceremony', date: 'February 2026' },
    { category: 'Community', src: '/Images/WhatsApp Image 2026-04-13 at 18.58.25.jpeg', title: 'Hon. Lov Varma IAS and Mrs Sangeeta Varma IES visit DMF', date: 'April 2026' },
];

const PRESS = [
    { outlet: 'The Hindu', headline: 'DMF & KCB launch International Centre of Excellence to empower youth in Pune', date: 'Sep 2025', tag: 'ICOE', color: 'border-primary', url: 'https://www.skillreporter.com/regional/maharashtra/dnyaneshwar-mulay-foundation-khadki-cantonment-board-centre-of-excellence-skill-development-pune/' },
    { outlet: 'Pune Mirror', headline: 'She Leads programme sees 25 women form producer groups for sustainable enterprise', date: 'Nov 2025', tag: 'Women', color: 'border-secondary-container', url: 'https://www.skillreporter.com/regional/maharashtra/dnyaneshwar-mulay-foundation-khadki-cantonment-board-centre-of-excellence-skill-development-pune/' },

];

const PUBLICATIONS = [
    { title: '', pdf: '/Publications/publication_1.pdf', img: '/Publications/publication_1.png', soon: false },
    { title: '', pdf: '/Publications/publication_2.pdf', img: '/Publications/publication_2.png', soon: false },
    { title: '', pdf: '#', img: '/Publications/publication_3.png', soon: true },
];

const TESTIMONIALS = [
    {
        name: 'Priya Sharma',
        role: 'German Language Graduate, ICOE',
        quote: 'The German A1 to B1 programme at ICOE completely transformed my career prospects. Within three months of completing the course, I received a placement offer from a healthcare facility in Germany.',
        icon: 'school',
        color: 'bg-primary',
    },
    {
        name: 'Rekha Jadhav',
        role: 'She Leads — Women Entrepreneur',
        quote: 'Through the She Leads programme, I started my own sweet-making enterprise with four other women from my neighbourhood. Today our producer group earns over ₹40,000 a month collectively.',
        icon: 'storefront',
        color: 'bg-[#2e7d32]',
    },
    {
        name: 'Amit Kulkarni',
        role: 'Digital Marketing Batch, ICOE',
        quote: 'I had no idea about digital tools before joining ICOE. The Advanced Excel and Digital Marketing course gave me skills that helped me land a government data-analyst internship.',
        icon: 'devices',
        color: 'bg-secondary-container',
    },
    {
        name: 'Lt. Col. (Retd.) R. Nair',
        role: 'Parent of ICOE student',
        quote: 'As a defence family, we were worried about career prospects for our daughter after relocation. ICOE provided exactly the right environment — professional, disciplined, and genuinely caring about outcomes.',
        icon: 'military_tech',
        color: 'bg-primary',
    },
];

const MILESTONES = [
    { icon: 'groups', num: '10,000+', label: 'ICOE Beneficiaries' },
    { icon: 'language', num: '6', label: 'Languages Taught' },
    { icon: 'flight_takeoff', num: '200+', label: 'Global Placements' },
    { icon: 'woman', num: '25', label: 'Women Entrepreneurs' },
    { icon: 'school', num: '230+', label: 'Youth Enrolled' },
    { icon: 'handshake', num: '8+', label: 'Partner Institutions' },
];

const VIDEOS = [
    {
        title: 'Shreemati Sushma Swaraj Praises Dr. Dnyaneshwar Mulay',
        desc: "Sushma Swaraj at Pravasi Bharatiya Divas: It's the migration of educated that has brought laurels to India.",
        thumb: '/Images/Screenshot 2026-04-14 120204.png',
        duration: '4:32',

        link: 'https://www.youtube.com/watch?v=Tn4QTjjBbO4',
    },
    {
        title: 'Ticket to Millennials’ Dreams and freedom.',
        desc: 'Dr. Mulay telling us if showing a little empathy and compassion in any bureaucratic process is a ticket to a peaceful change.',
        thumb: '/Images/Screenshot 2026-04-14 121236.png',
        duration: '17:49',

        link: 'https://www.youtube.com/watch?v=xwQfPksVOx4',
    },
    {
        title: 'Society For Positive Initiatives - Dr. Dnyaneshwar Mulay (Ex. I.F.S)',
        desc: 'Dr. Dnyaneshwar Mulay (Ex. I.F.S), Former Secretary of the Ministry of External Affairs, Government of India, remains the predominant source of inspiration for meaningful and impactful community development at DMF.',
        thumb: '/Images/Screenshot 2026-04-14 121508.png',
        duration: '5:48',

        link: '#',
    },
];

const SOCIAL = [
    { platform: 'Facebook', handle: '@dmfmop', icon: 'thumb_up', color: 'bg-[#1877F2]' },
    { platform: 'Instagram', handle: '@dmfmop', icon: 'photo_camera', color: 'bg-[#E1306C]' },
    { platform: 'Twitter/X', handle: '@dmfmop', icon: 'rss_feed', color: 'bg-[#1DA1F2]' },
    { platform: 'YouTube', handle: 'DMF Foundation', icon: 'play_circle', color: 'bg-[#FF0000]' },
    { platform: 'LinkedIn', handle: 'DMF India', icon: 'work', color: 'bg-[#0A66C2]' },
];

const TABS = ['All', 'Events', 'Community', 'Programmes'];

/* ─── Component ──────────────────────────────────────────────────────── */

export default function Media() {
    const [activeTab, setActiveTab] = useState('All');
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const filtered = activeTab === 'All'
        ? MEDIA_ITEMS
        : MEDIA_ITEMS.filter(m => m.category === activeTab);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <div>
            <main>
                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="relative px-8 pt-32 pb-20 overflow-hidden bg-surface">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-7 z-10">
                            <span className="font-label text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                                Press, Photos &amp; Stories
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
                                Media &amp; <span className="text-secondary-container">Gallery</span>
                            </h1>
                            <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-6">
                                Explore photos, press coverage, video highlights, and stories from Dr. Dnyaneshwar Mulay Foundation's programs, events, and community initiatives across India.
                            </p>
                            <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed mb-8">
                                From the ICOE inauguration to flood relief operations, from She Leads workshops to international job placement ceremonies — our media archive tells the story of real change through real people.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['10,000+ Beneficiaries', 'Est. 2019', '80G & 12A Certified', 'Pune, Maharashtra'].map((t, i) => (
                                    <span key={i} className="bg-surface-container-low text-primary text-xs font-bold px-4 py-2 rounded-full border border-outline-variant/30 uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-5 relative">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                                <img alt="DMF Media" className="w-full h-full object-cover" src="/Images/WhatsApp Image 2026-04-11 at 13.44.46.jpeg" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
                                <p className="text-secondary font-bold text-3xl font-headline">50+</p>
                                <p className="text-on-surface-variant font-label text-sm uppercase tracking-wider">Media Moments Captured</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Milestone Strip ──────────────────────────────────── */}
                <section className="bg-primary py-10 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
                            {MILESTONES.map((m, i) => (
                                <div key={i}>
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-2 block">{m.icon}</span>
                                    <div className="font-headline text-3xl font-black text-white mb-0.5">{m.num}</div>
                                    <div className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Filter Tabs ─────────────────────────────────────── */}
                <section className="bg-surface-container sticky top-[72px] z-40">
                    <div className="max-w-7xl mx-auto px-8 py-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-3">
                            {TABS.map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-full font-label text-sm font-semibold transition-all ${activeTab === tab
                                        ? 'bg-primary text-white'
                                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
                            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </section>

                {/* ── Photo Gallery ────────────────────────────────────── */}
                <section className="px-8 py-20 bg-surface">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Visual Stories</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Photo Gallery</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Every photograph is a window into the lives we've touched, the programs we've built, and the communities we serve across India.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((item, i) => (
                                <div key={i} className="group flex flex-col">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-md">
                                        <img
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={item.src}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">
                                                {item.category}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white font-headline font-bold text-sm">{item.title}</p>
                                        </div>
                                    </div>
                                    <h3 className="font-headline text-base font-bold text-primary mb-1 leading-snug group-hover:text-secondary-container transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Video Highlights ─────────────────────────────────── */}
                <section className="py-20 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Watch & Learn</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Video Highlights</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Watch stories of transformation, programme launches, and community voices from our work on the ground.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {VIDEOS.map((v, i) => (
                                <a key={i} href={v.link || '#'} target={v.link && v.link !== '#' ? "_blank" : undefined} rel={v.link && v.link !== '#' ? "noopener noreferrer" : undefined} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:-translate-y-2 transition-all duration-300 block">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={v.thumb} />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center group-hover:bg-white/40 transition-all duration-300 cursor-pointer">
                                                <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded">
                                            {v.duration}
                                        </div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-primary text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">{v.tag}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-headline font-bold text-primary text-base mb-2 leading-snug group-hover:text-secondary-container transition-colors">{v.title}</h4>
                                        <p className="text-on-surface-variant text-sm leading-relaxed">{v.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Press Coverage ───────────────────────────────────── */}
                <section className="py-20 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">In The News</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Press Coverage</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">DMF's work has been recognized and covered by leading national print and digital media publications across India.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PRESS.map((p, i) => (
                                <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className={`block bg-surface-container-low rounded-2xl p-8 border-l-4 ${p.color} shadow-sm hover:-translate-y-1 transition-all duration-300 no-underline`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-primary text-xl">newspaper</span>
                                        </div>
                                        <div>
                                            <div className="font-headline font-black text-primary text-sm">{p.outlet}</div>
                                            <div className="text-on-surface-variant text-xs">{p.date}</div>
                                        </div>
                                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full flex-shrink-0">{p.tag}</span>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed text-sm font-medium italic">"{p.headline}"</p>
                                    <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest hover:text-secondary-container transition-colors">
                                        <span>Read Article</span>
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Foundation Publications ───────────────────────────────────── */}
                <section className="py-20 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Knowledge & Research</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Foundation Publications</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Explore our extensive research, frameworks, and reports detailing our impact and methodologies.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {PUBLICATIONS.map((pub, i) => pub.soon ? (
                                <div key={i} className="group relative rounded-lg overflow-hidden shadow-md cursor-not-allowed border border-[#fe9832] bg-white">
                                    <div className="aspect-[3/4] relative">
                                        <img alt={pub.title} className="w-full h-full object-cover" src={pub.img} />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                                            <span className="text-white font-headline font-bold text-xl tracking-wide uppercase">Coming Soon</span>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center bg-white border-t border-gray-100">
                                        <h4 className="font-headline font-bold text-on-surface-variant text-base">{pub.title}</h4>
                                    </div>
                                </div>
                            ) : (
                                <a key={i} href={pub.pdf} target="_blank" rel="noopener noreferrer" className="group rounded-lg overflow-hidden shadow-md hover:-translate-y-2 transition-all duration-300 border border-outline-variant/20 bg-white block">
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <img alt={pub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={pub.img} />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <span className="material-symbols-outlined">menu_book</span>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center bg-white border-t border-gray-100">
                                        <h4 className="font-headline font-bold text-primary text-base group-hover:text-secondary-container transition-colors">{pub.title}</h4>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ─────────────────────────────────────── */}
                <section className="py-20 bg-primary px-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">Voices of Change</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">What People Say</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-white/70 max-w-2xl mx-auto">The most powerful stories come directly from those whose lives have been changed by our programmes.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                                    <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">format_quote</span>
                                    <p className="text-white/80 leading-relaxed text-base italic mb-6">"{t.quote}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                                            <span className="material-symbols-outlined text-white text-xl">{t.icon}</span>
                                        </div>
                                        <div>
                                            <div className="font-headline font-bold text-white text-sm">{t.name}</div>
                                            <div className="text-white/60 text-xs">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Social Media Connect ─────────────────────────────── */}
                <section className="py-20 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Connect With Us</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Follow Our Journey</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Stay updated with our latest events, programmes, and community stories. Follow us on your favourite platforms.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                            {SOCIAL.map((s, i) => (
                                <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 shadow-sm cursor-pointer group">
                                    <div className={`w-14 h-14 rounded-full ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="material-symbols-outlined text-white text-2xl">{s.icon}</span>
                                    </div>
                                    <div className="font-headline font-bold text-primary text-sm mb-1">{s.platform}</div>
                                    <div className="text-on-surface-variant text-xs mb-2">{s.handle}</div>
                                    <div className="text-secondary-container font-black text-sm">{s.followers}</div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Newsletter Signup ────────────────────────────────── */}
                <section className="py-16 bg-surface-container-low px-8">
                    <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-2xl p-12 shadow-lg border border-outline-variant/10 text-center">
                        <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">mail</span>
                        <h3 className="font-headline text-3xl font-extrabold text-primary mb-3">Stay In The Loop</h3>
                        <p className="text-on-surface-variant mb-8 leading-relaxed">
                            Subscribe to our newsletter and receive updates on programme launches, impact reports, press mentions, and community stories directly in your inbox.
                        </p>
                        {submitted ? (
                            <div className="bg-[#2e7d32]/10 border border-[#2e7d32]/30 rounded-xl p-6">
                                <span className="material-symbols-outlined text-[#2e7d32] text-4xl mb-2 block">check_circle</span>
                                <p className="text-[#2e7d32] font-bold font-headline">Thank you for subscribing!</p>
                                <p className="text-on-surface-variant text-sm mt-1">We'll keep you updated with our latest stories and programmes.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 px-5 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-low text-primary placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary-container text-sm"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary text-white font-headline font-bold rounded-lg hover:bg-primary/90 transition-all uppercase tracking-widest text-sm flex-shrink-0"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                        <p className="text-on-surface-variant text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
                    </div>
                </section>

                {/* ── CTA ─────────────────────────────────────────────── */}
                <section className="py-24 px-8 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-6">Share Our Story</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-10">
                            Help amplify the voice of the communities we serve. Share our work, partner with us, or invite us to speak at your event or institution.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/about" className="px-10 py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-md hover:bg-secondary-fixed-dim transition-all shadow-xl uppercase tracking-widest text-sm">
                                About DMF
                            </Link>
                            <Link to="/icoe" className="px-10 py-4 border border-white/30 text-white font-headline font-bold rounded-md hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                                Explore ICOE
                            </Link>
                            <Link to="/donate" className="px-10 py-4 border border-white/30 text-white font-headline font-bold rounded-md hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                                Support Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MEDIA_ITEMS = [
    { type: 'photo', category: 'Events', src: '/Images/about_page_1.png',   title: 'ICOE Inauguration — Khadki, Pune',           date: 'September 2025' },
    { type: 'photo', category: 'Community', src: '/Images/about_page_2.png', title: 'Community Mobilization Drive',               date: 'October 2025' },
    { type: 'photo', category: 'Events', src: '/Images/about_page_3.png',   title: 'Dr. Mule Addresses Youth Leaders',           date: 'November 2025' },
    { type: 'photo', category: 'Programmes', src: '/Images/about_page_4.png', title: 'She Leads — Women Enterprise Workshop',     date: 'November 2025' },
    { type: 'photo', category: 'Community', src: '/Images/about_page_5.png',  title: 'SkillReach Language Training Batch',        date: 'December 2025' },
    { type: 'photo', category: 'Programmes', src: '/Images/2.png',           title: 'Digital Classrooms & Innovation Labs',       date: 'January 2026' },
    { type: 'photo', category: 'Events', src: '/Images/3.png',              title: 'International Business Expo — Pune',         date: 'February 2026' },
    { type: 'photo', category: 'Programmes', src: '/Images/4.png',          title: 'Smart Education Initiative Launch',          date: 'March 2026' },
    { type: 'photo', category: 'Community', src: '/Images/5.png',           title: 'Healthcare Outreach — Khadki Cantonment',    date: 'March 2026' },
];

const PRESS = [
    { outlet: 'The Hindu', headline: 'DMF & KCB launch International Centre of Excellence to empower youth in Pune', date: 'Sep 2025', tag: 'ICOE', color: 'border-primary' },
    { outlet: 'Pune Mirror', headline: 'She Leads programme sees 25 women form producer groups for sustainable enterprise', date: 'Nov 2025', tag: 'Women', color: 'border-secondary-container' },
    { outlet: 'Maharashtra Times', headline: 'ICOE reaches 10,000 beneficiaries in six months — Dr. Dnyaneshwar Mule Foundation', date: 'Mar 2026', tag: 'Impact', color: 'border-[#2e7d32]' },
    { outlet: 'Sakal', headline: 'International job placement pipeline for 200+ youth in Germany launched by DMF', date: 'Dec 2025', tag: 'Global', color: 'border-primary' },
];

const TABS = ['All', 'Events', 'Community', 'Programmes'];

export default function Media() {
    const [activeTab, setActiveTab] = useState('All');

    const filtered = activeTab === 'All'
        ? MEDIA_ITEMS
        : MEDIA_ITEMS.filter(m => m.category === activeTab);

    return (
        <div>
            <main>
                {/* ── Hero ──────────────────────────────────────────── */}
                <section className="relative px-8 pt-32 pb-20 overflow-hidden bg-surface">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-7 z-10">
                            <span className="font-label text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                                Press, Photos &amp; Stories
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
                                Media &amp; <span className="text-secondary-container">Gallery</span>
                            </h1>
                            <p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
                                Explore photos, press coverage, and stories from Dr. Dnyaneshwar Mule Foundation's programs, events, and community initiatives across India.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['10,000+ Beneficiaries', 'Est. 2019', '80G & 12A Certified'].map((t, i) => (
                                    <span key={i} className="bg-surface-container-low text-primary text-xs font-bold px-4 py-2 rounded-full border border-outline-variant/30 uppercase tracking-widest">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="md:col-span-5 relative">
                            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                                <img
                                    alt="DMF Media"
                                    className="w-full h-full object-cover"
                                    src="/Images/about_page_3.png"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
                                <p className="text-secondary font-bold text-3xl font-headline">50+</p>
                                <p className="text-on-surface-variant font-label text-sm uppercase tracking-wider">Media Moments Captured</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Filter Tabs ────────────────────────────────────── */}
                <section className="bg-surface-container sticky top-[72px] z-40">
                    <div className="max-w-7xl mx-auto px-8 py-5 flex flex-wrap items-center gap-3">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full font-label text-sm font-semibold transition-all ${
                                    activeTab === tab
                                        ? 'bg-primary text-white'
                                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ── Photo Gallery Grid ─────────────────────────────── */}
                <section className="px-8 py-20 bg-surface">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Gallery</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Photo Gallery</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

                {/* ── Press Coverage ─────────────────────────────────── */}
                <section className="py-20 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">In The News</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Press Coverage</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PRESS.map((p, i) => (
                                <div key={i} className={`bg-surface-container-lowest rounded-2xl p-8 border-l-4 ${p.color} shadow-sm hover:-translate-y-1 transition-all duration-300`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-primary text-2xl">newspaper</span>
                                        <div>
                                            <div className="font-headline font-black text-primary text-sm">{p.outlet}</div>
                                            <div className="text-on-surface-variant text-xs">{p.date}</div>
                                        </div>
                                        <span className="ml-auto text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">{p.tag}</span>
                                    </div>
                                    <p className="text-on-surface-variant leading-relaxed text-sm font-medium">{p.headline}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ────────────────────────────────────────────── */}
                <section className="py-24 px-8 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-6">
                            Share Our Story
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-10">
                            Help amplify the voice of communities we serve. Share our work, connect with us, or invite us to speak at your event.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/about"
                                className="px-10 py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-md hover:bg-secondary-fixed-dim transition-all shadow-xl uppercase tracking-widest text-sm"
                            >
                                About DMF
                            </Link>
                            <Link
                                to="/donate"
                                className="px-10 py-4 border border-white/30 text-white font-headline font-bold rounded-md hover:bg-white/10 transition-all uppercase tracking-widest text-sm"
                            >
                                Support Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

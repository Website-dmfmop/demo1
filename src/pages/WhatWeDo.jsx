import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { icoeTranslations } from '../translations/icoe';
import { commonTranslations } from '../translations/common';
import { WORDS_BEYOND_BORDERS_LINK } from '../config/initiatives';

export default function WhatWeDo() {
    const { language } = useLanguage();
    const t = icoeTranslations[language];
    const tc = commonTranslations[language];

    const initiatives = [
        {
            icon: 'sentiment_very_satisfied',
            label: t.mopLabel,
            desc: t.mopDesc,
            to: '/movement-of-positivity',
            color: 'bg-primary text-white',
            image: '/Images/mop_image.jpeg',
            points: language === 'en'
                ? ['Leadership Development', 'Positivity Campaigns', 'Awareness Drives']
                : ['नेतृत्व विकास', 'सकारात्मकता अभियान', 'जागरूकता अभियान']
        },
        {
            icon: 'menu_book',
            label: t.wbbLabel,
            desc: t.wbbDesc,
            to: '/words-beyond-borders',
            color: 'bg-secondary-container text-on-secondary-container',
            image: '/Images/words_beyound_borders.jpeg',
            points: language === 'en'
                ? ['Diplomat-Authors', 'Global Perspectives', 'Literary Gathering']
                : ['राजनयिक-लेखक', 'वैश्विक दृष्टिकोण', 'साहित्यिक सम्मेलन']
        },
        {
            icon: 'lightbulb',
            label: t.sipLabel,
            desc: t.sipDesc,
            to: '/social-innovation-path',
            color: 'bg-[#2e7d32] text-white',
            image: '/Images/Social_innovation_path.jpeg',
            points: language === 'en'
                ? ['Co-create Solutions', 'Scale Impact', 'Build Capacities']
                : ['समाधान सह-निर्माण', 'प्रभाव विस्तार', 'क्षमता निर्माण']
        },
        {
            icon: 'diversity_3',
            label: t.sheLeadsLabel,
            desc: t.sheLeadsDesc,
            to: '/she-leads',
            color: 'bg-secondary-container text-on-secondary-container',
            image: '/Images/she_leads.jpeg',
            points: language === 'en'
                ? ['Vocational Training', 'Financial Literacy', 'Market Linkages']
                : ['व्यावसायिक प्रशिक्षण', 'वित्तीय साक्षरता', 'बाज़ार संपर्क']
        },
        {
            icon: 'build',
            label: t.skillReachLabel,
            desc: t.skillReachDesc,
            to: '/skill-reach',
            color: 'bg-primary text-white',
            image: '/Images/skill_reach.png',
            points: language === 'en'
                ? ['Digital & Tech Skills', 'Career Guidance', 'Defence Sector']
                : ['डिजिटल और तकनीकी कौशल', 'करियर मार्गदर्शन', 'रक्षा क्षेत्र']
        },
        {
            icon: 'elderly',
            label: t.shelterLabel,
            desc: t.shelterDesc,
            to: '/shelter-home',
            color: 'bg-[#2e7d32] text-white',
            image: '/Images/Seltter_home.jpeg',
            points: language === 'en'
                ? ['Safe Living', 'Healthcare Support', 'Social Engagement']
                : ['सुरक्षित आवास', 'स्वास्थ्य सहायता', 'सामाजिक जुड़ाव']
        },
        {
            icon: 'groups',
            label: t.dtntLabel,
            desc: t.dtntDesc,
            to: '/dtnt-lives-matter',
            color: 'bg-secondary-container text-on-secondary-container',
            image: '/Images/dtnt_lives.jpeg',
            points: language === 'en'
                ? ['Identity & Rights', 'Education Access', 'Livelihood Support']
                : ['पहचान और अधिकार', 'शिक्षा पहुंच', 'आजीविका सहायता']
        },
        {
            icon: 'local_hospital',
            label: t.nursingLabel,
            desc: t.nursingDesc,
            to: '/nursing-college',
            color: 'bg-primary text-white',
            image: '/Images/nursing_collage.jpeg',
            points: language === 'en'
                ? ['3-Year GNM Program', 'Clinical Skills', 'Global Placement']
                : ['3-वर्षीय GNM कार्यक्रम', 'नैदानिक कौशल', 'वैश्विक प्लेसमेंट']
        },
        {
            icon: 'work',
            label: t.jobFairLabel,
            desc: t.jobFairDesc,
            to: '/job-fair',
            color: 'bg-primary text-white',
            image: '/Images/Job_fair.jpeg',
            points: language === 'en'
                ? ['Global Placement', 'Employment Drives']
                : ['वैश्विक प्लेसमेंट', 'रोजगार अभियान']
        },
    ];

    const upcomingPrograms = [
        {
            icon: 'computer',
            title: t.aiTitle,
            desc: t.aiDesc,
            badge: 'Q2 2026',
            color: 'border-primary',
            badgeColor: 'bg-primary text-white',
        },
        {
            icon: 'health_and_safety',
            title: t.healthcareTitle,
            desc: t.healthcareDesc,
            badge: 'Q2 2026',
            color: 'border-[#2e7d32]',
            badgeColor: 'bg-[#2e7d32] text-white',
        },
        {
            icon: 'translate',
            title: t.languagesTitle,
            desc: t.languagesDesc,
            badge: 'Q3 2026',
            color: 'border-secondary-container',
            badgeColor: 'bg-secondary-container text-on-secondary-container',
        },
    ];

    return (
        <div className="min-h-screen bg-surface">
            <main>
                {/* Hero Section */}
                <section className="relative w-full flex items-center overflow-hidden bg-primary aspect-[16/9] md:aspect-[21/9] mt-[88px] md:mt-0">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="DMF - What We Do"
                            className="w-full h-full object-cover"
                            src="/Images/What_we_do_page.jpeg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 text-white">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary-container font-headline font-bold text-xs uppercase tracking-widest mb-4">
                            {language === 'hi' ? 'DMF सामाजिक प्रभाव' : 'DMF Social Impact'}
                        </span>
                        <h1 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tight max-w-3xl leading-tight">
                            {language === 'hi' ? 'सकारात्मक सामाजिक परिवर्तन का निर्माण' : 'Building Meaningful Social Transformation'}
                        </h1>
                        <p className="text-white/80 font-body text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
                            {language === 'hi'
                                ? 'शिक्षा, स्वास्थ्य सेवा, महिला सशक्तिकरण और हाशिए के समुदायों के उत्थान के लिए समर्पित डॉ. ज्ञानेश्वर मुळे फाउंडेशन की प्रमुख पहल।'
                                : "Dedicated initiatives by the Dr. Dnyaneshwar Mulay Foundation across education, healthcare, women's empowerment, and community upliftment."}
                        </p>
                    </div>
                </section>

                {/* About DMF Foundation */}
                <section id="about" className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.aboutDMFTag}</span>
                            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">{t.aboutDMFTitle}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-8"></div>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                <strong className="text-primary">{t.aboutDMFP1}</strong>{t.aboutDMFP1b}
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                {t.aboutDMFP2a}<strong className="text-primary">{t.aboutDMFP2Name}</strong>{t.aboutDMFP2b}
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                {t.aboutDMFP3}
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-10">
                                {t.aboutDMFP4a}<strong className="text-primary">{t.aboutDMFP4b}</strong>{t.aboutDMFP4c}<strong className="text-primary">{t.aboutDMFP4d}</strong>{t.aboutDMFP4e}
                            </p>
                            <div className="rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto border border-outline-variant/10">
                                <img
                                    src="/Images/home_page_slide_image_1.jpeg"
                                    alt="Dr. Dnyaneshwar Mulay Foundation Team"
                                    className="w-full h-auto object-cover max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PROMINENT ICOE SPOTLIGHT BANNER ── */}
                <section className="py-12 bg-surface px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-[#00005a] to-[#000080] text-white p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="max-w-2xl relative z-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-container text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
                                    <span className="material-symbols-outlined text-sm">school</span>
                                    {language === 'hi' ? 'विशेष vertical' : 'Specialized Institutional Vertical'}
                                </div>
                                <h3 className="font-headline text-2xl md:text-3xl font-extrabold mb-3 leading-tight">
                                    {language === 'hi'
                                        ? 'अंतर्राष्ट्रीय उत्कृष्टता केंद्र (ICOE) में रुचि रखते हैं?'
                                        : 'Looking for the International Centre of Excellence (ICOE)?'}
                                </h3>
                                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                    {language === 'hi'
                                        ? 'ICOE हमारा समर्पित संस्थान है जो खड़की छावनी बोर्ड (रक्षा मंत्रालय) के सहयोग से संचालित होता है — विशेष रूप से प्रमाणित डिप्लोमा, विदेशी भाषाएं, प्रतियोगी परीक्षा मार्गदर्शन और अंतर्राष्ट्रीय प्लेसमेंट के लिए।'
                                        : 'ICOE is our specialized collaborative institution with Khadki Cantonment Board (Ministry of Defence)—dedicated to accredited diplomas, foreign languages, civil service mentorship, and global job placements.'}
                                </p>
                            </div>
                            <div className="shrink-0 relative z-10">
                                <Link
                                    to="/icoe"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-secondary-container text-on-secondary-container font-headline font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:bg-white hover:text-primary transition-all duration-300 active:scale-95"
                                >
                                    <span>{language === 'hi' ? 'ICOE हब देखें' : 'Visit Dedicated ICOE Hub'}</span>
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core DMF Initiatives Grid */}
                <section className="py-20 bg-surface-container-low px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.discoverTag}</span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">{t.ourInitiatives}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto text-base leading-relaxed">{t.initiativesDesc}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {initiatives.map((item, index) => (
                                <div
                                    key={index}
                                    id={item.to.replace('/', '')}
                                    className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-outline-variant/20 hover:-translate-y-1.5 scroll-mt-24"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.label}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} shadow-md`}>
                                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-primary mb-2">{item.label}</h3>
                                            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{item.desc}</p>
                                            <div className="space-y-1.5 mb-6">
                                                {item.points.map((point, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                                                        <span>{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-auto pt-4 border-t border-outline-variant/10">
                                            <Link
                                                to={item.to}
                                                className="inline-flex items-center gap-2 text-primary font-headline font-bold text-xs uppercase tracking-wider hover:text-secondary-container transition-colors"
                                            >
                                                <span>{tc.learnMore}</span>
                                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                            </Link>
                                            {item.to === '/words-beyond-borders' && (
                                                <a
                                                    href={WORDS_BEYOND_BORDERS_LINK}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-secondary font-headline font-bold text-xs uppercase tracking-wider hover:text-primary transition-colors group"
                                                    aria-label={`${item.label} - ${tc.visitWebsite}`}
                                                >
                                                    <span>{tc.visitWebsite}</span>
                                                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Programs */}
                <section className="py-20 bg-surface px-6 md:px-12 border-t border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.comingSoon}</span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">{t.upcomingPrograms}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto text-base leading-relaxed">{t.upcomingDesc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {upcomingPrograms.map((prog, idx) => (
                                <div key={idx} className={`bg-surface-container-low p-8 rounded-2xl border-t-4 ${prog.color} shadow-sm`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="material-symbols-outlined text-3xl text-primary">{prog.icon}</span>
                                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${prog.badgeColor}`}>{prog.badge}</span>
                                    </div>
                                    <h3 className="font-headline text-lg font-bold text-primary mb-2">{prog.title}</h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{prog.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { icoeTranslations } from '../translations/icoe';
import { commonTranslations } from '../translations/common';

export default function ICOE() {
    const { language } = useLanguage();
    const t = icoeTranslations[language];
    const tc = commonTranslations[language];

    const initiatives = [
        { icon: 'sentiment_very_satisfied', label: t.mopLabel, desc: t.mopDesc, to: '/movement-of-positivity', color: 'bg-primary text-white', image: '/Images/mop_image.jpeg', points: language === 'en' ? ['Leadership Development', 'Positivity Campaigns', 'Awareness Drives'] : ['नेतृत्व विकास', 'सकारात्मकता अभियान', 'जागरूकता अभियान'] },
        { icon: 'school', label: t.icoeLabel, desc: t.icoeDesc, to: '/international-center-of-excellence', color: 'bg-[#2e7d32] text-white', image: '/Images/icoe_page.jpeg', points: language === 'en' ? ['Social Innovation', 'Employability Skills', 'Entrepreneurship Development'] : ['सामाजिक नवाचार', 'रोजगार कौशल', 'उद्यमिता विकास'] },
        { icon: 'menu_book', label: t.wbbLabel, desc: t.wbbDesc, to: '/words-beyond-borders', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/words_beyound_borders.jpeg', points: language === 'en' ? ['Diplomat-Authors', 'Global Perspectives', 'Literary Gathering'] : ['राजनयिक-लेखक', 'वैश्विक दृष्टिकोण', 'साहित्यिक सम्मेलन'] },
        { icon: 'local_hospital', label: t.nursingLabel, desc: t.nursingDesc, to: '/nursing-college', color: 'bg-primary text-white', image: '/Images/nursing_collage.jpeg', points: language === 'en' ? ['3-Year GNM Program', 'Clinical Skills', 'Global Placement'] : ['3-वर्षीय GNM कार्यक्रम', 'नैदानिक कौशल', 'वैश्विक प्लेसमेंट'] },
        { icon: 'lightbulb', label: t.sipLabel, desc: t.sipDesc, to: '/social-innovation-path', color: 'bg-[#2e7d32] text-white', image: '/Images/Social_innovation_path.jpeg', points: language === 'en' ? ['Co-create Solutions', 'Scale Impact', 'Build Capacities'] : ['समाधान सह-निर्माण', 'प्रभाव विस्तार', 'क्षमता निर्माण'] },
        { icon: 'diversity_3', label: t.sheLeadsLabel, desc: t.sheLeadsDesc, to: '/she-leads', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/she_leads.jpeg', points: language === 'en' ? ['Vocational Training', 'Financial Literacy', 'Market Linkages'] : ['व्यावसायिक प्रशिक्षण', 'वित्तीय साक्षरता', 'बाज़ार संपर्क'] },
        { icon: 'build', label: t.skillReachLabel, desc: t.skillReachDesc, to: '/skill-reach', color: 'bg-primary text-white', image: '/Images/skill_reach.png', points: language === 'en' ? ['Digital & Tech Skills', 'Career Guidance', 'Defence Sector'] : ['डिजिटल और तकनीकी कौशल', 'करियर मार्गदर्शन', 'रक्षा क्षेत्र'] },
        { icon: 'elderly', label: t.shelterLabel, desc: t.shelterDesc, to: '/shelter-home', color: 'bg-[#2e7d32] text-white', image: '/Images/Seltter_home.jpeg', points: language === 'en' ? ['Safe Living', 'Healthcare Support', 'Social Engagement'] : ['सुरक्षित आवास', 'स्वास्थ्य सहायता', 'सामाजिक जुड़ाव'] },
        { icon: 'groups', label: t.dtntLabel, desc: t.dtntDesc, to: '/dtnt-lives-matter', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/dtnt_lives.jpeg', points: language === 'en' ? ['Identity & Rights', 'Education Access', 'Livelihood Support'] : ['पहचान और अधिकार', 'शिक्षा पहुंच', 'आजीविका सहायता'] },
        { icon: 'work', label: t.jobFairLabel, desc: t.jobFairDesc, to: '/job-fair', color: 'bg-primary text-white', image: '/Images/Job_fair.jpeg', points: language === 'en' ? ['Global Placement', 'Employment Drives'] : ['वैश्विक प्लेसमेंट', 'रोजगार अभियान'] },
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
        <div>
            <main>
                {/* Hero Section */}
                <section className="relative w-full flex items-center overflow-hidden bg-primary aspect-[16/9] md:aspect-[16/9] mt-[88px] md:mt-0">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="ICOE Khadki Cantonment Board"
                            className="w-full h-full object-cover"
                            src="/Images/What_we_do_page.jpeg"
                        />
                    </div>
                </section>

                {/* About DMF */}
                <section id="about" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.aboutDMFTag}</span>
                            <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">{t.aboutDMFTitle}</h2>
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
                            <div className="rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
                                <img
                                    src="/Images/home_page_slide_image_1.jpeg"
                                    alt="Dr. Dnyaneshwar Mulay Foundation Team"
                                    className="w-full h-auto object-cover max-h-[400px]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Initiatives Grid */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.discoverTag}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{t.ourInitiatives}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">{t.initiativesDesc}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {initiatives.map((item, i) => (
                                <div key={i} className="group relative h-[480px] [perspective:1000px]">
                                    <div className="absolute w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                        {/* Front Face */}
                                        <div className="absolute inset-0 flex flex-col items-center text-center bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-outline-variant/10 [backface-visibility:hidden]">
                                            <div className={`w-16 h-16 rounded-full flex shrink-0 items-center justify-center mb-4 shadow-sm ${item.color}`}>
                                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                            </div>
                                            <h3 className="font-headline font-bold text-xl text-primary mb-2 line-clamp-2">
                                                {item.label}
                                            </h3>
                                            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-4">
                                                {item.desc}
                                            </p>
                                            <ul className="text-left space-y-2 mt-auto w-full">
                                                {item.points.map((point, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant font-medium bg-surface-container-low px-3 py-2.5 rounded-lg">
                                                        <span className="material-symbols-outlined text-secondary-container text-base shrink-0">check_circle</span>
                                                        <span className="truncate">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Back Face */}
                                        <div className="absolute inset-0 h-full w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col border border-outline-variant/10">
                                            <div className="h-full w-full relative">
                                                <img src={item.image} alt={item.label} className="w-full h-full object-cover transition-transform duration-700" />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                                                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center">
                                                    <Link to={item.to} className="w-full bg-primary hover:bg-secondary-container text-white py-3 rounded-xl font-bold tracking-widest uppercase text-sm transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                                                        {tc.explore} <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Programs */}
                <section className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.comingSoon}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{t.upcomingPrograms}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-xl mx-auto">{t.upcomingDesc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {upcomingPrograms.map((prog, i) => (
                                <div key={i} className={`bg-surface-container-lowest rounded-2xl p-8 border-t-4 ${prog.color} shadow-md hover:-translate-y-2 transition-all duration-300`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <span className="material-symbols-outlined text-primary text-4xl">{prog.icon}</span>
                                        <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${prog.badgeColor}`}>{prog.badge}</span>
                                    </div>
                                    <h4 className="font-headline font-bold text-primary text-xl mb-3">{prog.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{prog.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partner Institutions */}
                <section className="py-20 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10">
                        <div className="text-center mb-14 px-8">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{t.ecosystemTag}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">{t.partnerTitle}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>

                        <div
                            className="relative overflow-hidden"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    width: 'max-content',
                                    animation: 'marquee-rtl 40s linear infinite',
                                    paddingBlock: '1rem',
                                }}
                            >
                                {[...Array(2)].flatMap((_, pass) =>
                                    [
                                        { logo: '/logo/KCB.png', name: 'Khadki Cantonment Board' },
                                        { logo: '/logo/MOFD.png', name: 'Ministry of Defence' },
                                        { logo: '/logo/niti-aayog-logo-vector.png', name: 'NITI Aayog' },
                                        { logo: '/logo/nsdc.png', name: 'NSDC' },
                                        { logo: '/logo/coep.png', name: 'COEP' },
                                        { logo: '/logo/Savitribai_Phule_Pune_University_Logo.png', name: 'SPPU' },
                                        { logo: '/logo/AadiTechLogo.png', name: 'AADI Tech' },
                                    ].map((p, i) => (
                                        <div
                                            key={`${pass}-${i}`}
                                            className="group flex flex-col items-center gap-4 flex-shrink-0"
                                            style={{ width: '192px' }}
                                        >
                                            <div className="bg-white rounded-2xl p-5 w-full h-36 flex items-center justify-center shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                                                <img
                                                    src={p.logo}
                                                    alt={p.name}
                                                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="text-white/70 text-[10px] uppercase tracking-widest font-black text-center group-hover:text-secondary-container transition-colors px-2">
                                                {p.name}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <style>{`
                        @keyframes marquee-rtl {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                    `}</style>
                </section>

                {/* Contact Us */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">{t.contactTag}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{t.contactTitle}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <a href="tel:+918378086159" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-secondary-container/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-container transition-colors">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl group-hover:text-on-secondary-container">phone</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">{t.phone}</h4>
                                <p className="text-on-surface-variant text-sm">+91 8378086159</p>
                            </a>
                            <a href="mailto:corporate@dmfmop.org" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white">mail</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">{t.email}</h4>
                                <p className="text-on-surface-variant text-sm">corporate@dmfmop.org</p>
                            </a>
                            <a href="https://www.dmfmop.org" target="_blank" rel="noopener noreferrer" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-[#2e7d32]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2e7d32] transition-colors">
                                    <span className="material-symbols-outlined text-[#2e7d32] text-3xl group-hover:text-white">language</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">{t.website}</h4>
                                <p className="text-on-surface-variant text-sm">dmfmop.org</p>
                            </a>
                        </div>
                        <div className="mt-10 bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10 text-center">
                            <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">location_on</span>
                            <h4 className="font-headline font-bold text-primary text-xl mb-2">{t.officeAddress}</h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                {t.addressText}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

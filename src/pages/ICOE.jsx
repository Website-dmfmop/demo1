import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { icoeTranslations } from '../translations/icoe';
import { commonTranslations } from '../translations/common';

export default function ICOE() {
    const { language } = useLanguage();
    const location = useLocation();
    const t = icoeTranslations[language];
    const tc = commonTranslations[language];

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    const programTracks = [
        {
            icon: 'medical_services',
            title: t.trackHealthcareTitle,
            desc: t.trackHealthcareDesc,
            color: 'border-l-primary',
            iconColor: 'text-primary',
            badge: language === 'hi' ? '3-वर्षीय डिप्लोमा' : '3-Year Diploma',
            link: '/icoe/admissions/gnm',
            linkText: language === 'hi' ? 'GNM प्रवेश देखें' : 'View GNM Admissions',
        },
        {
            icon: 'translate',
            title: t.trackLanguagesTitle,
            desc: t.trackLanguagesDesc,
            color: 'border-l-secondary-container',
            iconColor: 'text-secondary-container',
            badge: language === 'hi' ? 'जर्मन • जापानी • फ्रेंच' : 'German • Japanese • French',
            link: '/icoe/admissions/language-course',
            linkText: language === 'hi' ? 'भाषा पाठ्यक्रम देखें' : 'View Language Courses',
        },
        {
            icon: 'code',
            title: t.trackTechTitle,
            desc: t.trackTechDesc,
            color: 'border-l-[#2e7d32]',
            iconColor: 'text-[#2e7d32]',
            badge: language === 'hi' ? 'उद्योग तैयार कौशल' : 'Industry-Ready Skills',
            link: '/icoe/admissions/technical-course',
            linkText: language === 'hi' ? 'तकनीकी पाठ्यक्रम देखें' : 'View Technical Courses',
        },
        {
            icon: 'school',
            title: t.trackExamsTitle,
            desc: t.trackExamsDesc,
            color: 'border-l-primary',
            iconColor: 'text-primary',
            badge: language === 'hi' ? 'UPSC • MPSC • बैंकिंग • SSC' : 'UPSC • MPSC • Banking • SSC',
            link: '/icoe/competitive-exams',
            linkText: language === 'hi' ? 'प्रतियोगी परीक्षा केंद्र' : 'Explore Exam Hub',
        },
        {
            icon: 'diversity_3',
            title: t.trackVocationalTitle,
            desc: t.trackVocationalDesc,
            color: 'border-l-secondary-container',
            iconColor: 'text-secondary-container',
            badge: language === 'hi' ? 'महिला उद्यमिता' : "Women's Enterprise",
            link: '/icoe/admissions/other-course',
            linkText: language === 'hi' ? 'व्यावसायिक पाठ्यक्रम देखें' : 'View Vocational Tracks',
        },
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            role: language === 'hi' ? 'जर्मन भाषा स्नातक, ICOE' : 'German Language Graduate, ICOE',
            quote: language === 'hi'
                ? 'ICOE में जर्मन A1 से B1 कार्यक्रम ने मेरे करियर के अवसरों को पूरी तरह से बदल दिया। पाठ्यक्रम पूरा करने के कुछ ही महीनों के भीतर, मुझे जर्मनी में स्वास्थ्य सेवा संस्थान से नियुक्ति का प्रस्ताव मिला।'
                : 'The German A1 to B1 programme at ICOE completely transformed my career prospects. Within months of completing the course, I received a placement offer from a healthcare facility in Germany.',
            icon: 'school',
            color: 'bg-primary text-white',
        },
        {
            name: 'Amit Kulkarni',
            role: language === 'hi' ? 'डिजिटल मार्केटिंग बैच, ICOE' : 'Digital Marketing Batch, ICOE',
            quote: language === 'hi'
                ? 'ICOE में शामिल होने से पहले मुझे डिजिटल टूल्स के बारे में कोई जानकारी नहीं थी। एडवांस्ड एक्सेल और डिजिटल मार्केटिंग कोर्स ने मुझे वे व्यावहारिक कौशल दिए जिनसे मुझे सरकारी डेटा-विश्लेषक इंटर्नशिप मिली।'
                : 'I had no prior knowledge of digital tools before joining ICOE. The Advanced Excel and Digital Marketing course gave me practical skills that helped me land a government data-analyst internship.',
            icon: 'devices',
            color: 'bg-secondary-container text-on-secondary-container',
        },
        {
            name: 'Lt. Col. (Retd.) R. Nair',
            role: language === 'hi' ? 'ICOE छात्रा के अभिभावक (रक्षा परिवार)' : 'Parent of ICOE Student (Defence Family)',
            quote: language === 'hi'
                ? 'एक रक्षा परिवार के रूप में, स्थानांतरण के बाद हम अपनी बेटी के करियर को लेकर चिंतित थे। ICOE ने एकदम सही वातावरण प्रदान किया — पेशेवर, अनुशासित और परिणामों के प्रति समर्पित।'
                : 'As a defence family, we were concerned about career continuity for our daughter after relocation. ICOE provided exactly the right environment — professional, disciplined, and genuinely focused on outcomes.',
            icon: 'military_tech',
            color: 'bg-[#2e7d32] text-white',
        },
    ];

    const journeySteps = [
        { num: t.step1Num, title: t.step1Title, desc: t.step1Desc, icon: 'psychology' },
        { num: t.step2Num, title: t.step2Title, desc: t.step2Desc, icon: 'menu_book' },
        { num: t.step3Num, title: t.step3Title, desc: t.step3Desc, icon: 'how_to_reg' },
        { num: t.step4Num, title: t.step4Title, desc: t.step4Desc, icon: 'flight_takeoff' },
    ];

    return (
        <div className="min-h-screen bg-surface font-body">
            <main>
                {/* ── 1. INSTITUTIONAL HERO ── */}
                <section className="relative bg-primary text-white mt-[88px] pt-16 pb-20 md:py-24 overflow-hidden">
                    {/* Atmospheric Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2e7d32]/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            {/* Left Text */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary-container text-xs md:text-sm font-headline font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[18px]">verified</span>
                                    <span>{t.hubBadge}</span>
                                </div>

                                <h1 className="font-headline font-black text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight uppercase">
                                    {t.hubTitle} <span className="text-secondary-container">({t.hubAcronym})</span>
                                </h1>

                                <p className="text-white/80 font-body text-base md:text-lg leading-relaxed max-w-2xl">
                                    {t.hubSubtitle}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap items-center gap-4 pt-4">
                                    <a
                                        href="#programs"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-white hover:text-primary transition-all duration-300 active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                        <span>{t.ctaPrograms}</span>
                                    </a>

                                    <Link
                                        to="/icoe/admissions"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300 active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                        <span>{t.ctaAdmissions}</span>
                                    </Link>

                                    <Link
                                        to="/icoe/job-placement"
                                        className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">work</span>
                                        <span>{t.ctaPlacement}</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Image Feature */}
                            <div className="lg:col-span-5 relative">
                                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] relative group">
                                    <img
                                        alt="International Centre of Excellence Campus"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        src="/Images/icoe_page.jpeg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                                        <div className="text-xs font-headline font-bold uppercase tracking-wider text-secondary-container mb-0.5">
                                            Khadki Cantonment Board Facility
                                        </div>
                                        <div className="text-xs text-white/80">
                                            First Floor, Maharishi Valmiki Library, Pune 411003
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. WHAT IS ICOE & WHY DOES IT EXIST? ── */}
                <section className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase block">
                                    {t.aboutIcoeTag}
                                </span>
                                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                                    {t.aboutIcoeTitle}
                                </h2>
                                <div className="w-16 h-1 bg-secondary-container"></div>
                                <p className="text-secondary font-semibold text-sm uppercase tracking-wide">
                                    {t.aboutIcoeSubtitle}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed text-base">
                                    {t.aboutIcoeP1}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed text-base">
                                    {t.aboutIcoeP2}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed text-base">
                                    {t.aboutIcoeP3}
                                </p>
                            </div>

                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-primary rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-10">
                                        <span className="material-symbols-outlined text-8xl">account_balance</span>
                                    </div>
                                    <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">
                                        verified_user
                                    </span>
                                    <h3 className="font-headline text-xl font-bold mb-3">
                                        {language === 'hi' ? 'साझेदारी और मान्यता' : 'Institutional Collaboration'}
                                    </h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                                        {language === 'hi'
                                            ? 'खड़की छावनी बोर्ड (रक्षा मंत्रालय) और DMF का यह संयुक्त मंच रक्षा परिवारों के युवाओं और आम नागरिकों को वैश्विक रोजगार के योग्य बनाता है।'
                                            : 'Operating under the aegis of Khadki Cantonment Board (Ministry of Defence) and DMF, providing accredited educational and career development infrastructure.'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-center">
                                            <span className="material-symbols-outlined text-secondary-container text-xl block mb-1">domain</span>
                                            <div className="text-white text-xs font-semibold uppercase">{language === 'hi' ? 'KCB परिसर' : 'KCB Campus'}</div>
                                        </div>
                                        <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-center">
                                            <span className="material-symbols-outlined text-secondary-container text-xl block mb-1">military_tech</span>
                                            <div className="text-white text-xs font-semibold uppercase">{language === 'hi' ? 'रक्षा और नागरिक' : 'Defence & Civilians'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-2xl">
                                    <p className="italic text-primary font-medium leading-relaxed text-sm">
                                        {language === 'hi'
                                            ? '"ICOE केवल एक प्रशिक्षण केंद्र नहीं है, बल्कि एक ऐसा सेतु है जो समर्पण, अनुशासन और आधुनिक कौशल के माध्यम से प्रतिभा को वास्तविक अवसर तक पहुँचाता है।"'
                                            : '"The ICOE serves as a disciplined, forward-looking platform to nurture talent, encourage innovation, and connect aspirational youth directly with national and global opportunities."'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. THE ICOE ECOSYSTEM JOURNEY ── */}
                <section className="py-20 bg-surface-container-low px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">
                                {t.journeyTag}
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-3">
                                {t.journeyTitle}
                            </h2>
                            <p className="text-on-surface-variant max-w-xl mx-auto text-sm md:text-base">
                                {t.journeySubtitle}
                            </p>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mt-6"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {journeySteps.map((step, idx) => (
                                <div
                                    key={idx}
                                    className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="absolute top-4 right-4 font-headline font-black text-4xl text-primary/10 select-none">
                                        {step.num}
                                    </div>
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                            <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                                        </div>
                                        <h3 className="font-headline text-lg font-bold text-primary mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-on-surface-variant text-sm leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center text-xs font-bold text-secondary uppercase tracking-wider">
                                        <span>Stage {idx + 1}</span>
                                        <span className="material-symbols-outlined text-sm ml-1">arrow_right_alt</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. PROGRAMS & COURSES OFFERED AT ICOE ── */}
                <section id="programs" className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">
                                {t.programsHeadingTag}
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">
                                {t.programsHeadingTitle}
                            </h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                                {t.programsHeadingDesc}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {programTracks.map((track, i) => (
                                <div
                                    key={i}
                                    className={`bg-surface-container-low rounded-2xl p-8 border-l-4 ${track.color} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`material-symbols-outlined text-4xl ${track.iconColor}`}>
                                                {track.icon}
                                            </span>
                                            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-surface text-primary border border-outline-variant/20 uppercase tracking-wider">
                                                {track.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-headline text-xl font-bold text-primary mb-3">
                                            {track.title}
                                        </h3>
                                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                                            {track.desc}
                                        </p>
                                    </div>

                                    <Link
                                        to={track.link}
                                        className="inline-flex items-center justify-between w-full px-4 py-3 bg-white rounded-xl text-primary font-headline font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-sm group"
                                    >
                                        <span>{track.linkText}</span>
                                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                                            arrow_forward
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 5. ADMISSIONS & PLACEMENT INTEGRATED PATHWAYS ── */}
                <section className="py-20 bg-surface-container-low px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                        {/* Admissions Pathway */}
                        <div className="bg-surface rounded-3xl p-8 md:p-10 border border-outline-variant/20 shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-headline font-bold text-xs uppercase tracking-widest mb-4">
                                    {t.admissionsBannerTag}
                                </span>
                                <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mb-4">
                                    {t.admissionsBannerTitle}
                                </h3>
                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-8">
                                    {t.admissionsBannerDesc}
                                </p>
                            </div>
                            <div className="space-y-3 pt-6 border-t border-outline-variant/10">
                                <Link
                                    to="/icoe/admissions"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                    <span>{t.btnBrowseAdmissions}</span>
                                </Link>
                                <Link
                                    to="/icoe/competitive-exams"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-surface-container text-primary font-headline font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px]">school</span>
                                    <span>{t.btnExploreExams}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Job Placement Pathway */}
                        <div className="bg-surface rounded-3xl p-8 md:p-10 border border-outline-variant/20 shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/5 rounded-full blur-3xl pointer-events-none"></div>
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/20 text-[#8f4e00] font-headline font-bold text-xs uppercase tracking-widest mb-4">
                                    {t.placementBannerTag}
                                </span>
                                <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary mb-4">
                                    {t.placementBannerTitle}
                                </h3>
                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-8">
                                    {t.placementBannerDesc}
                                </p>
                            </div>
                            <div className="space-y-3 pt-6 border-t border-outline-variant/10">
                                <Link
                                    to="/icoe/job-placement"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:bg-[#ffaa4d] transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">work</span>
                                    <span>{t.btnBrowseJobs}</span>
                                </Link>
                                <Link
                                    to="/job-fair"
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-surface-container text-primary font-headline font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container-high transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px]">flight_takeoff</span>
                                    <span>{language === 'hi' ? 'अंतर्राष्ट्रीय भर्ती अभियान' : 'International Recruitment Drives'}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. AUTHENTIC STUDENT TESTIMONIALS ── */}
                <section className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">
                                {t.testimonialsSectionTag}
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">
                                {t.testimonialsSectionTitle}
                            </h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="bg-surface-container-low rounded-2xl p-8 shadow-sm border border-outline-variant/10 flex flex-col justify-between hover:shadow-md transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color} shadow-sm`}>
                                                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                            </span>
                                            <div>
                                                <h4 className="font-headline font-bold text-primary text-base">{item.name}</h4>
                                                <p className="text-xs text-on-surface-variant">{item.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-on-surface-variant text-sm italic leading-relaxed mb-6">
                                            "{item.quote}"
                                        </p>
                                    </div>
                                    <div className="flex text-[#fe9832]">
                                        {Array.from({ length: 5 }, (_, starIdx) => (
                                            <span key={starIdx} className="material-symbols-outlined text-sm">star</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 7. CAMPUS & CONTACT INFORMATION ── */}
                <section id="campus" className="py-20 bg-surface-container-low px-6 md:px-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-7 space-y-6">
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase block">
                                    {t.campusSectionTag}
                                </span>
                                <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                                    {t.campusSectionTitle}
                                </h2>
                                <div className="w-16 h-1 bg-secondary-container"></div>

                                <div className="space-y-4 pt-2">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary-container text-2xl mt-1">location_on</span>
                                        <div>
                                            <div className="font-headline font-bold text-primary text-sm">{language === 'hi' ? 'कार्यालय पता' : 'Campus Address'}</div>
                                            <p className="text-on-surface-variant text-sm leading-relaxed">{t.campusAddressLine}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary-container text-2xl mt-1">schedule</span>
                                        <div>
                                            <div className="font-headline font-bold text-primary text-sm">{language === 'hi' ? 'कार्य समय' : 'Operating Hours'}</div>
                                            <p className="text-on-surface-variant text-sm">{t.campusHours}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-secondary-container text-2xl mt-1">contact_mail</span>
                                        <div>
                                            <div className="font-headline font-bold text-primary text-sm">{language === 'hi' ? 'ईमेल एवं फ़ोन' : 'Direct Contacts'}</div>
                                            <p className="text-on-surface-variant text-sm">{t.campusContactEmail} • {t.campusContactPhone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap gap-4">
                                    <Link
                                        to="/slot-booking"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                                        <span>{t.btnBookVisit}</span>
                                    </Link>
                                    <a
                                        href="https://maps.app.goo.gl/JWAhkrRXGfwi28ur8?g_st=aw"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-outline-variant/30 text-primary font-headline font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-surface-container transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">map</span>
                                        <span>{language === 'hi' ? 'गूगल मैप्स पर देखें' : 'View on Google Maps'}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Embedded Map */}
                            <div className="lg:col-span-5 h-[340px] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/20 relative">
                                <iframe
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    src="https://maps.google.com/maps?q=Dr.%20Dnyaneshwar%20Mulay%20Foundation,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                    title="ICOE Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

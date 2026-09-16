import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { icoeTranslations } from '../translations/icoe';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ICOE() {
    const { language } = useLanguage();
    const location = useLocation();
    const t = icoeTranslations[language] || icoeTranslations.en;

    const [languageCourses, setLanguageCourses] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [loadingJobs, setLoadingJobs] = useState(true);

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

    // Fetch verified Language courses from API
    useEffect(() => {
        fetch(`${API_URL}/api/courses`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(c => c.category === 'Language');
                setLanguageCourses(filtered);
                setLoadingCourses(false);
            })
            .catch(err => {
                console.error('Error fetching courses:', err);
                setLoadingCourses(false);
            });
    }, []);

    // Fetch verified Jobs from API
    useEffect(() => {
        fetch(`${API_URL}/api/jobs`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoadingJobs(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setLoadingJobs(false);
            });
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Verified fallback data matching exact database records if backend is offline
    const defaultLanguages = [
        {
            _id: 'japanese-default',
            courseName: 'Japanese Language Course',
            description: 'Structured training aligned with the JLPT Framework (N5–N1). Covers Hiragana, Katakana, Kanji, and spoken Keigo for career pathways in Japan.',
            levels: 'JLPT N5, N4, N3, N2, N1',
            focus: 'Conversational Fluency • Industry Terms • Study & Work in Japan',
        },
        {
            _id: 'german-default',
            courseName: 'German Language Program',
            description: 'Comprehensive curriculum based on the CEFR Framework (A1–C1). Focused on grammar, professional communication, and readiness for European opportunities.',
            levels: 'CEFR A1, A2, B1, B2, C1',
            focus: 'Spoken Proficiency • Workplace Vocabulary • European Mobility',
        }
    ];

    const displayCourses = languageCourses.length > 0 ? languageCourses : defaultLanguages;

    return (
        <div className="min-h-screen bg-surface font-body text-on-surface">
            {/* ── 1. HERO SECTION ─────────────────────────────────── */}
            <section className="relative bg-[#00003c] text-white mt-[88px] pt-16 pb-20 md:py-24 overflow-hidden">
                {/* Subtle Ambient Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#fe9832]/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Focused Messaging */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fe9832]/15 border border-[#fe9832]/30 text-[#fe9832] text-xs md:text-sm font-headline font-bold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-[#fe9832] animate-pulse"></span>
                                <span>{t.hubBadge}</span>
                            </div>

                            <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight uppercase">
                                {t.hubTitle}
                            </h1>

                            <p className="text-gray-200 font-body text-base md:text-lg leading-relaxed max-w-2xl">
                                {t.hubSubtitle}
                            </p>

                            {/* Dual CTAs */}
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <button
                                    onClick={() => scrollTo('languages')}
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#fe9832] text-[#00003c] font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-white hover:text-[#00003c] transition-all duration-300 active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">translate</span>
                                    <span>{t.ctaLanguages}</span>
                                </button>

                                <button
                                    onClick={() => scrollTo('jobs')}
                                    className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 backdrop-blur-sm"
                                >
                                    <span className="material-symbols-outlined text-[18px]">work</span>
                                    <span>{t.ctaPlacement}</span>
                                </button>
                            </div>

                            {/* Highlight Row */}
                            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#fe9832] text-lg">check_circle</span>
                                    <span>Japanese (JLPT) & German (CEFR)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#fe9832] text-lg">verified</span>
                                    <span>Verified Overseas Employment Openings</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visual Feature */}
                        <div className="lg:col-span-5 relative">
                            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] relative group">
                                <img
                                    alt="International Centre of Excellence"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    src="/Images/icoe_page.jpeg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00003c]/90 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                                    <div className="text-xs font-headline font-bold uppercase tracking-wider text-[#fe9832] mb-0.5">
                                        Global Readiness Infrastructure
                                    </div>
                                    <div className="text-xs text-white/90">
                                        Foreign Language Training • Overseas Placement Facilitation
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. TWO-PILLAR FRAMEWORK ─────────────────────────── */}
            <section id="pillars" className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">
                            {t.twoPillarsTag}
                        </span>
                        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-4">
                            {t.twoPillarsTitle}
                        </h2>
                        <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                        <p className="text-on-surface-variant max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                            {t.twoPillarsSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {/* Pillar 1: Foreign Languages */}
                        <div className="bg-surface-container-low rounded-3xl p-8 sm:p-10 border border-outline-variant/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#fe9832]/15 text-[#8f4e00] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">translate</span>
                                    </div>
                                    <span className="text-xs font-black px-3 py-1 rounded-full bg-surface text-primary border border-outline-variant/20 uppercase tracking-widest">
                                        {t.pillar1Tag}
                                    </span>
                                </div>

                                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                                    {t.pillar1Title}
                                </h3>

                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 font-body">
                                    {t.pillar1Desc}
                                </p>

                                <div className="bg-white/80 rounded-xl p-4 border border-outline-variant/10 mb-6 text-xs text-primary font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-secondary-container text-base">school</span>
                                    <span>{t.pillar1Highlight}</span>
                                </div>
                            </div>

                            <Link
                                to="/icoe/admissions/language-course"
                                className="inline-flex items-center justify-between w-full px-6 py-4 bg-primary text-white rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-primary-hover transition-all shadow-sm group-hover:shadow"
                            >
                                <span>{t.btnViewAllLanguages}</span>
                                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>

                        {/* Pillar 2: International Jobs */}
                        <div className="bg-surface-container-low rounded-3xl p-8 sm:p-10 border border-outline-variant/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">work</span>
                                    </div>
                                    <span className="text-xs font-black px-3 py-1 rounded-full bg-surface text-primary border border-outline-variant/20 uppercase tracking-widest">
                                        {t.pillar2Tag}
                                    </span>
                                </div>

                                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                                    {t.pillar2Title}
                                </h3>

                                <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 font-body">
                                    {t.pillar2Desc}
                                </p>

                                <div className="bg-white/80 rounded-xl p-4 border border-outline-variant/10 mb-6 text-xs text-primary font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#2e7d32] text-base">flight_takeoff</span>
                                    <span>{t.pillar2Highlight}</span>
                                </div>
                            </div>

                            <Link
                                to="/icoe/job-placement"
                                className="inline-flex items-center justify-between w-full px-6 py-4 bg-secondary-container text-on-secondary-container rounded-xl font-headline font-bold text-xs uppercase tracking-widest hover:bg-[#ffaa4d] transition-all shadow-sm group-hover:shadow"
                            >
                                <span>{t.btnBrowseJobs}</span>
                                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. 3-STAGE GLOBAL CAREER PATHWAY ────────────────── */}
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
                        <div className="w-16 h-1 bg-secondary-container mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="absolute top-4 right-4 font-headline font-black text-4xl text-primary/10 select-none">
                                {t.step1Num}
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-2xl">translate</span>
                                </div>
                                <h3 className="font-headline text-lg font-bold text-primary mb-3">
                                    {t.step1Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.step1Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant/10 text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                                <span>Foundation</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="absolute top-4 right-4 font-headline font-black text-4xl text-primary/10 select-none">
                                {t.step2Num}
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-[#8f4e00] flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-2xl">psychology</span>
                                </div>
                                <h3 className="font-headline text-lg font-bold text-primary mb-3">
                                    {t.step2Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.step2Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant/10 text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                                <span>Preparation</span>
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/10 relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="absolute top-4 right-4 font-headline font-black text-4xl text-primary/10 select-none">
                                {t.step3Num}
                            </div>
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-[#2e7d32]/10 text-[#2e7d32] flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
                                </div>
                                <h3 className="font-headline text-lg font-bold text-primary mb-3">
                                    {t.step3Title}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                                    {t.step3Desc}
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-outline-variant/10 text-xs font-bold text-[#2e7d32] uppercase tracking-wider flex items-center gap-1">
                                <span>Placement</span>
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. FOREIGN LANGUAGE COURSES SECTION ─────────────── */}
            <section id="languages" className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-2 block">
                                {t.languagesSectionTag}
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">
                                {t.languagesSectionTitle}
                            </h2>
                            <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-xl">
                                {t.languagesSectionDesc}
                            </p>
                        </div>
                        <Link
                            to="/icoe/admissions/language-course"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto"
                        >
                            <span>{t.btnViewAllLanguages}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    {loadingCourses ? (
                        <div className="py-12 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {displayCourses.map((course) => (
                                <div
                                    key={course._id}
                                    className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/20 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-2xl">translate</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-white text-primary text-xs font-bold uppercase tracking-wider border border-outline-variant/20 shadow-2xs">
                                                Admissions Open
                                            </span>
                                        </div>

                                        <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                                            {course.courseName}
                                        </h3>

                                        <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-body whitespace-pre-line line-clamp-4">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <span className="text-xs text-on-surface-variant font-medium">
                                            Comprehensive Level-Wise Training
                                        </span>
                                        <Link
                                            to="/icoe/admissions/language-course"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95"
                                        >
                                            <span>{t.btnApplyLanguage}</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── 5. INTERNATIONAL JOB OPPORTUNITIES SECTION ──────── */}
            <section id="jobs" className="py-20 bg-surface-container-low px-6 md:px-12 border-b border-outline-variant/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-2 block">
                                {t.jobsSectionTag}
                            </span>
                            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary">
                                {t.jobsSectionTitle}
                            </h2>
                            <p className="text-on-surface-variant text-sm md:text-base mt-2 max-w-xl">
                                {t.jobsSectionDesc}
                            </p>
                        </div>
                        <Link
                            to="/icoe/job-placement"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-container text-on-secondary-container hover:bg-[#ffaa4d] rounded-xl text-xs font-bold uppercase tracking-wider transition-all self-start md:self-auto shadow-sm"
                        >
                            <span>{t.btnBrowseJobs}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                    </div>

                    {loadingJobs ? (
                        <div className="py-12 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="bg-surface rounded-2xl p-10 text-center border border-outline-variant/10 max-w-xl mx-auto">
                            <span className="material-symbols-outlined text-4xl text-gray-400 mb-3 block">work_outline</span>
                            <h4 className="font-headline font-bold text-primary text-lg mb-1">New Positions Updating</h4>
                            <p className="text-xs text-on-surface-variant mb-4">Recruitment drives for international openings are currently being scheduled.</p>
                            <Link to="/icoe/job-placement" className="text-xs text-primary font-bold underline">Visit Job Placement Portal</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="bg-surface rounded-2xl p-6 border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-bold">
                                                <span className="material-symbols-outlined text-sm">public</span>
                                                {job.country || 'International'}
                                            </span>
                                            {job.openings && (
                                                <span className="text-xs text-on-surface-variant font-semibold">
                                                    {job.openings} {t.openingsLabel}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-headline font-bold text-primary text-lg mb-2">
                                            {job.jobRole}
                                        </h3>

                                        <p className="text-xs text-secondary font-semibold uppercase tracking-wider mb-4">
                                            {job.companyName}
                                        </p>

                                        <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-3 mb-6 font-body">
                                            {job.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-outline-variant/10">
                                        <Link
                                            to="/icoe/job-placement"
                                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-surface-container text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                                        >
                                            <span>{t.btnApplyJob}</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── 6. AUTHENTIC LANGUAGE & PLACEMENT TESTIMONIAL ───── */}
            <section className="py-20 bg-surface px-6 md:px-12 border-b border-outline-variant/10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-primary to-[#00003c] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl">format_quote</span>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#fe9832]/20 text-[#fe9832] font-headline font-bold text-xs uppercase tracking-widest">
                                {t.testimonialTag}
                            </span>

                            <h3 className="font-headline font-bold text-2xl sm:text-3xl leading-snug">
                                {t.testimonialTitle}
                            </h3>

                            <p className="text-white/90 text-base sm:text-lg italic leading-relaxed font-body">
                                "{t.testimonialQuote}"
                            </p>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h4 className="font-headline font-bold text-base text-[#fe9832]">
                                        {t.testimonialAuthor}
                                    </h4>
                                    <p className="text-xs text-white/70">
                                        {t.testimonialRole}
                                    </p>
                                </div>
                                <div className="flex text-[#fe9832]">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined text-sm">star</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. FINAL ACTION BANNER ──────────────────────────── */}
            <section className="py-16 bg-[#00003c] text-white px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <span className="font-label text-[#fe9832] text-xs font-bold tracking-widest uppercase block">
                        {t.finalCtaTag}
                    </span>

                    <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase">
                        {t.finalCtaTitle}
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-body">
                        {t.finalCtaDesc}
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                        <Link
                            to="/icoe/admissions/language-course"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#fe9832] text-[#00003c] font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-white hover:text-[#00003c] transition-all duration-300 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">translate</span>
                            <span>{t.btnExploreLanguages}</span>
                        </Link>

                        <Link
                            to="/icoe/job-placement"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 backdrop-blur-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">work</span>
                            <span>{t.btnExploreJobs}</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

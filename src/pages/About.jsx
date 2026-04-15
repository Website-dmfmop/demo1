import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const BASE_SLIDES = [
    {
        src: '/Images/about_page_5.png',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
    {
        src: '/Images/social_work_1.png',
        alt: 'Dr. Dnyaneshwar Mulay',
        caption: 'Dr. Dnyaneshwar Mulay — Founder & President',
    },
    {
        src: '/Images/about_page_6.png',
        alt: 'Riyaj',
        caption: 'Empowering Communities Through Education',
    },

    {
        src: '/Images/about_page_2.png',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
    {
        src: '/Images/5.png',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
];

const MOBILE_EXTRA_SLIDES = [
    {
        src: '/Images/m.jpg.jpeg',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
    {
        src: '/Images/WhatsApp Image 2026-04-06 at 12.31.06.jpeg',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
    {
        src: '/Images/WhatsApp Image 2026-04-06 at 12.31.40.jpeg',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    },
    {
        src: '/Images/WhatsApp Image 2026-04-11 at 13.37.44.jpeg',
        alt: 'DMF Community Initiatives',
        caption: 'Empowering Communities Through Education',
    }
];

export default function About() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slides = isMobile ? MOBILE_EXTRA_SLIDES : BASE_SLIDES;

    const [current, setCurrent] = useState(0);
    const [prev_idx, setPrevIdx] = useState(null);
    const [direction, setDirection] = useState('right'); // 'right' | 'left'
    const [sliding, setSliding] = useState(false);

    useEffect(() => {
        if (current >= slides.length) {
            setCurrent(0);
        }
    }, [slides.length, current]);

    const goTo = useCallback((idx) => {
        if (sliding) return;
        setDirection(idx > current ? 'right' : 'left');
        setPrevIdx(current);
        setSliding(true);
        // After animation completes, clean up
        setTimeout(() => {
            setCurrent(idx);
            setPrevIdx(null);
            setSliding(false);
        }, 600);
        // Update current immediately so new slide starts animating in
        setCurrent(idx);
    }, [current, sliding]);

    const next = useCallback(() => {
        const idx = (current + 1) % slides.length;
        if (sliding) return;
        setDirection('right');
        setPrevIdx(current);
        setSliding(true);
        setCurrent(idx);
        setTimeout(() => { setPrevIdx(null); setSliding(false); }, 650);
    }, [current, sliding, slides.length]);

    const prevSlide = useCallback(() => {
        const idx = (current - 1 + slides.length) % slides.length;
        if (sliding) return;
        setDirection('left');
        setPrevIdx(current);
        setSliding(true);
        setCurrent(idx);
        setTimeout(() => { setPrevIdx(null); setSliding(false); }, 650);
    }, [current, sliding, slides.length]);

    /* Auto-advance every 4 s */
    useEffect(() => {
        const id = setInterval(next, 4000);
        return () => clearInterval(id);
    }, [next]);

    return (
        <div>
            <main>
                {/* ── Hero Slider ──────────────────────────────────── */}
                <section className="relative h-screen w-screen flex items-center overflow-hidden bg-black">
                    {/* Slides */}
                    {slides.map((slide, i) => {
                        const isActive = i === current;
                        const isExiting = i === prev_idx;
                        let slideStyle = {};
                        if (isActive && sliding) {
                            // entering from right or left
                            slideStyle = {
                                animation: `slideIn${direction === 'right' ? 'Right' : 'Left'} 0.6s cubic-bezier(0.4,0,0.2,1) forwards`,
                                zIndex: 2,
                            };
                        } else if (isExiting && sliding) {
                            // exiting to left or right
                            slideStyle = {
                                animation: `slideOut${direction === 'right' ? 'Left' : 'Right'} 0.6s cubic-bezier(0.4,0,0.2,1) forwards`,
                                zIndex: 1,
                            };
                        } else if (isActive) {
                            slideStyle = { opacity: 1, zIndex: 1 };
                        } else {
                            slideStyle = { opacity: 0, zIndex: 0 };
                        }
                        return (
                            <div
                                key={i}
                                className="absolute inset-0"
                                style={slideStyle}
                            >
                                <img
                                    alt={slide.alt}
                                    className="w-full h-full object-cover"
                                    src={slide.src}
                                />
                            </div>
                        );
                    })}

                    {/* Content overlay */}
                    {/* <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-24">
                        <div className="max-w-3xl">
                            <span className="inline-block font-label text-secondary-container text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                                Dr. Dnyaneshwar Mulay Foundation • DMF
                            </span>
                            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                                Movement of <span className="text-secondary-container">Positivity</span>
                            </h1>
                            <p className="font-body text-xl text-white/80 leading-relaxed max-w-2xl mb-4">
                                A globally recognized organization committed to providing innovative and beneficial solutions since 2019.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">80G Exemption</span>
                                <span className="bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">12A Exemption</span>
                                <span className="bg-[#2e7d32] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">Since 2019</span>
                            </div>
                        </div>
                    </div> */}

                    {/* ── Arrow Controls ── */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                        aria-label="Previous slide"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                        aria-label="Next slide"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>

                    {/* ── Dot indicators + caption ── */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                        <p className="text-white/70 text-xs font-medium tracking-widest uppercase">
                            {slides[current < slides.length ? current : 0].caption}
                        </p>
                        <div className="flex gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`h-2 rounded-full transition-all duration-300 ${i === current
                                        ? 'w-8 bg-[#fe9832]'
                                        : 'w-2 bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>


                {/* Biography: Asymmetric Layout */}
                <section className="py-24 bg-surface overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-4 relative">
                            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-lg shadow-2xl bg-surface-container">
                                <img alt="Dr. Dnyaneshwar Mulay" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" src="/Images/dr_mulay.png" />
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary-container/10 -z-10 rounded-full blur-3xl"></div>
                        </div>
                        <div className="md:col-span-8">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-4 block">FOUNDER & PRESIDENT</span>
                            <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">Dr. Dnyaneshwar Mulay</h2>
                            <div className="space-y-5 text-on-surface-variant leading-relaxed text-base">
                                <p>
                                    Dr. Dnyaneshwar Mulay is a distinguished career diplomat of the Indian Foreign Service and the Founder & President of the Dr. Dnyaneshwar Mulay Foundation. He previously served as Secretary in the Ministry of External Affairs, Government of India, and as an Advisor to the National Skill Development Corporation.
                                </p>
                                <p>
                                    Since 2019, DMF is a globally recognized organization with deep roots in India, committed to providing innovative and beneficial solutions. During flood emergencies in Kolhapur Sangali district in Maharashtra and subsequently during COVID-19, DMF strengthened its work and today conducts significant activities contributing to social change.
                                </p>
                                <p>
                                    The non-profit organization specializes in Social Innovation, Urban & Rural mobilization, Capacity Skill building, and Transforming Rural & Urban Education Through Digital Classrooms and Innovation Labs.
                                </p>
                                <div className="pt-4 border-l-4 border-secondary pl-6 italic text-primary font-medium">
                                    "Our Vision: Work towards creating a modern, democratic, progressive nation. Promoting equality, justice and freedom as core values of a citizen's life."
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                                {[
                                    { role: 'President', org: 'Dr. Dnyaneshwar Mulay Foundation' },
                                    { role: 'Advisor', org: 'ICOE, Khadki Cantonment' },
                                    { role: 'Former Advisor', org: 'NSDC, Govt. of India' },
                                    { role: 'Former Secretary', org: 'MEA, Govt. of India' },
                                ].map((r, i) => (
                                    <div key={i} className="bg-surface-container-low p-4 rounded-lg border-t-2 border-secondary-container">
                                        <div className="text-[#fe9832] font-bold text-xs uppercase tracking-wide mb-1">{r.role}</div>
                                        <div className="text-primary text-xs font-medium leading-tight">{r.org}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision Cards */}
                <section className="py-24 bg-surface-container-low">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Core Principles</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary">Mission & Vision</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Mission Card */}
                            <div className="bg-surface-container-lowest p-12 relative overflow-hidden group rounded-xl">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary transition-all duration-300 group-hover:w-3 rounded-r"></div>
                                <span className="material-symbols-outlined text-4xl text-primary mb-6" data-icon="flag">flag</span>
                                <h3 className="font-headline text-3xl font-bold text-primary mb-4">Our Mission</h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed">
                                    To create a society based on <strong className="text-primary">positivity, compassion and creativity</strong>. In a short period, DMF has touched the lives of hundreds of people through educational, economic, social and cultural programs for the least privileged segments of our society.
                                </p>
                            </div>
                            {/* Vision Card */}
                            <div className="bg-surface-container-lowest p-12 relative overflow-hidden group rounded-xl">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary-container transition-all duration-300 group-hover:w-3 rounded-r"></div>
                                <span className="material-symbols-outlined text-4xl text-secondary-container mb-6" data-icon="visibility">visibility</span>
                                <h3 className="font-headline text-3xl font-bold text-primary mb-4">Our Vision</h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed">
                                    To work towards creating a <strong className="text-primary">modern, democratic, progressive nation</strong>. Promoting equality, justice and freedom as core values of a citizen's life.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Organization Overview ──────────────────────────── */}


                {/* ── Core Focus Areas ───────────────────────────────── */}
                <section className="py-20 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">What We Do</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Core Focus Areas</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">DMF works across six interconnected domains to create holistic and lasting change in communities across India.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: 'lightbulb',
                                    title: 'Social Innovation',
                                    desc: 'Running Social Innovation Labs that bring together students, academicians, government, and industry to co-create scalable solutions for real-world challenges.',
                                    color: 'border-primary',
                                    iconColor: 'text-primary',
                                },
                                {
                                    icon: 'build',
                                    title: 'Skill Reach',
                                    desc: 'Delivering SkillReach programmes in foreign languages (German, Japanese), digital skills, and vocational trades to hundreds of youth from defence and civilian families.',
                                    color: 'border-[#2e7d32]',
                                    iconColor: 'text-[#2e7d32]',
                                },
                                {
                                    icon: 'woman',
                                    title: "Women's Leadership",
                                    desc: 'Empowering women through the She Leads programme — forming producer groups, providing financial literacy, and connecting them to markets through enterprise development.',
                                    color: 'border-secondary-container',
                                    iconColor: 'text-secondary-container',
                                },
                                {
                                    icon: 'flight_takeoff',
                                    title: 'International Job Placement',
                                    desc: 'Facilitating international employment opportunities for youth in Germany and other countries through partnerships with global recruitment agencies.',
                                    color: 'border-primary',
                                    iconColor: 'text-primary',
                                },
                                {
                                    icon: 'account_balance',
                                    title: 'Governance & Leadership',
                                    desc: 'Through the Centre of Excellence, DMF develops ethical, positive leaders committed to values-based governance and citizen-centric public service.',
                                    color: 'border-[#2e7d32]',
                                    iconColor: 'text-[#2e7d32]',
                                },
                                {
                                    icon: 'medical_services',
                                    title: 'Healthcare Education',
                                    desc: 'The Nursing Institute offers the GNM (General Nursing & Midwifery) 3-year diploma, preparing compassionate and globally competent healthcare professionals.',
                                    color: 'border-secondary-container',
                                    iconColor: 'text-secondary-container',
                                },
                            ].map((area, i) => (
                                <div key={i} className={`bg-surface-container-lowest rounded-2xl p-8 border-t-4 ${area.color} shadow-sm hover:-translate-y-2 transition-all duration-300`}>
                                    <span className={`material-symbols-outlined text-4xl mb-5 block ${area.iconColor}`}>{area.icon}</span>
                                    <h4 className="font-headline font-bold text-primary text-lg mb-3">{area.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{area.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Our Global Partners ── Flags Marquee ────────────────── */}
                <section className="py-20 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10">
                        {/* Heading */}
                        <div className="text-center mb-14 px-8">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">International Presence</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Our Global Partners</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
                                DMF collaborates with institutions, placement partners, and organisations across the globe to create international opportunities for Indian youth.
                            </p>
                        </div>

                        {/* Marquee — fade edges */}
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
                                    gap: '2.5rem',
                                    width: 'max-content',
                                    animation: 'flags-marquee-rtl 35s linear infinite',
                                    paddingBlock: '1rem',
                                }}
                            >
                                {/* Duplicate the list twice for seamless infinite loop */}
                                {[...Array(2)].flatMap((_, pass) =>
                                    [
                                        { flag: '/flags/china.png', country: 'China' },
                                        { flag: '/flags/germany.png', country: 'Germany' },
                                        { flag: '/flags/india.png', country: 'India' },
                                        { flag: '/flags/japan.png', country: 'Japan' },
                                        { flag: '/flags/uae.png', country: 'UAE' },
                                        { flag: '/flags/uk.png', country: 'UK' },
                                        { flag: '/flags/usa.png', country: 'USA' },
                                    ].map((item, i) => (
                                        <div
                                            key={`${pass}-${i}`}
                                            className="group flex flex-col items-center gap-4 flex-shrink-0"
                                            style={{ width: '160px' }}
                                        >
                                            {/* Flag card */}
                                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-full h-28 flex items-center justify-center shadow-xl group-hover:bg-white/20 group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                                                <img
                                                    src={item.flag}
                                                    alt={`${item.country} flag`}
                                                    className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            {/* Country label */}
                                            <div className="text-white/70 text-xs uppercase tracking-widest font-black text-center group-hover:text-secondary-container transition-colors">
                                                {item.country}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Keyframe for this section */}
                    <style>{`
                        @keyframes flags-marquee-rtl {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                    `}</style>
                </section>


                {/* Team Cards */}
                <section className="py-24 bg-surface-container-high">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-4 block">ICOE LEADERSHIP</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary">Meet Our Team</h2>
                        </div>
                        {/* Team Row — 3 members in one line */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {/* Dr. Bharati Patil */}
                            <div className="flip-card aspect-[3/4] w-full max-w-[360px] mx-auto rounded-xl editorial-shadow cursor-pointer">
                                <div className="flip-card-inner rounded-xl">
                                    <div className="flip-card-front bg-surface-container-lowest flex flex-col rounded-xl overflow-hidden shadow-sm">
                                        <div className="flex-1 bg-gradient-to-br from-primary to-primary-container relative overflow-hidden">
                                            <img alt="Dr. Bharati Patil" className="w-full h-full object-cover object-top" src="/Images/dr_bharti.png" />
                                        </div>
                                        <div className="p-6 shrink-0 bg-surface-container-lowest text-center min-h-[96px] flex flex-col justify-center">
                                            <h4 className="font-headline text-xl font-bold text-primary mb-1">Dr. Bharati Patil</h4>
                                            <p className="text-[#fe9832] font-medium text-xs sm:text-sm uppercase tracking-wide">Vice President<br />Dr. Dnyaneshwar Mulay Foundation</p>
                                        </div>
                                    </div>
                                    <div className="flip-card-back bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl border-t-[6px] border-primary">
                                        <h4 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-4">Dr. Bharati Patil</h4>
                                        <div className="w-12 h-1 bg-secondary-container mb-6"></div>
                                        <p className="font-body text-sm sm:text-base leading-relaxed text-on-surface-variant">
                                            A visionary Edupreneur serving as Vice President of DMF, holding a PhD in Education. Dedicated to transforming learning through innovation, leadership, and a commitment to excellence — a dynamic force shaping the future of global learning.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Mr. Ujjwal Sathe */}
                            <div className="flip-card aspect-[3/4] w-full max-w-[360px] mx-auto rounded-xl editorial-shadow cursor-pointer">
                                <div className="flip-card-inner rounded-xl">
                                    <div className="flip-card-front bg-surface-container-lowest flex flex-col rounded-xl overflow-hidden shadow-sm">
                                        <div className="flex-1 bg-gradient-to-br from-primary to-primary-container relative overflow-hidden">
                                            <img alt="Mr. Ujjwal Sathe" className="w-full h-full object-cover object-top" src="/Images/mr_ujjwal.png" />
                                        </div>
                                        <div className="p-6 shrink-0 bg-surface-container-lowest text-center min-h-[96px] flex flex-col justify-center">
                                            <h4 className="font-headline text-xl font-bold text-primary mb-1">Mr. Ujjwal Sathe</h4>
                                            <p className="text-[#fe9832] font-medium text-xs sm:text-sm uppercase tracking-wide">CEO<br />Dr. Dnyaneshwar Mulay Foundation</p>
                                        </div>
                                    </div>
                                    <div className="flip-card-back bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl border-t-[6px] border-primary">
                                        <h4 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-4">Mr. Ujjwal Sathe</h4>
                                        <div className="w-12 h-1 bg-secondary-container mb-6"></div>
                                        <p className="font-body text-sm sm:text-base leading-relaxed text-on-surface-variant">
                                            A visionary entrepreneur and automobile expert, accomplished Automobile Engineer from VJTI, Mumbai. Driven by strong values of humanity and equality, he provides strategic direction and leadership as CEO of DMF.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Mr. Riyaj Pirjade */}
                            <div className="flip-card aspect-[3/4] w-full max-w-[360px] mx-auto rounded-xl editorial-shadow cursor-pointer">
                                <div className="flip-card-inner rounded-xl">
                                    <div className="flip-card-front bg-surface-container-lowest flex flex-col rounded-xl overflow-hidden shadow-sm">
                                        <div className="flex-1 bg-gradient-to-br from-primary to-primary-container relative overflow-hidden">
                                            <img alt="Mr. Riyaj Pirjade" className="w-full h-full object-cover object-top" src="/Images/mr_riyaj.png" />
                                        </div>
                                        <div className="p-6 shrink-0 bg-surface-container-lowest text-center min-h-[96px] flex flex-col justify-center">
                                            <h4 className="font-headline text-xl font-bold text-primary mb-1">Mr. Riyaj Pirjade</h4>
                                            <p className="text-[#fe9832] font-medium text-xs sm:text-sm uppercase tracking-wide">Director — ICOE<br />Dr. Dnyaneshwar Mulay Foundation</p>
                                        </div>
                                    </div>
                                    <div className="flip-card-back bg-white rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl border-t-[6px] border-primary">
                                        <h4 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-4">Mr. Riyaj Pirjade</h4>
                                        <div className="w-12 h-1 bg-secondary-container mb-6"></div>
                                        <p className="font-body text-sm sm:text-base leading-relaxed text-on-surface-variant">
                                            Pursuing PhD in Social Innovation, MSW Community Development. Contributed to NITI Aayog projects, Savitribai Phule Pune University, SKF India & Symbiosis University CSR programs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="relative py-24 overflow-hidden bg-primary">
                    <div className="absolute inset-0 bg-primary-container opacity-20"></div>
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-8">Join the Movement of Positivity</h2>
                        <p className="font-body text-xl text-white/70 mb-12 leading-relaxed">
                            Be part of a legacy that prioritizes human dignity. Whether through contribution or volunteering, your involvement matters.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/donate" className="w-full sm:w-auto px-10 py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-md hover:bg-secondary-fixed-dim transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm">
                                DONATE TO DMF
                            </Link>
                            <Link to="/icoe" className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white font-headline font-bold rounded-md hover:bg-white/10 transition-all active:scale-95 uppercase tracking-widest text-sm">
                                EXPLORE ICOE
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

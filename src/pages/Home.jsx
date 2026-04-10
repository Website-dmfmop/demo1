import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── Animated Counter Hook ───────────────────────────────────────────── */
function useCountUp(target, duration = 2000, startWhen = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startWhen) return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, startWhen]);

    return count;
}

/* ─── Single stat counter item ────────────────────────────────────────── */
function StatCounter({ num, suffix, label, colorClass, started }) {
    const count = useCountUp(num, 2000, started);
    return (
        <div className="space-y-2">
            <div className={`font-headline text-5xl md:text-6xl font-black ${colorClass}`}>
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-xs font-headline tracking-[0.2em] font-bold uppercase text-white/60">
                {label}
            </div>
        </div>
    );
}

export default function Home() {
    /* Intersection observer to trigger the counter when section scrolls into view */
    const counterRef = useRef(null);
    const [counterStarted, setCounterStarted] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideImages = [
        "/Images/home_page_slide_image_1.jpeg",
        "/Images/home_page_slide_image_2.jpeg",
        "/Images/home_page_slide_image_3.jpeg"
    ];

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 3500);
        return () => clearInterval(slideTimer);
    }, []);

    useEffect(() => {
        /* Small delay ensures browser finishes initial layout so the observer
           does NOT fire immediately on page load for off-screen elements */
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setCounterStarted(true);
                        observer.disconnect();
                    }
                },
                {
                    threshold: 0.25,
                    /* negative bottom margin means the element must scroll
                       at least 100px past the bottom edge before firing */
                    rootMargin: '0px 0px -100px 0px',
                }
            );
            if (counterRef.current) observer.observe(counterRef.current);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <main>
                {/* Hero Section */}
                <section className="relative h-[921px] flex items-end md:items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/Images/mobile_interface%20_image.png" />
                            <img alt="Empowering Communities" className="w-full h-full object-cover object-center" src="/Images/1.png" />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-primary/20 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-12 md:pb-0">
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1 mb-4 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase rounded-full">
                                DMF • Movement of Positivity
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tighter">
                                ENABLING COMMUNITIES <span className="text-secondary-container"><div>PROMOTING </div> <div>JUSTICE.</div></span>
                            </h1>
                        </div>
                    </div>
                </section>

                {/* DMF About Strip */}
                <section className="py-16 bg-surface-container-low px-8 border-b border-outline-variant/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-2">
                                <span className="text-secondary font-bold text-xs tracking-widest uppercase mb-3 block">About DMF</span>
                                <h2 className="font-headline text-3xl font-bold text-primary mb-4">Dr. Dnyaneshwar Mule Foundation</h2>
                                <p className="text-on-surface-variant leading-relaxed mb-4">
                                    Since 2019, DMF is a globally recognized organization with deep roots in India, committed to providing innovative and beneficial solutions. During flood emergencies in Kolhapur Sangali district in Maharashtra, and subsequently during COVID-19, DMF strengthened its work and today conducts significant activities contributing to social change.
                                </p>
                                <p className="text-on-surface-variant leading-relaxed text-sm">
                                    <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong> is the Founder &amp; President of DMF. The non-profit specializes in Social Innovation, Urban &amp; Rural mobilization, Capacity (skill) building, and Transforming Rural &amp; Urban Education Through Digital Classrooms and Innovation Labs.
                                </p>
                            </div>
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg group bg-surface-container-lowest">
                                {slideImages.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        alt={`Slide ${idx + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}

                                {/* Navigation Arrows */}
                                <button
                                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
                                >
                                    <span className="material-symbols-outlined font-bold">chevron_left</span>
                                </button>
                                <button
                                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
                                >
                                    <span className="material-symbols-outlined font-bold">chevron_right</span>
                                </button>

                                <div className="absolute inset-x-0 bottom-0 py-4 bg-gradient-to-t from-black/60 to-transparent flex justify-center gap-2 z-10">
                                    {slideImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentSlide(idx)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-[#fe9832] scale-125' : 'bg-white/60 hover:bg-white'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>




                {/* Service Columns (Tonal Vertical Spines) */}
                <section className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-secondary font-bold text-xs tracking-widest uppercase mb-3 block">The Mission</span>
                            <h2 className="font-headline text-4xl font-bold text-primary">Creating a Society Based on</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Positivity Column (MOP) */}
                            <div className="relative bg-secondary-container p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150">
                                    <span className="material-symbols-outlined text-8xl" data-icon="sunny">sunny</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-primary text-5xl mb-6 block" data-icon="sentiment_very_satisfied">sentiment_very_satisfied</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">MOVEMENT OF POSITIVITY</h3>
                                    <p className="text-primary/80 font-medium mb-8 leading-relaxed">Movement of Positivity (MOP) — building a network of active citizens to foster optimism, hope, and constructive action in every community we serve.</p>
                                    <Link className="inline-flex items-center gap-2 font-headline text-xs font-black tracking-widest text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-all" to="/missions">
                                    </Link>
                                </div>
                            </div>
                            {/* Compassion Column (ICOE) */}
                            <div className="relative bg-surface-container-lowest p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl border border-outline-variant/10">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 text-primary">
                                    <span className="material-symbols-outlined text-8xl" data-icon="favorite">favorite</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-primary text-5xl mb-6 block" data-icon="school">school</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">ICOE</h3>
                                    <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">International Centre of Excellence — a collaborative initiative focused on international placement, skill development, and foreign employment.</p>
                                    <Link className="inline-flex items-center gap-2 font-headline text-xs font-black tracking-widest text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-all" to="/missions">
                                    </Link>
                                </div>
                            </div>
                            {/* Creativity Column (Words Beyond Borders) */}
                            <div className="relative bg-[#2e7d32] p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 text-white">
                                    <span className="material-symbols-outlined text-8xl" data-icon="diversity_3">diversity_3</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-white text-5xl mb-6 block" data-icon="auto_stories">auto_stories</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-white mb-4">WORDS BEYOND BORDERS</h3>
                                    <p className="text-white/80 font-medium mb-8 leading-relaxed">Words Beyond Borders — an international literary gathering celebrating diplomats who enrich the world of literature across diverse cultural landscapes.</p>
                                    <Link className="inline-flex items-center gap-2 font-headline text-xs font-black tracking-widest text-white uppercase border-b-2 border-white/20 hover:border-white transition-all" to="/missions">
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Counter — animated */}
                <section ref={counterRef} className="py-24 bg-primary text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-6 h-full w-full">
                            <div className="border-r border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                            <div className="border-r border-white/20"></div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto px-8 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
                            <StatCounter num={500000} suffix="+" label="Beneficiaries" colorClass="text-secondary-container" started={counterStarted} duration={5000} />
                            <StatCounter num={10000} suffix="+" label="ICOE Outreach" colorClass="text-white" started={counterStarted} duration={5000} />
                            <StatCounter num={230} suffix="+" label="Youth Enrolled" colorClass="text-secondary-container" started={counterStarted} duration={5000} />
                            <StatCounter num={200} suffix="+" label="Int'l Placements" colorClass="text-white" started={counterStarted} duration={5000} />
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-32 bg-surface-container-low px-8 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div className="max-w-xl">
                                <h2 className="text-xs font-headline font-black text-secondary tracking-[0.3em] uppercase mb-4">Our Initiatives</h2>
                                <p className="font-headline text-4xl md:text-5xl font-extrabold text-primary leading-tight">Catalyzing systemic change through action.</p>
                            </div>
                        </div>

                        {/* Two images side-by-side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {/* Project 1 — left half */}
                            <div className="group">
                                <div className="relative h-[480px] overflow-hidden rounded-xl">
                                    <img alt="Smart Education" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/Images/4.png" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-10">
                                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-black tracking-widest uppercase mb-4 inline-block">Education</span>
                                        <h4 className="text-3xl font-headline font-bold text-white mb-2">Classrooms &amp; Innovation Labs</h4>

                                    </div>
                                </div>
                            </div>

                            {/* Project 2 — right half */}
                            <div className="group">
                                <div className="relative h-[480px] overflow-hidden rounded-xl">
                                    <img alt="Community Mobilization" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/Images/5.png" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2e7d32]/90 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase mb-4 inline-block">Community</span>
                                        <h4 className="text-2xl font-headline font-bold text-white mb-2">Community Mobilization</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slogan / Quote — full width below both images */}
                        <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-secondary-container">
                            <p className="italic text-primary/70 font-medium mb-4 text-lg">"The mission is to create a society based on positivity, compassion and creativity. In a short period, the DMF has touched the lives of hundreds of people."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-sm">person</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-primary">Dr. Dnyaneshwar Mulay</p>
                                    <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Founder &amp; President, DMF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

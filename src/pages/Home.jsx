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
                <section className="relative h-[921px] flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/Images/mobile_interface%20_image.png" />
                            <img alt="Empowering Communities" className="w-full h-full object-cover object-center" src="/Images/1.png" />
                        </picture>
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-primary/20 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
                        <div className="max-w-3xl">
                            <span className="inline-block px-4 py-1 mb-4 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase rounded-full">
                                DMF • Movement of Positivity
                            </span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tighter">
                                ENABLING COMMUNITIES <span className="text-secondary-container"><div>PROMOTING </div> <div>JUSTICE.</div></span>
                            </h1>
                            <p className="text-xl text-white/80 mb-3 leading-relaxed font-bold max-w-xl">
                                A diplomatic legacy dedicated to grassroots transformation, social liberty, and sustainable equality accross the nation.
                            </p>
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
                                    <strong className="text-primary">Dr. Dnyaneshwar Mule</strong> is the Founder &amp; President of DMF. The non-profit specializes in Social Innovation, Urban &amp; Rural mobilization, Capacity (skill) building, and Transforming Rural &amp; Urban Education Through Digital Classrooms and Innovation Labs.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { num: '500K+', label: 'Beneficiaries', color: 'bg-primary text-white' },
                                    { num: '2019', label: 'Founded', color: 'bg-secondary-container text-on-secondary-container' },
                                    { num: '10K+', label: 'ICOE Reached', color: 'bg-[#2e7d32] text-white' },
                                    { num: '230+', label: 'Youth Enrolled', color: 'bg-surface-container-lowest text-primary border border-outline-variant' },
                                ].map((s, i) => (
                                    <div key={i} className={`${s.color} rounded-xl p-5 text-center shadow-sm`}>
                                        <div className="font-headline text-2xl font-black">{s.num}</div>
                                        <div className="text-xs uppercase tracking-wider opacity-80 mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>



                {/* ICOE Highlight Section */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">New Initiative — September 2025</span>
                                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary leading-tight mb-6">
                                    International Centre<br />of <span className="text-secondary-container">Excellence</span>
                                </h2>
                                <p className="text-on-surface-variant leading-relaxed mb-4">
                                    A collaborative initiative between <strong className="text-primary">Khadki Cantonment Board </strong> and <strong className="text-primary">DMF</strong>, focused on international placement, international skill development and foreign employment.
                                </p>
                                <p className="text-on-surface-variant leading-relaxed mb-8 text-sm">

                                </p>
                                <Link to="/icoe" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-headline text-xs font-bold tracking-widest hover:bg-primary-container transition-all">
                                    EXPLORE ICOE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { icon: 'flight_takeoff', title: "Int'l Placement", desc: '200+ for foreign placements', color: 'border-secondary-container' },
                                    { icon: 'language', title: 'Foreign  Languages', desc: 'foreign language training', color: 'border-secondary-container' },

                                    { icon: 'flight_takeoff', title: "Foreign Culture", desc: 'foreign culture programs', color: 'border-[#2e7d32]' },

                                ].map((item, i) => (
                                    <div key={i} className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${item.color} shadow-sm hover:-translate-y-1 transition-all duration-300`}>
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{item.icon}</span>
                                        <h4 className="font-headline font-bold text-primary text-base mb-1">{item.title}</h4>
                                        <p className="text-on-surface-variant text-xs">{item.desc}</p>
                                    </div>
                                ))}
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
                            {/* Positivity Column */}
                            <div className="relative bg-secondary-container p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150">
                                    <span className="material-symbols-outlined text-8xl" data-icon="sunny">sunny</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-primary text-5xl mb-6 block" data-icon="sentiment_very_satisfied">sentiment_very_satisfied</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">POSITIVITY</h3>
                                    <p className="text-primary/80 font-medium mb-8 leading-relaxed">Building the Movement of Positivity (MOP) — fostering optimism, hope and constructive action in every community we serve.</p>
                                    <Link className="inline-flex items-center gap-2 font-headline text-xs font-black tracking-widest text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-all" to="/missions">
                                    </Link>
                                </div>
                            </div>
                            {/* Compassion Column */}
                            <div className="relative bg-surface-container-lowest p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl border border-outline-variant/10">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 text-primary">
                                    <span className="material-symbols-outlined text-8xl" data-icon="favorite">favorite</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-primary text-5xl mb-6 block" data-icon="favorite">favorite</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-primary mb-4">COMPASSION</h3>
                                    <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">Advocating for the unheard — ensuring legal empowerment and equitable access to human rights for all citizens, especially the marginalized.</p>
                                    <Link className="inline-flex items-center gap-2 font-headline text-xs font-black tracking-widest text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-all" to="/missions">
                                    </Link>
                                </div>
                            </div>
                            {/* Creativity Column */}
                            <div className="relative bg-[#2e7d32] p-12 rounded-xl group hover:-translate-y-2 transition-all duration-500 shadow-xl overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 text-white">
                                    <span className="material-symbols-outlined text-8xl" data-icon="diversity_3">diversity_3</span>
                                </div>
                                <div className="relative z-10">
                                    <span className="material-symbols-outlined text-white text-5xl mb-6 block" data-icon="palette">palette</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-white mb-4">CREATIVITY</h3>
                                    <p className="text-white/80 font-medium mb-8 leading-relaxed">Bridging the socio-economic divide through innovative educational, economic, social and cultural programs for least privileged segments.</p>
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
                            <Link to="/projects" className="bg-primary text-white px-8 py-4 rounded-md font-headline text-xs font-bold tracking-widest hover:bg-primary-container transition-all">VIEW ALL PROJECTS</Link>
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
                                        <h4 className="text-2xl font-headline font-bold text-white mb-2">Community Mobilization — ICOE</h4>
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
                                    <p className="text-xs font-bold text-primary">Dr. Dnyaneshwar Mule</p>
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

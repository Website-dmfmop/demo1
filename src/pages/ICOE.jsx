import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ICOE() {
    const [activeProgram, setActiveProgram] = useState(null);
    return (
        <div>
            <main>
                {/* Hero Section */}
                <section className="relative w-full flex items-center overflow-hidden bg-primary aspect-[4/3] md:aspect-[16/5]">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="ICOE Khadki Cantonment Board"
                            className="w-full h-full object-cover"
                            src="/Images/icoe_page.png"
                        />

                    </div>


                </section>

                {/* About ICOE */}
                <section id="about" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                            <div className="md:col-span-5">
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">PROGRAM 01 </span>
                                <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">About DMF</h2>
                                <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                {/* Key Focus Areas — clickable nav */}
                                <div className="space-y-3">
                                    {[
                                        { icon: 'sentiment_very_satisfied', label: 'Movement of Positivity', href: '#movement-of-positivity' },
                                        { icon: 'school', label: 'International Center of Excellence', href: '#icoe' },
                                        { icon: 'menu_book', label: 'Words Beyond Borders', href: '#words-beyond-borders' },
                                        { icon: 'local_hospital', label: 'Nursing College', href: '#nursing-colleges' },
                                        { icon: 'lightbulb', label: 'Social Innovation Path', href: '#social-innovation-path' },
                                        { icon: 'diversity_3', label: 'She Leads', href: '#she-leads' },
                                        { icon: 'build', label: 'Skill Reach', href: '#skill-reach' },
                                        { icon: 'elderly', label: 'Old Age Home', href: '#old-age-home' },
                                        { icon: 'work', label: 'Job Fair', href: '#job-fair' },
                                    ].map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.href}
                                            onClick={e => {
                                                e.preventDefault();
                                                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg border-l-4 border-primary/20 hover:border-secondary-container hover:bg-surface-container transition-all cursor-pointer group"
                                        >
                                            <span className="material-symbols-outlined text-primary text-2xl group-hover:text-secondary-container transition-colors">{item.icon}</span>
                                            <span className="text-on-surface-variant text-sm font-medium group-hover:text-primary transition-colors">{item.label}</span>
                                            <span className="material-symbols-outlined text-on-surface-variant/40 text-sm ml-auto group-hover:text-secondary-container group-hover:translate-x-1 transition-all">arrow_forward</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-7 md:mt-[5.5rem] space-y-6 text-on-surface-variant leading-relaxed text-base">
                                <p>
                                    The <strong className="text-primary">Dr. Dnyaneshwar Mule Foundation (DMF)</strong> is a globally recognized non-profit organization with deep roots in India, committed to providing innovative and beneficial solutions since 2019.
                                </p>
                                <p>
                                    Founded by <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong>, a distinguished career diplomat of the Indian Foreign Service, DMF has been at the forefront of driving social transformation through education, skill development, women's empowerment, and community engagement.
                                </p>
                                <p>
                                    During flood emergencies in Kolhapur-Sangli district in Maharashtra and subsequently during COVID-19, DMF strengthened its work and today conducts significant activities contributing to social change across India and beyond.
                                </p>
                                <p>
                                    The foundation specializes in <strong className="text-primary">Social Innovation, Urban & Rural Mobilization, Capacity & Skill Building</strong>, and <strong className="text-primary">Transforming Rural & Urban Education</strong> through Digital Classrooms and Innovation Labs.
                                </p>
                                <div className="rounded-2xl overflow-hidden shadow-xl mt-4">
                                    <img 
                                        src="/Images/home_page_slide_image_1.jpeg" 
                                        alt="Dr. Dnyaneshwar Mulay Foundation Team" 
                                        className="w-full h-auto object-cover max-h-[350px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 1. Movement of Positivity ─────────────────────────────── */}
                <section id="movement-of-positivity" className="py-24 bg-primary px-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Core Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Movement of Positivity / चांगुल पणाची चळवळ / अच्छाई का अभियान</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
                                The Movement of Positivity is the beating heart of the Dr. Dnyaneshwar Mule Foundation — a values-driven initiative that fosters optimism, ethical leadership, and constructive community action across India.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">visibility</span>
                                <h3 className="font-headline text-xl font-bold text-white mb-4">Our Vision</h3>
                                <p className="text-white/70 leading-relaxed">To create a nationwide movement of positive, responsible, and transformative leaders committed to ethical governance and social progress.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">flag</span>
                                <h3 className="font-headline text-xl font-bold text-white mb-4">Our Mission</h3>
                                <ul className="space-y-2 text-white/70 text-sm">
                                    {['Foster optimism, hope and constructive action in every community we serve', 'Develop leadership capacities across government, academia, civil society and youth', 'Promote values-based governance and citizen-centric approaches', 'Build a network of change-makers committed to nation-building'].map((m, i) => (
                                        <li key={i} className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>{m}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                { icon: 'sentiment_very_satisfied', title: 'Positivity Campaigns', desc: 'Community drives, awareness events and social media campaigns promoting mental wellness, hope and collective optimism.' },
                                { icon: 'person_celebrate', title: 'Leadership Development', desc: 'Structured training for emerging leaders focusing on ethical leadership, decision-making and public service excellence.' },
                                { icon: 'account_balance', title: 'Governance & Policy', desc: 'Working with government institutions to strengthen governance systems, improve service delivery and promote transparency.' },
                                { icon: 'workspace_premium', title: 'Capacity Building', desc: 'Workshops, fellowships and certification programs for administrators, youth leaders and professionals.' },
                                { icon: 'campaign', title: 'MOP Awareness Drives', desc: 'Awareness initiatives promoting constructive thinking, social responsibility and active citizenship across communities.' },
                                { icon: 'library_books', title: 'Research & Knowledge', desc: 'Generating insights, case studies and best practices in leadership and governance to inform policy and practice.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
                            <h3 className="font-headline text-xl font-bold text-white mb-3">Join the Movement</h3>
                            <p className="text-white/70 mb-2">We invite individuals, institutions, corporates and public leaders to be part of this transformative journey.</p>
                            <p className="font-headline font-bold text-secondary-container">Together, let us lead with purpose and build a positive future for all.</p>
                        </div>
                    </div>
                </section>

                {/* ── International Center of Excellence ─────────────────── */}
                <section id="icoe" className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                    International Center of Excellence
                                </h2>
                                <p className="text-secondary-container font-semibold text-sm mb-6 uppercase tracking-wider">A Collaborative Initiative by KCB & DMF</p>
                                <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    The <strong className="text-primary">International Centre of Excellence (ICOE)</strong> was established in September 2025 through a collaborative initiative between the Khadki Cantonment Board and the Dr. Dnyaneshwar Mulay Foundation.
                                </p>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    The Khadki Cantonment Board functions under the Cantonment Board Act and operates under the Ministry of Defense, Government of India. The board has been engaged in developing defense and civilian communities through education, community development, women's livelihood transformation, and social welfare.
                                </p>
                                <p className="text-on-surface-variant leading-relaxed">
                                    Recognizing the need to expand opportunities for youth and families, KCB invited the guidance and collaboration of <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong>, a distinguished diplomat and former officer of the Indian Foreign Service, who previously served as Secretary in the Ministry of External Affairs and as Advisor to the National Skill Development Corporation.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">school</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">A Platform for Innovation & Skill Development</h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                                        Under Dr. Mulay's leadership through DMF, the COE was established as a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: 'lightbulb', label: 'Social Innovation' },
                                            { icon: 'work', label: 'Employability' },
                                            { icon: 'rocket_launch', label: 'Entrepreneurship' },
                                            { icon: 'diversity_3', label: 'Community Impact' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                                                <span className="material-symbols-outlined text-secondary-container text-2xl mb-2 block">{s.icon}</span>
                                                <div className="text-white/70 text-xs uppercase tracking-wide">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        "The COE serves as a collaborative centre dedicated to innovation and skill development — a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Words Beyond Borders ─────────────────────────────── */}
                <section id="words-beyond-borders" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">

                            {/* LEFT — Text + Slogan */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                    <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                        Words Beyond Borders
                                    </h2>
                                    <p className="text-secondary-container font-semibold text-sm mb-6 uppercase tracking-wider">An International Literary Gathering of Diplomat–Authors</p>
                                    <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                    <p className="text-on-surface-variant leading-relaxed mb-6">
                                        <strong className="text-primary">Words Beyond Borders</strong> is a unique international literary gathering that celebrates diplomats who have enriched the world of literature through their writings—across diplomacy, fiction, poetry, memoirs, essays, and other forms of creative and intellectual expression.
                                    </p>
                                    <p className="text-on-surface-variant leading-relaxed mb-8">
                                        Diplomats occupy a rare and powerful vantage point in the world. Through their work, they engage with diverse societies, cultures, political systems, and global challenges. They witness moments of conflict and cooperation, negotiation and transformation. Many translate these lived experiences into compelling literary works—offering insights that bridge nations, ideas, and human stories.
                                    </p>
                                </div>
                                {/* Slogan at bottom of left column */}
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        "Through their unique experiences across borders and cultures, diplomat-authors offer the world a lens into the complexities of global affairs—stories that inspire understanding and connection."
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT — Logo image only, matching left column height */}
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/Images/words_beyound_borders.jpeg"
                                    alt="Words Beyond Borders Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── 2. Nursing Colleges ───────────────────────────────── */}
                <section id="nursing-colleges" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Healthcare Excellence</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Nursing Institute — GNM Program</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                The Nursing Institute at Dr. Dnyaneshwar Mule Foundation is committed to developing compassionate, skilled, and globally competent healthcare professionals. The <strong className="text-primary">GNM (General Nursing &amp; Midwifery)</strong> Program provides comprehensive training in nursing care, midwifery, and community health.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-10 border-l-4 border-primary">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4 block">medical_services</span>
                                <h3 className="font-headline text-2xl font-bold text-primary mb-4">About the GNM Program</h3>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    The GNM program is a <strong className="text-primary">3-year diploma course</strong> that focuses on building strong clinical skills, ethical values, and patient-centered care practices. It combines theoretical knowledge with hands-on practical training.
                                </p>
                                <div className="bg-surface-container-lowest rounded-xl p-6">
                                    <h4 className="font-headline font-bold text-primary mb-3">Eligibility Criteria</h4>
                                    <ul className="space-y-2 text-on-surface-variant text-sm">
                                        <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>10+2 (Science preferred) with minimum required marks as per regulatory norms</li>
                                        <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>Age and medical fitness as per nursing council guidelines</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="bg-primary rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-3">schedule</span>
                                    <div className="font-headline text-5xl font-black text-white mb-1">3</div>
                                    <div className="text-white/70 text-sm uppercase tracking-widest">Year Diploma</div>
                                </div>
                                <div className="bg-secondary-container rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-on-secondary-container text-5xl mb-3">public</span>
                                    <div className="font-headline text-2xl font-black text-on-secondary-container mb-1">Global</div>
                                    <div className="text-on-secondary-container/70 text-sm uppercase tracking-widest">Placement Ready</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-2xl p-10">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">Career Opportunities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { icon: 'local_hospital', title: 'Staff Nurse', desc: 'In hospitals and clinics' },
                                    { icon: 'health_and_safety', title: 'Community Health Nurse', desc: 'Grassroots healthcare delivery' },
                                    { icon: 'pregnant_woman', title: 'Midwife', desc: 'Maternity and childbirth care' },
                                    { icon: 'home_health', title: 'Home Care Nurse', desc: 'Patient care at home' },
                                    { icon: 'account_balance', title: 'Govt. & Private Sector', desc: 'Healthcare institutions nationwide' },
                                    { icon: 'flight_takeoff', title: 'International Placement', desc: 'Global opportunities (subject to qualifications)' },
                                ].map((c, i) => (
                                    <div key={i} className="bg-surface-container-lowest rounded-xl p-5 text-center hover:-translate-y-1 transition-all duration-300">
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{c.icon}</span>
                                        <div className="font-headline font-bold text-primary text-sm mb-1">{c.title}</div>
                                        <div className="text-on-surface-variant text-xs">{c.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. She Leads Programme ─────────────────────────────── */}
                <section id="she-leads" className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                    She Leads — <span className="text-[#2e7d32]">{"Women's Enterpreneurship Programme"}</span>
                                </h2>
                                <div className="w-16 h-1 bg-[#2e7d32] mb-8"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    <strong className="text-primary">She Leads</strong> is a flagship initiative under COE focused exclusively on empowering women from defence families and civilian communities. The programme builds confidence, vocational skills, and entrepreneurial mindset to enable sustainable livelihoods.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: 'groups', title: 'Common Producer Groups', desc: 'Women organized into self-sustaining producer groups for collective enterprise.' },
                                        { icon: 'storefront', title: 'Market Linkages', desc: 'Products connected to local markets, exhibitions, and e-commerce platforms.' },
                                        { icon: 'school', title: 'Skill Training', desc: 'Hands-on training in sweet-making, leather goods, tailoring, and digital finance.' },
                                        { icon: 'account_balance', title: 'Financial Literacy', desc: 'Banking, savings, GST basics, and micro-financing for self-employment.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-xl border-l-4 border-[#2e7d32]/40 hover:border-[#2e7d32] transition-all">
                                            <span className="material-symbols-outlined text-[#2e7d32] text-2xl mt-0.5">{item.icon}</span>
                                            <div>
                                                <div className="font-headline font-bold text-primary text-sm mb-1">{item.title}</div>
                                                <div className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { num: '25+', label: 'Women Entrepreneurs Trained', color: 'bg-[#2e7d32] text-white' },
                                    { num: '2', label: 'Producer Groups Formed', color: 'bg-secondary-container text-on-secondary-container' },
                                    { num: '3', label: 'Enterprise Verticals', color: 'bg-primary text-white' },
                                    { num: '100%', label: 'From Defence & Civilian Families', color: 'bg-surface-container-lowest text-primary border border-outline-variant' },
                                ].map((s, i) => (
                                    <div key={i} className={`${s.color} rounded-2xl p-6 text-center shadow-md`}>
                                        <div className="font-headline text-4xl font-black mb-2">{s.num}</div>
                                        <div className="text-xs uppercase tracking-widest opacity-80 leading-tight">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Skill Reach ─────────────────────────────── */}
                <section id="skill-reach" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">FROM LOCAL TALENT TO GLOBAL IMPACT</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Skill Reach</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">COE's ongoing programs actively focus on skill enhancement, entrepreneurship development, career guidance, and language proficiency, benefiting hundreds of youth and women from defence families and civilian communities.</p>
                        </div>

                        {/* 2×2 Grid of Programs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Program 1 — Community Mobilization */}
                            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="bg-primary p-6">
                                    <span className="text-secondary-container font-bold text-[10px] tracking-widest uppercase mb-2 block">Program 01</span>
                                    <h3 className="font-headline text-2xl font-extrabold text-white mb-1">Community Mobilization</h3>
                                    <p className="text-white/70 text-xs font-semibold italic">Reach – Engage – Empower</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant text-xs leading-relaxed">To engage and mobilize defense families and civilian communities, especially underprivileged groups, by creating awareness about opportunities in skill development, entrepreneurship, and social innovation.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">route</span> Approach</h4>
                                        <p className="text-on-surface-variant text-xs leading-relaxed">Outreach through household visits, community halls, religious institutions, youth clubs, SHG federations, schools and colleges.</p>
                                    </div>
                                    <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-4">
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">trending_up</span> Impact</h4>
                                        <p className="text-on-surface-variant text-xs">Reached <strong className="text-primary">over 10,000+ beneficiaries</strong> from defense and civilian communities.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Program 2 — Counselling Sessions */}
                            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="bg-[#2e7d32] p-6">
                                    <span className="text-white/70 font-bold text-[10px] tracking-widest uppercase mb-2 block">Program 02</span>
                                    <h3 className="font-headline text-2xl font-extrabold text-white mb-1">Counselling Sessions</h3>
                                    <p className="text-white/70 text-xs font-semibold italic">Guiding Talent, Shaping Careers</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32] text-lg">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant text-xs leading-relaxed">To provide personalized career guidance, skill mapping, and mentorship to youth, women, and defense families, enabling informed career choices.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32] text-lg">route</span> Approach</h4>
                                        <ul className="text-on-surface-variant text-xs space-y-1 ml-4 list-disc">
                                            <li>Individual career counseling and guidance</li>
                                            <li>Community Counselling</li>
                                            <li>Skills and talent assessment</li>
                                            <li>Mentorship with industry experts</li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#2e7d32]/10 border border-[#2e7d32]/30 rounded-xl p-4">
                                        <h4 className="font-headline font-bold text-primary text-sm mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32] text-lg">trending_up</span> Impact</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="text-center bg-white rounded-lg p-3">
                                                <div className="font-headline text-2xl font-black text-[#2e7d32]">230+</div>
                                                <div className="text-[10px] text-on-surface-variant uppercase tracking-wide mt-1">Youths & Women Enrolled</div>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-3">
                                                <div className="font-headline text-2xl font-black text-[#2e7d32]">200+</div>
                                                <div className="text-[10px] text-on-surface-variant uppercase tracking-wide mt-1">In Career Guidance</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program 3 — Digital & Technical Skills */}
                            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="bg-secondary-container p-6">
                                    <span className="text-on-secondary-container/70 font-bold text-[10px] tracking-widest uppercase mb-2 block">Program 03</span>
                                    <h3 className="font-headline text-2xl font-extrabold text-on-secondary-container mb-1">Digital & Technical Skills</h3>
                                    <p className="text-on-secondary-container/70 text-xs font-semibold italic">Building Digital Competencies</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant text-xs leading-relaxed">To equip youth and community members with essential digital and technical skills, enhancing their employability in the modern workforce.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">route</span> Approach</h4>
                                        <ul className="text-on-surface-variant text-xs space-y-1 ml-4 list-disc">
                                            <li>Advanced Excel training</li>
                                            <li>Digital Marketing certification</li>
                                            <li>Tally Prime with GST</li>
                                        </ul>
                                    </div>
                                    <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-4">
                                        <h4 className="font-headline font-bold text-primary text-sm mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">trending_up</span> Impact</h4>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center bg-white rounded-lg p-3">
                                                <div className="font-headline text-2xl font-black text-primary">120</div>
                                                <div className="text-[10px] text-on-surface-variant uppercase tracking-wide mt-1">Excel</div>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-3">
                                                <div className="font-headline text-2xl font-black text-primary">25</div>
                                                <div className="text-[10px] text-on-surface-variant uppercase tracking-wide mt-1">Marketing</div>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-3">
                                                <div className="font-headline text-2xl font-black text-primary">10</div>
                                                <div className="text-[10px] text-on-surface-variant uppercase tracking-wide mt-1">Tally</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program 4 — Career Guidance & Defence */}
                            <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="bg-primary p-6">
                                    <span className="text-secondary-container font-bold text-[10px] tracking-widest uppercase mb-2 block">Program 04</span>
                                    <h3 className="font-headline text-2xl font-extrabold text-white mb-1">Career Guidance & Defence</h3>
                                    <p className="text-white/70 text-xs font-semibold italic">Shaping Futures, Serving the Nation</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant text-xs leading-relaxed">To guide students and youth toward career opportunities in the defence sector, helping them explore pathways in the armed forces after 10th grade.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">route</span> Approach</h4>
                                        <ul className="text-on-surface-variant text-xs space-y-1 ml-4 list-disc">
                                            <li>School outreach and career awareness</li>
                                            <li>Defence career orientation workshops</li>
                                            <li>Physical fitness and aptitude guidance</li>
                                            <li>Mentorship from defence professionals</li>
                                        </ul>
                                    </div>
                                    <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-4">
                                        <h4 className="font-headline font-bold text-primary text-sm mb-1 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container text-lg">trending_up</span> Impact</h4>
                                        <p className="text-on-surface-variant text-xs"><strong className="text-primary">200+ school students</strong> currently receiving guidance on defence career opportunities.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>




                {/* Upcoming Programs */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Coming Soon</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Upcoming Programs</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-xl mx-auto">COE continues to expand its portfolio with new programs designed to meet evolving community needs.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: 'computer',
                                    title: 'AI & Data Literacy',
                                    desc: 'Foundational AI and data skills programme for youth, covering basic machine learning concepts, Python, and data analysis tools.',
                                    badge: 'Q2 2026',
                                    color: 'border-primary',
                                    badgeColor: 'bg-primary text-white',
                                },
                                {
                                    icon: 'health_and_safety',
                                    title: 'Healthcare Skill Certification',
                                    desc: 'Certified training in nursing assistance, patient care, and first aid — preparing candidates for domestic and international healthcare roles.',
                                    badge: 'Q2 2026',
                                    color: 'border-[#2e7d32]',
                                    badgeColor: 'bg-[#2e7d32] text-white',
                                },
                                {
                                    icon: 'translate',
                                    title: 'French & Mandarin Languages',
                                    desc: 'Expanding the foreign language portfolio with French and Mandarin, opening new international placement opportunities in Europe and Asia.',
                                    badge: 'Q3 2026',
                                    color: 'border-secondary-container',
                                    badgeColor: 'bg-secondary-container text-on-secondary-container',
                                },
                            ].map((prog, i) => (
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



                {/* ── Social Innovation Path ─────────────────────────────── */}
                <section id="social-innovation-path" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Two-column intro: content left, image right */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                            {/* Left — text content */}
                            <div>
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Social Innovation Path</h2>
                                <div className="w-16 h-1 bg-secondary-container mb-6"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-8">
                                    At Dr. Dnyaneshwar Mule Foundation, we believe that real and lasting change emerges when innovation meets purpose. Our Social Innovation Labs are dynamic platforms where ideas, people, and resources come together to solve pressing social challenges — bringing together students, academicians, government stakeholders, industry experts, and community members to co-create practical, scalable, and impactful solutions.
                                </p>
                                {/* Vision */}
                                <div className="bg-primary/5 border-l-4 border-secondary-container rounded-r-2xl p-6">
                                    <h3 className="font-headline text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary-container">visibility</span> Our Vision
                                    </h3>
                                    <p className="text-on-surface-variant leading-relaxed">To build a vibrant ecosystem of innovation that empowers communities, strengthens institutions, and drives sustainable and inclusive development.</p>
                                </div>
                            </div>
                            {/* Right — image */}
                            <div className="relative">
                                <img
                                    src="/Images/Social_innovation_image.jpeg"
                                    alt="Social Innovation Path"
                                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                                    style={{ maxHeight: '480px' }}
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* What Our Social Innovation Labs Do */}
                        <h3 className="font-headline text-2xl font-bold text-primary text-center mb-10">What Our Social Innovation Labs Do</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {[
                                { icon: 'handshake', title: 'Co-create Solutions', desc: 'We facilitate collaboration among diverse stakeholders to design solutions rooted in real-world needs.' },
                                { icon: 'lightbulb', title: 'Foster Innovation & Creativity', desc: 'We encourage out-of-the-box thinking and interdisciplinary approaches to address complex social issues.' },
                                { icon: 'science', title: 'Prototype & Test Ideas', desc: 'We provide a safe space to experiment, pilot, and refine innovative solutions before scaling them.' },
                                { icon: 'build', title: 'Build Capacities', desc: 'We train students, youth, and professionals in problem-solving, design thinking, and social innovation.' },
                                { icon: 'trending_up', title: 'Scale Impact', desc: 'We identify high-potential solutions and support their expansion across regions and sectors.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-secondary-container hover:-translate-y-1 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Our Approach */}
                        <div className="bg-surface-container-low rounded-2xl p-10">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">Our Approach</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[
                                    { icon: 'groups', label: 'Collaboration', desc: 'Engaging multiple stakeholders for diverse perspectives' },
                                    { icon: 'lightbulb', label: 'Innovation', desc: 'Leveraging technology and creative thinking' },
                                    { icon: 'location_on', label: 'Community-Centric Design', desc: 'Inclusive and locally relevant solutions' },
                                    { icon: 'analytics', label: 'Evidence-Based Action', desc: 'Using data, research, and field insights' },
                                    { icon: 'eco', label: 'Sustainability', desc: 'Scalable and long-lasting models' },
                                ].map((a, i) => (
                                    <div key={i} className="text-center p-4 bg-surface-container-lowest rounded-xl">
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{a.icon}</span>
                                        <div className="font-headline font-bold text-primary text-sm mb-2">{a.label}</div>
                                        <div className="text-on-surface-variant text-xs leading-relaxed">{a.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Join Us CTA */}
                        <div className="mt-12 text-center">
                            <p className="text-on-surface-variant leading-relaxed mb-2">We invite partners, institutions, corporates, and individuals to collaborate with us in building a future driven by innovation and inclusive growth.</p>
                            <p className="font-headline font-bold text-primary text-lg">Together, let's create solutions that matter.</p>
                        </div>
                    </div>
                </section>

                {/* Partner Institutions */}
                <section className="py-20 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="relative z-10">
                        <div className="text-center mb-14 px-8">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">Ecosystem</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Partner Institutions &amp; Collaborators</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>

                        {/* Marquee wrapper — fade edges */}
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
                                        { logo: '/logo/Ministry_of_defence.png', name: 'Ministry of Defence' },
                                        { logo: '/logo/niti-aayog-logo-vector.png', name: 'NITI Aayog' },
                                        { logo: '/logo/nsdc.png', name: 'NSDC' },
                                        { logo: '/logo/coep.png', name: 'COEP' },
                                        { logo: '/logo/Savitribai_Phule_Pune_University_Logo.png', name: 'SPPU' },
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




                {/* ── Old Age Home ─────────────────────────── */}
                <section id="old-age-home" className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Old Age Home – A Home of Dignity, Care & Compassion</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                At the Dr. Dnyaneshwar Mulay Foundation, we believe that every individual deserves to age with dignity, respect, and emotional security. Our Old Age Home initiative is a heartfelt effort to provide a safe, nurturing, and inclusive environment for senior citizens who seek care, companionship, and a sense of belonging.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            {/* Left — Features */}
                            <div className="space-y-6">
                                {[
                                    { icon: 'home', title: 'Safe & Comfortable Living', desc: 'Well-maintained, hygienic, and secure residential facilities designed to provide a peaceful and homely environment.' },
                                    { icon: 'health_and_safety', title: 'Healthcare & Wellness Support', desc: 'Regular health check-ups, access to medical professionals, nutritious meals, and wellness activities including yoga and meditation.' },
                                    { icon: 'psychology', title: 'Emotional & Social Care', desc: 'A caring and empathetic staff. Opportunities for social interaction, and celebration of festivals, birthdays, and cultural events.' },
                                    { icon: 'sports_esports', title: 'Recreational & Engagement Activities', desc: 'Reading, music, indoor games, skill-based activities, storytelling sessions, and community interaction programs from volunteers.' },
                                    { icon: 'self_improvement', title: 'Dignity & Respect First', desc: 'We ensure that every resident is treated with utmost respect, maintaining their independence and personal choices.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-xl border-l-4 border-secondary-container/50 hover:border-secondary-container transition-all">
                                        <span className="material-symbols-outlined text-secondary-container text-2xl mt-0.5">{item.icon}</span>
                                        <div>
                                            <div className="font-headline font-bold text-primary text-sm mb-1">{item.title}</div>
                                            <div className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right — Vision, Mission, Get Involved */}
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">elderly</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">Our Vision & Mission</h3>
                                    <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium italic">
                                        "To create a compassionate community where elderly individuals live with dignity, independence, and happiness, supported by holistic care and meaningful engagement."
                                    </p>
                                    <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                                        <ul className="space-y-3 text-white/80 text-xs">
                                            {[
                                                "Provide quality residential care for senior citizens",
                                                "Ensure physical, emotional, and social well-being",
                                                "Promote active and healthy aging through engagement",
                                                "Build a culture of respect and gratitude for the elderly"
                                            ].map((s, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="material-symbols-outlined text-secondary-container text-xs mt-0.5">check_circle</span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 6. Job Fair & Other Activities ─────────────────────── */}
                <section id="job-fair" className="py-24 bg-primary px-8 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">ICOE-KCB-DMF</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Other Activities & Job Fairs</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">cleaning_services</span>
                                <h3 className="font-headline text-xl font-bold text-white mb-3">SafsafaiSathi Mainstreaming</h3>
                                <p className="text-white/70 text-sm leading-relaxed">Major Drive for Mainstreaming & Socio-Economic Upliftment of SafsafaiSathi — supporting sanitation workers for dignified livelihoods and social inclusion.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300">
                                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">flight_takeoff</span>
                                <h3 className="font-headline text-xl font-bold text-white mb-3">International Job Placement</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">International Job Placement with Dr. Dnyaneshwar Mulay Foundation DMF and their Jobs Recruiters Agency:</p>
                                <div className="space-y-2">
                                    <div className="bg-white/10 rounded-lg px-4 py-3">
                                        <div className="font-bold text-secondary-container text-sm">🇩🇪 BSc Nursing — Germany</div>
                                        <div className="text-white/70 text-xs mt-1">Placement process ongoing with 200+ beneficiaries being considered for employment</div>
                                    </div>
                                    <div className="bg-white/10 rounded-lg px-4 py-3">
                                        <div className="font-bold text-secondary-container text-sm">🇩🇪 ITI Electrician — Germany</div>
                                        <div className="text-white/70 text-xs mt-1">5+ beneficiaries enrolled in the placement process</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Us */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">ICOE-KCB-DMF</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Contact Us</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <a href="tel:+8378086159" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-secondary-container/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-container transition-colors">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl group-hover:text-on-secondary-container">phone</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">Phone</h4>
                                <p className="text-on-surface-variant text-sm">+8378086159</p>
                            </a>
                            <a href="mailto:corporate@dmfmop.org" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined text-primary text-3xl group-hover:text-white">mail</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">Email</h4>
                                <p className="text-on-surface-variant text-sm">corporate@dmfmop.org</p>
                            </a>
                            <a href="https://www.dmfmop.org" target="_blank" rel="noopener noreferrer" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-[#2e7d32]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2e7d32] transition-colors">
                                    <span className="material-symbols-outlined text-[#2e7d32] text-3xl group-hover:text-white">language</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">Website</h4>
                                <p className="text-on-surface-variant text-sm">dmfmop.org</p>
                            </a>
                        </div>
                        <div className="mt-10 bg-surface-container-lowest rounded-2xl p-8 shadow-lg border border-outline-variant/10 text-center">
                            <span className="material-symbols-outlined text-secondary-container text-4xl mb-4 block">location_on</span>
                            <h4 className="font-headline font-bold text-primary text-xl mb-2">ICOE Office Address</h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                First Floor, Maharishi Valmiki Library, Nehru Garden,<br />
                                Dr. Babasaheb Ambedkar Road, Khadki, Pune 411003.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

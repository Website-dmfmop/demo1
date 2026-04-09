import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ICOE() {
    const [activeProgram, setActiveProgram] = useState(null);
    return (
        <div>
            <main>
                {/* Hero Section */}
                <section className="relative w-full aspect-video flex items-center overflow-hidden bg-primary">
                    <div className="absolute inset-0 z-0">
                        <img
                            alt="ICOE Khadki Cantonment Board"
                            className="w-full h-full object-cover"
                            src="/Images/1.png"
                        />

                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-24">
                        <div className="max-w-3xl">
                            <span className="inline-flex items-center gap-3 px-4 py-2 mb-6 bg-secondary-container/20 border border-secondary-container/40 text-secondary-container text-xs font-bold tracking-widest uppercase rounded-full">
                                ICOE-KCB-DMF
                            </span>
                            <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tighter">
                                International Centre<br />
                                <span className="text-secondary-container">of Excellence</span>
                            </h1>
                            <p className="text-xl text-white/80 mb-4 leading-relaxed font-medium max-w-2xl">
                                A collaborative initiative between <strong className="text-white">Khadki Cantonment Board</strong> and <strong className="text-white">Dr. Dnyaneshwar Mulay Foundation</strong>, established September 2025.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#about" className="px-8 py-4 bg-gradient-to-r from-[#fe9832] to-secondary-container text-white font-headline font-bold rounded-md tracking-widest shadow-2xl hover:scale-105 transition-transform uppercase text-sm">
                                    Explore ICOE
                                </a>
                                <a href="#team" className="px-8 py-4 border border-white/30 text-white font-headline font-bold rounded-md tracking-widest hover:bg-white/10 transition-colors uppercase text-sm">
                                    Meet Our Team
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Floating Stats */}
                    <div className="absolute bottom-8 right-8 hidden lg:grid grid-cols-3 gap-4">
                        {[
                            { num: '10,000+', label: 'Beneficiaries' },
                            { num: '230+', label: 'Youth Enrolled' },
                            { num: '2025', label: 'Est. Year' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                                <div className="font-headline text-2xl font-black text-secondary-container">{s.num}</div>
                                <div className="text-white/70 text-xs uppercase tracking-wide mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About ICOE */}
                <section id="about" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                            <div className="md:col-span-5">
                                <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">PROGRAM 01 </span>
                                <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">About ICOE</h2>
                                <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                {/* Key Focus Areas — clickable nav */}
                                <div className="space-y-3">
                                    {[
                                        { icon: 'sentiment_very_satisfied', label: 'Movement of Positivity', href: '#movement-of-positivity' },
                                        { icon: 'local_hospital', label: 'Nursing Colleges', href: '#nursing-colleges' },
                                        { icon: 'diversity_3', label: 'She Leads', href: '#she-leads' },
                                        { icon: 'build', label: 'Skill Reach', href: '#skill-reach' },
                                        { icon: 'child_care', label: 'Orphanage', href: '#orphanage' },
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
                            <div className="md:col-span-7 space-y-6 text-on-surface-variant leading-relaxed text-base">
                                <p>
                                    The <strong className="text-primary">International Centre of Excellence</strong> was established in September 2025 through a collaborative initiative between the Khadki Cantonment Board and the Dr. Dnyaneshwar Mulay Foundation.
                                </p>
                                <p>
                                    The Khadki Cantonment Board functions under the provisions of the Cantonment Board Act and operates under the administrative framework of the Ministry of Defense, Government of India. The board has long been engaged in the development of defense and civilian communities by implementing programs in education, community development, women's livelihood transformation, and social welfare.
                                </p>
                                <p>
                                    Recognizing the need to expand opportunities for youth and families in the cantonment area, KCB envisioned a dedicated platform to focus on social innovation, employability, and entrepreneurship development. To strengthen this vision, KCB invited the guidance and collaboration of <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong>, a distinguished diplomat and former officer of the Indian Foreign Service.
                                </p>
                                <p>
                                    Dr. Mulay has previously served as <strong className="text-primary">Secretary in the Ministry of External Affairs, Government of India</strong>, and as an <strong className="text-primary">Advisor to the National Skill Development Corporation</strong>.
                                </p>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        "Under his leadership through the Dr. Dnyaneshwar Mulay Foundation, the concept of a collaborative centre dedicated to innovation and skill development took shape — the COE was established as a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities."
                                    </p>
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
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Movement of Positivity</h2>
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
                                    She Leads — <span className="text-[#2e7d32]">{"Women's Leadership Programme"}</span>
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

                {/* ── 4. Skill Reach — Programs Section */}
                <section id="community" className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">FROM LOCAL TALENT TO GLOBAL IMPACT</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Our Programs</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">COE's ongoing programs actively focus on skill enhancement, entrepreneurship development, career guidance, and language proficiency, benefiting hundreds of youth and women from defence families and civilian communities.</p>
                        </div>

                        {/* Program 1 — Community Mobilization */}
                        <div className="mb-16 bg-surface-container-low rounded-2xl overflow-hidden shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="md:col-span-4 bg-primary p-10 flex flex-col justify-center">
                                    <span className="text-secondary-container font-bold text-xs tracking-widest uppercase mb-4">Program 01</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-white mb-3">Community Mobilization</h3>
                                    <p className="text-white/70 text-sm font-semibold italic">Reach – Engage – Empower</p>
                                    <div className="mt-6 w-12 h-1 bg-secondary-container"></div>
                                </div>
                                <div className="md:col-span-8 p-10 space-y-6">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant leading-relaxed text-sm">To engage and mobilize defense families and civilian communities, especially underprivileged groups, by creating awareness about opportunities in skill development, entrepreneurship, and social innovation.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">route</span> Approach</h4>
                                        <p className="text-on-surface-variant text-sm">Outreach is conducted through household visits, community halls (Samaj Mandirs), religious institutions, youth clubs, SHG federations, schools and colleges, International Business Expo Pune.</p>
                                    </div>
                                    <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-6">
                                        <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">trending_up</span> Impact</h4>
                                        <p className="text-on-surface-variant text-sm">The initiative has successfully reached <strong className="text-primary">over 10,000+ beneficiaries</strong> from defense and civilian communities through the efforts of KCB and DMF under the COE.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Program 2 — Counselling */}
                        <div className="mb-16 bg-surface-container-low rounded-2xl overflow-hidden shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-12">
                                <div className="md:col-span-4 bg-[#2e7d32] p-10 flex flex-col justify-center">
                                    <span className="text-white/70 font-bold text-xs tracking-widest uppercase mb-4">Program 02</span>
                                    <h3 className="font-headline text-3xl font-extrabold text-white mb-3">Counselling Sessions</h3>
                                    <p className="text-white/70 text-sm font-semibold italic">Guiding Talent, Shaping Careers</p>
                                    <div className="mt-6 w-12 h-1 bg-white/30"></div>
                                </div>
                                <div className="md:col-span-8 p-10 space-y-6">
                                    <div>
                                        <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32]">flag</span> Objective</h4>
                                        <p className="text-on-surface-variant leading-relaxed text-sm">To provide personalized career guidance, skill mapping, and mentorship to youth, women, and defense families, enabling them to make informed career choices and access employment opportunities.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-headline font-bold text-primary mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32]">route</span> Approach</h4>
                                        <ul className="text-on-surface-variant text-sm space-y-1 ml-4 list-disc">
                                            <li>Individual career counseling and guidance</li>
                                            <li>Community Counselling</li>
                                            <li>Skills and talent assessment</li>
                                            <li>Mentorship sessions with industry experts and innovators</li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#2e7d32]/10 border border-[#2e7d32]/30 rounded-xl p-6">
                                        <h4 className="font-headline font-bold text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32]">trending_up</span> Impact</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center bg-white rounded-lg p-4">
                                                <div className="font-headline text-3xl font-black text-[#2e7d32]">230+</div>
                                                <div className="text-xs text-on-surface-variant uppercase tracking-wide mt-1">Youths & Women Enrolled in SkillReach, She Leads & COE</div>
                                            </div>
                                            <div className="text-center bg-white rounded-lg p-4">
                                                <div className="font-headline text-3xl font-black text-[#2e7d32]">200+</div>
                                                <div className="text-xs text-on-surface-variant uppercase tracking-wide mt-1">School Students in Career Guidance Program</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Program 3 — SkillReach */}
                        <div id="skill-reach" className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg">
                            <div className="bg-primary text-white p-10">
                                <span className="text-secondary-container font-bold text-xs tracking-widest uppercase mb-3 block">Program 03 </span>
                                <h3 className="font-headline text-3xl font-extrabold mb-2">SkillReach — Job Readiness Program</h3>
                                <p className="text-white/70 max-w-3xl">COE's ongoing programs actively focus on skill enhancement, entrepreneurship development, career guidance, and language proficiency, benefiting hundreds of youth and women from defence families and civilian communities.</p>
                            </div>
                            <div className="p-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* 1. Foreign Languages */}
                                    <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-headline font-black text-lg">1</div>
                                            <h4 className="font-headline font-bold text-primary text-lg">Foreign Languages Training</h4>
                                        </div>
                                        <div className="space-y-2 text-sm text-on-surface-variant">
                                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-lg">
                                                <span className="font-medium text-primary">🇩🇪 German (A1, A2, B1)</span>
                                                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">20 students/batch</span>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-lg">
                                                <span className="font-medium text-primary">🇯🇵 Japanese Language</span>
                                                <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">20 enrolled</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 2. Digital & Technical */}
                                    <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-[#2e7d32] text-white rounded-lg flex items-center justify-center font-headline font-black text-lg">2</div>
                                            <h4 className="font-headline font-bold text-primary text-lg">Digital & Technical Skills</h4>
                                        </div>
                                        <div className="space-y-2 text-sm text-on-surface-variant">
                                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-lg">
                                                <span className="font-medium text-primary">Advanced Excel</span>
                                                <span className="text-xs bg-[#2e7d32] text-white px-2 py-0.5 rounded-full">120 benefited</span>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-lg">
                                                <span className="font-medium text-primary">Digital Marketing</span>
                                                <span className="text-xs bg-[#2e7d32] text-white px-2 py-0.5 rounded-full">25 completed</span>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-lg">
                                                <span className="font-medium text-primary">Tally Prime with GST</span>
                                                <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">10 enrolled</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 3. Women's Entrepreneurship */}
                                    <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center font-headline font-black text-lg">3</div>
                                            <h4 className="font-headline font-bold text-primary text-lg">Women's Entrepreneurship</h4>
                                        </div>
                                        <div className="space-y-2 text-sm text-on-surface-variant">
                                            <div className="px-3 py-2 bg-surface-container-low rounded-lg">
                                                <div className="font-medium text-primary">🍬 Sweet Enterprise Development</div>
                                                <div className="text-xs mt-1">15 women formed a Common Producer Group for startup</div>
                                            </div>
                                            <div className="px-3 py-2 bg-surface-container-low rounded-lg">
                                                <div className="font-medium text-primary">👜 Leather Enterprise Development</div>
                                                <div className="text-xs mt-1">10 women developed skills for enterprise initiatives</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* 4. Career & Defence */}
                                    <div className="bg-white border border-outline-variant/20 rounded-xl p-6 shadow-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-headline font-black text-lg">4</div>
                                            <h4 className="font-headline font-bold text-primary text-lg">Career Guidance & Defence</h4>
                                        </div>
                                        <div className="px-3 py-3 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                                            <div className="font-headline text-3xl font-black text-primary">200+</div>
                                            <p className="text-sm text-on-surface-variant mt-1">Students currently receiving guidance on career opportunities in the defence sector after 10th grade, preparing them for informed career choices.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Impact Timeline */}
                <section className="py-24 bg-surface px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Journey So Far</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">ICOE Impact Timeline</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-outline-variant/40 hidden md:block"></div>
                            <div className="space-y-10">
                                {[
                                    {
                                        date: 'September 2025',
                                        title: 'ICOE Established',
                                        desc: 'MOU signed between Khadki Cantonment Board and Dr. Dnyaneshwar Mulay Foundation. COE inaugurated at Nehru Garden, Khadki, Pune.',
                                        color: 'bg-primary',
                                        tag: 'Milestone',
                                    },
                                    {
                                        date: 'Sept – Oct 2025',
                                        title: 'Community Mobilization Drive',
                                        desc: 'Outreach conducted across household visits, Samaj Mandirs, schools, and colleges. Over 10,000+ beneficiaries reached across defence and civilian communities.',
                                        color: 'bg-secondary-container',
                                        tag: 'Outreach',
                                    },
                                    {
                                        date: 'Oct 2025',
                                        title: 'SkillReach Programmes Launched',
                                        desc: 'German (A1–B1), Japanese Language, Advanced Excel, Digital Marketing, and Tally Prime training batches commenced with 230+ youth enrolled.',
                                        color: 'bg-[#2e7d32]',
                                        tag: 'Training',
                                    },
                                    {
                                        date: 'Nov 2025',
                                        title: 'She Leads — Women Enterprise Drive',
                                        desc: '25 women trained in Sweet Enterprise and Leather Enterprise development. Two Common Producer Groups formed for self-sustaining startup ventures.',
                                        color: 'bg-primary',
                                        tag: 'Empowerment',
                                    },
                                    {
                                        date: 'Dec 2025',
                                        title: 'International Job Placement Pipeline',
                                        desc: 'Partnership established with global job recruitment agencies. 200+ candidates shortlisted for BSc Nursing and ITI Electrician placements in Germany.',
                                        color: 'bg-secondary-container',
                                        tag: 'Global',
                                    },
                                    {
                                        date: 'Ongoing 2026',
                                        title: 'Career Guidance & School Outreach',
                                        desc: '200+ school students enrolled in the Defence Career Guidance programme, helping them explore career paths in the armed forces post 10th grade.',
                                        color: 'bg-[#2e7d32]',
                                        tag: 'Education',
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-8 items-start">
                                        <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16">
                                            <div className={`w-4 h-4 rounded-full ${item.color} shadow-lg mt-1`}></div>
                                        </div>
                                        <div className="flex-1 bg-surface-container-low rounded-2xl p-8 shadow-sm border border-outline-variant/10 hover:-translate-y-1 transition-all duration-300">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full text-white ${item.color}`}>{item.tag}</span>
                                                <span className="text-xs font-bold text-secondary uppercase tracking-widest">{item.date}</span>
                                            </div>
                                            <h4 className="font-headline text-xl font-bold text-primary mb-2">{item.title}</h4>
                                            <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
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

                {/* ── Social Innovation Path ─────────────────────────────── */}
                <section className="py-24 bg-surface px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Social Innovation Path</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                At Dr. Dnyaneshwar Mule Foundation, we believe that real and lasting change emerges when innovation meets purpose. Our Social Innovation Labs are dynamic platforms where ideas, people, and resources come together to solve pressing social challenges — bringing together students, academicians, government stakeholders, industry experts, and community members to co-create practical, scalable, and impactful solutions.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-primary/5 border-l-4 border-secondary-container rounded-r-2xl p-8 mb-16 max-w-3xl mx-auto">
                            <h3 className="font-headline text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-secondary-container">visibility</span> Our Vision
                            </h3>
                            <p className="text-on-surface-variant leading-relaxed">To build a vibrant ecosystem of innovation that empowers communities, strengthens institutions, and drives sustainable and inclusive development.</p>
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


                {/* ── Centre of Excellence — 4 Key Programs ──────────────── */}
                <section className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Centre of Excellence</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">High-Impact Programs</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                Dr. Dnyaneshwar Mule Foundation delivers future-focused programs designed to empower youth, women, and institutions through skill development, innovation, and global opportunities — aligned with national priorities and global workforce demands.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* Program 1 — International Job Readiness */}
                            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    <div className="md:col-span-4 bg-primary p-10 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center font-headline font-black text-2xl text-on-secondary-container mb-4">1</div>
                                        <h3 className="font-headline text-2xl font-extrabold text-white mb-2">International Job Readiness Program</h3>
                                        <p className="text-white/60 text-sm italic">Preparing a globally competent workforce</p>
                                    </div>
                                    <div className="md:col-span-8 p-10 space-y-6">
                                        <p className="text-on-surface-variant leading-relaxed">Prepares candidates for global employment by equipping them with industry-relevant skills, cultural competencies, and professional readiness for international industries such as healthcare, manufacturing, construction, and services.</p>
                                        <div>
                                            <h4 className="font-headline font-bold text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">list_alt</span> Key Components</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {['Language and communication training', 'Technical and domain-specific skill development', 'Pre-departure orientation (culture, workplace ethics, legal awareness)', 'Soft skills and personality development', 'Placement support through international partnerships'].map((c, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm text-on-surface-variant px-3 py-2 bg-surface-container-low rounded-lg">
                                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>{c}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program 2 — Entrepreneurship Cum Skill Development */}
                            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    <div className="md:col-span-4 bg-[#2e7d32] p-10 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-headline font-black text-2xl text-white mb-4">2</div>
                                        <h3 className="font-headline text-2xl font-extrabold text-white mb-2">Entrepreneurship Cum Skill Development</h3>
                                        <p className="text-white/60 text-sm italic">Fostering local enterprise and jobs</p>
                                    </div>
                                    <div className="md:col-span-8 p-10 space-y-6">
                                        <p className="text-on-surface-variant leading-relaxed">Fosters entrepreneurship while building employable skills among youth — leading to creation of sustainable micro and small enterprises, job creation, and local economic development.</p>
                                        <div>
                                            <h4 className="font-headline font-bold text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-[#2e7d32]">list_alt</span> Key Components</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {['Skill-based training aligned with local market needs', 'Entrepreneurship development modules (business planning, finance, marketing)', 'Mentorship and incubation support', 'Access to credit linkages and government schemes', 'Market linkage and enterprise support'].map((c, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm text-on-surface-variant px-3 py-2 bg-surface-container-low rounded-lg">
                                                        <span className="material-symbols-outlined text-[#2e7d32] text-sm mt-0.5">check</span>{c}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program 3 — Women Entrepreneurship */}
                            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    <div className="md:col-span-4 bg-secondary-container p-10 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center font-headline font-black text-2xl text-on-secondary-container mb-4">3</div>
                                        <h3 className="font-headline text-2xl font-extrabold text-on-secondary-container mb-2">Women Entrepreneurship Development</h3>
                                        <p className="text-on-secondary-container/60 text-sm italic">Empowering women economically &amp; socially</p>
                                    </div>
                                    <div className="md:col-span-8 p-10 space-y-6">
                                        <p className="text-on-surface-variant leading-relaxed">Enhances financial independence of women, increasing their participation in economic activities, especially in rural and underserved communities — through SHGs, digital literacy, and market access.</p>
                                        <div>
                                            <h4 className="font-headline font-bold text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">list_alt</span> Key Components</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {['Capacity building and entrepreneurial training', 'Formation and strengthening of Self-Help Groups (SHGs)', 'Financial literacy and access to credit', 'Product development, branding, and marketing support', 'Digital literacy and e-commerce integration'].map((c, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm text-on-surface-variant px-3 py-2 bg-surface-container-low rounded-lg">
                                                        <span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check</span>{c}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Program 4 — Social Innovation Academia */}
                            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    <div className="md:col-span-4 bg-primary p-10 flex flex-col justify-center">
                                        <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center font-headline font-black text-2xl text-on-secondary-container mb-4">4</div>
                                        <h3 className="font-headline text-2xl font-extrabold text-white mb-2">Social Innovation – Academia Development</h3>
                                        <p className="text-white/60 text-sm italic">Bridging academia and real-world impact</p>
                                    </div>
                                    <div className="md:col-span-8 p-10 space-y-6">
                                        <p className="text-on-surface-variant leading-relaxed">Bridges the gap between academic learning and real-world problem-solving — developing socially responsible innovators and scalable solutions addressing challenges in education, health, environment, and governance.</p>
                                        <div>
                                            <h4 className="font-headline font-bold text-primary mb-3 flex items-center gap-2"><span className="material-symbols-outlined text-secondary-container">list_alt</span> Key Components</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {['Establishment of Social Innovation Labs in colleges and universities', 'Interdisciplinary project-based learning on real-world challenges', 'Collaboration with government, CSR, and industry partners', 'Mentorship from experts and practitioners', 'Research, prototyping, and scaling of innovative solutions'].map((c, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm text-on-surface-variant px-3 py-2 bg-surface-container-low rounded-lg">
                                                        <span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>{c}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ── Orphanage Support Programme ─────────────────────────── */}
                <section id="orphanage" className="py-24 bg-surface-container-low px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Orphanage Support Programme</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                The Dr. Dnyaneshwar Mule Foundation actively supports orphaned and underprivileged children through holistic care, education, and skill development initiatives — giving every child dignity, opportunity, and hope for a better future.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            {/* Left — What We Do */}
                            <div className="space-y-6">
                                {[
                                    { icon: 'child_care', title: 'Child Welfare & Nutrition', desc: 'Ensuring access to nutritious meals, clean clothing, and safe shelter for children in care.' },
                                    { icon: 'school', title: 'Education Support', desc: 'Sponsoring school fees, books, and stationery to keep children enrolled and learning.' },
                                    { icon: 'psychology', title: 'Counselling & Mental Health', desc: 'Providing psychosocial support and trained counsellors for emotional well-being.' },
                                    { icon: 'volunteer_activism', title: 'Community Volunteering', desc: 'Mobilising corporate and community volunteers for regular engagement with children.' },
                                    { icon: 'build', title: 'Vocational Skill Training', desc: 'Introducing age-appropriate vocational skills to prepare older children for livelihood.' },
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

                            {/* Right — Pillars */}
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">child_friendly</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">Our Commitment</h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                                        DMF believes no child should grow up without love, care, and the tools to build a meaningful life. Through partnerships with registered orphanages and child care institutions, we bring consistent, quality support.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { num: '3+', label: 'Orphanages Supported' },
                                            { num: '150+', label: 'Children Reached' },
                                            { num: '100%', label: 'Volunteer-Driven' },
                                            { num: '2019', label: 'Initiative Since' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                                                <div className="font-headline text-2xl font-black text-secondary-container">{s.num}</div>
                                                <div className="text-white/70 text-xs uppercase tracking-wide mt-1">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest rounded-2xl p-8 border-t-4 border-secondary-container">
                                    <h4 className="font-headline font-bold text-primary text-lg mb-4">How You Can Help</h4>
                                    <ul className="space-y-3 text-on-surface-variant text-sm">
                                        {[
                                            "Sponsor a child's education for a year",
                                            "Donate essentials \u2014 books, clothes, hygiene kits",
                                            "Volunteer your time or professional skills",
                                            "Partner organisations can link through CSR funding",
                                        ].map((h, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ICOE() {
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
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">PROGRAM 01</span>
                            <h2 className="font-headline text-4xl font-bold text-primary mb-6 leading-tight">About DMF</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-8"></div>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                The <strong className="text-primary">Dr. Dnyaneshwar Mulay Foundation (DMF)</strong> is a globally recognized non-profit organization with deep roots in India, committed to providing innovative and beneficial solutions since 2019.
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                Founded by <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong>, a distinguished career diplomat of the Indian Foreign Service, DMF has been at the forefront of driving social transformation through education, skill development, women's empowerment, and community engagement.
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-4">
                                During flood emergencies in Kolhapur-Sangli district in Maharashtra and subsequently during COVID-19, DMF strengthened its work and today conducts significant activities contributing to social change across India and beyond.
                            </p>
                            <p className="text-on-surface-variant leading-relaxed text-base max-w-4xl mx-auto mb-10">
                                The foundation specializes in <strong className="text-primary">Social Innovation, Urban & Rural Mobilization, Capacity & Skill Building</strong>, and <strong className="text-primary">Transforming Rural & Urban Education</strong> through Digital Classrooms and Innovation Labs.
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
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Discover</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Our Initiatives</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-2xl mx-auto">Explore the various programs and initiatives undertaken by the foundation to drive positive social change.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: 'sentiment_very_satisfied', label: 'Movement of Positivity', desc: 'A values-driven initiative fostering optimism, ethical leadership, and constructive community action. We aim to inspire a wave of positive change across communities through awareness and engagement.', to: '/movement-of-positivity', color: 'bg-primary text-white', image: '/Images/mop_image.jpeg', points: ['Leadership Development', 'Positivity Campaigns', 'Awareness Drives'] },
                                { icon: 'school', label: 'International Center of Excellence', desc: 'A collaborative platform for innovation, skill development, and youth empowerment. We connect talented individuals with national and global opportunities to shape a better future.', to: '/international-center-of-excellence', color: 'bg-[#2e7d32] text-white', image: '/Images/icoe_page.jpeg', points: ['Social Innovation', 'Employability Skills', 'Entrepreneurship'] },
                                { icon: 'menu_book', label: 'Words Beyond Borders', desc: 'An international literary gathering celebrating the creative works of diplomat-authors. It explores unique perspectives on global affairs through poetry, fiction, and compelling memoirs.', to: '/words-beyond-borders', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/words_beyound_borders.jpeg', points: ['Diplomat-Authors', 'Global Perspectives', 'Literary Gathering'] },
                                { icon: 'local_hospital', label: 'Nursing College', desc: 'Developing compassionate and skilled healthcare professionals through the GNM diploma program. We combine strong clinical training with ethical values to ensure global placement readiness.', to: '/nursing-college', color: 'bg-primary text-white', image: '/Images/nursing_collage.jpeg', points: ['3-Year GNM Program', 'Clinical Skills', 'Global Placement'] },
                                { icon: 'lightbulb', label: 'Social Innovation Path', desc: 'Dynamic labs where ideas and resources meet to co-create solutions for pressing social challenges. We foster collaboration to build scalable, sustainable, and community-centric models.', to: '/social-innovation-path', color: 'bg-[#2e7d32] text-white', image: '/Images/Social_innovation_path.jpeg', points: ['Co-create Solutions', 'Scale Impact', 'Build Capacities'] },
                                { icon: 'diversity_3', label: 'She Leads', desc: 'Empowering women from defence and civilian families through vocational skills, financial literacy, and entrepreneurship. We support the creation of self-sustaining producer groups.', to: '/she-leads', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/she_leads.jpeg', points: ['Vocational Training', 'Financial Literacy', 'Market Linkages'] },
                                { icon: 'build', label: 'Skill Reach', desc: 'Equipping youth with essential digital, technical, and foreign language skills. We provide personalized career guidance to enhance their employability in the modern workforce.', to: '/skill-reach', color: 'bg-primary text-white', image: '/Images/skill_reach.png', points: ['Digital & Tech Skills', 'Career Guidance', 'Defence Sector'] },
                                { icon: 'elderly', label: 'Shelter Home', desc: 'Providing a safe, nurturing, and dignified living environment for senior citizens. We ensure holistic care, emotional support, and meaningful engagement for every resident.', to: '/shelter-home', color: 'bg-[#2e7d32] text-white', image: '/Images/Seltter_home.jpeg', points: ['Safe Living', 'Healthcare Support', 'Social Engagement'] },
                                { icon: 'groups', label: 'DTNT Lives Matter', desc: 'Restoring dignity, rights, and livelihood opportunities for marginalized tribal communities. Our grassroots interventions focus on identity, education, and sustainable development.', to: '/dtnt-lives-matter', color: 'bg-secondary-container text-on-secondary-container', image: '/Images/dtnt_lives.jpeg', points: ['Identity & Rights', 'Education Access', 'Livelihood Support'] },
                                { icon: 'work', label: 'Job Fair', desc: 'Facilitating international employment opportunities and socio-economic upliftment. We connect qualified candidates with global recruiters while supporting the mainstreaming of sanitation workers.', to: '/job-fair', color: 'bg-primary text-white', image: '/Images/Job_fair.jpeg', points: ['SafsafaiSathi Mainstreaming', 'Global Placement', 'Employment Drives'] },
                            ].map((item, i) => (
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
                                                        Explore <span className="material-symbols-outlined text-lg">arrow_forward</span>
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
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">Coming Soon</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Upcoming Programs</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-4"></div>
                            <p className="text-on-surface-variant max-w-xl mx-auto">ICOE continues to expand its portfolio with new programs designed to meet evolving community needs.</p>
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
                            <span className="font-label text-secondary text-xs font-bold tracking-widest uppercase mb-3 block">ICOE-KCB-DMF</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Contact Us</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <a href="tel:+918378086159" className="group bg-surface-container-lowest rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300 border border-outline-variant/10">
                                <div className="w-16 h-16 bg-secondary-container/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-container transition-colors">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl group-hover:text-on-secondary-container">phone</span>
                                </div>
                                <h4 className="font-headline font-bold text-primary mb-2">Phone</h4>
                                <p className="text-on-surface-variant text-sm">+91 8378086159</p>
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

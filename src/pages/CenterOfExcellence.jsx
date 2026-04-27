import React from 'react';

export default function CenterOfExcellence() {
    return (
        <div>
            <main>
                <section className="bg-primary mt-[88px] py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Left: Text */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">International Center of Excellence</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">NURTURING</span>
                                    <span className="block mb-2">INNOVATION</span>
                                    <span className="block text-secondary-container mb-2">YOUTH</span>
                                    <span className="block text-secondary-container">EMPOWERMENT.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Center of Excellence" className="w-full h-full object-cover" src="/Images/WhatsApp Image 2026-04-09 at 15.25.51.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="icoe" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
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
                                        Under Dr. Mulay's leadership through DMF, the ICOE was established as a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities.
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
                                        "The ICOE serves as a collaborative centre dedicated to innovation and skill development — a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

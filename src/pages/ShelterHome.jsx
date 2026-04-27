import React from 'react';

export default function ShelterHome() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Shelter Home</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">PROVIDING</span>
                                    <span className="block mb-2">CARE</span>
                                    <span className="block text-secondary-container mb-2">DIGNIFIED</span>
                                    <span className="block text-secondary-container">LIVING.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Shelter Home" className="w-full h-full object-cover" src="/Images/selter_home.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="old-age-home" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Shelter Home – A Home of Dignity, Care & Compassion</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                At the Dr. Dnyaneshwar Mulay Foundation, we believe that every individual deserves to age with dignity, respect, and emotional security. Our Shelter Home initiative is a heartfelt effort to provide a safe, nurturing, and inclusive environment for senior citizens who seek care, companionship, and a sense of belonging.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
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
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">elderly</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">Our Vision & Mission</h3>
                                    <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium italic">
                                        "To create a compassionate community where elderly individuals live with dignity, independence, and happiness, supported by holistic care and meaningful engagement."
                                    </p>
                                    <div className="rounded-xl overflow-hidden mt-6 border border-white/20">
                                        <img src="/Images/Seltter_home.jpeg" alt="Shelter Home" className="w-full h-80 object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

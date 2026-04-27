import React from 'react';

export default function MovementOfPositivity() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Movement of Positivity</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">FOSTERING</span>
                                    <span className="block mb-2">OPTIMISM</span>
                                    <span className="block text-secondary-container mb-2">ETHICAL</span>
                                    <span className="block text-secondary-container">LEADERSHIP.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Movement of Positivity" className="w-full h-full object-cover" src="/Images/mop_image.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* ── 1. Movement of Positivity ─────────────────────────────── */}
                <section id="movement-of-positivity" className="py-24 bg-primary px-8 relative overflow-hidden min-h-screen">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Core Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-white mb-4">Movement of Positivity / चांगुल पणाची चळवळ / अच्छाई का अभियान</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
                                The Movement of Positivity is the beating heart of the Dr. Dnyaneshwar Mulay Foundation — a values-driven initiative that fosters optimism, ethical leadership, and constructive community action across India.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
                            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-xl h-full group relative">
                                <a href="/Publications/MOV.pdf" target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer relative">
                                    <img src="/Images/MOV.jpeg" alt="Movement of Positivity" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="flex flex-col items-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-5xl mb-2">touch_app</span>
                                            <span className="font-headline font-bold text-xl tracking-widest uppercase">Click Here</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center">
                            <h3 className="font-headline text-xl font-bold text-white mb-3">Join the Movement</h3>
                            <p className="text-white/70 mb-2">We invite individuals, institutions, corporates and public leaders to be part of this transformative journey.</p>
                            <p className="font-headline font-bold text-secondary-container">Together, let us lead with purpose and build a positive future for all.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

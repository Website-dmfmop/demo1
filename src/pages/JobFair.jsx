import React from 'react';

export default function JobFair() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Job Fair</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">FACILITATING</span>
                                    <span className="block mb-2">EMPLOYMENT</span>
                                    <span className="block text-secondary-container mb-2">SOCIO-ECONOMIC</span>
                                    <span className="block text-secondary-container">UPLIFTMENT.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Job Fair" className="w-full h-full object-cover" src="/Images/Job_fair.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="job-fair" className="py-24 bg-primary px-8 relative overflow-hidden min-h-screen">
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">ICOE</span>
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
            </main>
        </div>
    );
}

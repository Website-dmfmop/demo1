import React from 'react';

export default function DTNTLivesMatter() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">DTNT Lives Matter</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">RESTORING</span>
                                    <span className="block mb-2">DIGNITY</span>
                                    <span className="block text-secondary-container mb-2">PROMOTING</span>
                                    <span className="block text-secondary-container">JUSTICE.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="DTNT Lives Matter" className="w-full h-full object-cover" src="/Images/dtnt_lives.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="dtnt-lives-matter" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">DTNT Lives Matter</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-7 space-y-6 text-on-surface-variant leading-relaxed text-base">
                                <p>
                                    The <strong className="text-primary">DTNT Lives Matter</strong> initiative by the Dr. Dnyaneshwar Mulay Foundation is a comprehensive social initiative committed and active in restoring the dignity, guaranteeing rights, and creating sustainable livelihood opportunities for the De-notified, Nomadic, and Semi-Nomadic Tribes (DTNT) of India.
                                </p>
                                <p>
                                    Long stigmatized and marginalized due to the legacy of the colonial-era <em>Criminal Tribes Act of 1871</em>, these communities today, despite having constitutional rights, continue to face problems of poverty, landlessness, lack of identity documents, and deprivation of education, health, and basic services, which has perpetuated the cycle of their marginalization generation after generation.
                                </p>
                                <p>
                                    In this context, working at the grassroots level, this initiative makes concrete interventions in the areas of <strong className="text-primary">identity, education, healthcare, and livelihood</strong> to provide visibility to the community, strengthen their voice, and create opportunities. Additionally, alongside connecting communities with existing government schemes like the SEED Scheme for Denotified Tribes, it demands and frames more inclusive policies according to their contemporary needs.
                                </p>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl mt-6">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        Based on the values of justice and inclusion, this initiative brings about a transformation from "a struggle for survival" to "the right to live with dignity," achieving the goal of making these communities self-reliant, empowered, and active participants in the overall development of the nation.
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-5 flex flex-col gap-6">
                                <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 h-[500px]">
                                    <img src="/Images/dr_vinayak.jpeg" alt="Prof Dr Vinayak Lashkar" className="w-full h-full object-cover object-top" />
                                </div>
                                <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-secondary-container">
                                    <h3 className="font-headline font-bold text-primary text-xl mb-1">Prof Dr Vinayak Lashkar</h3>
                                    <div className="text-secondary-container font-semibold text-sm uppercase tracking-wider mb-2">Expert - DTNT Development</div>
                                    <p className="text-on-surface-variant text-sm">Dedicated to DTNT community development.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

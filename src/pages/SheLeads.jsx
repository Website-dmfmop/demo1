import React from 'react';

export default function SheLeads() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">She Leads</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">EMPOWERING</span>
                                    <span className="block mb-2">WOMEN</span>
                                    <span className="block text-secondary-container mb-2">BUILDING</span>
                                    <span className="block text-secondary-container">LEADERS.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="She Leads" className="w-full h-full object-cover" src="/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="she-leads" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                    She Leads — <span className="text-[#2e7d32]">Women's Enterpreneurship Programme</span>
                                </h2>
                                <div className="w-16 h-1 bg-[#2e7d32] mb-8"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    <strong className="text-primary">She Leads</strong> is a flagship initiative under ICOE focused exclusively on empowering women from defence families and civilian communities. The programme builds confidence, vocational skills, and entrepreneurial mindset to enable sustainable livelihoods.
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
                            <div className="flex flex-col gap-6">
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
                                <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: '360px' }}>
                                    <img
                                        src="/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg"
                                        alt="She Leads — Women Enterprise Workshop"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

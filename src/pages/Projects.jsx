import React from 'react';

export default function Projects() {
  return (
    <div>
      
<main>
{/* Hero Section */}
<section className="relative px-8 pt-32 pb-20 overflow-hidden">
<div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
<div className="md:col-span-7 z-10">
<span className="font-label text-secondary font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Missions</span>
<h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
                        Catalyzing <span className="text-secondary-container">Progress</span> Through Purpose.
                    </h1>
<p className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed mb-8">
                        Our ongoing initiatives are designed to dismantle systemic barriers in Education, Justice, and Healthcare across the nation.
                    </p>
</div>
<div className="md:col-span-5 relative">
<div className="asymmetric-bleed aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
<img alt="Social Impact" className="w-full h-full object-cover" data-alt="Dignified portrait of an elderly man receiving healthcare assistance in a clean, modern medical setting with warm natural sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc_2-sKV48YZ7RofihcMrVSCAnk335yRhvmZ21wtM0bETIxBr37YcMF5SFQ0icFpKYmpx7zvTW0Ueqbw1BaLAkCK4K9kS_OffNLwsTNEfU8wG8EsJcs5KxjrAgVCF3kZxvjxDdSEeInk58PWnBG5x0N1mf_nW2azib_OBkwxK6bJ5zPDsy2zsaeEWoii9kbvU5b9AAJnN_61mBXLrvu4pf51MQd0s2F18myO-sLSYbTdETBqMWx4NQ9ujvIRIS02elNt_dcrXTyJ2c"/>
</div>
<div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-lg shadow-xl max-w-xs hidden md:block">
<p className="text-secondary font-bold text-3xl font-headline">15+</p>
<p className="text-on-surface-variant font-label text-sm uppercase tracking-wider">Active State-Level Initiatives</p>
</div>
</div>
</div>
</section>
{/* Filter Bar */}
<section className="bg-surface-container sticky top-[72px] z-40">
<div className="max-w-7xl mx-auto px-8 py-6 flex flex-wrap items-center justify-between gap-6">
<div className="flex gap-4">
<button className="px-6 py-2 rounded-full bg-primary text-white font-label text-sm font-semibold transition-all">All Initiatives</button>
<button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-primary-fixed-dim hover:text-primary font-label text-sm font-semibold transition-all">Education</button>
<button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-primary-fixed-dim hover:text-primary font-label text-sm font-semibold transition-all">Justice</button>
<button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant hover:bg-primary-fixed-dim hover:text-primary font-label text-sm font-semibold transition-all">Healthcare</button>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
<input className="pl-10 pr-4 py-2 bg-surface-container-lowest border-none rounded-md text-sm focus:ring-2 focus:ring-secondary-container w-64 shadow-sm" placeholder="Search projects..." type="text"/>
</div>
</div>
</section>
{/* Projects Grid */}
<section className="px-8 py-20 bg-surface">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
{/* Project Card 1: Justice */}
<div className="group flex flex-col">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6">
<img alt="Legal Aid" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Interior of a classic library with scales of justice on a mahogany table, moody lighting with dust motes in sunbeams" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FfulEbs599AwVb0m0HKBz8wN-u991eGl6Q8EZZrCxXZ4C7UuYaoHPtTGrp6kO69LJgampcfTQJsMhZOraaAQgLUGaI4kgdqG03YuZMJZeY0LkCXBgFsGzVKwmGfOLMaMyggQ5t6nLciznRtawfM2bD_nPDWtIjFUuDrp9RBhnPE-hD_aFdNS469H52am_9RBytm31lagRhMlOnzm_tAG7hY3EgkBwlO6s4jWsIgeUCfqpC4EF9UUQm69OfuUSc4cqediN_yzINHl"/>
<div className="absolute top-4 left-4 bg-primary text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Justice</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Nyaya Shakti: Rural Legal Empowerment</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            Providing pro-bono legal counsel and constitutional literacy workshops to marginalized farming communities across the Konkan belt.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/* Project Card 2: Liberty (Education) */}
<div className="group flex flex-col">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6">
<img alt="Education" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Sunlit classroom in a rural setting with vibrant colors, happy children engaged in learning with digital tablets and books" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Ozm--ayDmJWXZPfcaKOfLQvb_u__LXBfTwE_RTlTkTjQqv9LYP0eqcjqIAbf-Hk-FDFurlX0MK4UHZBSeNKG9n3EHBSyBJrrnZuP5RO_oaiRWKZnkf62ufwHrxEwuZhOyLe9hIfxz26e7V-7Ukjneb5qfzpcGjudeJqRfqf1cXBFuI_H-qrTbT1_qmLhPsdg7t7YOs5wXOiOhLPB5_8JYwOWxA9HhbLRh18XQGu0nDOGaNuevxj6XvN97TluecD-cYWEwLDj4QZ4"/>
<div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Liberty</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Vishwa Vidya: Digital Bridge</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            Equipping tier-3 city municipal schools with modern IT labs and specialized curriculum for the digital economy.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/* Project Card 3: Equality (Healthcare) */}
<div className="group flex flex-col">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6 border-l-4 border-on-tertiary-container">
<img alt="Healthcare" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Doctor holding the hand of a patient in a sterile, modern clinic, emphasizing empathy and professional medical care" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLRfcaJGi2taqALTucrc1UsmtFDHl1E1Uyx_67Yrnksawp--FrkUmubn2020N5_mdleUwtwL0FYxTpMW3SfdF2_Le4NC_swsic7DgWY0HY_0l-JuWqgYZmhZSUn14N6Mcu68BHc84_SbLuvVttxNNUKXEySzbbRvUZLzOgJVowXsBF1itdqP2Kb2od3vF6PUgwkYjvP8MuQ8SxWFvZ4bbGGJdXjQuGR9tgcgaaYtRywqc313gKuwGmmdCJDgN_XPfG6ij8ZMbgDNr4"/>
<div className="absolute top-4 left-4 bg-on-tertiary-container text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Equality</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Aarogya Setu: Last-Mile Wellness</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            Mobile health clinics providing specialized cardiac and pediatric care to remote tribal hamlets.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/* Project Card 4: Justice */}
<div className="group flex flex-col md:translate-y-12">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6">
<img alt="Reform" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Focused professional writing on parchment with a fountain pen, soft desk lamp light creating a scholarly atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8W0Cbe1qWaeFb6fPJSoZaW2sbqZRF27PItZC6HcZQFBvdbl9jmreT4KAtAATBGHy5cSXUYQZrFWXzZdUvrkWiNSMafq35MvjnE5OhxbSSP_zzbKDDkT0oVQn_H4kV8L7hVDsBM7n2CSlRR76CC6vVzsa_8Vh9uHKQttRHS876og5-7prrtrjQxwMdFO5-k7CJhs2MJwL8zRXkI3wYetCQ9uCk_g7Btv1hQy8E2iyo0ffhn8EJfi58Ji1gqYLE2sExvDTemKCL7Ug0"/>
<div className="absolute top-4 left-4 bg-primary text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Justice</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Prajna: Policy Reform Institute</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            A non-partisan think tank focused on legislative research to modernize administrative frameworks for better governance.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/* Project Card 5: Liberty */}
<div className="group flex flex-col md:translate-y-12">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6">
<img alt="Skill Development" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Group of diverse young women working on computer hardware in a bright, modern workshop environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnvLTqImpRaPtgk2pPsiSMwlLL7mglwj9SF-2qXIyiAW3d07RaHdf0aJC29LaRlb1-31CZwyj1UhBEk0c7S-XPUMLQ4lss2Aqvzo66foY049FYYMcGK_4jy042NsDtxd1m8n-pGIlHQ7Isgqh9pynRJRob0HrcsVyz6T02OE__if6gCBGyxCv1yYgrNRsW47-HZJ2nk8SnLe12dlAK3-VNpaIQhgk0tYjLiMP0TMguXEaCbEvz8AOmlqVvUYIPIAvLIYM-j8kqounf"/>
<div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Liberty</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Udyam: Women's Fintech Collective</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            Financial literacy and micro-loan programs specifically tailored for women entrepreneurs in the handicraft sector.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
{/* Project Card 6: Equality */}
<div className="group flex flex-col md:translate-y-12">
<div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-6 border-l-4 border-on-tertiary-container">
<img alt="Sustainability" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="Lush vegetable garden in an urban environment with community members tending to the plants under a clear blue sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Le9Gia7a0JT6Rq4C0CLOxJP2eaDM06BWA_DrEQk72HAft2uGgP7w67f0pSW0QSe5Eqhm5eMqmofeUAK5Rj57-96zBhHCvvsa0kcN_uDvD-Q4oAgkmvIc_uHEHXSZpLAqSrTIeoVw87HvKNA-vv5KiMBkXVQOCApaLcPCGHFE_oRNZAy2IxRbkxtCmjzT3FkY1RlK-RHDAmF_KekxObBONou0mZHEaUmotdvtwgodZ8Qzzp3XLQI2b-ajPoGCYlM_hkHqNX94ar7z"/>
<div className="absolute top-4 left-4 bg-on-tertiary-container text-white font-label text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase">Equality</div>
</div>
<div className="flex-grow pr-4">
<h3 className="font-headline text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-container transition-colors">Harit Gram: Sustainable Villages</h3>
<p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                            Implementing solar-powered water irrigation systems and regenerative agriculture practices in drought-prone districts.
                        </p>
</div>
<button className="flex items-center gap-2 font-label text-xs font-bold uppercase tracking-[0.15em] text-primary group-hover:gap-4 transition-all">
                        Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</section>
{/* CTA Section */}
<section className="mt-32 px-8 pb-32">
<div className="max-w-7xl mx-auto rounded-2xl tonal-layer p-12 md:p-24 relative overflow-hidden text-center">
<div className="relative z-10 max-w-3xl mx-auto">
<h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8">Become a Partner in Our National Mission.</h2>
<p className="text-white/80 font-body text-lg mb-12 leading-relaxed">
                        The Dr. Dyaneshawar Mulay Foundation thrives on collaboration. Whether through corporate social responsibility, volunteering, or donations, your contribution creates ripples of change.
                    </p>
<div className="flex flex-col sm:flex-row gap-6 justify-center">
<button className="bg-secondary-container text-on-secondary-container px-10 py-4 font-headline font-bold rounded-md hover:bg-white transition-all transform hover:-translate-y-1">
                            SUPPORT A PROJECT
                        </button>
<button className="border border-white/30 text-white px-10 py-4 font-headline font-bold rounded-md hover:bg-white/10 transition-all backdrop-blur-sm">
                            VOLUNTEER WITH US
                        </button>
</div>
</div>
{/* Background Textured Pattern */}
<div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
</div>
</section>
</main>

    </div>
  );
}

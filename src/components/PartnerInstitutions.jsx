import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { homeTranslations } from '../translations/home';

export const PARTNERS_DATA = [
    {
        name: 'Khadki Cantonment Board',
        short: 'KCB Pune',
        role: 'Defence Local Authority & Campus Partner',
        logo: '/logo/KCB.png',
    },
    {
        name: 'Ministry of Defence',
        short: 'MoD, Govt. of India',
        role: 'Government & Defence Sector Collaboration',
        logo: '/logo/MOFD.png',
    },
    {
        name: 'NITI Aayog',
        short: 'NITI Aayog',
        role: 'National Institution for Transforming India',
        logo: '/logo/niti-aayog-logo-vector.png',
    },
    {
        name: 'National Skill Development Corporation',
        short: 'NSDC',
        role: 'Skill Development & Certification Partner',
        logo: '/logo/nsdc.png',
    },
    {
        name: 'COEP Technological University',
        short: 'COEP Pune',
        role: 'Premier Technology & Engineering Partner',
        logo: '/logo/coep.png',
    },
    {
        name: 'Savitribai Phule Pune University',
        short: 'SPPU',
        role: 'Academic & Research Partner',
        logo: '/logo/Savitribai_Phule_Pune_University_Logo.png',
    },
    {
        name: 'AADI Tech',
        short: 'AADI Technologies',
        role: 'Technology & Social Innovation Partner',
        logo: '/logo/AadiTechLogo.png',
    },
];

export default function PartnerInstitutions({ tag, title, subtitle, showCta = true, className = '' }) {
    const { language } = useLanguage();
    const tHome = homeTranslations[language] || homeTranslations.en;

    const displayTag = tag || tHome.partnersTag || 'Collaborations & Ecosystem';
    const displayTitle = title || tHome.partnersTitle || 'Our Partners';
    const displaySubtitle = subtitle || tHome.partnersDesc || 'DMF proudly collaborates with esteemed government bodies, defence institutions, leading universities, and technology organisations to drive sustainable social change.';

    return (
        <section id="partners" className={`py-20 md:py-24 bg-primary text-white relative overflow-hidden ${className}`}>
            {/* Subtle background radial dot grid texture */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 0.75px, transparent 0.75px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Ambient atmospheric glows */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2e7d32]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="font-label text-secondary-container text-xs font-bold tracking-[0.25em] uppercase mb-3 block">
                        {displayTag}
                    </span>
                    <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        {displayTitle}
                    </h2>
                    <div className="w-20 h-1 bg-secondary-container mx-auto mb-5 rounded-full" />
                    {displaySubtitle && (
                        <p className="text-white/70 text-sm md:text-base leading-relaxed font-body">
                            {displaySubtitle}
                        </p>
                    )}
                </div>

                {/* Marquee Track with edge fade masks */}
                <div
                    className="relative overflow-hidden w-full py-4"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    }}
                >
                    <div
                        className="flex gap-6 sm:gap-8 w-max animate-partner-marquee hover:[animation-play-state:paused]"
                    >
                        {/* Duplicate twice for infinite loop */}
                        {[...Array(2)].flatMap((_, pass) =>
                            PARTNERS_DATA.map((p, i) => (
                                <div
                                    key={`${pass}-${i}`}
                                    className="group flex flex-col items-center gap-3.5 flex-shrink-0 w-48 sm:w-56"
                                >
                                    {/* Partner Logo Card */}
                                    <div className="bg-white rounded-2xl p-5 w-full h-36 sm:h-40 flex items-center justify-center shadow-xl border border-white/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-secondary-container/40">
                                        <img
                                            src={p.logo}
                                            alt={p.name}
                                            loading="lazy"
                                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Institution Name */}
                                    <div className="text-center px-2">
                                        <div className="text-white font-headline font-bold text-xs sm:text-sm tracking-wide group-hover:text-secondary-container transition-colors line-clamp-1">
                                            {p.name}
                                        </div>
                                        <div className="text-white/50 text-[10px] tracking-wider uppercase font-semibold mt-0.5 line-clamp-1">
                                            {p.short}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Optional CTA to Become a Partner */}
                {showCta && (
                    <div className="mt-12 text-center pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <span className="text-white/70 text-xs sm:text-sm">
                            {language === 'hi'
                                ? 'क्या आप सकारात्मक सामाजिक प्रभाव के लिए DMF से जुड़ना चाहते हैं?'
                                : 'Looking to collaborate with DMF on transformative social impact?'}
                        </span>
                        <Link
                            to="/become-a-partner"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary-container text-on-secondary-container font-headline font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-white hover:text-primary transition-all duration-300 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">handshake</span>
                            <span>{tHome.btnBecomePartner || (language === 'hi' ? 'भागीदार बनें' : 'Become a Partner')}</span>
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes partner-marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-partner-marquee {
                    animation: partner-marquee-scroll 35s linear infinite;
                }
            `}</style>
        </section>
    );
}

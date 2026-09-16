import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);
    const { language } = useLanguage();
    const t = commonTranslations[language];

    if (path.startsWith('/admin')) {
        return null;
    }

    const getLinkClass = (targetPath) => {
        const isActive = path === targetPath;
        return `font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap ${isActive
            ? 'text-white border-b-2 border-[#fe9832] pb-1'
            : 'text-white/80 hover:text-white'
            }`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
            <div className="flex w-full items-center justify-between px-6 lg:px-12 py-4">
                <Link to="/" className="flex items-center gap-x-4 flex-shrink-0">
                    <img
                        src="/logo/New Logo.png"
                        alt="DMF - Movement of Positivity"
                        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                    />
                    <div className="flex flex-col max-w-[200px] sm:max-w-[200px] md:max-w-none">
                        <span className="text-[#f97316] font-headline font-extrabold text-sm sm:text-xl leading-tight tracking-wide drop-shadow-sm">
                            {t.brandName}
                        </span>
                        <span className="hidden sm:block text-green-600 font-headline font-extrabold text-xs uppercase tracking-[0.2em] mt-0.5 drop-shadow-sm">
                            {t.brandTagline}
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-x-6 lg:gap-x-8">
                    <div className="hidden lg:flex flex-row items-center gap-x-6 xl:gap-x-8">
                        <Link className={getLinkClass('/')} to="/">{t.navHome}</Link>
                        <Link className={getLinkClass('/about')} to="/about">{t.navWhatWeAre}</Link>
                        <Link className={getLinkClass('/what-we-do')} to="/what-we-do">{t.navWhatWeDo}</Link>

                        {/* ── ICOE First-Class Dropdown ── */}
                        <div className="relative group">
                            <Link
                                to="/icoe"
                                className={`font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                                    path.startsWith('/icoe') || path.startsWith('/admission') || path.startsWith('/competitive-exams-hub') || path === '/job-placement'
                                        ? 'text-white border-b-2 border-[#fe9832] pb-1'
                                        : 'text-white/80 group-hover:text-white'
                                }`}
                            >
                                {t.navIcoe} <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                            </Link>
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                                <Link to="/icoe" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-800 hover:bg-primary/5 hover:text-primary font-semibold transition-colors">
                                    <span className="material-symbols-outlined text-primary text-[18px]">domain</span>
                                    <span>{t.navIcoeOverview}</span>
                                </Link>

                                <div className="h-px bg-gray-100 my-1.5"></div>

                                <Link to="/icoe/admissions/language-course" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-800 hover:bg-primary/5 hover:text-primary font-semibold transition-colors">
                                    <span className="material-symbols-outlined text-secondary-container text-[18px]">translate</span>
                                    <span>{t.navForeignLanguages}</span>
                                </Link>

                                <Link to="/icoe/job-placement" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-800 hover:bg-primary/5 hover:text-primary font-semibold transition-colors">
                                    <span className="material-symbols-outlined text-[#2e7d32] text-[18px]">work</span>
                                    <span>{t.navInternationalJobs}</span>
                                </Link>
                            </div>
                        </div>

                        <Link className={getLinkClass('/media')} to="/media">{t.navMedia}</Link>

                        <div className="relative group">
                            <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1">
                                {t.navJoinUs} <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                            </span>
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                                <Link to="/join-us?purpose=Volunteer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navVolunteer}</Link>
                                <Link to="/join-us?purpose=Member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navMember}</Link>
                                <Link to="/join-us?purpose=Partner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navPartner}</Link>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <Link to="/become-dmf-member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">Become a DMF Member</Link>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <Link to="/slot-booking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">calendar_month</span>{t.navBookSlot}</Link>
                            </div>
                        </div>

                        {/* ── Donate Header Button ── */}
                        <Link
                            to="/donate"
                            className="px-4 py-2 bg-secondary-container hover:bg-white text-on-secondary-container hover:text-primary font-headline font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all duration-300 flex items-center gap-1.5 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-sm">favorite</span>
                            <span>{t.navDonate}</span>
                        </Link>
                    </div>

                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
                    <Link className={getLinkClass('/')} to="/" onClick={() => setMenuOpen(false)}>{t.navHome}</Link>
                    <Link className={getLinkClass('/about')} to="/about" onClick={() => setMenuOpen(false)}>{t.navWhatWeAre}</Link>
                    <Link className={getLinkClass('/what-we-do')} to="/what-we-do" onClick={() => setMenuOpen(false)}>{t.navWhatWeDo}</Link>

                    {/* Mobile ICOE Section */}
                    <div className="flex flex-col gap-2 mt-1 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between px-2">
                            <span className="font-headline tracking-tight uppercase font-bold text-sm text-secondary-container">{t.navIcoe}</span>
                        </div>
                        <div className="flex flex-col gap-2.5 pl-3">
                            <Link to="/icoe" onClick={() => setMenuOpen(false)} className="text-white font-medium text-sm hover:text-secondary-container transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">domain</span>
                                <span>{t.navIcoeOverview}</span>
                            </Link>
                            <Link to="/icoe/admissions/language-course" onClick={() => setMenuOpen(false)} className="text-white font-medium text-sm hover:text-secondary-container transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-secondary-container">translate</span>
                                <span>{t.navForeignLanguages}</span>
                            </Link>
                            <Link to="/icoe/job-placement" onClick={() => setMenuOpen(false)} className="text-white font-medium text-sm hover:text-secondary-container transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-[#2e7d32]">work</span>
                                <span>{t.navInternationalJobs}</span>
                            </Link>
                        </div>
                    </div>

                    <Link className={getLinkClass('/media')} to="/media" onClick={() => setMenuOpen(false)}>{t.navMedia}</Link>

                    <div className="flex flex-col gap-2 mt-1 pt-3 border-t border-white/10">
                        <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[14px] text-white/50 px-2">{t.navJoinUs}</span>
                        <div className="flex flex-col gap-2.5 pl-4">
                            <Link to="/join-us?purpose=Volunteer" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navVolunteer}</Link>
                            <Link to="/join-us?purpose=Member" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navMember}</Link>
                            <Link to="/join-us?purpose=Partner" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navPartner}</Link>
                            <Link to="/become-dmf-member" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">Become a DMF Member</Link>
                            <Link to="/slot-booking" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navBookSlot}</Link>
                        </div>
                    </div>

                    <Link
                        to="/donate"
                        onClick={() => setMenuOpen(false)}
                        className="mt-2 py-3 px-4 bg-secondary-container text-on-secondary-container font-headline font-bold text-sm uppercase tracking-wider rounded-xl text-center shadow-lg flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">favorite</span>
                        <span>{t.navDonate}</span>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

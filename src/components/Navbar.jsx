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
                        src="/logo/DMF_LOGO_PNG_2.png"
                        alt="DMF - Movement of Positivity"
                        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                    />
                    <div className="flex flex-col max-w-[200px] sm:max-w-[200px] md:max-w-none">
                        <span className="text-white font-headline font-bold text-sm sm:text-xl leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            {t.brandName}
                        </span>
                        <span className="hidden sm:block text-[#fe9832] font-headline font-bold text-xs uppercase tracking-[0.2em] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {t.brandTagline}
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-x-8">
                    <div className="hidden lg:flex flex-row items-center gap-x-8">
                        <Link className={getLinkClass('/')} to="/">{t.navHome}</Link>
                        <Link className={getLinkClass('/about')} to="/about">{t.navWhatWeAre}</Link>
                        <Link className={getLinkClass('/icoe')} to="/icoe">{t.navWhatWeDo}</Link>
                        <Link className={getLinkClass('/media')} to="/media">{t.navMedia}</Link>
                        <div className="relative group">
                            <span className={`font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap cursor-pointer flex items-center gap-1 ${path.startsWith('/admission') || path.startsWith('/competitive-exams-hub') ? 'text-white border-b-2 border-[#fe9832] pb-1' : 'text-white/80 group-hover:text-white'}`}>
                                {t.navAdmission} <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                            </span>
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                                <Link to="/admission/gnm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navGnmAdmission}</Link>
                                <Link to="/competitive-exams-hub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navCompetitiveExams}</Link>
                                <Link to="/admission/language-course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navLanguageCourse}</Link>
                                <Link to="/admission/technical-course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navTechnicalCourse}</Link>
                                <Link to="/admission/other-course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navOtherCourse}</Link>
                                <Link to="/live-section" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navLiveSection}</Link>
                            </div>
                        </div>
                        {/* <Link className={getLinkClass('/csr')} to="/csr">{t.navCSR}</Link> */}
                        <Link className={getLinkClass('/job-placement')} to="/job-placement">{t.navJobPlacement}</Link>
                        <div className="relative group">
                            <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1">
                                {t.navJoinUs} <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                            </span>
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                                <Link to="/join-us?purpose=Volunteer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navVolunteer}</Link>
                                <Link to="/join-us?purpose=Member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navMember}</Link>
                                <Link to="/join-us?purpose=Partner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">{t.navPartner}</Link>
                                <div className="h-px bg-gray-100 my-1"></div>
                                <Link to="/slot-booking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">calendar_month</span>{t.navBookSlot}</Link>
                            </div>
                        </div>
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
                <div className="lg:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                    <Link className={getLinkClass('/')} to="/" onClick={() => setMenuOpen(false)}>{t.navHome}</Link>
                    <Link className={getLinkClass('/about')} to="/about" onClick={() => setMenuOpen(false)}>{t.navWhatWeAre}</Link>
                    <Link className={getLinkClass('/icoe')} to="/icoe" onClick={() => setMenuOpen(false)}>{t.navWhatWeDo}</Link>
                    <Link className={getLinkClass('/media')} to="/media" onClick={() => setMenuOpen(false)}>{t.navMedia}</Link>
                    
                    <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
                        <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] text-white/50 px-2">{t.navAdmission}</span>
                        <div className="flex flex-col gap-3 pl-4">
                            <Link to="/admission/gnm" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navGnmAdmission}</Link>
                            <Link to="/competitive-exams-hub" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navCompetitiveExams}</Link>
                            <Link to="/admission/language-course" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navLanguageCourse}</Link>
                            <Link to="/admission/technical-course" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navTechnicalCourse}</Link>
                            <Link to="/admission/other-course" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navOtherCourse}</Link>
                            <Link to="/live-section" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navLiveSection}</Link>
                        </div>
                    </div>

                    <Link className={getLinkClass('/csr')} to="/csr" onClick={() => setMenuOpen(false)}>{t.navCSR}</Link>
                    <Link className={getLinkClass('/job-placement')} to="/job-placement" onClick={() => setMenuOpen(false)}>{t.navJobPlacement}</Link>

                    <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
                        <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] text-white/50 px-2">{t.navJoinUs}</span>
                        <div className="flex flex-col gap-3 pl-4">
                            <Link to="/join-us?purpose=Volunteer" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navVolunteer}</Link>
                            <Link to="/join-us?purpose=Member" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navMember}</Link>
                            <Link to="/join-us?purpose=Partner" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navPartner}</Link>
                            <Link to="/join-us?purpose=Supporter" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navSupporter}</Link>
                            <Link to="/slot-booking" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">{t.navBookSlot}</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const getLinkClass = (targetPath) => {
        const isActive = path === targetPath;
        return `font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${isActive
            ? 'text-white border-b-2 border-[#fe9832] pb-1'
            : 'text-white/80 hover:text-white'
            }`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/logo/DMF_LOGO_PNG_2.png"
                        alt="DMF - Movement of Positivity"
                        className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                    />
                    <div className="hidden sm:flex flex-col max-w-[200px] md:max-w-none">
                        <span className="text-white font-headline font-bold text-xl leading-tight tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            Dr. Dnyaneshwar<br className="md:hidden" /> Mulay Foundation
                        </span>
                        <span className="text-[#fe9832] font-headline font-bold text-xs uppercase tracking-[0.2em] mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            Movement of Positivity
                        </span>
                    </div>
                </Link>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        <Link className={getLinkClass('/')} to="/">Home</Link>
                        <Link className={getLinkClass('/about')} to="/about">What we are</Link>
                        <Link className={getLinkClass('/icoe')} to="/icoe">What we do</Link>
                        <Link className={getLinkClass('/media')} to="/media">Media</Link>
                        <Link className={getLinkClass('/admission')} to="/admission">Admission</Link>
                        <Link className={getLinkClass('/job-placement')} to="/job-placement">Job Placement</Link>
                        <div className="relative group">
                            <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-white/80 group-hover:text-white cursor-pointer flex items-center gap-1">
                                Join Us <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                            </span>
                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0">
                                <Link to="/join-us?purpose=Volunteer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">Become a Volunteer</Link>
                                <Link to="/join-us?purpose=Member" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">Become a MOP Member</Link>
                                <Link to="/join-us?purpose=Partner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors">Become a Partner</Link>
                            </div>
                        </div>
                    </div>
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
                    <Link className={getLinkClass('/')} to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link className={getLinkClass('/about')} to="/about" onClick={() => setMenuOpen(false)}>What we are</Link>
                    <Link className={getLinkClass('/icoe')} to="/icoe" onClick={() => setMenuOpen(false)}>What we do</Link>
                    <Link className={getLinkClass('/media')} to="/media" onClick={() => setMenuOpen(false)}>Media</Link>
                    <Link className={getLinkClass('/admission')} to="/admission" onClick={() => setMenuOpen(false)}>Admission</Link>
                    <Link className={getLinkClass('/job-placement')} to="/job-placement" onClick={() => setMenuOpen(false)}>Job Placement</Link>

                    <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
                        <span className="font-headline tracking-tight leading-relaxed uppercase font-semibold text-[15px] text-white/50 px-2">Join Us</span>
                        <div className="flex flex-col gap-3 pl-4">
                            <Link to="/join-us?purpose=Volunteer" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">Become a Volunteer</Link>
                            <Link to="/join-us?purpose=Member" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">Become a Member</Link>
                            <Link to="/join-us?purpose=Partner" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">Become a Partner</Link>
                            <Link to="/join-us?purpose=Supporter" onClick={() => setMenuOpen(false)} className="text-white/80 font-medium text-sm hover:text-white transition-colors">Become a Supporter</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

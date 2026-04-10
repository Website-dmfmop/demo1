import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;
    const [menuOpen, setMenuOpen] = useState(false);

    const getLinkClass = (targetPath) => {
        const isActive = path === targetPath;
        return `font-headline tracking-tight leading-relaxed uppercase font-semibold text-sm transition-colors drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${isActive
            ? 'text-white border-b-2 border-[#fe9832] pb-1'
            : 'text-white/80 hover:text-white'
            }`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                <img
                    src="/logo/dmfmop_logo.png"
                    alt="DMF - Movement of Positivity"
                    className="h-12 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6">
                        <Link className={getLinkClass('/')} to="/">Home</Link>
                        <Link className={getLinkClass('/about')} to="/about">What we are</Link>
                        <Link className={getLinkClass('/icoe')} to="/icoe">What we do</Link>
                        <Link className={getLinkClass('/media')} to="/media">Media</Link>
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
                    <Link className={getLinkClass('/about')} to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link className={getLinkClass('/icoe')} to="/icoe" onClick={() => setMenuOpen(false)}>ICOE</Link>
                    <Link className={getLinkClass('/projects')} to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                    <Link className={getLinkClass('/events')} to="/events" onClick={() => setMenuOpen(false)}>Events</Link>
                    <Link className={getLinkClass('/missions')} to="/missions" onClick={() => setMenuOpen(false)}>Missions</Link>
                    <Link className={getLinkClass('/media')} to="/media" onClick={() => setMenuOpen(false)}>Media</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-[#00003c] text-white pt-0 pb-0 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-primary-container rounded-full blur-[100px]"></div>
        </div>

        {/* ── DONATE CTA BAND ── */}
        <div className="relative z-10 bg-gradient-to-r from-[#fe9832] via-[#e07b10] to-[#fe9832] py-10 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <p className="text-white font-headline text-xs font-black tracking-[0.25em] uppercase opacity-80 mb-1">
                        Support The Mission
                    </p>
                    <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">
                        Make a Difference Today
                    </h2>
                    <p className="text-white/80 text-sm mt-1 font-medium">
                        Your contribution empowers communities across India.
                    </p>
                </div>
                <Link
                    to="/donate"
                    id="footer-donate-btn"
                    className="shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-[#00003c] text-white font-headline font-black text-sm tracking-[0.2em] uppercase rounded-md shadow-2xl hover:bg-white hover:text-[#00003c] transition-all duration-300 active:scale-95"
                >
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    DONATE NOW
                </Link>
            </div>
        </div>

        {/* ── MAIN FOOTER CONTENT ── */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full px-12 py-16 gap-12 max-w-7xl mx-auto relative z-10 border-t-4 border-t-[#fe9832]">
            {/* Brand */}
            <div className="flex-1 max-w-sm">
                <div className="text-xl font-bold text-white font-headline mb-2 tracking-tighter">
                    DR. DNYANESHWAR MULE FOUNDATION
                </div>
                <div className="text-[#fe9832] font-bold text-xs uppercase tracking-widest mb-4">
                    DMF • Movement of Positivity (MOP)
                </div>
                <p className="text-gray-300 font-body leading-relaxed mb-6 text-sm">
                    Creating a society based on positivity, compassion and creativity.
                    Globally recognized since 2019 with major presence in Western Maharashtra.
                </p>
                <div className="text-gray-400 text-xs mb-1">
                    🌐 <a href="https://www.dmfmop.org" className="hover:text-[#fe9832] transition-colors">www.dmfmop.org</a>
                </div>
                <div className="text-gray-400 text-xs mb-1">
                    📧 <a href="mailto:corporate@dmfmop.org" className="hover:text-[#fe9832] transition-colors">corporate@dmfmop.org</a>
                </div>
                <div className="text-gray-400 text-xs">📞 +8378086159</div>
            </div>

            {/* Quick Links & Programs */}
            <div className="flex gap-16 md:gap-20 flex-wrap">
                <div className="space-y-4">
                    <h5 className="text-[#fe9832] font-headline font-bold text-sm tracking-widest uppercase mb-6">
                        Quick Links
                    </h5>
                    <ul className="space-y-3">
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/">Home</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/about">About DMF</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/icoe">ICOE</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/projects">Projects</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/events">Events</Link></li>
                        <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/missions">Missions</Link></li>
                    </ul>
                </div>

            </div>

            {/* ICOE Office Address */}
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 max-w-xs">
                <h5 className="font-headline font-bold text-sm tracking-widest uppercase text-white mb-4">
                    ICOE Office
                </h5>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    First Floor, Maharishi Valmiki Library, Nehru Garden,
                    Dr. Babasaheb Ambedkar Road, Khadki, Pune 411003.
                </p>
                <p className="text-sm text-[#fe9832] font-bold">corporate@dmfmop.org</p>
                <p className="text-sm text-gray-300 mt-2">+8378086159</p>
            </div>
        </div>

        {/* ── COPYRIGHT BAR ── */}
        <div className="px-12 py-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto border-t border-white/5 gap-4 relative z-10">
            <p className="text-gray-400 text-xs uppercase tracking-widest">
                © 2025 Dr. Dnyaneshwar Mule Foundation. All Rights Reserved.
            </p>
            <div className="flex gap-8">
                <a className="text-gray-400 text-[10px] uppercase tracking-widest hover:text-white" href="#">Privacy Policy</a>
                <a className="text-gray-400 text-[10px] uppercase tracking-widest hover:text-white" href="#">Terms of Service</a>
            </div>
        </div>

        {/* ── TRICOLOR BAND (Indian flag colors) ── */}
        <div className="w-full flex h-2">
            <div className="flex-1 bg-[#fe9832]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#2e7d32]"></div>
        </div>
    </footer>
);

export default Footer;

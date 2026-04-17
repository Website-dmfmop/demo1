import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-[#00003c] text-white pt-0 pb-0 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-primary-container rounded-full blur-[100px]"></div>
        </div>

        {/* ── DONATE CTA (Short & Simple) ── */}
        <div className="relative z-10 border-t-4 border-t-[#fe9832] border-b border-white/5 py-8 mt-2">
            <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <p className="text-[#fe9832] font-headline text-xs font-black tracking-[0.2em] uppercase mb-1">
                        Support The Mission
                    </p>
                    <h2 className="font-headline text-xl font-extrabold text-white leading-tight tracking-tight">
                        Make a Difference Today
                    </h2>
                </div>
                <Link
                    to="/donate"
                    id="footer-donate-btn"
                    className="shrink-0 inline-flex items-center gap-2 px-8 py-3 bg-[#fe9832] text-[#00003c] font-headline font-black text-xs tracking-[0.15em] uppercase rounded-sm shadow-lg hover:bg-white hover:text-[#00003c] transition-all duration-300 active:scale-95"
                >
                    <span className="material-symbols-outlined text-base">favorite</span>
                    DONATE NOW
                </Link>
            </div>
        </div>

        {/* ── MAIN FOOTER CONTENT ── */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full px-12 py-12 gap-12 max-w-7xl mx-auto relative z-10">
            {/* Brand */}
            <div className="flex-1 max-w-sm">
                <img
                    src="/logo/dmfmop_logo.png"
                    alt="DMF - Movement of Positivity"
                    className="h-24 w-auto object-contain mb-4"
                />
                <p className="text-gray-300 font-body leading-relaxed mb-6 text-sm">
                    Creating a society based on positivity, compassion and creativity.
                    Globally recognized since 2019 with major presence in Western Maharashtra.
                </p>
                <div className="text-gray-400 text-xs mb-1">
                    🌐 <a href="https://www.dmfmop.org" className="hover:text-[#fe9832] transition-colors">www.dmfmop.org</a>
                </div>
                {/* <div className="text-gray-400 text-xs mb-1">
                    📧 <a href="mailto:corporate@dmfmop.org" className="hover:text-[#fe9832] transition-colors">corporate@dmfmop.org</a>
                </div>
                <div className="text-gray-400 text-xs">📞 +91 8378086159</div> */}
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 w-full md:w-auto min-w-[180px] flex flex-col gap-4 h-[270px] ">
                <h5 className="text-[#fe9832] font-headline font-bold text-sm tracking-widest uppercase mb-2">
                    Quick Links
                </h5>
                <ul className="space-y-3">
                    <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/">Home</Link></li>
                    <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/about">What We Are</Link></li>
                    <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/icoe">What We Do</Link></li>
                    <li><Link className="text-gray-300 hover:text-white transition-all hover:underline decoration-[#fe9832]" to="/media">Media</Link></li>
                </ul>
            </div>

            {/* ICOE Office Address */}
            <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10 max-w-xs">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="font-headline font-bold text-sm tracking-widest uppercase text-white mb-0">
                        ICOE Office
                    </h5>
                    <a href="https://maps.app.goo.gl/JWAhkrRXGfwi28ur8?g_st=aw" target="_blank" rel="noopener noreferrer" className="text-[#fe9832] hover:text-white transition-colors" title="View on Google Maps">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                    </a>
                </div>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    First Floor, Maharishi Valmiki Library, Nehru Garden,
                    Dr. Babasaheb Ambedkar Road, Khadki, Pune 411003.
                </p>
                <p className="text-sm text-[#fe9832] font-bold">corporate@dmfmop.org</p>
                <p className="text-sm text-gray-300 mt-2">+91 8378086159</p>
            </div>

            {/* Location Map */}
            <div className="w-full md:w-[280px] lg:w-[320px] h-[270px] rounded-xl overflow-hidden border border-white/10 shadow-lg relative opacity-90 hover:opacity-100 transition-opacity mt-6 md:mt-0">
                <iframe
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    src="https://maps.google.com/maps?q=Dr.%20Dnyaneshwar%20Mulay%20Foundation,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
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

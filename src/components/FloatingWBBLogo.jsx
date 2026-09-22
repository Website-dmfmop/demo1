import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

/**
 * FloatingWBBLogo
 * 
 * Persistent hovering / floating badge of the Words Beyond Borders initiative.
 * Visible across the entire website (except the administrative dashboard).
 * Clicking redirects users to the internal WBB page.
 */
const FloatingWBBLogo = () => {
    const location = useLocation();

    // Hide inside the Admin dashboard to avoid obstructing admin controls & data tables
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, x: -100, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 15, mass: 1.2, delay: 0.3 }}
            className="fixed bottom-5 left-5 md:bottom-7 md:left-7 z-40 flex items-center select-none"
        >
            <motion.div
                className="group relative flex items-center cursor-pointer"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link 
                    to="/words-beyond-borders" 
                    onClick={() => window.scrollTo(0, 0)}
                    aria-label="Visit Words Beyond Borders page"
                    title="Words Beyond Borders"
                    className="relative flex items-center"
                >
                {/* Logo Card Container */}
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-2xl md:rounded-3xl p-1.5 md:p-2 shadow-2xl shadow-black/20 border-2 border-white group-hover:border-[#FE9832] transition-colors duration-300 flex items-center justify-center">
                    
                    {/* Glowing CTA Text Above Logo */}
                    <div className="absolute -top-7 md:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none transition-transform duration-300 group-hover:-translate-y-1">
                        <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wider bg-[#FE9832] px-2.5 py-0.5 md:py-1 rounded-full shadow-[0_0_12px_rgba(254,152,50,0.9)] animate-pulse border border-white/50 flex items-center gap-1">
                            Click to learn more!
                        </span>
                    </div>

                    {/* Ambient Warm Glow behind the logo */}
                    <div className="absolute inset-[-20px] bg-[#FE9832] rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none -z-10"></div>
                    
                    {/* Slow Rotating Dashed Ring for Premium Feel */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute inset-[-10px] rounded-3xl border-[1.5px] border-dashed border-[#00003c]/20 group-hover:border-[#FE9832] transition-colors duration-500 pointer-events-none -z-10"
                    ></motion.div>

                    <img 
                        src="/Images/words_beyound_borders.jpeg" 
                        alt="Words Beyond Borders Logo" 
                        className="relative z-10 w-full h-full object-contain rounded-xl md:rounded-2xl pointer-events-none bg-white" 
                        loading="lazy" 
                    />

                    {/* Pop-out Accent Corner Indicator Badge */}
                    <span 
                        className="absolute -top-2 -right-2 w-7 h-7 bg-[#FE9832] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 z-20"
                        aria-hidden="true"
                    >
                        <ExternalLink size={14} strokeWidth={2.5} />
                    </span>
                </div>

                {/* Desktop Hover Tooltip Label */}
                <div 
                    className="hidden md:flex items-center ml-5 bg-[#00003c]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-2xl border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none -translate-x-4 group-hover:translate-x-0"
                    aria-hidden="true"
                >
                    <div className="flex flex-col text-left">
                        <span className="text-xs font-bold font-sans tracking-wide">Words Beyond Borders</span>
                        <span className="text-[10px] text-[#FE9832] font-semibold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                            Lit Fest <span>↗</span>
                        </span>
                    </div>
                </div>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default FloatingWBBLogo;

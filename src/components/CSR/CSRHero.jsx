import React from 'react';
import { motion } from 'framer-motion';
import { useCSRContext } from '../../context/CSRContext';

const CSRHero = () => {
    const { setCurrentView } = useCSRContext();

    return (
        <section className="relative w-full aspect-video flex items-center justify-start overflow-hidden pt-24 pb-12">
            {/* Phase 1: Background Image & Thematic Gradient */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/hero-bg.jpg" 
                    alt="Indian rural children learning" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Thematic Gradient Overlay (Navy to Transparent) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#000080]/30 via-[#000080]/10 to-transparent"></div>

            {/* Phase 2: Content Container & Alignment */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 text-left">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold text-xs mb-6 tracking-widest uppercase shadow-sm">
                        CSR Ecosystem
                    </span>
                    
                    {/* Typography Adjustments */}
                    <h1 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                        Bridging Vision <br /> with <span className="text-[#FF9933] drop-shadow-md">Impact</span>
                    </h1>
                    
                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-lg md:text-xl text-[#F8F9FA] text-opacity-90 mb-10 max-w-2xl leading-relaxed drop-shadow-sm">
                        A dedicated, mission-driven platform connecting CSR Funding Companies, innovative Projects, and verified Implementation Partners to create sustainable change at the grassroots level.
                    </p>

                    <motion.button 
                        onClick={() => setCurrentView('directory')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-xl text-white font-bold text-xl shadow-2xl shadow-black/30 transition-all mb-12 border border-white/20 hover:border-white/50"
                        style={{ backgroundColor: '#000080', fontFamily: 'Manrope, sans-serif' }}
                    >
                        Explore Directory
                        <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                    </motion.button>

                    {/* Button Contrast & Glassmorphic Backdrop */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 sm:p-4 rounded-3xl inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shadow-xl">
                        <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md transition-all border border-white/10 hover:border-white/40"
                            style={{ backgroundColor: '#000080' }}
                        >
                            Funding Companies
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md transition-all border border-white/10 hover:border-white/40"
                            style={{ backgroundColor: '#FF9933' }}
                        >
                            Projects & Seekers
                        </motion.button>

                        <motion.button 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-bold text-sm shadow-md transition-all border border-white/10 hover:border-white/40"
                            style={{ backgroundColor: '#138808' }}
                        >
                            Implementation Partners
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CSRHero;

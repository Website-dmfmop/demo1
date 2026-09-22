import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseTeaserToast = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Show on /admission* and /icoe/admissions* but NOT on competitive exams pages
    const showToast = (location.pathname.startsWith('/admission') || location.pathname.startsWith('/icoe/admissions')) && 
                      !location.pathname.includes('competitive-exams');

    if (!showToast) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                opacity: { duration: 0.5 }
            }}
            className="fixed bottom-28 left-4 md:bottom-36 md:left-6 z-50 cursor-pointer"
            onClick={() => navigate('/icoe/competitive-exams')}
        >
            <div className="bg-gradient-to-r from-[#FF9933] to-[#FF8C00] text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-md bg-opacity-90 border border-white/20">
                <span className="font-semibold font-manrope text-sm md:text-base flex items-center gap-2">
                    🚀 Our Competitive Exam Course is going live! Click to know more details.
                </span>
            </div>
        </motion.div>
    );
};

export default CourseTeaserToast;

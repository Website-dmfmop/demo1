import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const RegisterNowFloater = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Show ONLY on /competitive-exams-hub
    const showFloater = location.pathname === '/competitive-exams-hub';

    if (!showFloater) return null;

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
            <motion.button
                whileHover="hover"
                initial="initial"
                onClick={() => navigate('/competitive-exams-hub/register')}
                className="bg-[#000080] text-white px-6 py-4 rounded-full shadow-blue-900/50 shadow-xl flex items-center gap-2 font-manrope font-bold text-lg relative overflow-hidden group transition-all"
            >
                <motion.div
                    variants={{
                        initial: { x: -20, opacity: 0, width: 0 },
                        hover: { x: 0, opacity: 1, width: "auto" }
                    }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="mr-2 overflow-hidden flex items-center justify-center"
                >
                    <GraduationCap size={24} className="text-[#FF9933] shrink-0" />
                </motion.div>
                <span>Register Now</span>
            </motion.button>
        </motion.div>
    );
};

export default RegisterNowFloater;

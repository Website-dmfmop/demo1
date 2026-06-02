import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ steps, currentStep, themeColor = '#000080' }) => {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full z-0"></div>
                
                <motion.div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full z-0"
                    style={{ backgroundColor: themeColor }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                            <motion.div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300 ${isActive || isCompleted ? 'text-white border-transparent' : 'bg-white text-gray-400 border-gray-200'}`}
                                style={{ backgroundColor: isActive || isCompleted ? themeColor : undefined }}
                                initial={false}
                                animate={{ scale: isActive ? 1.2 : 1 }}
                            >
                                {isCompleted ? (
                                    <span className="material-symbols-outlined text-sm">check</span>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </motion.div>
                            <span 
                                className={`absolute top-10 w-24 text-center text-xs font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressBar;

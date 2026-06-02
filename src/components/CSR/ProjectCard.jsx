import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onClick }) => {
    // Format currency to Lakhs/Crores
    const formatCurrencyLakhs = (amount) => {
        const inLakhs = amount / 100000;
        if (inLakhs >= 100) {
            return `₹${(inLakhs / 100).toFixed(2)} Cr`;
        }
        return `₹${inLakhs.toFixed(2)} L`;
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(0,0,128,0.1)' }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            className="flex flex-col bg-[#F8F9FA] rounded-2xl shadow-md border border-gray-200 overflow-hidden h-full group cursor-pointer"
        >
            {/* Phase 2: Hero Image Header */}
            <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                <img 
                    src={`https://picsum.photos/seed/${project.id}/800/400`} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </div>
            
            <div className="px-6 pb-2 pt-1">
                <p className="italic text-[10px] text-gray-400 text-right">
                    Images are for representation purposes only.
                </p>
            </div>

            <div className="flex flex-col px-6 pb-6 flex-1">
                {/* Tag Row */}
                <div className="flex gap-2 mb-4">
                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="px-3 py-1 bg-[#138808] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                        {project.category}
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="px-3 py-1 bg-transparent border border-gray-300 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md">
                        {project.status || 'Open'}
                    </span>
                </div>

                {/* Phase 3: Title & Overview */}
                <h3 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
                    {project.title}
                </h3>
                
                <div className="mb-6">
                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-bold text-gray-800 block mb-1">Project Overview:</span>
                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>

                {/* Metadata Stack */}
                <div className="flex flex-col gap-2.5 mb-8">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5">map</span>
                        <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-medium">
                            <span className="text-gray-400 mr-1">Zone:</span> {project.zone || 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5">location_city</span>
                        <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-medium">
                            <span className="text-gray-400 mr-1">Ward:</span> {project.ward || 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-[18px] text-gray-400 mt-0.5">pin_drop</span>
                        <span style={{ fontFamily: 'Inter, sans-serif' }} className="font-medium line-clamp-1">
                            <span className="text-gray-400 mr-1">Location:</span> {project.location || 'Various'}
                        </span>
                    </div>
                </div>

                {/* Financials & Footer (Pushed to bottom) */}
                <div className="mt-auto pt-5 border-t border-gray-200">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-1">
                                Tentative Cost
                            </span>
                            <span style={{ fontFamily: 'Manrope, sans-serif' }} className="text-gray-900 font-extrabold text-xl">
                                {formatCurrencyLakhs(project.fundingGoal)}
                            </span>
                        </div>
                        
                        <div className="text-right">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-bold text-[#000080] flex items-center gap-1 group-hover:underline decoration-2 underline-offset-4">
                                Open for Collaboration
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

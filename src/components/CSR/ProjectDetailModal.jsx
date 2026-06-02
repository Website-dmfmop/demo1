import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetailModal = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState('Brief');
    const [isFormVisible, setIsFormVisible] = useState(false);

    if (!project) return null;

    const formatCurrencyLakhs = (amount) => {
        const inLakhs = amount / 100000;
        if (inLakhs >= 100) return `₹${(inLakhs / 100).toFixed(2)} Cr`;
        return `₹${inLakhs.toFixed(2)} L`;
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-4xl bg-[#F8F9FA] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
                >
                    {/* Sticky Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    <div className="overflow-y-auto flex-1 hide-scrollbar relative">
                        <style>{`
                            .hide-scrollbar::-webkit-scrollbar { display: none; }
                            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        `}</style>

                        {/* Modal Header & Hero */}
                        <div className="relative w-full h-64 sm:h-72 bg-gray-200">
                            <img 
                                src={`https://picsum.photos/seed/${project.id}/1200/600`} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                                <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                                    {project.title}
                                </h2>
                            </div>
                        </div>
                        <div className="px-6 py-2 bg-white border-b border-gray-100 flex justify-between items-center">
                            <p className="italic text-[10px] text-gray-400">
                                Images are for representation purposes only.
                            </p>
                        </div>

                        {/* Tab Controller */}
                        <div className="flex border-b border-gray-200 bg-white px-6 sticky top-0 z-30 shadow-sm">
                            {['Brief', 'Gallery', 'Docs'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                    className={`py-4 px-6 font-bold text-sm transition-colors relative ${
                                        activeTab === tab ? 'text-[#000080]' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="modal-tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#000080] rounded-t-full"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="p-6 sm:p-8">
                            {activeTab === 'Brief' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col gap-8"
                                >
                                    {/* Tags & Metadata */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="flex gap-2">
                                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="px-3 py-1 bg-[#138808] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                                                {project.category}
                                            </span>
                                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="px-3 py-1 bg-transparent border border-[#000080] text-[#000080] text-xs font-bold uppercase tracking-wider rounded-md">
                                                {project.status || 'Open'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                                            <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-gray-400">map</span> <span className="font-medium">{project.zone || 'N/A'}</span></div>
                                            <div className="w-px h-4 bg-gray-300"></div>
                                            <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-gray-400">location_city</span> <span className="font-medium">{project.ward || 'N/A'}</span></div>
                                        </div>
                                    </div>

                                    {/* Project Overview */}
                                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                                        <h3 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#FF9933]">subject</span>
                                            Project Overview
                                        </h3>
                                        <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Cost Block */}
                                    <div className="bg-[#000080]/5 border border-[#000080]/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-bold text-[#000080] uppercase tracking-wider mb-1">Tentative Project Cost</h4>
                                            <p className="text-gray-500 text-xs font-medium">Estimated required funding based on initial assessment.</p>
                                        </div>
                                        <div style={{ fontFamily: 'Manrope, sans-serif' }} className="text-4xl font-extrabold text-gray-900">
                                            {formatCurrencyLakhs(project.fundingGoal)}
                                        </div>
                                    </div>

                                    {/* Express Interest Flow */}
                                    <div className="mt-4 border-t border-gray-200 pt-8 pb-4">
                                        <AnimatePresence mode="wait">
                                            {!isFormVisible ? (
                                                <motion.button
                                                    key="cta-button"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20, height: 0, margin: 0, overflow: 'hidden' }}
                                                    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(0,0,128,0.3)' }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setIsFormVisible(true)}
                                                    className="w-full bg-[#000080] text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-[#000080]/20 transition-all flex items-center justify-center gap-2"
                                                >
                                                    Express Interest to Implement
                                                    <span className="material-symbols-outlined">arrow_forward</span>
                                                </motion.button>
                                            ) : (
                                                <motion.div
                                                    key="interest-form"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden"
                                                >
                                                    <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                                        <h4 style={{ fontFamily: 'Manrope, sans-serif' }} className="font-bold text-gray-900 text-lg">Express Interest</h4>
                                                        <button onClick={() => setIsFormVisible(false)} className="text-gray-500 hover:text-gray-800 transition-colors text-sm font-semibold underline">Cancel</button>
                                                    </div>
                                                    <div className="p-6 flex flex-col gap-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div>
                                                                <label style={{ fontFamily: 'Inter, sans-serif' }} className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Organization Name</label>
                                                                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]" placeholder="Your NGO/Company" />
                                                            </div>
                                                            <div>
                                                                <label style={{ fontFamily: 'Inter, sans-serif' }} className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Point of Contact</label>
                                                                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]" placeholder="Full Name" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                                                            <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]" placeholder="name@organization.org" />
                                                        </div>
                                                        <div>
                                                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Brief Proposal</label>
                                                            <textarea rows="3" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080]" placeholder="How do you plan to implement this project?"></textarea>
                                                        </div>
                                                        <button className="w-full mt-2 bg-[#138808] text-white py-4 rounded-lg font-bold text-base shadow-lg shadow-[#138808]/20 hover:bg-[#0f6b06] transition-colors">
                                                            Submit Proposal
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab !== 'Brief' && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-2xl bg-white"
                                >
                                    <p className="text-gray-400 font-medium">Content for {activeTab} is pending.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectDetailModal;

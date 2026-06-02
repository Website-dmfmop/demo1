import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterAccordion = ({ title, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 last:border-0 py-4">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full flex justify-between items-center text-left focus:outline-none group"
            >
                <h3 style={{ fontFamily: 'Manrope, sans-serif' }} className="font-bold text-gray-800 text-sm tracking-wide group-hover:text-[#000080] transition-colors">{title}</h3>
                <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }} 
                    className="material-symbols-outlined text-gray-400 group-hover:text-[#000080] transition-colors"
                >
                    expand_more
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FilterSidebar = ({ filters, setFilters, isOpen, onClose }) => {

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const toggleArrayItem = (key, item) => {
        setFilters(prev => {
            const arr = prev[key] || [];
            return {
                ...prev,
                [key]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
            };
        });
    };

    const toggleBoolean = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const sectorsList = ['Gardens and Parks', 'Education', 'Health', 'Environment', 'Infrastructural Support', 'Social Inclusion', 'SWM'];
    const demographicsList = ['General', 'Women & Children', 'Marginalized Farmers', 'Scheduled Tribes/Castes', 'Youth', 'Senior Citizens', 'Specially-Abled'];
    const auditLayers = ['Self-Certified', 'Government Audited', 'Independent Third-Party Audited'];
    
    // Simple 1-17 array for SDG numbers
    const sdgNumbers = Array.from({length: 17}, (_, i) => i + 1);

    const sidebarContent = (
        <div className="bg-[#F8F9FA] rounded-3xl p-6 border border-gray-200 h-full overflow-y-auto w-full max-w-sm flex flex-col shadow-xl shadow-gray-100 hide-scrollbar">
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="flex justify-between items-center pb-4 mb-2 border-b border-gray-200 shrink-0">
                <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-xl font-extrabold text-gray-900">Filters</h2>
                <button className="md:hidden text-gray-500 hover:bg-gray-200 p-1 rounded-full transition-colors" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="flex-1">
                {/* 1. Basic Geography & Sector */}
                <FilterAccordion title="BASIC GEOGRAPHY & SECTOR" defaultOpen={true}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sectors</span>
                            {sectorsList.map(sector => (
                                <label key={sector} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${
                                        filters.sectors.includes(sector) ? 'bg-[#000080] border-[#000080]' : 'border-gray-300 group-hover:border-[#000080]'
                                    }`}>
                                        {filters.sectors.includes(sector) && <span className="material-symbols-outlined text-[12px] text-white font-bold">check</span>}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={filters.sectors.includes(sector)} onChange={() => toggleArrayItem('sectors', sector)} />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-gray-700">{sector}</span>
                                </label>
                            ))}
                        </div>

                        <div className="relative mt-2">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Zone</span>
                            <select 
                                style={{ fontFamily: 'Inter, sans-serif' }}
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] text-sm transition-all"
                                value={filters.zones[0] || ''}
                                onChange={(e) => updateFilter('zones', e.target.value ? [e.target.value] : [])}
                            >
                                <option value="">All Zones</option>
                                <option value="North">North Zone</option>
                                <option value="South">South Zone</option>
                            </select>
                            <div className="pointer-events-none absolute bottom-0 right-0 top-6 flex items-center px-4 text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                            </div>
                        </div>
                    </div>
                </FilterAccordion>

                {/* 2. Statutory Compliance */}
                <FilterAccordion title="STATUTORY COMPLIANCE">
                    <div className="flex flex-col gap-4">
                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            filters.csr1Validated ? 'border-[#000080] bg-[#000080]/5 shadow-[0_0_15px_rgba(0,0,128,0.1)]' : 'border-gray-200 bg-white hover:border-[#000080]/50'
                        }`}>
                            <span className={`material-symbols-outlined ${filters.csr1Validated ? 'text-[#000080]' : 'text-gray-400'}`}>verified_user</span>
                            <div className="flex-1">
                                <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">CSR-1 Registered</p>
                            </div>
                            <input type="checkbox" className="hidden" checked={filters.csr1Validated} onChange={() => toggleBoolean('csr1Validated')} />
                        </label>

                        <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            filters.nitiAayog ? 'border-[#000080] bg-[#000080]/5 shadow-[0_0_15px_rgba(0,0,128,0.1)]' : 'border-gray-200 bg-white hover:border-[#000080]/50'
                        }`}>
                            <span className={`material-symbols-outlined ${filters.nitiAayog ? 'text-[#000080]' : 'text-gray-400'}`}>account_balance</span>
                            <div className="flex-1">
                                <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">NITI Aayog Darpan</p>
                            </div>
                            <input type="checkbox" className="hidden" checked={filters.nitiAayog} onChange={() => toggleBoolean('nitiAayog')} />
                        </label>

                        <div className="flex gap-2">
                            {['80G', '12A', 'FCRA'].map(comp => {
                                const isActive = filters.compliance.includes(comp);
                                return (
                                    <button
                                        key={comp}
                                        onClick={() => toggleArrayItem('compliance', comp)}
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                                            isActive ? 'bg-[#000080] text-white border-[#000080] shadow-[0_0_10px_rgba(0,0,128,0.2)]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        {comp}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </FilterAccordion>

                {/* 3. Impact & Financial Metrics */}
                <FilterAccordion title="IMPACT & FINANCIAL METRICS">
                    <div className="flex flex-col gap-5">
                        
                        {/* Aspirational District Toggle */}
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-gray-800 font-semibold">Aspirational District Focus</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={filters.aspirationalDistrict} onChange={() => toggleBoolean('aspirationalDistrict')} />
                                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.aspirationalDistrict ? 'bg-[#FF9933]' : 'bg-gray-300'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.aspirationalDistrict ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                        </label>

                        {/* Co-Investment Toggle */}
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-gray-800 font-semibold">Match Funding Secured</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={filters.coInvestment} onChange={() => toggleBoolean('coInvestment')} />
                                <div className={`block w-10 h-6 rounded-full transition-colors ${filters.coInvestment ? 'bg-[#138808]' : 'bg-gray-300'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${filters.coInvestment ? 'transform translate-x-4' : ''}`}></div>
                            </div>
                        </label>

                        {/* Overhead Slider */}
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex justify-between items-end">
                                <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin Overhead Cap</span>
                                <span className="text-xs font-bold text-[#000080]">{filters.overheadCap === 100 ? 'Any' : `< ${filters.overheadCap}%`}</span>
                            </div>
                            <input 
                                type="range" min="5" max="100" step="5"
                                value={filters.overheadCap}
                                onChange={(e) => updateFilter('overheadCap', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #000080 0%, #000080 ${(filters.overheadCap - 5) / 95 * 100}%, #e5e7eb ${(filters.overheadCap - 5) / 95 * 100}%, #e5e7eb 100%)`
                                }}
                            />
                        </div>

                        {/* Audit Layer Dropdown */}
                        <div className="relative mt-2">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Audit Verification</span>
                            <select 
                                style={{ fontFamily: 'Inter, sans-serif' }}
                                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:border-[#000080] focus:ring-1 focus:ring-[#000080] text-sm"
                                value={filters.auditLayer[0] || ''}
                                onChange={(e) => updateFilter('auditLayer', e.target.value ? [e.target.value] : [])}
                            >
                                <option value="">Any Verification Level</option>
                                {auditLayers.map(layer => (
                                    <option key={layer} value={layer}>{layer}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute bottom-0 right-0 top-6 flex items-center px-4 text-gray-500">
                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                            </div>
                        </div>

                        {/* Demographics Pill Toggles */}
                        <div className="flex flex-col gap-2 mt-2">
                            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Target Demographics</span>
                            <div className="flex flex-wrap gap-2">
                                {demographicsList.map(demo => {
                                    const isActive = filters.targetDemographics?.includes(demo);
                                    return (
                                        <button
                                            key={demo}
                                            onClick={() => toggleArrayItem('targetDemographics', demo)}
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                                                isActive ? 'bg-[#000080]/10 text-[#000080] border-[#000080]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {demo}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </FilterAccordion>

                {/* 4. ESG/SDG Alignment */}
                <FilterAccordion title="ESG / SDG ALIGNMENT">
                    <div className="grid grid-cols-4 gap-2">
                        {sdgNumbers.map(sdg => {
                            const isActive = filters.sdgGoals.includes(sdg);
                            return (
                                <button
                                    key={sdg}
                                    onClick={() => toggleArrayItem('sdgGoals', sdg)}
                                    className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                                        isActive ? 'bg-[#FF9933]/10 border-[#FF9933] shadow-[0_0_10px_rgba(255,153,51,0.2)]' : 'bg-white border-gray-200 hover:border-[#FF9933]/50'
                                    }`}
                                >
                                    <span style={{ fontFamily: 'Manrope, sans-serif' }} className={`font-extrabold text-lg leading-none ${isActive ? 'text-[#FF9933]' : 'text-gray-400'}`}>
                                        {sdg}
                                    </span>
                                    <span className={`text-[8px] font-bold mt-1 ${isActive ? 'text-[#FF9933]' : 'text-gray-400'}`}>SDG</span>
                                </button>
                            );
                        })}
                    </div>
                </FilterAccordion>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-80 shrink-0">
                <div className="sticky top-28 h-[calc(100vh-8rem)]">
                    {sidebarContent}
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/40 md:hidden flex justify-start"
                    >
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="h-full"
                        >
                            {sidebarContent}
                        </motion.div>
                        <div className="flex-grow h-full" onClick={onClose} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FilterSidebar;

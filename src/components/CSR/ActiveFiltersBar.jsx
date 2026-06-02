import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActiveFiltersBar = ({ filters, clearFilter }) => {
    // Generate an array of active filter pill configurations
    const activePills = [];

    // Arrays
    ['sectors', 'zones', 'wards', 'status', 'compliance', 'targetDemographics', 'auditLayer'].forEach(key => {
        if (filters[key] && filters[key].length > 0) {
            filters[key].forEach(val => {
                activePills.push({ id: `${key}-${val}`, label: val, onRemove: () => clearFilter(key, val) });
            });
        }
    });

    // Booleans
    const booleanMaps = {
        csr1Validated: 'CSR-1 Registered',
        nitiAayog: 'NITI Aayog Darpan',
        aspirationalDistrict: 'Aspirational District',
        coInvestment: 'Match Funding'
    };
    
    Object.keys(booleanMaps).forEach(key => {
        if (filters[key] === true) {
            activePills.push({ id: key, label: booleanMaps[key], onRemove: () => clearFilter(key, true) });
        }
    });

    // SDGs
    if (filters.sdgGoals && filters.sdgGoals.length > 0) {
        filters.sdgGoals.forEach(val => {
            activePills.push({ id: `sdg-${val}`, label: `SDG ${val}`, onRemove: () => clearFilter('sdgGoals', val) });
        });
    }

    // Overhead Cap (only show if not default 100)
    if (filters.overheadCap < 100) {
        activePills.push({ id: 'overhead', label: `< ${filters.overheadCap}% Admin`, onRemove: () => clearFilter('overheadCap', null) });
    }

    // Budget (only show if upper limit < 500 or lower limit > 0)
    if (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 500) {
        activePills.push({ id: 'budget', label: `₹${filters.budgetRange[0]}L - ₹${filters.budgetRange[1]}L`, onRemove: () => clearFilter('budgetRange', null) });
    }

    if (activePills.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm text-gray-500 font-semibold mr-2">Active Filters:</span>
            <AnimatePresence>
                {activePills.map(pill => (
                    <motion.div
                        key={pill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, width: 0, padding: 0, margin: 0 }}
                        className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#000080]/30 rounded-full text-[#000080] shadow-sm whitespace-nowrap overflow-hidden"
                    >
                        <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-xs font-semibold">{pill.label}</span>
                        <button 
                            onClick={pill.onRemove} 
                            className="flex items-center justify-center rounded-full hover:bg-[#000080]/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            <button 
                onClick={() => clearFilter('ALL')}
                style={{ fontFamily: 'Inter, sans-serif' }} 
                className="text-xs font-semibold text-gray-400 hover:text-gray-700 underline ml-2 transition-colors"
            >
                Clear All
            </button>
        </div>
    );
};

export default ActiveFiltersBar;

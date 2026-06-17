import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PartnerGrid = ({ partners }) => {

    if (!partners || partners.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No partners found</h3>
                <p className="text-gray-500">There are currently no approved partners in this category.</p>
            </div>
        );
    }

    return (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
                {partners.map(partner => {
                    const isCorp = partner.type === 'corporate';
                    const name = isCorp ? partner.companyName : partner.ngoName;
                    const color = isCorp ? '#000080' : '#138808';
                    const tag = isCorp ? 'Funding Partner' : 'Implementation Partner';

                    return (
                        <motion.div 
                            key={partner._id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            whileHover={{ y: -6, boxShadow: `0 20px 40px -10px ${color}20` }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full"
                        >
                            <div className="p-6 border-b border-gray-50 flex items-start justify-between bg-gray-50/50">
                                <div>
                                    <span style={{ fontFamily: 'Inter, sans-serif', backgroundColor: color }} className="px-3 py-1 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm mb-3 inline-block">
                                        {tag}
                                    </span>
                                    <h3 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-xl font-extrabold text-gray-900 leading-tight">
                                        {name}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: color }}>
                                    {name?.charAt(0)?.toUpperCase() || 'P'}
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col gap-4">
                                {isCorp ? (
                                    <>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Focus Sectors</span>
                                            <p className="text-sm text-gray-800 font-medium">{partner.focusSectors?.join(', ') || 'Various'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Target Geographies</span>
                                            <p className="text-sm text-gray-800">{partner.geographies || 'N/A'}</p>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <div>
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Contact Person</span>
                                                <span className="text-sm font-semibold text-gray-700">{partner.contactName}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Budget Range</span>
                                                <span className="text-sm font-bold text-[#000080]">{partner.budgetRange}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Core Sectors</span>
                                            <p className="text-sm text-gray-800 font-medium">{partner.coreSectors || 'Various'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Past Impact</span>
                                            <p className="text-sm text-gray-600 line-clamp-2">{partner.pastImpact || 'Details not provided.'}</p>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                            <div>
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Contact Person</span>
                                                <span className="text-sm font-semibold text-gray-700">{partner.contactPerson}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Years of Operation</span>
                                                <span className="text-sm font-bold text-[#138808]">{partner.yearsOfOperation} Years</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </motion.div>
    );
};

export default PartnerGrid;

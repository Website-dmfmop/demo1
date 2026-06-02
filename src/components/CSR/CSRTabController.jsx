import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CorporateOnboarding from './forms/CorporateOnboarding';
import ProjectPitchForm from './forms/ProjectPitchForm';
import NGORegistration from './forms/NGORegistration';

const CSRTabController = () => {
    const [activeTab, setActiveTab] = useState('corporate');

    const tabs = [
        { id: 'corporate', label: 'Funding Companies', color: '#000080' },
        { id: 'project', label: 'Pitch a Project', color: '#FF9933' },
        { id: 'ngo', label: 'NGO Registration', color: '#138808' }
    ];

    const renderActiveForm = () => {
        switch (activeTab) {
            case 'corporate':
                return <CorporateOnboarding />;
            case 'project':
                return <ProjectPitchForm />;
            case 'ngo':
                return <NGORegistration />;
            default:
                return null;
        }
    };

    return (
        <section className="py-20 px-6 bg-gray-50" id="apply-now">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Join the Ecosystem
                    </h2>
                    <p className="text-gray-600">Select your category to start your journey.</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all relative ${
                                activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                            }`}
                            style={{ 
                                backgroundColor: activeTab === tab.id ? tab.color : 'transparent',
                            }}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ border: `2px solid ${tab.color}` }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Form Container with Animation */}
                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderActiveForm()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CSRTabController;

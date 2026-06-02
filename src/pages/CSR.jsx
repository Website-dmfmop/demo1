import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CSRHero from '../components/CSR/CSRHero';
import EcosystemPillars from '../components/CSR/EcosystemPillars';
import TrustBadges from '../components/CSR/TrustBadges';
import CSRTabController from '../components/CSR/CSRTabController';
import ProjectDirectory from '../components/CSR/ProjectDirectory';
import { CSRProvider, useCSRContext } from '../context/CSRContext';

const CSRContent = () => {
    const { currentView } = useCSRContext();

    return (
        <div className="w-full bg-white min-h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                {currentView === 'home' ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <CSRHero />
                        <TrustBadges />
                        <EcosystemPillars />
                        <CSRTabController />
                    </motion.div>
                ) : (
                    <motion.div
                        key="directory"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <ProjectDirectory />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CSR = () => {
    return (
        <CSRProvider>
            <CSRContent />
        </CSRProvider>
    );
};

export default CSR;

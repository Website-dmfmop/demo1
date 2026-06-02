import React from 'react';
import { motion } from 'framer-motion';

const badges = [
    {
        id: 1,
        label: "Total CSR Funds Channeled",
        value: "₹50Cr+",
        icon: "account_balance_wallet",
        color: "#000080"
    },
    {
        id: 2,
        label: "Active Projects",
        value: "120+",
        icon: "assignment",
        color: "#FF9933"
    },
    {
        id: 3,
        label: "Verified Partners",
        value: "450+",
        icon: "verified",
        color: "#138808"
    }
];

const TrustBadges = () => {
    return (
        <section className="py-12 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    {badges.map((badge, index) => (
                        <motion.div 
                            key={badge.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center pt-8 md:pt-0"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <span className="material-symbols-outlined text-4xl" style={{ color: badge.color }}>
                                    {badge.icon}
                                </span>
                                <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    {badge.value}
                                </h3>
                            </div>
                            <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mt-2 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {badge.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;

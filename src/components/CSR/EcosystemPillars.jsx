import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
    {
        id: 'funders',
        title: 'CSR Funding Companies',
        description: 'Empower your corporate social responsibility vision. We provide a trusted platform to deploy funds securely, track impact metrics, and connect with verified grassroots initiatives.',
        color: '#000080',
        icon: 'corporate_fare',
        benefits: ['Verified NGO Network', 'Impact Tracking', 'Strategic Alignment']
    },
    {
        id: 'projects',
        title: 'Projects & Seekers',
        description: 'Turn innovative social ideas into reality. Pitch your projects directly to aligned corporate funders and secure the resources needed to drive urgent, meaningful change.',
        color: '#FF9933',
        icon: 'lightbulb',
        benefits: ['Direct Access to Funds', 'Structured Pitching', 'Mentorship & Growth']
    },
    {
        id: 'partners',
        title: 'Implementation Partners',
        description: 'Scale your grassroots operations. Join our network of verified NGOs to execute high-impact projects, maintain transparency, and build long-term corporate relationships.',
        color: '#138808',
        icon: 'diversity_3',
        benefits: ['Credibility & Trust', 'Capacity Building', 'Sustainable Funding']
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const EcosystemPillars = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        The Ecosystem Pillars
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Three foundational pillars working in synergy to accelerate social impact and build a sustainable future.
                    </p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {pillars.map((pillar) => (
                        <motion.div 
                            key={pillar.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl shadow-gray-100 transition-all flex flex-col h-full"
                        >
                            <div 
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm"
                                style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                            >
                                <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{pillar.description}</p>
                            
                            <ul className="space-y-3">
                                {pillar.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                        <span className="material-symbols-outlined text-base" style={{ color: pillar.color }}>check_circle</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default EcosystemPillars;

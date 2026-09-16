import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { privacyPolicyData } from '../content/privacyPolicy';

const PrivacyPolicy = () => {
    const shouldReduceMotion = useReducedMotion();
    const [activeSection, setActiveSection] = useState('section-1');
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const contentRef = useRef(null);
    const observer = useRef(null);

    // Calculate reading time (approx 200 words per min)
    const calculateReadingTime = () => {
        let textContent = privacyPolicyData.introParagraphs.join(" ");
        privacyPolicyData.sections.forEach(sec => {
            sec.content.forEach(c => {
                if (c.text) textContent += " " + c.text;
                if (c.items) textContent += " " + c.items.join(" ");
            });
        });
        const words = textContent.split(/\s+/).length;
        return Math.max(1, Math.ceil(words / 200));
    };
    const readingTime = calculateReadingTime();

    useEffect(() => {
        // Set document title
        document.title = `${privacyPolicyData.header.title} | ${privacyPolicyData.header.organization}`;

        // Intersection Observer for scroll spy
        observer.current = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            if (visibleEntries.length > 0) {
                // Get the top-most visible entry
                visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                setActiveSection(visibleEntries[0].target.id);
            }
        }, {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        });

        const sections = document.querySelectorAll('.policy-section');
        sections.forEach(sec => observer.current.observe(sec));

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    const scrollToSection = (id) => {
        setIsMobileTocOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Account for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            // Remove focus outline when clicking
            element.focus({ preventScroll: true });
        }
    };

    const handleCopyLink = (e, id) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        // Could add a toast here, but keeping it simple
        const icon = e.currentTarget.querySelector('span');
        if (icon) {
            icon.innerText = 'check';
            setTimeout(() => { icon.innerText = 'link'; }, 2000);
        }
    };

    // Handle initial hash routing
    useEffect(() => {
        if (window.location.hash) {
            setTimeout(() => {
                const id = window.location.hash.substring(1);
                scrollToSection(id);
            }, 500); // Wait for render
        }
    }, []);

    const renderContentBlock = (block, idx) => {
        if (block.type === 'p') {
            // Replace bold markdown with strong tags
            const html = block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return <p key={idx} className="mb-4 text-gray-700 leading-relaxed font-body" dangerouslySetInnerHTML={{ __html: html }} />;
        }
        if (block.type === 'ul') {
            return (
                <ul key={idx} className="list-none space-y-3 mb-6 ml-4">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700 leading-relaxed font-body">
                            <span className="material-symbols-outlined text-[#fe9832] text-[20px] mr-3 mt-1 shrink-0">
                                check_circle
                            </span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        if (block.type === 'contact_table') {
            const d = block.details;
            return (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 my-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blue-100">
                        <div className="w-10 h-10 rounded-full bg-[#00003c] flex items-center justify-center text-white shrink-0">
                            <span className="material-symbols-outlined text-[20px]">assured_workload</span>
                        </div>
                        <h4 className="font-headline font-bold text-lg text-[#00003c]">{d.organisation}</h4>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <span className="material-symbols-outlined text-gray-400 mr-4 mt-0.5 w-6 text-center">person</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Grievance Officer</span>
                                <span className="text-gray-800 font-medium">{d.grievanceOfficer}</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="material-symbols-outlined text-gray-400 mr-4 mt-0.5 w-6 text-center">location_on</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Registered Office</span>
                                <span className="text-gray-800 font-medium">{d.registeredOffice}</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="material-symbols-outlined text-gray-400 mr-4 mt-0.5 w-6 text-center">mail</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</span>
                                <a href={`mailto:${d.email}`} className="text-[#fe9832] font-medium hover:underline">{d.email}</a>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="material-symbols-outlined text-gray-400 mr-4 mt-0.5 w-6 text-center">call</span>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Telephone</span>
                                <span className="text-gray-800 font-medium">{d.telephone}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            );
        }
        return null;
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": privacyPolicyData.header.title,
        "description": "Privacy Policy for Dr. Dnyaneshwar Mulay Foundation.",
        "publisher": {
            "@type": "Organization",
            "name": privacyPolicyData.header.organization,
            "url": privacyPolicyData.header.website
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": privacyPolicyData.header.website },
                { "@type": "ListItem", "position": 2, "name": "Privacy Policy" }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-body">
            {/* JSON-LD */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Reading Progress Bar (Hidden in print) */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1.5 bg-[#fe9832] origin-left z-50 print:hidden" 
                style={{ scaleX }} 
            />

            {/* Hero Section (Hidden in print) */}
            <header className="bg-[#00003c] text-white pt-32 pb-16 px-6 relative overflow-hidden print:hidden">
                <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-container rounded-full blur-[100px]"></div>
                </div>
                
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8 font-medium">
                        <Link to="/" className="hover:text-[#fe9832] transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-white">Privacy Policy</span>
                    </nav>

                    <motion.h1 
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight mb-6"
                    >
                        {privacyPolicyData.header.title}
                    </motion.h1>
                    
                    <motion.div 
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
                        className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-300"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-[#fe9832]">calendar_month</span>
                            <span>Effective: {privacyPolicyData.header.effectiveDate}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block"></div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-[#fe9832]">update</span>
                            <span>Updated: {privacyPolicyData.header.lastUpdated}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block"></div>
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            <span className="material-symbols-outlined text-[16px]">schedule</span>
                            <span>{readingTime} min read</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Print Only Header */}
            <div className="hidden print:block mb-8 text-center border-b pb-4">
                <h1 className="text-4xl font-bold mb-2">{privacyPolicyData.header.title}</h1>
                <p className="text-gray-600">{privacyPolicyData.header.organization}</p>
                <p className="text-sm text-gray-500 mt-2">Effective: {privacyPolicyData.header.effectiveDate} | Updated: {privacyPolicyData.header.lastUpdated}</p>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
                
                {/* Mobile TOC Toggle (Hidden in print) */}
                <div className="lg:hidden print:hidden border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm sticky top-[80px] z-30">
                    <button 
                        onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
                        className="w-full flex items-center justify-between p-4 font-headline font-bold text-[#00003c]"
                    >
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined">menu_book</span>
                            Table of Contents
                        </span>
                        <span className={`material-symbols-outlined transition-transform duration-300 ${isMobileTocOpen ? 'rotate-180' : ''}`}>
                            expand_more
                        </span>
                    </button>
                    {isMobileTocOpen && (
                        <div className="px-4 pb-4 bg-gray-50/50 border-t border-gray-100 max-h-[60vh] overflow-y-auto">
                            <nav className="mt-4 flex flex-col space-y-1">
                                {privacyPolicyData.sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                                            activeSection === section.id 
                                                ? 'bg-blue-50 text-[#00003c] font-bold' 
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>

                {/* Desktop Sidebar TOC (Hidden in print) */}
                <aside className="hidden lg:block sticky top-[100px] h-[calc(100vh-140px)] overflow-y-auto pr-6 print:hidden scrollbar-thin scrollbar-thumb-gray-200">
                    <h3 className="font-headline font-bold text-xs tracking-[0.15em] uppercase text-gray-400 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">menu_book</span>
                        Contents
                    </h3>
                    <nav className="flex flex-col space-y-1 border-l-2 border-gray-100">
                        {privacyPolicyData.sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`text-left text-sm py-2 pl-4 -ml-[2px] border-l-2 transition-all duration-200 ${
                                    activeSection === section.id 
                                        ? 'border-[#fe9832] text-[#00003c] font-bold bg-gradient-to-r from-orange-50/50 to-transparent' 
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900'
                                }`}
                            >
                                {section.title}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Content Document */}
                <main ref={contentRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 lg:p-14 print:shadow-none print:border-none print:p-0">
                    {/* Intro */}
                    <div className="mb-12">
                        {privacyPolicyData.introParagraphs.map((text, idx) => (
                            <p key={idx} className="mb-4 text-gray-700 leading-relaxed text-lg">
                                {text}
                            </p>
                        ))}
                    </div>

                    {/* Sections */}
                    <div className="space-y-16">
                        {privacyPolicyData.sections.map((section) => (
                            <section 
                                key={section.id} 
                                id={section.id} 
                                className="policy-section scroll-mt-28 print:break-inside-avoid"
                                tabIndex="-1" // Allow focus without outline
                            >
                                <h2 className="text-2xl font-headline font-extrabold text-[#00003c] mb-6 flex items-center group">
                                    {section.title}
                                    <button 
                                        onClick={(e) => handleCopyLink(e, section.id)}
                                        className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-[#fe9832] rounded print:hidden"
                                        title="Copy link to this section"
                                        aria-label="Copy link to this section"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">link</span>
                                    </button>
                                </h2>
                                
                                <div className="text-base text-gray-800">
                                    {section.content.map((block, idx) => renderContentBlock(block, idx))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>
            </div>

            {/* Related Information (Hidden in print) */}
            <section className="bg-gray-100 border-t border-gray-200 py-16 print:hidden">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h3 className="font-headline font-bold text-xl text-[#00003c] mb-8">Related Legal Information</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-200 text-gray-400 flex items-center gap-3 cursor-not-allowed select-none">
                            <span className="material-symbols-outlined">gavel</span>
                            <span className="font-medium">Terms & Conditions</span>
                            <span className="bg-gray-100 text-xs px-2 py-1 rounded-md font-bold tracking-wider uppercase ml-2">Coming Soon</span>
                        </div>
                        <Link to="/" className="bg-white hover:border-[#fe9832] hover:text-[#00003c] px-6 py-4 rounded-xl shadow-sm border border-gray-200 text-gray-600 flex items-center gap-3 transition-colors group">
                            <span className="material-symbols-outlined group-hover:text-[#fe9832]">contact_support</span>
                            <span className="font-medium">Contact Us</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Back to top FAB (Hidden in print) */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 w-12 h-12 bg-[#00003c] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#fe9832] transition-all duration-300 print:hidden z-40 ${
                    activeSection !== 'section-1' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
                aria-label="Back to top"
            >
                <span className="material-symbols-outlined">arrow_upward</span>
            </button>
        </div>
    );
};

export default PrivacyPolicy;

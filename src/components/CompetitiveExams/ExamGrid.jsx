import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categories = ["All", "Civil Services", "Banking", "Technical/Staff"];

const ExamGrid = () => {
    const [exams, setExams] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedCard, setExpandedCard] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const res = await fetch(`${API_URL}/api/competitive-exams`);
                if (res.ok) setExams(await res.json());
            } catch (err) {
                console.error(err);
            }
        };
        fetchExams();
    }, []);

    const filteredExams = exams.filter(exam => 
        activeCategory === "All" || exam.category === activeCategory
    );

    const toggleExpand = (id) => {
        if (expandedCard === id) {
            setExpandedCard(null);
        } else {
            setExpandedCard(id);
            setActiveTab("overview");
        }
    };

    return (
        <section id="exams" className="py-20 bg-[#F8F9FA]">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Explore Exam Domains
                        </h2>
                        <p className="text-gray-600 max-w-2xl text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Discover comprehensive information about top competitive examinations, eligibility criteria, and exam patterns.
                        </p>
                    </div>

                    {/* Minimalist Filter Bar */}
                    <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-full shadow-sm border border-gray-100">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                    activeCategory === cat 
                                    ? 'bg-[#000080] text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredExams.map(exam => (
                        <div 
                            key={exam._id} 
                            className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                                expandedCard === exam._id 
                                ? 'border-[#000080] shadow-2xl ring-4 ring-[#000080]/5 transform -translate-y-1' 
                                : 'border-gray-200 shadow-md hover:shadow-xl hover:border-[#000080]/30'
                            }`}
                        >
                            {/* Card Header Always Visible */}
                            <div className="p-8 cursor-pointer" onClick={() => toggleExpand(exam._id)}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {exam.examName}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-xs font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[14px]">
                                            {exam.level === 'Central Level' ? 'account_balance' : 'location_city'}
                                        </span>
                                        {exam.level}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <span className="text-[#FF9933] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        {expandedCard === exam._id ? 'Close Details' : 'View Details'} 
                                        <span className="material-symbols-outlined text-sm">
                                            {expandedCard === exam._id ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </span>
                                    <button 
                                        className={`px-6 py-2 rounded-lg border-2 border-[#000080] font-semibold text-sm transition-colors duration-300 ${exam.brochure ? 'text-[#000080] hover:bg-[#000080] hover:text-white' : 'text-gray-400 border-gray-400 cursor-not-allowed opacity-50'}`} 
                                        style={{ fontFamily: 'Inter, sans-serif' }} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (exam.brochure) {
                                                const url = exam.brochure.startsWith('http') ? exam.brochure : `${API_URL}${exam.brochure}`;
                                                window.open(url, '_blank', 'noopener,noreferrer');
                                            }
                                        }}
                                        disabled={!exam.brochure}
                                        title={!exam.brochure ? "Syllabus not available" : "Click to view syllabus"}
                                    >
                                        Access Syllabus
                                    </button>
                                </div>
                            </div>

                            {/* Expandable Content */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-gray-50 border-t border-gray-100 ${
                                expandedCard === exam._id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="p-8">
                                    {/* Tabbed Navigation */}
                                    <div className="flex border-b border-gray-200 mb-6 gap-8">
                                        {['overview', 'eligibility', 'pattern'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`pb-3 text-sm font-semibold capitalize transition-colors relative ${
                                                    activeTab === tab ? 'text-[#000080]' : 'text-gray-500 hover:text-[#000080]/70'
                                                }`}
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {tab.replace('-', ' ')}
                                                {activeTab === tab && (
                                                    <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-[#000080] rounded-t-full"></span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Tab Content */}
                                    <div className="min-h-[120px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {activeTab === 'overview' && (
                                            <p className="text-gray-700 leading-relaxed text-[15px]">{exam.overview}</p>
                                        )}
                                        {activeTab === 'eligibility' && (
                                            <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                                <span className="material-symbols-outlined text-[#FF9933] mt-0.5">verified_user</span>
                                                <p className="text-gray-700 leading-relaxed text-[15px]">{exam.eligibility}</p>
                                            </div>
                                        )}
                                        {activeTab === 'pattern' && (
                                            <ul className="space-y-3">
                                                {(exam.pattern || []).map((p, idx) => (
                                                    <li key={idx} className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 items-center">
                                                        <span className="w-8 h-8 rounded-full bg-[#000080]/10 text-[#000080] font-bold flex items-center justify-center text-sm flex-shrink-0">
                                                            {idx + 1}
                                                        </span>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-[15px]">{p.stage}</h4>
                                                            <p className="text-gray-500 text-sm">{p.desc}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                                {(!exam.pattern || exam.pattern.length === 0) && (
                                                    <p className="text-gray-500 italic">Exam pattern details not available.</p>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ExamGrid;

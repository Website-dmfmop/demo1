import React from 'react';
import { Link } from 'react-router-dom';

const ExamsHero = () => {
    return (
        <section className="relative w-full min-h-[85vh] bg-[#000080] flex items-center pt-24 pb-16 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay filter blur-[100px] transform translate-x-1/3 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF9933] rounded-full mix-blend-overlay filter blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left space-y-8">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF9933] font-semibold text-sm tracking-widest uppercase mb-4 shadow-xl">
                        Competitive Exams Hub
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Empowering the Next Generation of <span className="text-[#FF9933] relative inline-block">
                            Public Administrators
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF9933]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                            </svg>
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Comprehensive resources, verified materials, and expert mentorship to guide you through UPSC, MPSC, Banking, and SSC examinations. Your journey to public service starts here.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <a href="#resources" className="px-8 py-4 rounded-xl bg-[#FF9933] text-[#000080] font-bold text-lg hover:bg-white hover:text-[#000080] transition-all duration-300 shadow-[0_8px_30px_rgba(255,153,51,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 w-full sm:w-auto text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Explore Resources
                        </a>
                        <a href="#timeline" className="px-8 py-4 rounded-xl bg-transparent text-white border-2 border-white/30 font-bold text-lg hover:border-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span className="material-symbols-outlined">calendar_month</span>
                            View Exam Calendar
                        </a>
                    </div>
                </div>

                {/* Right Content - Graphic Stack */}
                <div className="flex-1 relative w-full max-w-lg mx-auto lg:max-w-none mt-12 lg:mt-0">
                    <div className="relative h-[400px] md:h-[500px] w-full perspective-1000">
                        {/* Background Card */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 transform rotate-6 translate-x-8 translate-y-4 transition-transform duration-500 hover:rotate-12 hover:translate-x-12 shadow-2xl"></div>
                        
                        {/* Middle Card */}
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transform rotate-3 translate-x-4 translate-y-2 transition-transform duration-500 hover:rotate-6 hover:translate-x-6 shadow-2xl"></div>
                        
                        {/* Foreground Main Card */}
                        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-transform duration-500 hover:-translate-y-2">
                            <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <span className="text-gray-400 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Live Metrics</span>
                            </div>
                            
                            <div className="p-8 flex-1 flex flex-col justify-center gap-6">
                                <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#000080]/5 border border-[#000080]/10 hover:bg-[#000080]/10 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-[#000080] flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined text-3xl">school</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>5+</h3>
                                        <p className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Exam Domains Covered</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#FF9933]/10 border border-[#FF9933]/20 hover:bg-[#FF9933]/20 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-[#FF9933] flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined text-3xl">library_books</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>100% Free</h3>
                                        <p className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Verified Study Material</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6 p-4 rounded-2xl bg-green-50 border border-green-100 hover:bg-green-100 transition-colors">
                                    <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined text-3xl">groups</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>50+</h3>
                                        <p className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Expert Mentors</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Floating decorative elements */}
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center justify-center transform rotate-12 animate-bounce-slow">
                            <img src="https://cdn-icons-png.flaticon.com/512/3256/3256114.png" alt="Books" className="w-full h-full object-contain opacity-80" />
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-[#F8F9FA] fill-current">
                    <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default ExamsHero;

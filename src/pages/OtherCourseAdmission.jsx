import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';
import { admissionTranslations } from '../translations/pages';
import RegisterInterestModal from '../components/RegisterInterestModal';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function OtherCourseAdmission() {
  const { language } = useLanguage();
  const tCommon = commonTranslations[language];
  const t = admissionTranslations[language] || admissionTranslations['en'];
  
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.filter(c => c.category === 'General' || c.category === 'Soft Skills'));
      })
      .catch(err => console.error('Data fetch error:', err));
  }, []);

  const toggleExpand = (id) => {
    if (expandedCourse === id) {
        setExpandedCourse(null);
    } else {
        setExpandedCourse(id);
    }
  };



  return (
    <div className="min-h-screen bg-[#F8F9FA] font-body pt-20">
      {/* Hero Section similar to Competitive Exams Hero */}
      <section className="relative w-full min-h-[50vh] bg-[#000080] flex items-center pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay filter blur-[100px] transform translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF9933] rounded-full mix-blend-overlay filter blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center gap-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF9933] font-semibold text-sm tracking-widest uppercase shadow-xl">
                {tCommon.navOtherCourse}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Discover <span className="text-[#FF9933] relative inline-block">
                    New Possibilities
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF9933]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Explore a variety of specialized courses designed to help you succeed in diverse fields and expand your horizons.
            </p>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-[#F8F9FA] fill-current">
                <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
        </div>
      </section>

      {/* Grid Section similar to ExamGrid */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col justify-between items-center mb-12 gap-6 text-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Explore More Courses
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Discover our wide range of general and soft skills training programs available for enrollment.
                    </p>
                </div>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">school</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Admissions Open</h3>
                    <p className="text-gray-500">No general or soft skills courses are currently listed. Please check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {courses.map(course => (
                        <div 
                            key={course._id} 
                            className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                                expandedCourse === course._id 
                                ? 'border-[#000080] shadow-2xl ring-4 ring-[#000080]/5 transform -translate-y-1' 
                                : 'border-gray-200 shadow-md hover:shadow-xl hover:border-[#000080]/30'
                            }`}
                        >
                            <div className="p-8 cursor-pointer" onClick={() => toggleExpand(course._id)}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {course.courseName}
                                    </h3>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9933]/10 text-[#FF9933] text-xs font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-[14px]">school</span>
                                        {course.category}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <span className="text-[#FF9933] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        {expandedCourse === course._id ? 'Close Details' : 'View Details'} 
                                        <span className="material-symbols-outlined text-sm">
                                            {expandedCourse === course._id ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </span>
                                    <button 
                                        className="px-6 py-2 rounded-lg border-2 border-[#000080] text-[#000080] font-semibold text-sm hover:bg-[#000080] hover:text-white transition-colors duration-300" 
                                        style={{ fontFamily: 'Inter, sans-serif' }} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCourse(course);
                                            setShowEnrollModal(true);
                                        }}
                                    >
                                        Register Interest
                                    </button>
                                </div>
                            </div>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out bg-gray-50 border-t border-gray-100 ${
                                expandedCourse === course._id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="p-8">
                                    <div className="min-h-[120px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                        <p className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-wrap">{course.description}</p>
                                        {course.brochure && (
                                            <div className="mt-6">
                                                <a 
                                                    href={`${API_URL}${course.brochure}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF9933] text-white font-semibold rounded-lg shadow-md hover:bg-[#e68a2e] transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                    Download Brochure
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      <RegisterInterestModal
        show={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        selectedCourse={selectedCourse}
        t={t}
      />
    </div>
  );
}

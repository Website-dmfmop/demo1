import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';
import { admissionTranslations } from '../translations/pages';
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LanguageCourseAdmission() {
  const { language } = useLanguage();
  const tCommon = commonTranslations[language];
  const t = admissionTranslations[language] || admissionTranslations['en'];
  
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Enrollment States
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.filter(c => c.category === 'Language'));
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

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
        alert('Please verify that you are not a robot.');
        return;
    }
    setIsEnrolling(true);
    try {
      const payload = {
        firstName: enrollForm.firstName,
        lastName: enrollForm.lastName,
        email: enrollForm.email,
        contactNumber: enrollForm.phone,
        courseCategory: selectedCourse.category || 'Language',
        subCourse: selectedCourse.courseName,
        captchaToken,
      };

      const res = await fetch(`${API_URL}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Registration Successful!\n\nYour interest in ${selectedCourse.courseName} has been recorded. Our team will contact you shortly.`);
        setShowEnrollModal(false);
        setEnrollForm({ firstName: '', lastName: '', email: '', phone: '' });
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsEnrolling(false);
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
                {tCommon.navLanguageCourse}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Master New <span className="text-[#FF9933] relative inline-block">
                    Languages
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF9933]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Enhance your communication skills with our comprehensive Language Courses. Become proficient and confident in your personal and professional life.
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
                        Explore Language Courses
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Discover our wide range of language training programs available for enrollment.
                    </p>
                </div>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">language</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Admissions Open</h3>
                    <p className="text-gray-500">No language courses are currently listed. Please check back later.</p>
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
                                        <span className="material-symbols-outlined text-[14px]">language</span>
                                        Language
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
      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isEnrolling && setShowEnrollModal(false)}></div>

          <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-left">
            <div className="bg-[#000080] p-6 text-white text-center relative">
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{t.registerTitle || 'Register Your Interest'}</h3>
              <p className="text-white/80 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedCourse.courseName}</p>
              {!isEnrolling && (
                <button onClick={() => setShowEnrollModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>

            <div className="p-8">
              <p className="text-sm text-gray-500 mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{t.fillDetails || 'Please provide your details below.'}</p>
              <form onSubmit={handleEnrollSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.firstName || 'First Name'}</label>
                    <input
                      type="text" required
                      value={enrollForm.firstName}
                      onChange={e => setEnrollForm({ ...enrollForm, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.lastName || 'Last Name'}</label>
                    <input
                      type="text" required
                      value={enrollForm.lastName}
                      onChange={e => setEnrollForm({ ...enrollForm, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.emailAddress || 'Email Address'}</label>
                  <input
                    type="email" required
                    value={enrollForm.email}
                    onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.phoneNumber || 'Phone Number'}</label>
                  <input
                    type="tel" required
                    value={enrollForm.phone}
                    onChange={e => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isEnrolling}
                  className="w-full py-4 bg-[#000080] hover:bg-[#000060] text-white font-bold text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {isEnrolling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      {t.submitRegistration || 'Submit Registration'}
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

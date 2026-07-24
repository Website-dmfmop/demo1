import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { admissionTranslations } from '../translations/pages';
import RegisterInterestModal from '../components/RegisterInterestModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Admission = () => {
  const { language } = useLanguage();
  const t = admissionTranslations[language];
  const [liveSessions, setLiveSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [diplomaCourses, setDiplomaCourses] = useState([]);
  const [competitiveExams, setCompetitiveExams] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({
    diploma: true,
    courses: true,
    sessions: true,
    exams: true
  });
  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };
  // Certificate courses
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  // Diploma courses
  const [activeCategoryDiploma, setActiveCategoryDiploma] = useState(null);
  const [expandedDiplomaCourse, setExpandedDiplomaCourse] = useState(null);
  const [expandedExam, setExpandedExam] = useState(null);

  // Enrollment States
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/live-sessions`),
      fetch(`${API_URL}/api/courses`),
      fetch(`${API_URL}/api/diploma-courses`),
      fetch(`${API_URL}/api/competitive-exams`)
    ])
      .then(async ([resSessions, resCourses, resDiploma, resExams]) => {
        if (resSessions.ok) setLiveSessions(await resSessions.json());
        if (resCourses.ok) setCourses(await resCourses.json());
        if (resDiploma.ok) setDiplomaCourses(await resDiploma.json());
        if (resExams.ok) setCompetitiveExams(await resExams.json());
      })
      .catch(err => console.error('Data fetch error:', err));
  }, []);

  const joinSession = (session) => {
    window.open(session.meetingLink, '_blank');
  };



  // Standard categories to show even if empty
  const standardCategories = ["General", "Language", "Technical Skills", "Soft Skills"];

  // Group certificate courses by category
  const groupedCourses = courses.reduce((acc, course) => {
    const cat = course.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, standardCategories.reduce((obj, cat) => ({ ...obj, [cat]: [] }), {}));

  // Group diploma/degree courses by category
  const groupedDiplomaCourses = diplomaCourses.reduce((acc, course) => {
    const cat = course.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, standardCategories.reduce((obj, cat) => ({ ...obj, [cat]: [] }), {}));

  return (
    <div className="min-h-screen relative overflow-hidden pt-28 pb-20 font-body" style={{ background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.25) 0%, rgba(255, 255, 255, 1) 50%, rgba(18, 136, 7, 0.25) 100%)' }}>
      {/* Decorative Background Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-orange-400/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-green-400/40 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12 items-center">

          {/* Left Side: Creative Typography & Value Proposition */}
          <div className="flex-1 text-center lg:text-left space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">school</span>
              {t.admissionsOpen}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1]">
              {t.heroTitle} <span className="text-secondary-container relative inline-block">{t.heroHighlight}<svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-container/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg></span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              {t.heroDesc}
            </p>



            {/* TABBED/ACCORDION DIRECTORY SECTION */}
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">

              {/* 1. DIPLOMA/DEGREE COURSES ACCORDION */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <button onClick={() => toggleDropdown('diploma')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                    </div>
                    Expert Diploma/Degree Course Directory
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${openDropdowns.diploma ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {openDropdowns.diploma && (
                  <div className="p-8 border-t border-outline-variant/20 bg-slate-50/50 space-y-6">
                    {diplomaCourses.length === 0 ? (
                      <p className="text-gray-500 font-medium text-center py-8">No diploma/degree courses currently listed. Please check back later.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {diplomaCourses.map(course => {
                          const isOpen = expandedDiplomaCourse === course._id;
                          return (
                            <div key={course._id} className="bg-white border border-outline-variant/10 rounded-2xl overflow-hidden border-l-4 border-l-primary shadow-sm transition-all duration-300 hover:shadow-md">
                              <button
                                onClick={() => setExpandedDiplomaCourse(isOpen ? null : course._id)}
                                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 group ${isOpen ? 'bg-primary/5' : 'hover:bg-primary/5'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-2 h-2 rounded-full bg-primary transition-transform duration-200 ${isOpen ? 'scale-125' : 'group-hover:scale-125'}`}></span>
                                  <h5 className={`font-bold text-base transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'}`}>{course.courseName}</h5>
                                </div>
                                <span className={`material-symbols-outlined text-[22px] transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`}>expand_more</span>
                              </button>
                              {isOpen && (
                                <div className="px-6 pb-6 pt-2 border-t border-outline-variant/10 bg-slate-50/60 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-5">{course.description}</p>
                                  <button
                                    onClick={() => {
                                      setSelectedCourse(course);
                                      setShowEnrollModal(true);
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-xl transition-all shadow-md active:scale-95"
                                  >
                                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                                    Register Interest
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. CERTIFICATE COURSES ACCORDION */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <button onClick={() => toggleDropdown('courses')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                    Expert Certificate Course Directory
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${openDropdowns.courses ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {openDropdowns.courses && (
                  <div className="p-8 border-t border-outline-variant/20 bg-slate-50/50 space-y-6">
                    {courses.length === 0 ? (
                      <p className="text-gray-500 font-medium text-center py-8">No courses currently listed. Please check back later.</p>
                    ) : (
                      Object.keys(groupedCourses).map(category => (
                        <div key={category} className="space-y-4">
                          <button
                            onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                            className="w-full flex items-center justify-between p-5 bg-white border border-outline-variant/20 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                          >
                            <h4 className="font-headline font-bold text-lg text-gray-800 flex items-center gap-3">
                              <span className="w-2 h-8 bg-primary rounded-full group-hover:scale-y-125 transition-transform"></span>
                              {category}
                            </h4>
                            <span className={`material-symbols-outlined text-gray-400 transition-transform ${activeCategory === category ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
                          </button>

                          {activeCategory === category && (
                            <div className="grid grid-cols-1 gap-4 pl-4 animate-in fade-in slide-in-from-top-2 duration-300">
                              {groupedCourses[category].length > 0 ? (
                                groupedCourses[category].map(course => {
                                  const isOpen = expandedCourse === course._id;
                                  return (
                                    <div key={course._id} className="bg-white border border-outline-variant/10 rounded-2xl overflow-hidden border-l-4 border-l-secondary-container shadow-sm transition-all duration-300 hover:shadow-md">
                                      {/* Clickable course name row */}
                                      <button
                                        onClick={() => setExpandedCourse(isOpen ? null : course._id)}
                                        className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 group ${isOpen ? 'bg-primary/5' : 'hover:bg-primary/5'
                                          }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className={`w-2 h-2 rounded-full bg-secondary-container transition-transform duration-200 ${isOpen ? 'scale-125' : 'group-hover:scale-125'
                                            }`}></span>
                                          <h5 className={`font-bold text-base transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'
                                            }`}>{course.courseName}</h5>
                                        </div>
                                        <span className={`material-symbols-outlined text-[22px] transition-all duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'
                                          }`}>expand_more</span>
                                      </button>

                                      {/* Expandable description + action */}
                                      {isOpen && (
                                        <div className="px-6 pb-6 pt-2 border-t border-outline-variant/10 bg-slate-50/60 animate-in fade-in slide-in-from-top-2 duration-300">
                                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-5">{course.description}</p>
                                           <div className="flex flex-wrap gap-3">
                                            <button
                                              onClick={() => {
                                                setSelectedCourse(course);
                                                setShowEnrollModal(true);
                                              }}
                                              className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-xl transition-all shadow-md active:scale-95"
                                            >
                                              <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                                              Register Interest
                                            </button>
                                            {course.brochure && (
                                              <a
                                                href={`${API_URL}${course.brochure}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-secondary-container hover:bg-[#d6e3c5] text-[#2c381e] font-headline font-bold rounded-xl transition-all shadow-md active:scale-95 text-sm"
                                              >
                                                <span className="material-symbols-outlined text-[20px]">download</span>
                                                Download supportive doc
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                                  <span className="material-symbols-outlined text-gray-400 text-3xl mb-2">info</span>
                                  <p className="text-gray-500 font-medium">Courses are not available in this category yet. Stay tuned!</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* 2. LIVE SESSIONS ACCORDION */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <button onClick={() => toggleDropdown('sessions')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">podcasts</span>
                    </div>
                    Live Learning Sessions
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${openDropdowns.sessions ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {openDropdowns.sessions && (
                  <div className="p-8 border-t border-outline-variant/20 bg-slate-50/50 space-y-4">
                    {liveSessions.length === 0 ? (
                      <p className="text-gray-500 font-medium text-center py-12">No live sessions scheduled right now. Stay tuned for updates!</p>
                    ) : (
                      liveSessions.map(session => (
                        <div key={session._id} className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 w-fit"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> LIVE</span>
                                {session.collaboration && <span className="text-[10px] uppercase font-bold tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">w/ {session.collaboration}</span>}
                              </div>
                              <h4 className="font-headline font-bold text-xl text-gray-800">{session.title}</h4>
                              <p className="text-sm text-gray-500 line-clamp-2">{session.description}</p>
                              <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 pt-2">
                                {session.speaker && <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">person</span> {session.speaker}</div>}
                                {session.date && <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">event</span> {session.date} {session.time}</div>}
                              </div>
                            </div>
                            <div className="shrink-0 flex flex-col items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                              <button onClick={() => joinSession(session)} className="px-5 py-2.5 bg-secondary-container hover:bg-[#d6e3c5] text-[#2c381e] font-bold rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center text-sm">
                                Join Now <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* 3. COMPETITIVE EXAMS ACCORDION */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <button onClick={() => toggleDropdown('exams')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">assignment</span>
                    </div>
                    Expert Competitive Exam Directory
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${openDropdowns.exams ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {openDropdowns.exams && (
                  <div className="p-8 border-t border-outline-variant/20 bg-slate-50/50 space-y-6">
                    {competitiveExams.length === 0 ? (
                      <p className="text-gray-500 font-medium text-center py-8">No competitive exam details currently listed. Please check back later.</p>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {competitiveExams.map(exam => {
                          const isExamOpen = expandedExam === exam._id;
                          return (
                            <div key={exam._id} className="bg-white border border-outline-variant/10 rounded-2xl overflow-hidden border-l-4 border-l-primary shadow-sm transition-all duration-300 hover:shadow-md">
                              <button
                                onClick={() => setExpandedExam(isExamOpen ? null : exam._id)}
                                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-200 group ${isExamOpen ? 'bg-primary/5' : 'hover:bg-primary/5'}`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-2 h-2 rounded-full bg-primary transition-transform duration-200 ${isExamOpen ? 'scale-125' : 'group-hover:scale-125'}`}></span>
                                  <h5 className={`font-bold text-base transition-colors duration-200 ${isExamOpen ? 'text-primary' : 'text-gray-800 group-hover:text-primary'}`}>{exam.examName} <span className="text-xs font-normal text-gray-400 ml-2">({exam.category})</span></h5>
                                </div>
                                <span className={`material-symbols-outlined text-[22px] transition-all duration-300 flex-shrink-0 ml-4 ${isExamOpen ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`}>expand_more</span>
                              </button>
                              {isExamOpen && (
                                <div className="px-6 pb-6 pt-2 border-t border-outline-variant/10 bg-slate-50/60 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap mb-5">{exam.description}</p>
                                  <div className="flex flex-wrap gap-3">
                                    <button
                                      onClick={() => {
                                        setSelectedCourse({ category: exam.category, courseName: exam.examName });
                                        setShowEnrollModal(true);
                                      }}
                                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-xl transition-all shadow-md active:scale-95"
                                    >
                                      <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                                      Register Interest
                                    </button>
                                    {exam.brochure && (
                                      <a
                                        href={`${API_URL}${exam.brochure}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-secondary-container hover:bg-[#d6e3c5] text-[#2c381e] font-headline font-bold rounded-xl transition-all shadow-md active:scale-95 text-sm"
                                      >
                                        <span className="material-symbols-outlined text-[20px]">download</span>
                                        Download supportive doc
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      <RegisterInterestModal
        show={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        selectedCourse={selectedCourse}
        t={t}
      />
    </div>
  );
};

export default Admission;

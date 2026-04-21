import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Admission = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState('courses');
  const [activeCategory, setActiveCategory] = useState(null);
  
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

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/live-sessions`),
      fetch(`${API_URL}/api/courses`)
    ])
      .then(async ([resSessions, resCourses]) => {
        if (resSessions.ok) setLiveSessions(await resSessions.json());
        if (resCourses.ok) setCourses(await resCourses.json());
      })
      .catch(err => console.error('Data fetch error:', err));
  }, []);

  const joinSession = (session) => {
    window.open(session.meetingLink, '_blank');
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setIsEnrolling(true);
    try {
      const payload = {
        firstName: enrollForm.firstName,
        lastName: enrollForm.lastName,
        email: enrollForm.email,
        contactNumber: enrollForm.phone,
        courseCategory: selectedCourse.category,
        subCourse: selectedCourse.courseName,
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

  // Standard categories to show even if empty
  const standardCategories = ["General", "Language", "Technical Skills", "Soft Skills"];

  // Group courses by category
  const groupedCourses = courses.reduce((acc, course) => {
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
              Admissions Open
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1]">
              Begin Your Journey to <span className="text-secondary-container relative inline-block">Excellence<svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-container/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" /></svg></span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
              Explore our wide range of expert-led courses across various domains. Download detailed brochures to understand the curriculum and learning outcomes for each program.
            </p>



            {/* TABBED/ACCORDION DIRECTORY SECTION */}
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
              {/* 1. COURSES ACCORDION */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-xl">
                <button onClick={() => setActiveDropdown(activeDropdown === 'courses' ? null : 'courses')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">school</span>
                    </div>
                    Expert Course Directory
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${activeDropdown === 'courses' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {activeDropdown === 'courses' && (
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
                                groupedCourses[category].map(course => (
                                  <div key={course._id} className="bg-white border border-outline-variant/10 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white transition-colors border-l-4 border-l-secondary-container">
                                    <div className="flex-1">
                                      <h5 className="font-bold text-lg text-gray-800 mb-1">{course.courseName}</h5>
                                      <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-3">{course.description}</p>
                                      </div>
                                    <div className="shrink-0 w-full md:w-auto flex flex-col gap-2">
                                      <button 
                                        onClick={() => {
                                          setSelectedCourse(course);
                                          setShowEnrollModal(true);
                                        }}
                                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-xl transition-all shadow-md active:scale-95"
                                      >
                                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                                        Register Interest
                                      </button>
                                      {course.brochure ? (
                                        <a 
                                          href={`${API_URL}${course.brochure}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-secondary-container text-on-secondary-container hover:bg-secondary-container/10 font-headline font-bold rounded-xl transition-all"
                                        >
                                          <span className="material-symbols-outlined text-[20px]">download</span>
                                          Brochure
                                        </a>
                                      ) : (
                                        <button disabled className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 border border-gray-200 font-headline font-bold rounded-xl cursor-not-allowed">
                                          <span className="material-symbols-outlined text-[20px]">block</span>
                                          No Brochure
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))
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
                <button onClick={() => setActiveDropdown(activeDropdown === 'sessions' ? null : 'sessions')} className="w-full flex items-center justify-between p-8 bg-surface hover:bg-surface-container-low transition-colors">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-primary flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">podcasts</span>
                    </div>
                    Live Learning Sessions
                  </h3>
                  <span className={`material-symbols-outlined text-gray-400 text-3xl transition-transform duration-300 ${activeDropdown === 'sessions' ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {activeDropdown === 'sessions' && (
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
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isEnrolling && setShowEnrollModal(false)}></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-primary p-6 text-white text-center relative">
              <h3 className="text-2xl font-display font-bold">Register Your Interest</h3>
              <p className="text-primary-container/80 text-sm mt-1">{selectedCourse.courseName}</p>
              {!isEnrolling && (
                <button onClick={() => setShowEnrollModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <p className="text-sm text-gray-500 mb-6 text-center">Fill in your details and our team will get in touch with you shortly.</p>
              <form onSubmit={handleEnrollSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">First Name</label>
                    <input 
                      type="text" required 
                      value={enrollForm.firstName}
                      onChange={e => setEnrollForm({...enrollForm, firstName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Last Name</label>
                    <input 
                      type="text" required 
                      value={enrollForm.lastName}
                      onChange={e => setEnrollForm({...enrollForm, lastName: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <input 
                    type="email" required 
                    value={enrollForm.email}
                    onChange={e => setEnrollForm({...enrollForm, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phone Number</label>
                  <input 
                    type="tel" required 
                    value={enrollForm.phone}
                    onChange={e => setEnrollForm({...enrollForm, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="+91 98765 43210"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isEnrolling}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-headline font-extrabold text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isEnrolling ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Registration
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
};

export default Admission;

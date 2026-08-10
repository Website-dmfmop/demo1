import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';
import { admissionTranslations } from '../translations/pages';
import RegisterInterestModal from '../components/RegisterInterestModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LiveSection() {
  const { language } = useLanguage();
  const tCommon = commonTranslations[language];
  const tAdmission = admissionTranslations[language] || admissionTranslations['en'];
  
  const [liveSessions, setLiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [unlockedSessions, setUnlockedSessions] = useState(new Set());

  useEffect(() => {
    fetch(`${API_URL}/api/live-sessions`)
      .then(res => res.json())
      .then(data => {
        setLiveSessions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Data fetch error:', err);
        setLoading(false);
      });
  }, []);

  const handleJoinClick = (session) => {
    if (unlockedSessions.has(session._id)) {
        window.open(session.meetingLink, '_blank');
    } else {
        setSelectedCourse({
            courseName: session.title,
            category: "Live Session",
            _id: session._id,
            meetingLink: session.meetingLink
        });
        setShowEnrollModal(true);
    }
  };

  const handleRegistrationSuccess = () => {
    if (selectedCourse) {
        setUnlockedSessions(prev => {
            const newSet = new Set(prev);
            newSet.add(selectedCourse._id);
            return newSet;
        });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-body pt-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] bg-[#000080] flex items-center pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay filter blur-[100px] transform translate-x-1/3 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF9933] rounded-full mix-blend-overlay filter blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center gap-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF9933] font-semibold text-sm tracking-widest uppercase shadow-xl">
                {tCommon.navLiveSection || "Live Section"}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Explore <span className="text-[#FF9933] relative inline-block">
                    Live Sessions
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FF9933]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                    </svg>
                </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Join our expert-led live learning sessions to gain valuable insights, collaborate in real-time, and advance your knowledge.
            </p>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-[#F8F9FA] fill-current">
                <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
            </svg>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col justify-between items-center mb-12 gap-6 text-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Live Learning Sessions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Browse our upcoming and ongoing live sessions and register to join.
                    </p>
                </div>
            </div>

            {loading ? (
                 <div className="text-center py-16">
                     <span className="material-symbols-outlined animate-spin text-4xl text-[#000080]">sync</span>
                     <p className="text-gray-500 mt-4">Loading sessions...</p>
                 </div>
            ) : liveSessions.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">podcasts</span>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>No Live Sessions</h3>
                    <p className="text-gray-500">No live sessions are scheduled right now. Please check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {liveSessions.map(session => (
                        <div key={session._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#000080]/5 rounded-bl-full -z-10 group-hover:bg-[#000080]/10 transition-colors"></div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> LIVE
                            </span>
                            {session.collaboration && <span className="text-[10px] uppercase font-bold tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">w/ {session.collaboration}</span>}
                          </div>
                          
                          <h4 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{session.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-grow">{session.description}</p>
                          
                          <div className="space-y-3 text-sm font-medium text-gray-600 mb-6 bg-gray-50 p-4 rounded-xl">
                            {session.speaker && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-[#FF9933]">person</span> 
                                    {session.speaker}
                                </div>
                            )}
                            {session.date && (
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-[#FF9933]">event</span> 
                                    {session.date} {session.time && `at ${session.time}`}
                                </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-5">
                            <div className="text-2xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {Number(session.cost) === 0 ? 'Free' : `₹${session.cost}`}
                            </div>
                            {unlockedSessions.has(session._id) ? (
                                <button 
                                    onClick={() => window.open(session.meetingLink, '_blank')} 
                                    className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-sm"
                                >
                                    Access Link <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleJoinClick(session)} 
                                    className="px-5 py-2.5 bg-[#FF9933] hover:bg-[#e68a2e] text-[#000080] font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 text-sm"
                                >
                                    Join Link <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </button>
                            )}
                          </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </section>

      <RegisterInterestModal
        show={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        selectedCourse={selectedCourse}
        t={tAdmission}
        onSuccess={handleRegistrationSuccess}
        customSuccessMessage="Registration successful! You now have access to the live session link."
      />
    </div>
  );
}

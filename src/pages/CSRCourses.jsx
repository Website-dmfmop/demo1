import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';
import { admissionTranslations } from '../translations/pages';
import RegisterInterestModal from '../components/RegisterInterestModal';
import { API_URL } from '../config/api';

const defaultCSRCourses = [
  {
    _id: 'csr-program-mgmt-default',
    courseName: 'CSR Program and Project Management Skills',
    description: 'Learn the fundamentals of managing CSR programs and projects effectively. This course covers project planning, stakeholder management, impact measurement, and reporting — equipping NGO professionals and CSR practitioners with practical tools for managing social impact initiatives end-to-end.',
    category: 'CSR',
  },
  {
    _id: 'csr-proposal-default',
    courseName: 'CSR Program Proposal Making',
    description: 'Master the art and science of crafting compelling CSR proposals that win funding. From understanding corporate CSR mandates under the Companies Act to structuring budgets, logical frameworks, and impact narratives — this course prepares you to create professional-grade proposals.',
    category: 'CSR',
  },
  {
    _id: 'csr-reporting-default',
    courseName: 'Program Reporting to CSR Companies',
    description: 'Learn how to create comprehensive program reports that satisfy corporate CSR compliance requirements. This course covers progress reporting, financial documentation, impact storytelling with data, and building long-term donor relationships through transparent communication.',
    category: 'CSR',
  },
  {
    _id: 'esg-sustainability-default',
    courseName: 'Power BI & Tableau for Sustainability and BRSR Reporting',
    description: 'Gain hands-on skills in data visualization tools — Power BI and Tableau — specifically tailored for ESG and sustainability reporting. Learn to create interactive dashboards for BRSR (Business Responsibility and Sustainability Reporting), track ESG metrics, and present sustainability data to stakeholders effectively.',
    category: 'CSR',
  },
  {
    _id: 'lean-manufacturing-default',
    courseName: 'Introduction to Lean Manufacturing',
    description: 'Understand the core principles of Lean Manufacturing and how to apply them for operational excellence. Covers value stream identification, waste elimination, continuous improvement (Kaizen), and practical tools like 5S, Kanban, and standard work — applicable across manufacturing and service industries.',
    category: 'CSR',
  },
  {
    _id: 'six-sigma-default',
    courseName: 'Six Sigma Green Belt Fundamentals',
    description: 'Build a solid foundation in Six Sigma methodology with this Green Belt level course. Learn the DMAIC framework (Define, Measure, Analyze, Improve, Control), statistical process control, root cause analysis, and quality improvement techniques used by leading global organizations.',
    category: 'CSR',
  },
];

export default function CSRCourses() {
  const { language } = useLanguage();
  const tCommon = commonTranslations[language];
  const t = admissionTranslations[language] || admissionTranslations['en'];

  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.filter(c => c.category === 'CSR'));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching CSR courses:', err);
        setLoading(false);
      });
  }, []);

  const displayCourses = courses.length > 0 ? courses : defaultCSRCourses;

  const toggleExpand = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  // Category icons based on course name keywords
  const getCourseIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('proposal')) return 'edit_document';
    if (lower.includes('reporting') || lower.includes('report')) return 'assessment';
    if (lower.includes('power bi') || lower.includes('tableau') || lower.includes('sustainability')) return 'query_stats';
    if (lower.includes('lean') || lower.includes('manufacturing')) return 'precision_manufacturing';
    if (lower.includes('six sigma') || lower.includes('green belt')) return 'verified';
    if (lower.includes('kaizen') || lower.includes('5s')) return 'auto_fix_high';
    if (lower.includes('excel') || lower.includes('productivity')) return 'table_chart';
    if (lower.includes('kanban') || lower.includes('visual')) return 'view_kanban';
    if (lower.includes('value stream')) return 'account_tree';
    if (lower.includes('defect') || lower.includes('zero')) return 'bug_report';
    if (lower.includes('layout') || lower.includes('workshop')) return 'grid_view';
    if (lower.includes('inventory') || lower.includes('maintenance')) return 'inventory_2';
    if (lower.includes('powerpoint') || lower.includes('presentation')) return 'slideshow';
    return 'school';
  };

  const getCourseColor = (index) => {
    const colors = [
      { bg: 'bg-[#1565c0]/10', text: 'text-[#1565c0]', border: 'border-[#1565c0]', accent: '#1565c0' },
      { bg: 'bg-[#2e7d32]/10', text: 'text-[#2e7d32]', border: 'border-[#2e7d32]', accent: '#2e7d32' },
      { bg: 'bg-[#e65100]/10', text: 'text-[#e65100]', border: 'border-[#e65100]', accent: '#e65100' },
      { bg: 'bg-[#6a1b9a]/10', text: 'text-[#6a1b9a]', border: 'border-[#6a1b9a]', accent: '#6a1b9a' },
      { bg: 'bg-[#00838f]/10', text: 'text-[#00838f]', border: 'border-[#00838f]', accent: '#00838f' },
      { bg: 'bg-[#ad1457]/10', text: 'text-[#ad1457]', border: 'border-[#ad1457]', accent: '#ad1457' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-body pt-20">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full min-h-[55vh] bg-gradient-to-br from-[#00003c] via-[#001060] to-[#1a237e] flex items-center pt-16 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#fe9832]/8 rounded-full blur-[120px] transform translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2e7d32]/10 rounded-full blur-[100px] transform -translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px] transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] right-[10%] w-16 h-16 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
            <span className="material-symbols-outlined text-[#fe9832] text-2xl">volunteer_activism</span>
          </div>
          <div className="absolute bottom-[20%] left-[8%] w-14 h-14 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <span className="material-symbols-outlined text-[#2e7d32] text-2xl">eco</span>
          </div>
          <div className="absolute top-[40%] right-[25%] w-12 h-12 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
            <span className="material-symbols-outlined text-white/40 text-xl">trending_up</span>
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center gap-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-xs font-medium tracking-wide">
            <Link to="/icoe" className="hover:text-white/80 transition-colors">ICOE</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#fe9832]">CSR Courses</span>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#fe9832] font-semibold text-sm tracking-widest uppercase shadow-xl">
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            CSR Training Programs
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Corporate Social{' '}
            <span className="text-[#fe9832] relative inline-block">
              Responsibility
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#fe9832]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
              </svg>
            </span>{' '}
            Courses
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Practical training in CSR program management, proposal writing, ESG reporting, 
            operational excellence, and sustainability — empowering professionals and NGOs to create measurable social impact.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-[#fe9832] text-lg">school</span>
              <span className="text-white font-semibold text-sm">{displayCourses.length}+ Courses</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-[#2e7d32] text-lg">verified</span>
              <span className="text-white font-semibold text-sm">Certified Programs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-[#42a5f5] text-lg">devices</span>
              <span className="text-white font-semibold text-sm">Online & Offline</span>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto text-[#F8F9FA] fill-current">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col justify-between items-center mb-14 gap-6 text-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fe9832]/10 text-[#fe9832] text-xs font-bold uppercase tracking-widest mb-4">
                Pillar 03 — CSR Training
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Explore CSR Courses
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                Build expertise in CSR management, sustainability reporting, and operational excellence with our curated training programs.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-16 flex justify-center items-center">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#000080]"></div>
                <span className="text-sm text-gray-500 font-medium">Loading courses...</span>
              </div>
            </div>
          ) : displayCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">school</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Courses Coming Soon</h3>
              <p className="text-gray-500">CSR courses are currently being prepared. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {displayCourses.map((course, index) => {
                const color = getCourseColor(index);
                const icon = getCourseIcon(course.courseName);
                return (
                  <div
                    key={course._id}
                    className={`bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                      expandedCourse === course._id
                        ? `${color.border} shadow-2xl ring-4 ring-opacity-10 transform -translate-y-1`
                        : 'border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300'
                    }`}
                    style={expandedCourse === course._id ? { '--tw-ring-color': color.accent + '20' } : {}}
                  >
                    <div className="p-8 cursor-pointer" onClick={() => toggleExpand(course._id)}>
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${color.bg} ${color.text} flex items-center justify-center shrink-0`}>
                            <span className="material-symbols-outlined text-2xl">{icon}</span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-[#000080]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {course.courseName}
                            </h3>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${color.bg} ${color.text} text-xs font-bold uppercase tracking-wider shrink-0`}>
                          <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
                          CSR
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <span className={`${color.text} font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all`}>
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
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#fe9832] text-white font-semibold rounded-lg shadow-md hover:bg-[#e68a2e] transition-colors"
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY CSR TRAINING CTA ── */}
      <section className="py-16 bg-gradient-to-br from-[#00003c] via-[#001060] to-[#1a237e] text-white px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-label text-[#fe9832] text-xs font-bold tracking-widest uppercase block">
            Why CSR Training Matters
          </span>

          <h2 className="font-headline text-3xl sm:text-4xl font-black uppercase">
            Empower Your Organization for Social Impact
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-body">
            Whether you're an NGO seeking to strengthen CSR proposals, a professional aiming to master sustainability reporting, or an organization pursuing operational excellence — our courses provide actionable skills for real-world impact.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              to="/icoe"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#fe9832] text-[#00003c] font-headline font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:bg-white hover:text-[#00003c] transition-all duration-300 active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">domain</span>
              <span>Back to ICOE</span>
            </Link>

            <Link
              to="/icoe/admissions/language-course"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-headline font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>Language Courses</span>
            </Link>
          </div>
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

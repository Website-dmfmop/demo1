import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingLangToggle from './components/FloatingLangToggle';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Donate from './pages/Donate';
import Missions from './pages/Missions';
import ICOE from './pages/ICOE';
import Media from './pages/Media';
const Admin = lazy(() => import('./pages/Admin'));
import Admission from './pages/Admission';
import CompetitiveExamsHub from './pages/CompetitiveExamsHub';
import CSR from './pages/CSR';
import JoinUs from './pages/JoinUs';
import SitePolicy from './pages/SitePolicy';

import JobPlacement from './pages/JobPlacement';
import MovementOfPositivity from './pages/MovementOfPositivity';
import CenterOfExcellence from './pages/CenterOfExcellence';
import WordsBeyondBorders from './pages/WordsBeyondBorders';
import NursingCollege from './pages/NursingCollege';
import SocialInnovationPath from './pages/SocialInnovationPath';
import SheLeads from './pages/SheLeads';
import SkillReach from './pages/SkillReach';
import ShelterHome from './pages/ShelterHome';
import DTNTLivesMatter from './pages/DTNTLivesMatter';
import JobFair from './pages/JobFair';
import BecomePartner from './pages/BecomePartner';
import SlotBooking from './pages/SlotBooking';
import DmfMemberForm from './pages/DmfMemberForm';

import GnmAdmission from './pages/GnmAdmission';
import LanguageCourseAdmission from './pages/LanguageCourseAdmission';
import TechnicalCourseAdmission from './pages/TechnicalCourseAdmission';
import OtherCourseAdmission from './pages/OtherCourseAdmission';
import WhatWeDo from './pages/WhatWeDo';
import ExamRegistration from './pages/ExamRegistration';
import LiveSection from './pages/LiveSection';
import CourseTeaserToast from './components/Admissions/CourseTeaserToast';
import RegisterNowFloater from './components/Admissions/RegisterNowFloater';
import FloatingWBBLogo from './components/FloatingWBBLogo';
import FloatingSocialDock from './components/FloatingSocialDock';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
      <ScrollToTop />
      <Navbar />
      <FloatingLangToggle />
      <FloatingWBBLogo />
      <CourseTeaserToast />
      <RegisterNowFloater />
      <FloatingSocialDock />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/missions" element={<Missions />} />

        {/* ── Canonical ICOE Ecosystem Routes ── */}
        <Route path="/icoe" element={<ICOE />} />
        <Route path="/icoe/admissions" element={<Admission />} />
        <Route path="/icoe/admissions/gnm" element={<GnmAdmission />} />
        <Route path="/icoe/admissions/language-course" element={<LanguageCourseAdmission />} />
        <Route path="/icoe/admissions/technical-course" element={<TechnicalCourseAdmission />} />
        <Route path="/icoe/admissions/other-course" element={<OtherCourseAdmission />} />
        <Route path="/icoe/competitive-exams" element={<CompetitiveExamsHub />} />
        <Route path="/icoe/competitive-exams/register" element={<ExamRegistration />} />
        <Route path="/icoe/job-placement" element={<JobPlacement />} />

        {/* ── Backwards-Compatible Legacy Routes (Aliases) ── */}
        <Route path="/admission" element={<Admission />} />
        <Route path="/admission/gnm" element={<GnmAdmission />} />
        <Route path="/admission/language-course" element={<LanguageCourseAdmission />} />
        <Route path="/admission/technical-course" element={<TechnicalCourseAdmission />} />
        <Route path="/admission/other-course" element={<OtherCourseAdmission />} />
        <Route path="/live-section" element={<LiveSection />} />
        <Route path="/competitive-exams-hub" element={<CompetitiveExamsHub />} />
        <Route path="/competitive-exams-hub/register" element={<ExamRegistration />} />
        <Route path="/job-placement" element={<JobPlacement />} />
        <Route path="/international-center-of-excellence" element={<CenterOfExcellence />} />

        <Route path="/media" element={<Media />} />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                  <span className="text-sm font-medium text-gray-500">Loading Admin Console...</span>
                </div>
              </div>
            }>
              <Admin />
            </Suspense>
          } 
        />
        {import.meta.env.DEV && <Route path="/csr" element={<CSR />} />}
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/movement-of-positivity" element={<MovementOfPositivity />} />
        <Route path="/words-beyond-borders" element={<WordsBeyondBorders />} />
        <Route path="/nursing-college" element={<NursingCollege />} />
        <Route path="/social-innovation-path" element={<SocialInnovationPath />} />
        <Route path="/she-leads" element={<SheLeads />} />
        <Route path="/skill-reach" element={<SkillReach />} />
        <Route path="/shelter-home" element={<ShelterHome />} />
        <Route path="/dtnt-lives-matter" element={<DTNTLivesMatter />} />
        <Route path="/job-fair" element={<JobFair />} />
        <Route path="/become-a-partner" element={<BecomePartner />} />
        <Route path="/slot-booking" element={<SlotBooking />} />
        <Route path="/become-dmf-member" element={<DmfMemberForm />} />
        <Route path="/privacy-policy" element={<SitePolicy />} />
      </Routes>
      <Footer />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

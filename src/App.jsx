import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Donate from './pages/Donate';
import Missions from './pages/Missions';
import ICOE from './pages/ICOE';
import Media from './pages/Media';
import Admin from './pages/Admin';
import Admission from './pages/Admission';
import JoinUs from './pages/JoinUs';

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

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/icoe" element={<ICOE />} />
        <Route path="/media" element={<Media />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/job-placement" element={<JobPlacement />} />
        <Route path="/movement-of-positivity" element={<MovementOfPositivity />} />
        <Route path="/international-center-of-excellence" element={<CenterOfExcellence />} />
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

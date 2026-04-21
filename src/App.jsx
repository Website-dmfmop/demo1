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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

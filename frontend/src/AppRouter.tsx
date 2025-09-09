import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Attractions from './pages/Attractions';
import Ticket from './pages/Ticket';
import Features from './pages/Features';
import Services from './pages/Services';
import Team from './pages/Team';
import Review from './pages/Review';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      {!isHome && <Navbar />}
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/features" element={<Features />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/review" element={<Review />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRouter;



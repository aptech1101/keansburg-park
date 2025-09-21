import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Info from './pages/Info';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Attractions from './pages/Attractions';
import Ticket from './pages/Ticket';
import Features from './pages/Features';
import Service from './pages/Service';
import Team from './pages/Team';
import Review from './pages/Review';
import Blog from './pages/Blog';
import Restaurants from './pages/Restaurants';
import AmusementPark from './pages/Amusement-park';
import WaterPark from './pages/Water-park';
import Policy from './pages/Policy';
import Guideline from './pages/Guideline';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setShowBackToTop(y > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Info />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/features" element={<Features />} />
          <Route path="/services" element={<Service />} />
          <Route path="/service" element={<Service />} />
          <Route path="/team" element={<Team />} />
          <Route path="/review" element={<Review />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/signup" element={<NotFound />} />
          <Route path="/login" element={<NotFound />} />
          <Route path="/zones/amusement" element={<AmusementPark />} />
          <Route path="/zones/water" element={<WaterPark />} />
          <Route path="/zones/restaurant" element={<Restaurants />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Back to Top Button - Global */}
      <a
        href="#"
        onClick={handleBackToTop}
        className={`btn btn-primary btn-lg-square rounded-circle back-to-top${showBackToTop ? ' show' : ''}`}
        style={{ position: 'fixed', right: '30px', bottom: '30px', left: 'auto', zIndex: 2147483647 }}
      >
        <i className="fa fa-arrow-up"></i>
      </a>
    </>
  );
};

export default AppRouter;



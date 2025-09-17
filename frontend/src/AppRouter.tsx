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
import Blog from './pages/Blog';
// import Restaurant from './pages/Restaurant';
// import AmusementPark from './pages/Amusement-park';
// import WaterPark from './pages/Water-park';
import NotFound from './pages/NotFound';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';


const AppRouter: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      <Navbar />
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/guide" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/zones/amusement" element={<NotFound />} />
          <Route path="/zones/water" element={<NotFound />} />
          <Route path="/zones/restaurant" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Back to Top Button - Global */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle position-fixed" 
         style={{ 
           bottom: '30px', 
           right: '30px', 
           zIndex: 1000,
           width: '50px',
           height: '50px',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
           transition: 'all 0.3s ease'
         }}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = 'translateY(-3px)';
           e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
         }}>
        <i className="fas fa-arrow-up"></i>
      </a>
    </>
  );
};

export default AppRouter;



import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import Restaurants from './pages/Restaurants';
import Info from './pages/Info';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';

const AppRouter: React.FC = () => {
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
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/info" element={<Info />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRouter;



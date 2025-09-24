import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Info from './pages/Info';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Ticket from './pages/Ticket';
import Service from './pages/Service';
import Restaurants from './pages/Restaurants';
import AmusementPark from './pages/Amusement-park';
import WaterPark from './pages/Water-park';
import Policy from './pages/Policy';
import Guideline from './pages/Guideline';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import NotFound from './pages/NotFound';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminZones from "./pages/admin/AdminZones";
import AdminAttractions from "./pages/admin/AdminAttractions";

import Profile from './pages/account/profile';
import Orders from './pages/account/Orders';

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
          {/* Attractions route removed */}
          <Route path="/ticket" element={<Ticket />} />
          {/* Features route removed */}
          <Route path="/services" element={<Service />} />
          <Route path="/service" element={<Service />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* removed: team, review */}
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/zones/amusement" element={<AmusementPark />} />
          <Route path="/zones/water" element={<WaterPark />} />
          <Route path="/zones/restaurant" element={<Restaurants />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="attractions" element={<AdminAttractions />} />
            <Route path="zones" element={<AdminZones />} />
          </Route>
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



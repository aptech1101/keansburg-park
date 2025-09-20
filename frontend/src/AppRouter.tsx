import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./pages/About";
import Attractions from "./pages/Attractions";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Review from "./pages/Review";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Ticket from "./pages/Ticket";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminZones from "./pages/admin/AdminZones";
import AdminAttractions from "./pages/admin/AdminAttractions";

const AppRouter: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      {!isHome && <Navbar />}
      <main style={{ minHeight: "70vh" }}>
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
    </>
  );
};

export default AppRouter;

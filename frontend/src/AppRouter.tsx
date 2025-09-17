import React from 'react';
import { Routes, Route, useLocation, HashRouter, Navigate } from 'react-router-dom';
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
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import Cart from './pages/Cart';
import CheckoutPage from './pages/Checkout';

// Minimal account page placeholder (private route target)
const AccountPage: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-white rounded p-5 shadow">
            <h2 className="text-primary mb-3">My Account</h2>
            <p className="mb-0">Welcome to your account page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? element : <Navigate to="/login" replace />;
};

const AppRoutes: React.FC = () => {
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Auth routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Private route */}
          <Route path="/account" element={<PrivateRoute element={<AccountPage />} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default AppRouter;



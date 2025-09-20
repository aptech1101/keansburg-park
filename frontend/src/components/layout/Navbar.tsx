import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
import { useAuth } from '../../contexts/AuthContext';
import keansburgLogo from '../../assets/img/keansburg-logo.png';
import 'bootstrap-icons/font/bootstrap-icons.css';




const Navbar: React.FC = () => {
  const [isZonesOpen, setIsZonesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const onlineUsers = useOnlineUsers();
  const { user, logoutUser } = useAuth();

  const zonesMenu = [
    { name: 'Amusement Park', path: '/zones/amusement' },
    { name: 'Water Park', path: '/zones/water' },
    { name: 'Restaurant', path: '/zones/restaurant' },
  ];

  return (
    <div className="container-fluid nav-bar sticky-top px-4 py-3 py-lg-2">
      <nav className="navbar navbar-expand-lg navbar-light" style={{ minHeight: '80px' }}>
        {/* Logo Section */}
        <Link to="/" className="navbar-brand p-0 d-flex align-items-center">
          <img src={keansburgLogo} alt="Keansburg Logo" className="me-3" style={{ height: '50px', width: 'auto' }} />
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          {/* Center Navigation Menu */}
          <div className="navbar-nav mx-auto py-0 d-flex align-items-center" style={{ gap: '2rem' }}>
            <NavLink to="/" end className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>About</NavLink>

            {/* Zones Dropdown */}
            <div className="nav-item dropdown" onMouseEnter={() => setIsZonesOpen(true)} onMouseLeave={() => setIsZonesOpen(false)} style={{ position: 'relative' }}>
              <span className="nav-link dropdown-toggle" style={{ cursor: 'pointer' }}>Zones <i className="fas fa-chevron-down"></i></span>
              {isZonesOpen && (
                <div className="dropdown-menu show" style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)' }}>
                  {zonesMenu.map(zone => (
                    <Link key={zone.path} to={zone.path} className="dropdown-item">{zone.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/guide" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Guide</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="d-flex align-items-center">
            <Link to="/ticket" className="btn btn-danger rounded-pill py-2 px-4 me-3">BUY TICKET</Link>
            <div className="me-3" style={{ cursor: 'pointer' }}><i className="fas fa-shopping-cart"></i></div>

            {user ? (
              <div className="nav-item dropdown" style={{ position: 'relative' }}>
                <span
                  className="nav-link dropdown-toggle"
                  style={{ cursor: 'pointer', paddingRight: '0' }}
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hello, {user.username}
                  <i className="bi bi-person-circle" style={{ fontSize: '20px', color: '#3CBEEE' }}></i>
                </span>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown"
                style={{
                  backgroundColor: '#fff',   
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  borderRadius: '6px',       
                  padding: '5px 0',          
                  minWidth: '180px',        
                }}
                >
                  <Link className="dropdown-item" to="/profile">Profile</Link>
                  <Link className="dropdown-item" to="/orders">Orders</Link>
                  <span
                    className="dropdown-item text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => { logoutUser(); window.location.href = '/'; }}
                  >
                    Logout
                  </span>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="btn rounded-pill py-2 px-3 me-2"
                  style={{ backgroundColor: '#3CBEEE', color: '#fff' }}
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="btn rounded-pill py-2 px-3 me-3"
                  style={{ backgroundColor: '#3CBEEE', color: '#fff' }}
                >
                  Login
                </Link>
              </>
            )}


            <div className="text-muted">{onlineUsers.toLocaleString()} Online</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

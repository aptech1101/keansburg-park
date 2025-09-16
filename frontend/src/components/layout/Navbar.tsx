import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
import keansburgLogo from '../../assets/img/keansburg-logo.png';
import runawayRapidsLogo from '../../assets/img/runaway-rapids.png';

const Navbar: React.FC = () => {
  const [isZonesOpen, setIsZonesOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 992px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  const onlineUsers = useOnlineUsers();

  const zonesMenu = [
    { name: 'Amusement Park', path: '/zones/amusement' },
    { name: 'Water Park', path: '/zones/water' },
    { name: 'Restaurant', path: '/zones/restaurant' },
  ];

  return (
    <>
      {/* Main Navbar */}
      <div className="container-fluid nav-bar sticky-top px-4 py-3 py-lg-2">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ minHeight: '80px' }}>
          {/* Logo Section */}
          <div className="navbar-brand p-0 d-flex align-items-center flex-nowrap">
            <Link to="/zones/amusement" className="d-inline-flex me-3" aria-label="Go to Amusement Park">
              <img 
                src={keansburgLogo} 
                alt="Keansburg Logo" 
                style={{ height: '50px', width: 'auto' }}
              />
            </Link>
            <Link to="/zones/water" className="d-inline-flex" aria-label="Go to Water Park">
              <img 
                src={runawayRapidsLogo} 
                alt="Runaway Rapids" 
                style={{ height: '50px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* Left Side - Empty for balance */}
            <div className="navbar-nav me-auto">
            </div>

            {/* Center Navigation Menu */}
            <div className="navbar-nav mx-auto py-0 d-flex align-items-center" style={{ gap: '2rem' }}>
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
              >
                About
              </NavLink>
              
              {/* Zones Dropdown */}
              <div 
                className={`nav-item dropdown${isZonesOpen ? ' show' : ''}`}
                onMouseEnter={() => isDesktop && setIsZonesOpen(true)}
                onMouseLeave={() => isDesktop && setIsZonesOpen(false)}
                style={{ position: 'relative' }}
              >
                <span 
                  className="nav-link dropdown-toggle zones-toggle" 
                  style={{ 
                    cursor: 'pointer',
                    padding: '1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  onClick={() => !isDesktop && setIsZonesOpen(prev => !prev)}
                  aria-expanded={isZonesOpen}
                >
                  Zones
                  <i className={`fas fa-chevron-down chevron-icon${isZonesOpen ? ' rotated' : ''}`} style={{ fontSize: '0.75rem' }}></i>
                </span>
                <div 
                  className={`dropdown-menu${isZonesOpen ? ' show' : ''}`}
                  style={{ 
                    position: isDesktop ? 'absolute' : 'static',
                    top: isDesktop ? '100%' : undefined,
                    left: isDesktop ? '50%' : undefined,
                    transform: isDesktop ? 'translateX(-50%)' : undefined,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    boxShadow: isDesktop ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                    zIndex: 1000,
                    minWidth: isDesktop ? '200px' : undefined,
                    marginTop: isDesktop ? '0.5rem' : 0
                  }}
                >
                  {zonesMenu.map((zone) => (
                    <Link
                      key={zone.path}
                      to={zone.path}
                      className="dropdown-item"
                      style={{ 
                        color: 'var(--bs-dark)',
                        padding: '12px 20px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#3CBEEE';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--bs-dark)';
                      }}
                      onClick={() => !isDesktop && setIsZonesOpen(false)}
                    >
                      {zone.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink 
                to="/guide" 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
              >
                Guide
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
              >
                Contact
              </NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="d-flex align-items-center">
              {/* Buy Ticket Button */}
              <Link 
                to="/ticket" 
                className="btn btn-danger rounded-pill py-2 px-4 me-3"
                style={{ 
                  backgroundColor: '#dc3545',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                BUY TICKET
              </Link>

              {/* Cart Icon */}
              <div className="me-3" style={{ cursor: 'pointer' }}>
                <i className="fas fa-shopping-cart" style={{ fontSize: '20px', color: '#666666' }}></i>
              </div>

              {/* Sign up Button */}
              <Link 
                to="/signup" 
                className="btn rounded-pill py-2 px-3 me-2"
                style={{ 
                  backgroundColor: '#3CBEEE',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px'
                }}
              >
                Sign up
              </Link>

              {/* Login Button */}
              <Link 
                to="/login" 
                className="btn rounded-pill py-2 px-3 me-3"
                style={{ 
                  backgroundColor: '#3CBEEE',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '14px'
                }}
              >
                Login
              </Link>

              {/* Online Users Counter */}
              <div className="text-muted" style={{ fontSize: '12px', color: '#666666' }}>
                {onlineUsers.toLocaleString()} Online
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;



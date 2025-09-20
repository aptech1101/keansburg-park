import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
import keansburgLogo from '../../assets/img/keansburg-logo.png';
import runawayRapidsLogo from '../../assets/img/runaway-rapids.png';

const Navbar: React.FC = () => {
  const [isZonesOpen, setIsZonesOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  
  // Check if current route is a zones route
  const isZonesRoute = location.pathname.startsWith('/zones/');
  
  // Check if current route is a service/guide route
  const isServiceGuideRoute = location.pathname.toLowerCase() === '/service' || location.pathname.toLowerCase() === '/services' || location.pathname.toLowerCase() === '/guideline';
  useEffect(() => {
    const media = window.matchMedia('(min-width: 992px)');
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  
  useEffect(() => {
    const handleClose = () => setIsNavOpen(false);
    window.addEventListener('hashchange', handleClose);
    window.addEventListener('popstate', handleClose);
    return () => {
      window.removeEventListener('hashchange', handleClose);
      window.removeEventListener('popstate', handleClose);
    };
  }, []);

  const handleNavLinkClick = () => {
    if (!isDesktop) setIsNavOpen(false);
  };
  const onlineUsers = useOnlineUsers();

  const zonesMenu = [
    { name: 'Amusement Park', path: '/zones/amusement' },
    { name: 'Water Park', path: '/zones/water' },
    { name: 'Restaurant', path: '/zones/restaurant' },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isDesktop) {
      document.body.style.overflow = isNavOpen ? 'hidden' : '';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen, isDesktop]);

  return (
    <>
      <style>{`
        .navbar-nav .nav-link.active {
          color: var(--bs-primary) !important;
        }

        .navbar-nav .nav-link {
          position: relative;
        }

        .navbar-nav .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #3CBEEE;
          transition: width 0.3s ease;
        }

        .navbar-nav .nav-link.active::after {
          width: 100% !important;
        }

        .zones-toggle {
          position: relative;
        }

        /* Responsive logo sizing */
        .navbar-logo {
          height: 50px; /* Default desktop size */
          width: auto;
          flex-shrink: 0; /* Prevent logos from shrinking */
        }

        @media (max-width: 576px) {
          .navbar-logo {
            height: 35px; /* Mobile size */
            width: auto;
          }
        }

        /* Ensure navbar brand container never wraps */
        .navbar-brand {
          white-space: nowrap;
          overflow: hidden;
        }

        /* Mobile Off-canvas Slide Animation */
        @media (max-width: 991.98px) {
          .offcanvas-mobile {
            position: fixed !important;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: #ffffff;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease-in-out;
            z-index: 1050;
            overflow-y: auto;
            padding: 2rem 1.5rem;
          }

          .offcanvas-mobile.show {
            right: 0;
          }

          .offcanvas-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .offcanvas-backdrop.show {
            opacity: 1;
          }

          /* Mobile menu items styling */
          .offcanvas-mobile .navbar-nav {
            flex-direction: column;
            gap: 0;
          }

          .offcanvas-mobile .nav-item {
            width: 100%;
            border-bottom: 1px solid #f0f0f0;
          }

          .offcanvas-mobile .nav-link {
            padding: 1rem 0 !important;
            font-size: 1.1rem;
            font-weight: 500;
          }

          .offcanvas-mobile .dropdown-menu {
            position: static !important;
            transform: none !important;
            box-shadow: none !important;
            border: none !important;
            background: #f8f9fa !important;
            margin: 0.5rem 0 0 1rem;
            padding: 0.5rem 0;
          }

          .offcanvas-mobile .dropdown-item {
            padding: 0.75rem 1rem !important;
            font-size: 1rem;
            margin: 0 !important;
            border-radius: 0 !important;
          }

          /* Mobile actions styling */
          .offcanvas-mobile .d-flex.align-items-center {
            flex-direction: column;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #f0f0f0;
          }

          .offcanvas-mobile .btn {
            width: 100%;
            justify-content: center;
          }

          .offcanvas-mobile .text-muted {
            text-align: center !important;
            margin-top: 1rem;
          }
        }
      `}</style>
      {/* Main Navbar */}
      <div className="container-fluid nav-bar sticky-top px-4 py-3 py-lg-2">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ minHeight: '80px' }}>
          {/* Logo Section */}
          <div 
            className="navbar-brand p-0" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              flexWrap: 'nowrap'
            }}
          >
            <Link to="/zones/amusement" className="d-inline-flex" aria-label="Go to Amusement Park">
              <img 
                src={keansburgLogo} 
                alt="Keansburg Logo" 
                className="navbar-logo"
                style={{ 
                  width: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Link>
            <Link to="/zones/water" className="d-inline-flex" aria-label="Go to Water Park">
              <img 
                src={runawayRapidsLogo} 
                alt="Runaway Rapids" 
                className="navbar-logo"
                style={{ 
                  width: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler" 
            type="button" 
            aria-controls="navbarCollapse"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen(prev => !prev)}
          >
            <span className="fa fa-bars"></span>
          </button>

          <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}${!isDesktop ? ' offcanvas-mobile' : ''}`} id="navbarCollapse">
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
                onClick={handleNavLinkClick}
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
                onClick={handleNavLinkClick}
              >
                Information
              </NavLink>
              
              {/* Zones Dropdown */}
              <div 
                className={`nav-item dropdown${isZonesOpen ? ' show' : ''}`}
                onMouseEnter={() => isDesktop && setIsZonesOpen(true)}
                onMouseLeave={() => isDesktop && setIsZonesOpen(false)}
                style={{ position: 'relative' }}
              >
                <span 
                  className={`nav-link dropdown-toggle zones-toggle${isZonesRoute ? ' active' : ''}`}
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
                    borderRadius: '12px',
                    boxShadow: isDesktop ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                    zIndex: 1000,
                    minWidth: isDesktop ? '200px' : undefined,
                    marginTop: isDesktop ? '0.5rem' : 0,
                    padding: '8px'
                  }}
                >
                  {zonesMenu.map((zone, index) => (
                    <Link
                      key={zone.path}
                      to={zone.path}
                      className="dropdown-item position-relative overflow-hidden"
                      style={{ 
                        color: 'var(--bs-dark)',
                        padding: '12px 20px',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        display: 'block',
                        borderRadius: '8px',
                        margin: '0 0 4px 0',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        const overlay = e.currentTarget.querySelector('.dropdown-overlay') as HTMLElement;
                        if (overlay) {
                          overlay.style.transform = 'translateY(0)';
                        }
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        const overlay = e.currentTarget.querySelector('.dropdown-overlay') as HTMLElement;
                        if (overlay) {
                          overlay.style.transform = 'translateY(-100%)';
                        }
                        e.currentTarget.style.color = 'var(--bs-dark)';
                      }}
                      onClick={() => {
                        if (!isDesktop) {
                          setIsZonesOpen(false);
                          setIsNavOpen(false);
                        }
                      }}
                    >
                      {/* Hover overlay effect */}
                      <div 
                        className="dropdown-overlay position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          backgroundColor: '#3CBEEE',
                          transform: 'translateY(-100%)',
                          transition: 'transform 0.4s ease-in-out',
                          zIndex: 1,
                          borderRadius: '8px'
                        }}
                      ></div>
                      
                      <span className="position-relative" style={{ zIndex: 2 }}>
                        {zone.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink 
                to="/service" 
                className={`nav-item nav-link${isServiceGuideRoute ? ' active' : ''}`}
                style={{ padding: '1rem 0' }}
                onClick={handleNavLinkClick}
              >
                Service & Guide
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
                onClick={handleNavLinkClick}
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
                onClick={handleNavLinkClick}
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
                onClick={handleNavLinkClick}
              >
                Login
              </Link>

              {/* Online Users Counter */}
              <div 
                className="text-muted" 
                style={{ 
                  fontSize: '12px', 
                  color: '#666666',
                  minWidth: '80px',
                  textAlign: 'right',
                  transition: 'opacity 0.2s ease'
                }}
              >
                {onlineUsers.toLocaleString()} Online
              </div>
            </div>
          </div>
          {/* Backdrop for off-canvas on mobile */}
          {!isDesktop && isNavOpen && (
            <div
              className="offcanvas-backdrop show"
              aria-hidden="true"
              onClick={() => setIsNavOpen(false)}
            ></div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;



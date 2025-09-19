import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOnlineUsers } from '../../hooks/useOnlineUsers';
import keansburgLogo from '../../assets/img/keansburg-logo.png';
import runawayRapidsLogo from '../../assets/img/runaway-rapids.png';

const Navbar: React.FC = () => {
  const [isZonesOpen, setIsZonesOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
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
      {/* Main Navbar */}
      <div className="container-fluid nav-bar sticky-top px-4 py-3 py-lg-2">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ minHeight: '80px' }}>
          {/* Logo Section */}
          <div className="navbar-brand p-0 d-flex align-items-center flex-nowrap">
            <Link to="/zones/amusement" className="d-inline-flex me-3" aria-label="Go to Amusement Park">
              <img 
                src={keansburgLogo} 
                alt="Keansburg Logo" 
                style={{ 
                  height: '50px', 
                  width: 'auto',
                  borderRadius: '8px'
                }}
              />
            </Link>
            <Link to="/zones/water" className="d-inline-flex" aria-label="Go to Water Park">
              <img 
                src={runawayRapidsLogo} 
                alt="Runaway Rapids" 
                style={{ 
                  height: '50px', 
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
                to="/guide" 
                className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}
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
              className="offcanvas-backdrop"
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



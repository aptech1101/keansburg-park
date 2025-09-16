import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="container-fluid nav-bar sticky-top px-4 py-2 py-lg-0">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="display-6 text-dark">
            <i className="fas fa-swimmer text-primary me-3"></i>
            WaterLand
          </h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-auto py-0">
            <NavLink to="/" end className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>About</NavLink>
            <NavLink to="/attractions" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Attractions</NavLink>
            <NavLink to="/ticket" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Ticket</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Gallery</NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Services</NavLink>
            <NavLink to="/team" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Team</NavLink>
            <NavLink to="/review" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Review</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
            {/* Added links for Son's pages without altering existing items */}
            <NavLink to="/restaurants" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Restaurants</NavLink>
            <NavLink to="/info" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Info</NavLink>
            <NavLink to="/policy" className={({ isActive }) => `nav-item nav-link${isActive ? ' active' : ''}`}>Policy</NavLink>
          </div>
          <div className="team-icon d-none d-xl-flex justify-content-center me-3">
            <a className="btn btn-square btn-light rounded-circle mx-1" href=""><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-square btn-light rounded-circle mx-1" href=""><i className="fab fa-twitter"></i></a>
            <a className="btn btn-square btn-light rounded-circle mx-1" href=""><i className="fab fa-instagram"></i></a>
            <a className="btn btn-square btn-light rounded-circle mx-1" href=""><i className="fab fa-linkedin-in"></i></a>
          </div>
          <a href="#" className="btn btn-primary rounded-pill py-2 px-4 flex-shrink-0">Get Started</a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



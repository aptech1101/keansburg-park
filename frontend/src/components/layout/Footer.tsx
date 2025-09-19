import React from 'react';
import { Link } from 'react-router-dom';
import keansburgLogo from '../../assets/img/keansburg-logo.png';
import runawayRapidsLogo from '../../assets/img/runaway-rapids.png';
import imgPayment from '../../assets/img/payment.png';

const Footer: React.FC = () => {
  return (
    <>
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s" style={{ backgroundColor: '#021016' }}>
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <div className="p-0 d-flex align-items-center mb-4">
                  <Link to="/zones/amusement" className="d-inline-flex me-2" aria-label="Go to Amusement Park">
                    <img 
                      src={keansburgLogo} 
                      alt="Keansburg Logo" 
                      style={{ height: '40px', width: 'auto' }}
                    />
                  </Link>
                  <Link to="/zones/water" className="d-inline-flex" aria-label="Go to Water Park">
                    <img 
                      src={runawayRapidsLogo} 
                      alt="Runaway Rapids" 
                      style={{ height: '40px', width: 'auto' }}
                    />
                  </Link>
                </div>
                <p className="mb-2 text-white-50">Where Fun Never Ends!</p>
                <p className="mb-4 text-white-50">Family • Thrills • Memories</p>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-map-marker-alt me-3" style={{ color: '#3CBEEE' }}></i>
                  <p className="text-white mb-0">275 Beachway, Keansburg, NJ 07734</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fas fa-envelope me-3" style={{ color: '#3CBEEE' }}></i>
                  <p className="text-white mb-0">info@keansburgamusementpark.com</p>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="fa fa-phone-alt me-3" style={{ color: '#3CBEEE' }}></i>
                  <p className="text-white mb-0">(732) 492-1400</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa fa-fax me-3" style={{ color: '#3CBEEE' }}></i>
                  <p className="text-white mb-0">(732) 496-1900</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Quick Links</h4>
                <div className="d-flex flex-column">
                  <Link to="/about" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> About Us
                  </Link>
                  <Link to="/ticket" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> Tickets
                  </Link>
                  <Link to="/gallery" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> Gallery
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Support</h4>
                <div className="d-flex flex-column">
                  <a href="#" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> Privacy Policy
                  </a>
                  <a href="#" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> FAQ
                  </a>
                  <Link to="/Guideline" className="text-white-50 mb-2 text-decoration-none">
                    <i className="fas fa-angle-right me-2" style={{ color: '#3CBEEE' }}></i> Guide
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <h4 className="text-white mb-4">Opening Hours</h4>
                <div className="opening-hours mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white">Monday - Friday:</span>
                    <span className="text-white-50"><i className="fas fa-clock text-primary me-2"></i>09:00 AM - 10:30 PM</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white">Saturday - Sunday:</span>
                    <span className="text-white-50"><i className="fas fa-clock text-primary me-2"></i>09:00 AM - 11:30 PM</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-white">Holiday:</span>
                    <span className="text-white-50"><i className="fas fa-clock text-primary me-2"></i>09:00 AM - 11:30 PM</span>
                  </div>
                </div>
                <div>
                  <p className="text-white mb-3">Payment Accepted</p>
                  <div className="d-flex align-items-center">
                    <img 
                      src={imgPayment} 
                      alt="Payment Methods" 
                      style={{ height: '40px', width: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright py-4" style={{ backgroundColor: '#000' }}>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-white-50">
                © 2025 Keansburg Amusement Park. All rights reserved.
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="text-white-50">
                Designed & Developed by <span className="text-white fw-bold">BUG</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;



import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <>
      <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <Link to="/" className="p-0">
                  <h4 className="text-white mb-4"><i className="fas fa-swimmer text-primary me-3"></i>WaterLand</h4>
                </Link>
                <p className="mb-2">Dolor amet sit justo amet elitr clita ipsum elitr est.Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                <div className="d-flex align-items-center">
                  <i className="fas fa-map-marker-alt text-primary me-3"></i>
                  <p className="text-white mb-0">123 Street New York.USA</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-envelope text-primary me-3"></i>
                  <p className="text-white mb-0">info@example.com</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa fa-phone-alt text-primary me-3"></i>
                  <p className="text-white mb-0">(+012) 3456 7890</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Quick Links</h4>
                <Link to="/about"><i className="fas fa-angle-right me-2"></i> About Us</Link>
                <Link to="/features"><i className="fas fa-angle-right me-2"></i> Features</Link>
                <Link to="/attractions"><i className="fas fa-angle-right me-2"></i> Attractions</Link>
                <Link to="/ticket"><i className="fas fa-angle-right me-2"></i> Tickets</Link>
                <Link to="/restaurants"><i className="fas fa-angle-right me-2"></i> Restaurants</Link>
                <Link to="/contact"><i className="fas fa-angle-right me-2"></i> Contact us</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-2">
              <div className="footer-item">
                <h4 className="text-white mb-4">Support</h4>
                <Link to="/policy"><i className="fas fa-angle-right me-2"></i> Privacy Policy</Link>
                <Link to="/policy"><i className="fas fa-angle-right me-2"></i> Terms & Conditions</Link>
                <Link to="/policy"><i className="fas fa-angle-right me-2"></i> Disclaimer</Link>
                <Link to="/info"><i className="fas fa-angle-right me-2"></i> FAQ</Link>
                <Link to="/contact"><i className="fas fa-angle-right me-2"></i> Support</Link>
                <Link to="/info"><i className="fas fa-angle-right me-2"></i> Help</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4">
              <div className="footer-item">
                <h4 className="text-white mb-4">Opening Hours</h4>
                <div className="opening-date mb-3 pb-3">
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Monday - Friday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 11:00 AM - 16:00 PM</p>
                  </div>
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Satur - Sunday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 09:00 AM - 17:00 PM</p>
                  </div>
                  <div className="opening-clock flex-shrink-0">
                    <h6 className="text-white mb-0 me-auto">Holiday:</h6>
                    <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i> 09:00 AM - 17:00 PM</p>
                  </div>
                </div>
                <div>
                  <p className="text-white mb-2">Payment Accepted</p>
                  <img src="/src/assets/img/payment.png" className="img-fluid" alt="Image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright py-4">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-body"><a href="#" className="border-bottom text-white"><i className="fas fa-copyright text-light me-2"></i>Your Site Name</a>, All right reserved.</span>
            </div>
            <div className="col-md-6 text-center text-md-end text-body">
              Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom text-white" href="https://themewagon.com">ThemeWagon</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;



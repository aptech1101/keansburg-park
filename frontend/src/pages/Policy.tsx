import React, { useState, useEffect } from 'react';
import bannerImg from '../assets/img/page-banner.png';

const Policy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('privacy');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="container-fluid p-0" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(10px)', transition: 'all 900ms ease' }}>
      {/* Hero Section */}
      <section className="position-relative d-flex align-items-center" style={{ minHeight: '360px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backgroundImage: `url('${bannerImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)'
        }} />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)'
        }} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row py-5">
            <div className="col-12 text-center" style={{ color: '#fff' }}>
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>Policies & Terms</h1>
              <p className="lead mb-0" style={{ color: '#FFFFFF', opacity: 0.95 }}>Information about Keansburg Park's policies, terms and guest guidelines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4" style={{ backgroundColor: '#f5f9ff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills justify-content-center" style={{ gap: '0.5rem' }}>
                <li className="nav-item">
                  <button 
                    className={`nav-link rounded-pill ${activeSection === 'privacy' ? 'active' : ''}`}
                    onClick={() => setActiveSection('privacy')}
                    style={{
                      backgroundColor: activeSection === 'privacy' ? '#3CBEEE' : '#FFFFFF',
                      color: activeSection === 'privacy' ? '#FFFFFF' : '#0d1b21',
                      border: '1px solid #e9ecef',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                      transition: 'all 240ms ease'
                    }}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link rounded-pill ${activeSection === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveSection('terms')}
                    style={{
                      backgroundColor: activeSection === 'terms' ? '#3CBEEE' : '#FFFFFF',
                      color: activeSection === 'terms' ? '#FFFFFF' : '#0d1b21',
                      border: '1px solid #e9ecef',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                      transition: 'all 240ms ease'
                    }}
                  >
                    Terms of Service
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link rounded-pill ${activeSection === 'disclaimer' ? 'active' : ''}`}
                    onClick={() => setActiveSection('disclaimer')}
                    style={{
                      backgroundColor: activeSection === 'disclaimer' ? '#3CBEEE' : '#FFFFFF',
                      color: activeSection === 'disclaimer' ? '#FFFFFF' : '#0d1b21',
                      border: '1px solid #e9ecef',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                      transition: 'all 240ms ease'
                    }}
                  >
                    Disclaimer
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="alert alert-info mb-4" role="alert" style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.06)', borderRadius: '10px' }}>
                <i className="fas fa-info-circle me-2"></i>
                We respect your privacy and aim to make our policies transparent and easy to understand.
              </div>
              
              {/* Privacy Policy */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="mb-4">Privacy Policy</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card" style={{ border: '1px solid #eef2f5', borderRadius: '12px', boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
                    <div className="card-body">
                      <h5 className="card-title">1. Information We Collect</h5>
                      <p>
                        We collect your personal information when you:
                      </p>
                      <ul>
                        <li>Create an account on our website</li>
                        <li>Purchase tickets or services</li>
                        <li>Contact our team</li>
                        <li>Use our park services</li>
                      </ul>
                      
                      <h5 className="card-title mt-4">2. How We Use Information</h5>
                      <p>Your personal data is used to:</p>
                      <ul>
                        <li>Provide and improve services</li>
                        <li>Process transactions and payments</li>
                        <li>Send event updates and promotions</li>
                        <li>Offer customer support</li>
                      </ul>
                      
                      <h5 className="card-title mt-4">3. Data Protection</h5>
                      <p>
                        We protect your data using industry-standard security measures and do not
                        share it with third parties without your consent.
                      </p>
                      <h5 className="card-title mt-4">4. Cookies & Preferences</h5>
                      <p>
                        We use cookies to improve site functionality and measure performance. You can
                        manage preferences in your browser or via in-page controls when available.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms of Service */}
              {activeSection === 'terms' && (
                <div>
                  <h2 className="mb-4">Terms of Service</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card" style={{ border: '1px solid #eef2f5', borderRadius: '12px', boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
                    <div className="card-body">
                      <h5 className="card-title">1. Acceptance of Terms</h5>
                      <p>
                        By using Keansburg Park services, you agree to the terms and conditions
                        outlined in this document.
                      </p>
                      
                      <h5 className="card-title mt-4">2. Rules of Use</h5>
                      <p>When visiting the park, you agree to:</p>
                      <ul>
                        <li>Follow all safety guidelines</li>
                        <li>Refrain from bringing dangerous items</li>
                        <li>Respect other guests</li>
                        <li>Do not damage park property</li>
                        <li>Observe age and height restrictions</li>
                      </ul>
                      
                      <h5 className="card-title mt-4">3. Tickets and Refunds</h5>
                      <p>
                        Tickets are non-refundable except when the park is closed due to severe
                        weather or technical issues. In such cases, tickets may be refunded or
                        rescheduled.
                      </p>
                      
                      <h5 className="card-title mt-4">4. Responsibility</h5>
                      <p>
                        Guests are responsible for their own health and safety while engaging in
                        park activities.
                      </p>
                      <h5 className="card-title mt-4">5. Contact & Dispute Resolution</h5>
                      <p>
                        If an issue arises, please contact our support team first. We will do our best
                        to resolve it promptly and fairly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {activeSection === 'disclaimer' && (
                <div>
                  <h2 className="mb-4">Disclaimer</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card" style={{ border: '1px solid #eef2f5', borderRadius: '12px', boxShadow: '0 10px 24px rgba(0,0,0,0.06)' }}>
                    <div className="card-body">
                      <h5 className="card-title">1. Risks and Safety</h5>
                      <div className="alert alert-warning">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        <strong>Important:</strong> Participating in rides and attractions carries
                        inherent risks. Guests participate voluntarily and at their own risk.
                      </div>
                      
                      <h5 className="card-title mt-4">2. Limitation of Liability</h5>
                      <p>
                        Keansburg Park is not liable for:
                      </p>
                      <ul>
                        <li>Injuries resulting from failure to follow safety rules</li>
                        <li>Loss or damage of personal property</li>
                        <li>Schedule changes due to weather or technical issues</li>
                        <li>Third-party activities</li>
                      </ul>
                      
                      <h5 className="card-title mt-4">3. Website Information</h5>
                      <p>
                        Information on the website is provided "as is" and may change without notice.
                        We do not guarantee absolute accuracy of all content.
                      </p>
                      
                      <h5 className="card-title mt-4">4. External Links</h5>
                      <p>
                        The website may contain links to external sites. We are not responsible for 
                        their content or policies.
                      </p>
                      
                      <h5 className="card-title mt-4">5. Changes to Terms</h5>
                      <p>
                        We may update these terms at any time. Continued use after changes
                        constitutes acceptance of the new terms.
                      </p>
                      <h5 className="card-title mt-4">6. Accessibility</h5>
                      <p>
                        We strive to ensure our website and experiences are accessible to all guests. If
                        you encounter barriers, let us know and we will assist.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="row mt-5">
                <div className="col-lg-12">
                  <div className="card bg-light">
                    <div className="card-body text-center">
                      <h5>Questions About Policies?</h5>
                      <p className="text-muted mb-3">
                        If you have questions regarding our policies or terms,
                        please contact us.
                      </p>
                      <div className="row">
                        <div className="col-md-4">
                          <i className="fas fa-envelope text-primary me-2"></i>
                          <span>legal@keansburgpark.com</span>
                        </div>
                        <div className="col-md-4">
                          <i className="fas fa-phone text-primary me-2"></i>
                          <span>(732) 495-1400</span>
                        </div>
                        <div className="col-md-4">
                          <i className="fas fa-map-marker-alt text-primary me-2"></i>
                          <span>275 Beachway Ave, Keansburg, NJ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policy;

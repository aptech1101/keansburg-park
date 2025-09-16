import React, { useState } from 'react';

const Policy: React.FC = () => {
  const [activeSection, setActiveSection] = useState('privacy');

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold mb-4">Policies & Terms</h1>
              <p className="lead">Information about Keansburg Park's policies and terms of use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeSection === 'privacy' ? 'active' : ''}`}
                    onClick={() => setActiveSection('privacy')}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeSection === 'terms' ? 'active' : ''}`}
                    onClick={() => setActiveSection('terms')}
                  >
                    Terms of Service
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeSection === 'disclaimer' ? 'active' : ''}`}
                    onClick={() => setActiveSection('disclaimer')}
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
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              
              {/* Privacy Policy */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="mb-4">Privacy Policy</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card">
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
                    </div>
                  </div>
                </div>
              )}

              {/* Terms of Service */}
              {activeSection === 'terms' && (
                <div>
                  <h2 className="mb-4">Terms of Service</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card">
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
                    </div>
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {activeSection === 'disclaimer' && (
                <div>
                  <h2 className="mb-4">Disclaimer</h2>
                  <p className="text-muted mb-4">Last updated: 2024-12-15</p>
                  
                  <div className="card">
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

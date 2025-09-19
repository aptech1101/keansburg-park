/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import homeBanner from "../assets/img/service-banner.jpg";
import serviceMap from "../assets/img/service-map.jpg";
import servicePark from "../assets/img/service-park.jpg";
import serviceShoot from "../assets/img/service-shoot.jpg";

export default function Service() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Spinner Start */}
      {isLoading && (
        <div id="spinner" className="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {/* Spinner End */}

      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb position-relative" style={{ 
        backgroundImage: `url(${homeBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '60vh'
      }}>
        {/* Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)'
        }}></div>
        
        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          {/* Our Service Text */}
          <div className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="text-primary mb-3" style={{ fontSize: '1.2rem', fontWeight: '600' }}>Our Service</h4>
            <h2 className="text-white mb-4" style={{ fontSize: '2.5rem', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              Explore Keansburg Park service
            </h2>
          </div>

          {/* Operating Hours Table */}
          <div className="row g-4 mb-5">
            <div className="col-0 col-md-1 col-lg-2 col-xl-2"></div>
            <div className="col-md-10 col-lg-8 col-xl-8 wow fadeInUp" data-wow-delay="0.2s">
              <div className="service-days p-4 bg-white rounded shadow-sm" style={{ border: '1px solid #e9ecef' }}>
                <div className="py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap">
                  <h4 className="mb-0 text-dark" style={{ fontWeight: '600' }}>Monday - Friday</h4> 
                  <p className="mb-0 text-muted">
                    <i className="fas fa-clock text-primary me-2"></i>11:00 AM - 16:00 PM
                  </p>
                </div>
                <div className="py-3 border-bottom d-flex align-items-center justify-content-between flex-shrink-1 flex-wrap">
                  <h4 className="mb-0 text-dark" style={{ fontWeight: '600' }}>Saturday - Sunday</h4> 
                  <p className="mb-0 text-muted">
                    <i className="fas fa-clock text-primary me-2"></i>09:00 AM - 17:00 PM
                  </p>
                </div>
                <div className="py-3 d-flex align-items-center justify-content-between flex-shrink-1 flex-wrap">
                  <h4 className="mb-0 text-dark" style={{ fontWeight: '600' }}>Holiday</h4> 
                  <p className="mb-0 text-muted">
                    <i className="fas fa-clock text-primary me-2"></i>09:00 AM - 17:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="col-0 col-md-1 col-lg-2 col-xl-2"></div>
          </div>

          {/* Service Feature Cards */}
          <div className="row g-4">
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
              <div 
                className="service-item p-4 rounded shadow-sm h-100 position-relative overflow-hidden" 
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover overlay effect */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: '#3CBEEE',
                    transform: hoveredCard === 1 ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s ease-in-out',
                    zIndex: 1
                  }}
                ></div>
                
                <div className="service-content text-center position-relative" style={{ zIndex: 2 }}>
                  <div className="mb-4">
                    <i
                      className="fas fa-home fa-4x" 
                      style={{ 
                        color: hoveredCard === 1 ? '#FFFFFF' : '#3CBEEE',
                        transition: 'color 0.3s ease'
                      }}
                    ></i>
                  </div>
                  <h4 
                    className="mb-3 text-dark" 
                    style={{ fontWeight: '600' }}
                  >
                    Private Gazebo
                  </h4>
                  <p className="mb-0 text-muted">
                    Enjoy exclusive private spaces for your group gatherings and special events.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
              <div 
                className="service-item p-4 rounded shadow-sm h-100 position-relative overflow-hidden" 
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover overlay effect */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: '#3CBEEE',
                    transform: hoveredCard === 2 ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s ease-in-out',
                    zIndex: 1
                  }}
                ></div>
                
                <div className="service-content text-center position-relative" style={{ zIndex: 2 }}>
                  <div className="mb-4">
                    <i 
                      className="fas fa-utensils fa-4x" 
                      style={{ 
                        color: hoveredCard === 2 ? '#FFFFFF' : '#3CBEEE',
                        transition: 'color 0.3s ease'
                      }}
                    ></i>
                  </div>
                  <h4 
                    className="mb-3 text-dark" 
                    style={{ fontWeight: '600' }}
                  >
                    Delicious Food & Drinks
                  </h4>
                  <p className="mb-0 text-muted">
                    Savor a wide variety of delicious meals and refreshing beverages throughout the park.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.6s">
              <div 
                className="service-item p-4 rounded shadow-sm h-100 position-relative overflow-hidden" 
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover overlay effect */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: '#3CBEEE',
                    transform: hoveredCard === 3 ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s ease-in-out',
                    zIndex: 1
                  }}
                ></div>
                
                <div className="service-content text-center position-relative" style={{ zIndex: 2 }}>
                  <div className="mb-4">
                    <i 
                      className="fas fa-door-closed fa-4x" 
                      style={{ 
                        color: hoveredCard === 3 ? '#FFFFFF' : '#3CBEEE',
                        transition: 'color 0.3s ease'
                      }}
                    ></i>
                  </div>
                  <h4 
                    className="mb-3 text-dark" 
                    style={{ fontWeight: '600' }}
                  >
                    Safety Lockers
                  </h4>
                  <p className="mb-0 text-muted">
                    Secure storage for your personal belongings while you enjoy the attractions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.8s">
              <div 
                className="service-item p-4 rounded shadow-sm h-100 position-relative overflow-hidden" 
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hover overlay effect */}
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    backgroundColor: '#3CBEEE',
                    transform: hoveredCard === 4 ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s ease-in-out',
                    zIndex: 1
                  }}
                ></div>
                
                <div className="service-content text-center position-relative" style={{ zIndex: 2 }}>
                  <div className="mb-4">
                    <i 
                      className="fas fa-swimming-pool fa-4x" 
                      style={{ 
                        color: hoveredCard === 4 ? '#FFFFFF' : '#3CBEEE',
                        transition: 'color 0.3s ease'
                      }}
                    ></i>
                  </div>
                  <h4 
                    className="mb-3 text-dark" 
                    style={{ fontWeight: '600' }}
                  >
                    River Rides
                  </h4>
                  <p className="mb-0 text-muted">
                    Experience thrilling water rides and lazy river adventures for all ages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}


      {/* Plan Your Visit Section Start */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h6 className="text-primary mb-2" style={{ fontSize: '1rem', fontWeight: '600' }}>Guideline</h6>
            <h1 className="display-5 text-dark mb-4" style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              Plan Your Visit!
            </h1>
          </div>

          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="feature-item rounded shadow-sm overflow-hidden h-100" style={{ 
                backgroundColor: '#CCCCCC'
              }}>
                {/* Image Section */}
                <img 
                  src={servicePark} 
                  className="img-fluid w-100" 
                  alt="Directions & Parking" 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                {/* Content Section */}
                <div className="p-4">
                  <h4 className="text-dark mb-3" style={{ fontWeight: '600' }}>Directions & Parking</h4>
                  <p className="text-muted mb-3">Find your way to Keansburg Park with easy directions and convenient parking options.</p>
                  <Link 
                    to="/Guideline" 
                    className="btn btn-primary rounded-pill py-2 px-4"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#3CBEEE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3CBEEE';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    Read more <i className="fa fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="feature-item rounded shadow-sm overflow-hidden h-100" style={{ 
                backgroundColor: '#CCCCCC'
              }}>
                {/* Image Section */}
                <img 
                  src={serviceMap} 
                  className="img-fluid w-100" 
                  alt="Park Map" 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                {/* Content Section */}
                <div className="p-4">
                  <h4 className="text-dark mb-3" style={{ fontWeight: '600' }}>Park Map</h4>
                  <p className="text-muted mb-3">Navigate the park easily with our detailed map showing all attractions and facilities.</p>
                  <a 
                    href="/src/assets/img/Keansburg-Map.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary rounded-pill py-2 px-4"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#3CBEEE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3CBEEE';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    Read more <i className="fa fa-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item rounded shadow-sm overflow-hidden h-100" style={{ 
                backgroundColor: '#CCCCCC'
              }}>
                {/* Image Section */}
                <img 
                  src={serviceShoot} 
                  className="img-fluid w-100" 
                  alt="Location Shoot" 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                {/* Content Section */}
                <div className="p-4">
                  <h4 className="text-dark mb-3" style={{ fontWeight: '600' }}>Location Shoot</h4>
                  <p className="text-muted mb-3">Discover the most photogenic spots in the park for your memorable moments.</p>
                  <Link 
                    to="/Guideline" 
                    className="btn btn-primary rounded-pill py-2 px-4"
                    style={{
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#3CBEEE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#3CBEEE';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    Read more <i className="fa fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Plan Your Visit Section End */}

    </>
  );
}

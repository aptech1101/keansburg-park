import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import imgBanner from '../assets/img/service-banner.jpg';
import imgDirections1 from '../assets/img/directions1.jpg';
import imgServiceShoot from '../assets/img/shoot-Locations.jpg';
import imgParkMap from '../assets/img/Keansburg-Map-1.png';

export default function Guideline() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section Start */}
      <div className="bg-breadcrumb position-relative" style={{
        backgroundImage: `url(${imgBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="text-center text-white">
            <h1 className="display-4 white-bold mb-3 text-white">Guideline</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-white text-decoration-none">Home</Link>
                </li>
                <li className="breadcrumb-item text-white" aria-current="page">Guide</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      {/* Hero Section End */}

      {/* Directions & Parking Section Start */}
      <div id="directions-parking" className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="mb-5">
            <h2 className="display-6 fw-bold mb-4" style={{ color: '#3CBEEE' }}>Directions & Parking</h2>
          </ScrollAnimation>

          <div className="row g-5">
            {/* Getting Here Section */}
            <ScrollAnimation animation="fadeInLeft" delay={300} className="col-lg-8">
              <div className="mb-5">
                <h4 className="fw-bold mb-3 d-flex align-items-center">
                  <i className="fas fa-map-marker-alt me-3" style={{ color: '#3CBEEE' }}></i>
                  Getting Here
                </h4>
                <div className="mb-4">
                  <h5 className="fw-bold mb-2">Keansburg Amusement Park & Runaway Rapids Family Waterpark</h5>
                  <p className="mb-3" style={{ color: '#666666' }}>275 Beachway Avenue, NJ 07734</p>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">From the North:</h6>
                      <p className="mb-2" style={{ color: '#666666', fontSize: '14px' }}>
                        NJ Turnpike South to Exit 11, Garden State Parkway South to Exit 117
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">From Staten Island:</h6>
                      <p className="mb-2" style={{ color: '#666666', fontSize: '14px' }}>
                        Outerbridge Crossing to Garden State Parkway South to Exit 117
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">From the South:</h6>
                      <p className="mb-2" style={{ color: '#666666', fontSize: '14px' }}>
                        Garden State Parkway North to Exit 117
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">From State Highway 35:</h6>
                      <p className="mb-2" style={{ color: '#666666', fontSize: '14px' }}>
                        <strong>Rt 35 North:</strong> Take the jug handle for Laurel Avenue, turn right on Laurel Avenue, travel 1 mile to Beachway Avenue, turn right on Beachway Avenue.<br/>
                        <strong>Rt 35 South:</strong> Take the jug handle for Laurel Avenue, turn left on Laurel Avenue, travel 1 mile to Beachway Avenue, turn right on Beachway Avenue.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">From Garden State Parkway 117:</h6>
                      <p className="mb-2" style={{ color: '#666666', fontSize: '14px' }}>
                        Follow signs for Route 36 East, then Laurel Avenue
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Map Section */}
            <ScrollAnimation animation="fadeInRight" delay={400} className="col-lg-4">
              <div className="position-relative">
                <img 
                  src={imgDirections1} 
                  className="img-fluid rounded shadow" 
                  alt="Getting Here Map" 
                  style={{ height: '500px', objectFit: 'cover', width: '100%' }}
                />
                
              </div>
            </ScrollAnimation>
          </div>

          {/* Parking Information */}
          <div className="row g-4 mt-4">
            <ScrollAnimation animation="fadeInUp" delay={500} className="col-lg-6">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h5 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>PARKING:</h5>
                <p className="mb-3" style={{ color: '#666666' }}>
                  The entrance for parking is located next to the Batting Cages.
                </p>
                <div className="mb-3">
                  <p className="mb-1"><strong>Daily Rate:</strong> $10.00 all day rate</p>
                  <p className="mb-0"><strong>Mon-Fri after 4pm:</strong> $7.00</p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={600} className="col-lg-6">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h5 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>PARKING RULES:</h5>
                <ul className="mb-3" style={{ color: '#666666' }}>
                  <li>NO in and out of the lot allowed</li>
                  <li>NO tailgating</li>
                </ul>
                <p className="mb-0" style={{ color: '#666666', fontSize: '14px' }}>
                  The lot closes 30 minutes after the park closes. No overnight parking allowed. 
                  Metered parking is available on Beachway Avenue. Parking is enforced by the Borough of Keansburg.
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Transportation Section */}
          <ScrollAnimation animation="fadeInUp" delay={700} className="mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>TRANSPORTATION:</h5>
              <p className="mb-3" style={{ color: '#666666' }}>
                Buses from Port Authority, New York City, with Keansburg/Beachway as the destination.
              </p>
              <div className="mb-3">
                <h6 className="fw-bold mb-2">Steps to view schedule:</h6>
                <ol style={{ color: '#666666' }}>
                  <li>Go to the Academy Bus Lines web site</li>
                  <li>Click on "Commuter" at top of home page</li>
                  <li>Click on "Schedules"</li>
                  <li>Click on "Route 36 to Port Authority"</li>
                  <li>Our destination is Keansburg/Beachway</li>
                </ol>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <div>
                  <strong>Academy Bus Lines:</strong> 732-888-2798
                </div>
                <div>
                  <strong>Website:</strong> www.academybus.com
                </div>
              </div>
              
            </div>
          </ScrollAnimation>
        </div>
      </div>
      {/* Directions & Parking Section End */}

      {/* Park Map Section Start */}
      <div id="park-map" className="container-fluid py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="mb-5">
            <h2 className="display-6 fw-bold mb-4 text-center" style={{ color: '#3CBEEE' }}>Park Map</h2>
            <p className="text-center fs-5 mb-5" style={{ color: '#666666', maxWidth: '800px', margin: '0 auto' }}>
              Explore our park layout and discover all the amazing attractions, rides, and facilities we have to offer. 
              Plan your visit and make the most of your day at Keansburg Amusement Park & Runaway Rapids Waterpark.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="position-relative">
                  <img 
                    src={imgParkMap} 
                    className="img-fluid rounded shadow-lg" 
                    alt="Keansburg Park Map" 
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      objectFit: 'contain',
                      border: '3px solid #f8f9fa',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedImage(imgParkMap)}
                  />
                  
                  {/* Overlay with park information */}
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end justify-content-center" 
                       style={{ 
                         background: 'linear-gradient(transparent 60%, rgba(0,0,0,0.3))',
                         borderRadius: '12px',
                         pointerEvents: 'none'
                       }}>
                    <div className="text-center text-white p-4">
                      <h5 className="fw-bold mb-2">Interactive Park Map</h5>
                      <p className="mb-0" style={{ fontSize: '14px' }}>
                        Click to view full size map
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      {/* Park Map Section End */}

      {/* Location Shoots Section Start */}
      <div id="location-shoots" className="container-fluid py-5">
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="mb-5">
            <h2 className="display-6 fw-bold mb-4" style={{ color: '#3CBEEE' }}>Location Shoots</h2>
          </ScrollAnimation>

          <div className="row g-5 align-items-center">
            <ScrollAnimation animation="fadeInLeft" delay={300} className="col-lg-6">
              <div>
                <p className="mb-4 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
                  Keansburg Amusement Park is one of New Jersey's oldest boardwalks, offering an outdoor amusement setting 
                  and a water park (Runaway Rapids) with over 18 slides, kiddie areas, and interactive slides, suitable for 
                  location shoots. It has hosted several movie, television, commercial, and print shoots.
                </p>

                <div className="bg-light p-4 rounded">
                  <h5 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>List of Amenities:</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-unstyled" style={{ color: '#666666' }}>
                        <li className="mb-2">• One of New Jersey's Oldest Amusement Parks</li>
                        <li className="mb-2">• Family water park</li>
                        <li className="mb-2">• 14 Kiddie Rides, including 5 antique rides</li>
                        <li className="mb-2">• 16 Family Rides</li>
                        <li className="mb-2">• 10 Thrill Rides</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled" style={{ color: '#666666' }}>
                        <li className="mb-2">• Go Kart Track</li>
                        <li className="mb-2">• Over 20 Games</li>
                        <li className="mb-2">• Ample Parking</li>
                        <li className="mb-2">• Bathroom & Changing Facilities</li>
                        <li className="mb-2">• Conveniently Located off New Jersey Parkway Exit 117</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="mb-0">
                      <strong>For More information email:</strong> 
                      <a href="mailto:marketing@keansburgamusementpark.com" className="text-decoration-none ms-2" style={{ color: '#3CBEEE' }}>
                        marketing@keansburgamusementpark.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={400} className="col-lg-6">
              <div className="position-relative">
                <img 
                  src={imgServiceShoot} 
                  className="img-fluid rounded shadow" 
                  alt="Location Shoots" 
                  style={{ height: '500px', objectFit: 'cover', width: '100%' }}
                />
                
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Location Shoots Section End */}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050 }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded position-relative"
            style={{ padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Park Map Preview" style={{ display: 'block', maxWidth: '98vw', maxHeight: '95vh', objectFit: 'contain' }} />
            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{ top: 8, right: 8 }}
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

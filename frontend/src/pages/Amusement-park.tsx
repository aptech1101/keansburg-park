import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import imgBanner from "../assets/img/amusement-banner.jpg";
import imgRides from "../assets/img/amusement-rides.jpeg";
import imgGoKarts from "../assets/img/amusement-go-karts.jpeg";
import imgGames from "../assets/img/amusement-keansburg-games.jpeg";
import imgBeach from "../assets/img/amusement-beach.jpg";
import imgBatting from "../assets/img/amusement-batting-cages.jpg";
import imgArcades from "../assets/img/amusement-arcades.jpg";
import imgFishing from "../assets/img/amusement-fishing-pier.jpg";
import videoWaterpark from "../assets/vid/waterpark-example.mp4";
import imgAmusement1 from "../assets/img/amusement-1.jpg";
import imgAmusement2 from "../assets/img/amusement-2.jpg";
import imgAmusement3 from "../assets/img/amusement-3.jpg";
import imgAmusement4 from "../assets/img/amusement-4.jpg";
import imgAmusement5 from "../assets/img/amusement-5.jpg";
import imgAmusement6 from "../assets/img/amusement-6.png";
import imgTestimonial from "../assets/img/home-testmonial.jpg";

export default function AmusementPark() {
  const [reviews, setReviews] = useState<Array<{id:number;name:string;email:string;message:string;rating:number;created_at:string}>>([]);

  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  const fallbackUrlA = `${window.location.origin}/keansburg-park/backend/public`;
  const fallbackUrlB = 'http://localhost:8000';
  const API_CANDIDATES = [apiUrl, fallbackUrlA, fallbackUrlB].filter(Boolean) as string[];

  const fetchJson = async (path: string, init?: RequestInit) => {
    let lastErr: unknown = null;
    for (const base of API_CANDIDATES) {
      try {
        const url = `${base}${path}`.replace(/([^:])\/\//g, '$1/');
        const res = await fetch(url, init);
        if (res.ok) return res.json();
        lastErr = new Error(`HTTP ${res.status}`);
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr ?? new Error('All API endpoints failed');
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const json = await fetchJson('/api/reviews?limit=8');
        if (json && json.status === 'success') setReviews(json.data || []);
      } catch {}
    };
    fetchReviews();
    const id = setInterval(fetchReviews, 10000);
    return () => clearInterval(id);
  }, []);

  const reviewSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true
  } as const;
  return (
    <>
      <style>{`
        /* Banner Animations */
        .banner-container {
          animation: fadeInUp 1.2s ease-out;
        }
        
        .banner-title {
          animation: slideInDown 1.5s ease-out 0.3s both;
        }
        
        .banner-breadcrumb {
          animation: slideInUp 1.5s ease-out 0.6s both;
        }
        
        .banner-overlay {
          animation: fadeIn 2s ease-out 0.8s both;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Attraction Card Animations */
        .attraction-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .attraction-card:hover .attraction-image {
          transform: scale(1.1);
        }
        
        .attraction-card:hover .attraction-overlay {
          opacity: 1;
        }
        
        .attraction-card:hover .attraction-title {
          color: #007bff !important;
        }
        
        .attraction-card {
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .attraction-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }
        
        /* Main Content Animations */
        .main-content {
          animation: fadeInUp 1.5s ease-out 0.5s both;
        }
        
        .intro-section {
          animation: slideInUp 1.2s ease-out 0.8s both;
        }
        
        .video-section {
          animation: fadeInUp 1.3s ease-out 1.1s both;
        }
        
        .attractions-grid {
          animation: fadeInUp 1.4s ease-out 1.4s both;
        }
        
        .attraction-card {
          animation: fadeInUp 0.8s ease-out both;
        }
        
        .attraction-card:nth-child(1) { animation-delay: 1.7s; }
        .attraction-card:nth-child(2) { animation-delay: 1.8s; }
        .attraction-card:nth-child(3) { animation-delay: 1.9s; }
        .attraction-card:nth-child(4) { animation-delay: 2.0s; }
        .attraction-card:nth-child(5) { animation-delay: 2.1s; }
        .attraction-card:nth-child(6) { animation-delay: 2.2s; }
        .attraction-card:nth-child(7) { animation-delay: 2.3s; }
        .attraction-card:nth-child(8) { animation-delay: 2.4s; }
        .attraction-card:nth-child(9) { animation-delay: 2.5s; }
        .attraction-card:nth-child(10) { animation-delay: 2.6s; }
        .attraction-card:nth-child(11) { animation-delay: 2.7s; }
        .attraction-card:nth-child(12) { animation-delay: 2.8s; }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
     
      {/* Banner Section */}
      <div className="bg-breadcrumb position-relative banner-container" style={{
        backgroundImage: `url(${imgBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 banner-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-12 text-center text-white">
               <h1 className="display-4 fw-bold mb-3 text-white banner-title">Amusement Park</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/zones" className="text-white text-decoration-none">Zones</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Amusement Park</li>
                </ol>
              </nav>
              <div className="mt-4">
                <Link 
                  to="/ticket" 
                  className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-bold"
                  style={{
                    background: 'linear-gradient(45deg, #3CBEEE, #007bff)',
                    border: 'none',
                    boxShadow: '0 8px 25px rgba(60, 190, 238, 0.3)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(60, 190, 238, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(60, 190, 238, 0.3)';
                  }}
                >
                  🎫 Book Now - Get Your Tickets!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 main-content">
        {/* Introduction Section */}
        <div className="row justify-content-center mb-5 intro-section">
          <div className="col-lg-10 text-center">
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Amusement Park</h4>
            <h1 className="display-5 fw-bold mb-4">Thrills & Fun at Keansburg Amusement Park</h1>
             <p className="fs-5 fst-italic mb-4" style={{ color: '#021016' }}>
               From classic rides to heart racing thrills - excitement for all ages.
             </p>
             <p className="fs-5 mb-4" style={{ color: '#021016', lineHeight: '1.6' }}>
               Since 1904, our family mission remains rooted in delivering a magical blend of tradition,
               excitement, and safety, making Keansburg Amusement Park & Runaway Rapids Waterpark
               the heartbeat of family enjoyment for over a century. With its classic seaside charm and an
               array of attractions, Keansburg Amusement Park continues to capture the hearts of guests
               from near and far. Visitors can relive the magic of traditional boardwalk amusements while
               enjoying modern rides and entertainment. Welcome!
             </p>
             <div className="mt-4">
               <Link 
                 to="/ticket" 
                 className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill fw-bold"
                 style={{
                   border: '2px solid #3CBEEE',
                   color: '#3CBEEE',
                   background: 'rgba(60, 190, 238, 0.1)',
                   transition: 'all 0.3s ease',
                   textDecoration: 'none',
                   display: 'inline-block'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = '#3CBEEE';
                   e.currentTarget.style.color = 'white';
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(60, 190, 238, 0.3)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = 'rgba(60, 190, 238, 0.1)';
                   e.currentTarget.style.color = '#3CBEEE';
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}
               >
                 🎠 Reserve Your Adventure Today!
               </Link>
             </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="py-5 video-section" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Experience the Magic</h2>
                  <p className="fs-5 mb-4" style={{ color: '#021016' }}>
                    Watch our exciting amusement park in action and see what awaits you!
                  </p>
                  <Link 
                    to="/ticket" 
                    className="btn btn-success btn-lg px-4 py-3 rounded-pill fw-bold"
                    style={{
                      background: 'linear-gradient(45deg, #28a745, #20c997)',
                      border: 'none',
                      boxShadow: '0 8px 25px rgba(40, 167, 69, 0.3)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 35px rgba(40, 167, 69, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.3)';
                    }}
                  >
                    🎟️ Book Tickets & Save!
                  </Link>
                </div>
                <div className="position-relative" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                  <video 
                    className="w-100" 
                    style={{ height: '400px', objectFit: 'cover' }}
                    controls
                    poster={imgBanner}
                    preload="metadata"
                  >
                    <source src={videoWaterpark} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="row g-4 attractions-grid justify-content-center">
          {/* Amusement 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement1} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Thrilling Coaster" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Ride Now</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Thrilling Coaster</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Experience the ultimate adrenaline rush on our signature roller coaster! 
                  With heart-pounding drops and high-speed turns, this ride will leave you breathless and wanting more.
                </p>
              </div>
            </div>
          </div>

          {/* Amusement 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement2} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Family Ferris Wheel" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Take Flight</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Family Ferris Wheel</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Enjoy breathtaking views from our classic Ferris wheel! Perfect for all ages, 
                  this gentle ride offers stunning panoramic views of the park and surrounding area.
                </p>
              </div>
            </div>
          </div>

          {/* Amusement 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement3} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Spinning Teacups" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Spin Away</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Spinning Teacups</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Whirl and twirl in our colorful spinning teacups! Control your own speed 
                  as you spin around in this classic family favorite that's fun for all ages.
                </p>
              </div>
            </div>
          </div>

          {/* Amusement 4 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement4} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Bumper Cars" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Crash & Laugh</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Bumper Cars</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Get ready for friendly collisions in our bumper cars! Drive around the track 
                  and bump into friends and family for loads of laughter and excitement.
                </p>
              </div>
            </div>
          </div>

          {/* Amusement 5 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement5} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Swinging Ship" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Sail Away</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Swinging Ship</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Feel the thrill of the high seas on our swinging ship! Rock back and forth 
                  as you experience the sensation of sailing through the air on this exciting pendulum ride.
                </p>
              </div>
            </div>
          </div>

          {/* Amusement 6 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgAmusement6} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Carousel" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Ride Magic</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Classic Carousel</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Step into a world of magic on our beautifully decorated carousel! Choose your favorite 
                  horse or carriage and enjoy a gentle, nostalgic ride that brings joy to all ages.
                </p>
              </div>
            </div>
          </div>

          {/* Rides */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgRides} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Rides" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Explore Rides</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Rides</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Experience gravity-defying rides and pulse-pounding coasters that will leave you breathless. 
                  From gentle family rides to extreme thrill machines, we have something for every adventure level.
                </p>
              </div>
            </div>
          </div>

          {/* Go Karts */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgGoKarts} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Go Karts" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Race Now</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Go Karts</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Speed, Thrills, and Laughs at Fast Trax Go Karts. Race against friends and family on our 
                  professional-grade go-kart track. Feel the adrenaline rush as you navigate sharp turns and straightaways.
                </p>
              </div>
            </div>
          </div>

          {/* Keansburg Games */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgGames} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Keansburg Games" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Play Games</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Keansburg Games</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Test your skills at our exhilarating games and win amazing prizes! From classic carnival games 
                  to modern arcade challenges, every game promises fun and the chance to win lifelong memories.
                </p>
              </div>
            </div>
          </div>

          {/* Beach */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgBeach} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Beach" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Relax Here</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Beach</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Relax and unwind on our beautiful sandy beaches. Experience the classic seaside charm 
                  with stunning ocean views, perfect for families looking to combine thrills with tranquility.
                </p>
              </div>
            </div>
          </div>

          {/* Batting Cages */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgBatting} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Batting Cages" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Swing Away</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Batting Cages</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Step up to the plate and swing for the fences! Our batting cages offer the perfect opportunity 
                  to practice your swing and pursue your home run dreams in a fun, safe environment.
                </p>
              </div>
            </div>
          </div>

          {/* Arcades */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgArcades} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Arcades" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Game On</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Arcades</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Dive into endless fun at Bev & WaLLy's Family Fun Center & The Game Room. From classic 
                  arcade games to the latest interactive experiences, there's entertainment for every age and interest.
                </p>
              </div>
            </div>
          </div>

          {/* Fishing Pier */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <img 
                  src={imgFishing} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt="Fishing Pier" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="attraction-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, rgba(60, 190, 238, 0.8), rgba(0, 123, 255, 0.6))',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>Cast Away</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Fishing Pier</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Enjoy the day fishing on our 2000 foot pier overlooking the Raritan Bay. Whether you're 
                  a seasoned angler or trying fishing for the first time, our pier offers the perfect setting for a relaxing day by the water.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Start */}
        <div className="container-fluid testimonial py-5" style={{ 
          backgroundImage: `url(${imgTestimonial})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          position: 'relative'
        }}>
          <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
            <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
              <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Customer Reviews</h4>
              <h1 className="display-5 text-white mb-4 fw-bold">What Our Customers Say</h1>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-10">
                {reviews.length === 0 ? (
                  <div className="text-center text-white-50">No reviews yet. Be the first to leave feedback!</div>
                ) : (
                  <Slider {...reviewSliderSettings}>
                    {reviews.map((r) => {
                      const masked = r.email.replace(/(^.)[^@]*(@.*$)/, (_m, a, b) => a + '***' + b);
                      return (
                        <div key={r.id}>
                          <div className="testimonial-item rounded p-5 text-center" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                            <div className="mb-3">
                              <i className="fa fa-quote-right fa-2x" style={{ color: '#3CBEEE' }}></i>
                            </div>
                            <p className="fs-5 mb-3" style={{ color: '#666666', fontStyle: 'italic' }}>{r.message}</p>
                            <div className="testimonial-author">
                              <h5 className="fw-bold mb-1">{r.name}</h5>
                              <p className="mb-2" style={{ color: '#666666' }}>{masked}</p>
                              <div className="d-flex justify-content-center text-warning">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <i key={i} className={`fas fa-star${i < r.rating ? '' : '-o'}`}></i>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                )}
              </div>
            </div>
          </div>
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
        </div>
        {/* Customer Reviews End */}

        {/* Final Call-to-Action Section */}
         <div className="row justify-content-center mt-5">
           <div className="col-lg-8 text-center">
             <div className="py-5 px-4" style={{
               background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
               borderRadius: '20px',
               border: '2px solid rgba(60, 190, 238, 0.2)',
               boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
             }}>
               <h2 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>
                 Ready for Your Adventure?
               </h2>
               <p className="fs-5 mb-4" style={{ color: '#021016' }}>
                 You've seen all the amazing attractions - now it's time to experience them! 
                 Book your tickets now and create unforgettable memories at Keansburg Amusement Park.
               </p>
               <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
                 <Link 
                   to="/ticket" 
                   className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold"
                   style={{
                     background: 'linear-gradient(45deg, #ffc107, #fd7e14)',
                     border: 'none',
                     boxShadow: '0 8px 25px rgba(255, 193, 7, 0.3)',
                     transition: 'all 0.3s ease',
                     textDecoration: 'none',
                     display: 'inline-block',
                     minWidth: '200px'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                     e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 193, 7, 0.4)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.transform = 'translateY(0) scale(1)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.3)';
                   }}
                 >
                   🎡 Book Your Tickets Now!
                 </Link>
                 <Link 
                   to="/ticket" 
                   className="btn btn-outline-primary btn-lg px-4 py-3 rounded-pill fw-bold"
                   style={{
                     border: '2px solid #3CBEEE',
                     color: '#3CBEEE',
                     background: 'transparent',
                     transition: 'all 0.3s ease',
                     textDecoration: 'none',
                     display: 'inline-block',
                     minWidth: '180px'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = '#3CBEEE';
                     e.currentTarget.style.color = 'white';
                     e.currentTarget.style.transform = 'translateY(-2px)';
                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(60, 190, 238, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'transparent';
                     e.currentTarget.style.color = '#3CBEEE';
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}
                 >
                   📅 View Pricing
                 </Link>
               </div>
               <div className="mt-4">
                 <small className="text-muted">
                   <i className="fas fa-shield-alt me-2"></i>
                   Secure booking • Instant confirmation • Free cancellation
                 </small>
               </div>
             </div>
           </div>
         </div>
       </div>

    
     </>
   );
 }

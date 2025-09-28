import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ItemDetailsModal from "../components/ItemDetailsModal";
import { apiConfig, toBackendUrl } from "../services/api";
import { ReviewDisplay } from "../types/feedback";
import imgBanner from "../assets/img/amusement-banner.jpg";
import imgTestimonial from "../assets/img/home-testmonial.jpg";
import videoWaterpark from "../assets/vid/amusement-park.mp4";
import imgAmusement3 from "../assets/img/amusement-3.jpg";
import imgAmusement4 from "../assets/img/amusement-4.jpg";
import imgAmusement5 from "../assets/img/amusement-5.jpg";
import imgAmusement6 from "../assets/img/amusement-6.png";
import imgAmusement7 from "../assets/img/amusement-7.jpeg";


export default function AmusementPark() {
  const [reviews, setReviews] = useState<ReviewDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [attractions, setAttractions] = useState<Array<{
    id: number;
    name: string;
    description: string;
    image_url: string;
    zone_name?: string;
    category?: string;
    features?: string[] | string | null;
    details?: string | null;
  }>>([]);
// Amusement park items data
const staticItems = [{
  id: 'spinning-teacups',
  title: 'Spinning Teacups',
  description: 'Whirl and twirl in our colorful spinning teacups! Control your own speed as you spin around in this classic family favorite that\'s fun for all ages.',
  image: imgAmusement3,
  category: 'Family Rides',
  features: [
    'All ages welcome',
    'Self-controlled spinning',
    'Duration: 3 minutes',
    'Colorful themed cups',
    'Gentle motion'
  ],
  details: 'Each teacup can accommodate up to 4 people and features a center wheel that allows riders to control their own spinning speed for maximum fun!'
},
{
  id: 'bumper-cars',
  title: 'Bumper Cars',
  description: 'Get ready for friendly collisions in our bumper cars! Drive around the track and bump into friends and family for loads of laughter and excitement.',
  image: imgAmusement4,
  category: 'Interactive Rides',
  features: [
    'Height requirement: 36 inches',
    'Duration: 5 minutes',
    'Electric powered cars',
    'Safety bumpers',
    'Up to 20 cars'
  ],
  details: 'Our bumper car arena features a smooth track with plenty of space for safe, fun collisions. Perfect for groups and families looking for interactive entertainment.'
},
{
  id: 'swinging-ship',
  title: 'Swinging Ship',
  description: 'Feel the thrill of the high seas on our swinging ship! Rock back and forth as you experience the sensation of sailing through the air on this exciting pendulum ride.',
  image: imgAmusement5,
  category: 'Thrill Rides',
  features: [
    'Height requirement: 42 inches',
    'Duration: 3 minutes',
    'Pendulum motion',
    'Age recommendation: 8+',
    'Safety restraints'
  ],
  details: 'This classic pendulum ride swings riders back and forth in a ship-shaped vehicle, reaching heights of up to 60 feet and providing an exhilarating swinging sensation.'
},
{
  id: 'classic-carousel',
  title: 'Classic Carousel',
  description: 'Step into a world of magic on our beautifully decorated carousel! Choose your favorite horse or carriage and enjoy a gentle, nostalgic ride that brings joy to all ages.',
  image: imgAmusement6,
  category: 'Family Rides',
  features: [
    'All ages welcome',
    'Duration: 4 minutes',
    'Hand-carved horses',
    'Classic music',
    'Wheelchair accessible'
  ],
  details: 'Our vintage-style carousel features 32 hand-carved horses and 2 chariots, all beautifully painted and maintained to provide an authentic classic amusement park experience.'
},
{
  id: 'rides',
  title: 'Rides',
  description: 'Experience gravity-defying rides and pulse-pounding coasters that will leave you breathless. From gentle family rides to extreme thrill machines, we have something for every adventure level.',
  image: imgAmusement7,
  category: 'All Rides',
  features: [
    'Over 25 different rides',
    'Various thrill levels',
    'Family-friendly options',
    'Extreme thrill seekers',
    'All-day access'
  ],
  details: 'Our ride collection includes everything from gentle kiddie rides to extreme thrill machines, ensuring there\'s something exciting for every member of your family.'
}];
  // Map attractions to modal items shape (filter to Amusement zone)
  const amusementItems = useMemo(() => {
    const filtered = attractions.filter(a => (a.zone_name || '').toLowerCase().includes('amusement'));
    const toFeaturesArray = (features: unknown): string[] => {
      if (!features) return [];
      if (Array.isArray(features)) return features.map(String).filter(Boolean);
      if (typeof features === 'string') {
        try {
          const parsed = JSON.parse(features);
          if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
        } catch {}
        return features
          .split(',')
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }
      return [];
    };

    return filtered.map((a) => ({
      id: String(a.id),
      title: a.name,
      description: a.description,
      image: toBackendUrl(a.image_url),
      category: a.category || a.zone_name || "Amusement Park",
      features: toFeaturesArray(a.features ?? []),
      details: a.details || undefined
    }));
  }, [attractions]);

  const allItems = useMemo(() => {
    return [...staticItems, ...amusementItems];
  }, [amusementItems]);

  const handleItemClick = (index: number) => {
    setCurrentItemIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentItemIndex < allItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  const API_CANDIDATES = ['/api', apiUrl].filter(Boolean) as string[];

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
    // Load attractions from DB
    const loadAttractions = async () => {
      try {
        const { data } = await axios.get(`${apiConfig.baseURL}/admin/attractions`);
        if (data?.status === 'success') {
          setAttractions(Array.isArray(data.data) ? data.data : []);
        } else {
          setAttractions([]);
        }
      } catch {
        setAttractions([]);
      }
    };

    loadAttractions();
    const fetchReviews = async () => {
      try {
        const json = await fetchJson('/reviews?status=approved&limit=8');
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
        <div className="py-5 video-section" style={{ backgroundColor: '#f8f9fa' , borderRadius: '12px' }}>
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
                    style={{ height: '600px', objectFit: 'cover' }}
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
          {/*Item static */}
          {/* Amusement 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" onClick={() => handleItemClick(0)} style={{
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
            <div className="attraction-card h-100" onClick={() => handleItemClick(1)} style={{
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
            <div className="attraction-card h-100" onClick={() => handleItemClick(2)} style={{
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
            <div className="attraction-card h-100" onClick={() => handleItemClick(3)} style={{
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

          {/* Amusement 7 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" onClick={() => handleItemClick(4)} style={{
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
                  src={imgAmusement7} 
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

          {/*Item from database */}
          {amusementItems.map((item, index) => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <div className="attraction-card h-100" onClick={() => handleItemClick(index)} style={{
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
                  src={item.image} 
                  className="img-fluid w-100 h-100 attraction-image" 
                  alt={item.title} 
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
                  <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>View Details</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="fw-bold mb-3 attraction-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>{item.title}</h3>
                <p className="mb-0 attraction-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {item.description || 'Click to see more details.'}
                </p>
              </div>
            </div>
          </div>
          ))}
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

       {/* Item Details Modal */}
       <ItemDetailsModal
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         items={allItems}
         currentIndex={currentItemIndex}
         onPrevious={handlePrevious}
         onNext={handleNext}
       />
    
     </>
   );
 }

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import ItemDetailsModal from "../components/ItemDetailsModal";
import imgBanner from "../assets/img/restaurant-banner.png";
import imgRes1 from "../assets/img/restaurant-1.png";
import imgRes2 from "../assets/img/restaurant-2.jpg";
import imgRes3 from "../assets/img/restaurant-3.jpg";
import imgRes5 from "../assets/img/restaurant-5.jpg";
import imgRes14 from "../assets/img/restaurant-14.jpg";
import { ReviewDisplay } from "../types/feedback";
import { apiConfig, toBackendUrl } from "../services/api";

export default function Restaurants() {
  const [reviews, setReviews] = useState<ReviewDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [restaurants, setRestaurants] = useState<Array<{
    id: number;
    name: string;
    description: string;
    image_url: string;
    zone_name?: string;
    zone_id?: number;
    category?: string;
    features?: string[] | string | null;
    details?: string | null;
  }>>([]);
  //Restaurant static items data
  const staticItems = [
    {
      id: 'coastal-ice-cream',
      title: 'Coastal Ice Cream',
      description: 'Traditional ice cream parlor.',
      image: imgRes14,
      category: 'Dessert',
      features: [
        'Hand-scooped ice cream',
        'Classic flavors',
        'Waffle cones',
      ],
      details: 'Scoops of ice cream with cones, sundaes, and shakes.'
    },
    {
      id: 'fish-&-sips',
      title: 'Fish & Sips',
      description: 'Casual boardwalk spot serving fresh seafood with a relaxed vibe.',
      image: imgRes1,
      category: 'Seafood',
      features: [
        'Freshly prepared seafood daily',
        'Quick, friendly service',
        'Family-friendly portions',
        'Seasonal specials available',
        'Relaxed boardwalk vibe',
        'Refreshing drink pairings'
      ],
      details: 'Enjoy a variety of fried and grilled seafood, with seasonal specials perfect for sharing with family and friends.'
    },
    {
      id: 'toucan-grille',
      title: 'Toucan Grille',
      description: 'Tropical-inspired eatery offering grilled favorites.',
      image: imgRes2,
      category: 'Grill',
      features: [
        'Tropical theme',
        'Char-grilled specials',
        'Family-friendly'
      ],
      details: 'Known for grilled classics served with a tropical twist.'
    },
    {
      id: 'pavilion-bar-&-grille',
      title: 'Pavilion Bar & Grille',
      description: 'Outdoor pavilion with bar and grilled foods.',
      image: imgRes3,
      category: 'Grill & Bar',
      features: [
        'Open-air seating',
        'Signature cocktails',
        'Grilled favorites'
      ],
      details: 'Perfect spot for relaxing with drinks and grilled plates.'
    },
    {
      id: 'cotton-candy',
      title: 'Cotton Candy',
      description: 'Classic fairground cotton candy treats.',
      image: imgRes5,
      category: 'Candy',
      features: [
        'Freshly spun',
        'Colorful varieties',
        'Kids’ favorite'
      ],
      details: 'Sweet treat for kids and families to enjoy while walking the park.'
    },
  ]
  // Restaurant items from DB (show all restaurants since they're in general area)
  const restaurantItems = useMemo(() => {
    const filtered = restaurants.sort((a, b) => a.id - b.id); // Sort by ID ascending (từ bé đến lớn)
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

    return filtered.map((r) => ({
      id: String(r.id),
      title: r.name,
      description: r.description,
      image: toBackendUrl(r.image_url),
      category: r.category || r.zone_name || 'Restaurant',
      features: toFeaturesArray(r.features ?? []),
      details: r.details || undefined
    }));
  }, [restaurants]);

  const allItems = useMemo(() => {
    return [...staticItems, ...restaurantItems];
  }, [restaurantItems]);

 
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
    // Load all restaurants then filter by zone in memo above
    const loadRestaurants = async () => {
      try {
        const { data } = await axios.get(`${apiConfig.baseURL}/admin/restaurants`);
        if (data?.status === 'success') {
          setRestaurants(Array.isArray(data.data) ? data.data : []);
        } else {
          setRestaurants([]);
        }
      } catch {
        setRestaurants([]);
      }
    };
    loadRestaurants();
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
        
        /* Restaurant Card Animations */
        .restaurant-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        
        .restaurant-card:hover .restaurant-image {
          transform: scale(1.1);
        }
        
        .restaurant-card:hover .restaurant-overlay {
          opacity: 1;
        }
        
        .restaurant-card:hover .restaurant-title {
          color: #007bff !important;
        }
        
        .restaurant-card {
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .restaurant-card:hover {
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
        
        .restaurants-grid {
          animation: fadeInUp 1.4s ease-out 1.4s both;
        }
        
        .restaurant-card {
          animation: fadeInUp 0.8s ease-out both;
        }
        
        .restaurant-card:nth-child(1) { animation-delay: 1.7s; }
        .restaurant-card:nth-child(2) { animation-delay: 1.8s; }
        .restaurant-card:nth-child(3) { animation-delay: 1.9s; }
        .restaurant-card:nth-child(4) { animation-delay: 2.0s; }
        .restaurant-card:nth-child(5) { animation-delay: 2.1s; }
        .restaurant-card:nth-child(6) { animation-delay: 2.2s; }
        .restaurant-card:nth-child(7) { animation-delay: 2.3s; }
        .restaurant-card:nth-child(8) { animation-delay: 2.4s; }
        .restaurant-card:nth-child(9) { animation-delay: 2.5s; }
        .restaurant-card:nth-child(10) { animation-delay: 2.6s; }
        .restaurant-card:nth-child(11) { animation-delay: 2.7s; }
        .restaurant-card:nth-child(12) { animation-delay: 2.8s; }
        .restaurant-card:nth-child(13) { animation-delay: 2.9s; }
        
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
               <h1 className="display-4 fw-bold mb-3 text-white banner-title">Restaurants</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/zones" className="text-white text-decoration-none">Zones</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Restaurants</li>
                </ol>
              </nav>
              
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 main-content">
        {/* Introduction Section */}
        <div className="row justify-content-center mb-5 intro-section">
          <div className="col-lg-10 text-center">
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Restaurants & Dining</h4>
            <h1 className="display-5 fw-bold mb-4">Delicious Dining at Keansburg</h1>
             <p className="fs-5 fst-italic mb-4" style={{ color: '#021016' }}>
               From quick bites to family dining – we have something delicious for everyone.
             </p>
             <p className="fs-5 mb-4" style={{ color: '#021016', lineHeight: '1.6' }}>
               Discover our diverse dining options featuring fresh ingredients, family-friendly portions, 
               and signature flavors that capture the essence of boardwalk dining. From classic American 
               favorites to seasonal specialties, our restaurants offer the perfect complement to your 
               park adventure. Enjoy quick service options for busy families or sit-down dining for 
               a more relaxed experience.
             </p>
             
          </div>
        </div>


        {/* Restaurants Grid */}
        <div className="row g-4 restaurants-grid justify-content-center">
        {/*Item static */}
        {/* Restaurant 14 */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(0)} style={{
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
                  src={imgRes14} 
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt="Coastal Ice Cream" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Coastal Ice Cream</h3>
                <p className="mb-0 restaurant-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Traditional ice cream parlor.
                </p>
              </div>
            </div>
          </div>
        {/* Restaurant 1 */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(1)} style={{
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
                  src={imgRes1} 
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt="Fish & Sips" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Fish & Sips</h3>
                <p className="mb-0 restaurant-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Casual boardwalk spot serving fresh seafood with a relaxed vibe.
                </p>
              </div>
            </div>
          </div>
        {/* Restaurant 2 */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(2)} style={{
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
                  src={imgRes2} 
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt="Toucan Grille" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Toucan Grille</h3>
                <p className="mb-0 restaurant-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Tropical-inspired eatery offering grilled favorites.
                </p>
              </div>
            </div>
          </div>
        {/* Restaurant 3 */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(3)} style={{
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
                  src={imgRes3} 
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt="Pavilion Bar & Grille" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Pavilion Bar & Grille</h3>
                <p className="mb-0 restaurant-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Outdoor pavilion with bar and grilled foods.
                </p>
              </div>
            </div>
          </div>
        {/* Restaurant 5 */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(4)} style={{
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
                  src={imgRes5} 
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt="Cotton Candy" 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>Cotton Candy</h3>
                <p className="mb-0 restaurant-description" style={{ 
                  color: '#021016', 
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  Classic fairground cotton candy treats.
                </p>
              </div>
            </div>
          </div>
        {/*Item from database */}
          {restaurantItems.map((item, index) => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <div className="restaurant-card h-100" onClick={() => handleItemClick(index + staticItems.length)} style={{
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
                  className="img-fluid w-100 h-100 restaurant-image" 
                  alt={item.title} 
                  style={{ 
                    objectFit: 'cover',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <div className="restaurant-overlay" style={{
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
                <h3 className="fw-bold mb-3 restaurant-title" style={{ 
                  color: '#3CBEEE',
                  fontSize: '1.5rem',
                  transition: 'color 0.3s ease'
                }}>{item.title}</h3>
                <p className="mb-0 restaurant-description" style={{ 
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
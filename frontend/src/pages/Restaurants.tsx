import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img/Keansburg-APWP-New-Grid-600x420.png';
import img2 from '../assets/img/grilled-burgers-recipe-how-to-grill-burgers-1-of-9-650x650-1-600x420.jpg';
import img3 from '../assets/img/1A0C78F4-2588-47D7-B2F3-AF60EFD6A470-600x420.jpg';
import img4 from '../assets/img/IMG_4365-600x420.jpg';
import img5 from '../assets/img/DSC05145-600x420.jpg';
import img6 from '../assets/img/IMG_4379-600x420.jpg';
import img7 from '../assets/img/image0-2-600x420.jpeg';
import img8 from '../assets/img/10E198FC-10B3-4837-A65E-191D4575D8AC-600x420.jpeg';
import img9 from '../assets/img/IMG_4354-600x420.jpg';
import img10 from '../assets/img/DSC04927.jpg_compressed-600x420.jpeg';
import img11 from '../assets/img/unspecified-1-600x420.jpg';
import img12 from '../assets/img/shaved-ice-600x420.jpg';
import img13 from '../assets/img/IMG_4388-600x420.jpg';
import img14 from '../assets/img/IMG_4363-600x420.jpg';
import img15 from '../assets/img/DSC05097.jpg_compressed-600x420.jpeg';
import img16 from '../assets/img/kap-funnel-cake-600x420.jpg';
import img17 from '../assets/img/IMG_4351-600x420.jpg';
import img18 from '../assets/img/icecreamwafflecone-600x420.jpg';
import imgFishSips from '../assets/img/3529b79e-a853-4954-ad4a-f7e4b72ab2f5.avif';
import imgToucanGrille from '../assets/img/istockphoto-2166728719-612x612.jpg';

const venues = [
  {
    title: 'Fish & Sips',
    desc: 'Fried Seafood + Raw Bar by Keyport Fishery.',
    img: imgFishSips,
  },
  {
    title: 'Toucan Grille',
    desc:
      'Indulge in mouthwatering delights at Toucan Grille, nestled within the vibrant atmosphere of Runaway Rapids Family Waterpark. Our menu boasts an array of delectable options, from our signature charcoaled hamburgers and cheeseburgers to California burgers bursting with flavor. Sink your teeth into our quarter-pound hotdogs or savor the crispy goodness of our Mozzarella sticks and […]',
    img: imgToucanGrille,
  },
  {
    title: 'Pavilion Bar & Grille',
    desc: 'Cool down at the Pavilion Bar with a rum bucket or one of their signature frozen drinks.',
    img: img3,
  },
  {
    title: 'Flavor Burst',
    desc: 'Flavor Burst offers a variety of premium flavors from which to choose. The intrigue will capture your attention and the flavor that will bring you back for more.',
    img: img4,
  },
  {
    title: 'Cotton Candy',
    desc: 'Serving Cotton Candy, Fresh Lemonade, Churros, Pretzels and Refreshments!',
    img: img5,
  },
  {
    title: "Amanda's Italian Zeppole",
    desc: 'The absolute best zeppole on the Jersey Shore! Freshly made daily.',
    img: img6,
  },
  {
    title: "Mambo Nando's",
    desc:
      'Welcome to Mambo Nando\'s! We are a family-run boardwalk eatery bringing La Isla del Encanto to the Jersey shore. We serve authentic Puerto Rican cuisine and American favorites meant to be enjoyed as nature intended: by the beach with a refreshing sea breeze. Our traditional dishes are made fresh, based on family recipes passed down […]',
    img: img7,
  },
  {
    title: 'Frozen Flavors',
    desc:
      'Frozen Flavors Homemade Ice Cream & Italian Ice is a family operated business that serves premium handmade small-batch ice cream and Italian ice. Our menu features all the classics and more. We believe in serving our customers the best ingredients along with providing great service. We proudly serve our delicious desserts and frozen treats at […]',
    img: img8,
  },
  {
    title: "Glenda's Great Fries",
    desc: 'Classic boardwalk hand cut fries served with vinegar. A Keansburg Amusement Park boardwalk tradition!',
    img: img9,
  },
  {
    title: "Georgia's Lemonade",
    desc: "Fresh squeezed lemonade to quench everyone's thirst!",
    img: img10,
  },
  {
    title: 'Heidelberg',
    desc:
      'Established in 1934, enjoy one of Keansburg Amusement Park\'s oldest eateries! Famed hot dogs are again available along with German beer!',
    img: img11,
  },
  {
    title: 'Snowie Hawaiian Shaved Ice',
    desc: 'A cool treat on a hot summer day, Snowie shaved ice comes in fun flavors to go!',
    img: img12,
  },
  {
    title: 'Nickersons',
    desc:
      'Since 1946, Nickersons has been the go-to spot for all your favorite boardwalk classics, and we\'re proud to carry on that tradition! Under new ownership since 2019, we\'re keeping the legacy alive with our classic sausage sandwich recipe, complete with fresh-cut and sautéed onions and peppers. But wait, there\'s more! Indulge in the best cheese […]',
    img: img13,
  },
  {
    title: 'Coastal Ice Cream',
    desc: 'Enjoy a boardwalk favorite! Traditional Soft Served Ice Cream! Top off your treat with one of our several delicious toppings or order a Sundae, Thick-Shake, Slushie or Frozen Yogurt!',
    img: img14,
  },
  {
    title: "Dippin' Dots",
    desc: 'One of the best ways to enjoy Dippin\' Dots is at Runaway Rapids Family Waterpark while having fun with family and friends! Choose from a variety of your favorite flavors!',
    img: img15,
  },
  {
    title: "CJ's Spot",
    desc: 'At CJ\'s, it\'s all about our family serving the sweetest treats using our family recipes for generations. Enjoy the delight of our signature funnel cakes and Oreos, made to order, ensuring each bite is as fresh & delicious. We serve funnel cakes, churros, pretzels hot dogs fries, onion rings, chicken fingers & more!',
    img: img16,
  },
  {
    title: "Cheesy's Pizza",
    desc: 'Craving some traditional boardwalk pizza? Cheesy\'s is the place for you! Toppings include pepperoni, sausage, peppers, onions, and more! Traditional, Sicilian, or garlic knots! Yum!',
    img: img17,
  },
  {
    title: "Nickerson's Ice Cream",
    desc: 'Nickerson\'s Ice cream has been serving freshly made hard ice cream since 1946 . Choose a cone, sundae,milkshake, or our crowd favorite; a famous waffle and ice cream sandwich! The combinations are endless with toppings like hot fudge, caramel, sprinkles, and more!',
    img: img18,
  },
];

const Restaurants: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleQuickView = (index: number) => {
    setSelectedIndex(index);
    setShowModal(true);
    // Delay để tạo hiệu ứng mượt mà
    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      setSelectedIndex(null);
    }, 300);
  };


  // ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Page mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const getExcerpt = (text: string, maxLength: number = 140): string => {
    if (!text) return '';
    let augmented = text.trim();
    if (augmented.length < 80) {
      augmented += ' — Discover signature flavors and seasonal favorites to enjoy with family.';
    }
    if (augmented.length > maxLength) {
      const sliced = augmented.slice(0, maxLength);
      return sliced.replace(/\s+\S*$/, '') + '...';
    }
    return augmented.endsWith('...') ? augmented : augmented + '...';
  };

  const getDetailed = (text: string, title?: string): string => {
    if (!text) return '';
    const base = text.trim();
    if (base.length >= 120) return base; // already detailed
    const name = title?.trim() || 'Our venue';
    const extras: string[] = [
      `${name} serves crowd-favorite bites made fresh daily with quick, friendly service.`,
      `Pair your meal with refreshing drinks and enjoy a relaxed boardwalk vibe.`,
      `Family-friendly portions and seasonal specials are available throughout the day.`
    ];
    const addOn = base.endsWith('.') ? ` ${extras.join(' ')}` : `. ${extras.join(' ')}`;
    return base + addOn;
  };

  return (
    <div className="container-fluid p-0" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(10px)', transition: 'all 1100ms ease' }}>
      <style>
        {`
          @keyframes softFlicker {
            0% { opacity: 0; }
            60% { opacity: 1; }
            80% { opacity: 0.99; }
            100% { opacity: 1; }
          }
          @keyframes softFlickerCard {
            0% { opacity: 0; }
            70% { opacity: 1; }
            85% { opacity: 0.995; }
            100% { opacity: 1; }
          }
        `}
      </style>
      {/* Hero with Background + Overlay + Breadcrumb */}
      <section
        className="position-relative d-flex align-items-center"
        style={{ minHeight: '320px' }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url('${img1}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.62) contrast(1.06) saturate(1.06)'
          }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)' }} />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row py-5">
            <div className="col-12 text-center text-white" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)', transition: 'all 1200ms cubic-bezier(0.22, 1, 0.36, 1) 160ms' }}>
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.35)', animation: mounted ? 'softFlicker 1.2s ease both 180ms' : undefined }}>Restaurant</h1>
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)', transition: 'all 1200ms cubic-bezier(0.22, 1, 0.36, 1) 260ms', animation: mounted ? 'softFlicker 1s ease both 260ms' : undefined }}>
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/zones/amusement" className="text-white text-decoration-none">Zones</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Restaurant</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mx-auto" style={{ maxWidth: '760px' }}>
            <h5 className="text-uppercase" style={{ color: '#3CBEEE', letterSpacing: '2px' }}>Restaurant & Dining</h5>
            <h2 className="fw-bold mb-3">Discover Keansburg’s Dining Delights</h2>
            <p className="text-muted mb-0">
              From quick bites to family dining – we have something delicious for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Cards */}
      <section className="pb-5" style={{ backgroundColor: '#f8fbff' }}>
        <div className="container">
          <div className="row g-4">
            {venues.map((v, idx) => (
              <div
                key={v.title}
                className="col-sm-6 col-lg-4"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'none' : 'translateY(20px)',
                  transition: `all 1100ms cubic-bezier(0.22, 1, 0.36, 1) ${mounted ? idx * 90 : 0}ms`,
                  animation: mounted ? `softFlickerCard 1000ms ease both ${idx * 90}ms` : undefined
                }}
              >
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ transition: 'transform 220ms ease, box-shadow 220ms ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.15)';
                    const imgEl = e.currentTarget.querySelector('img') as HTMLImageElement | null;
                    const quickBtn = e.currentTarget.querySelector('.quickview-btn') as HTMLButtonElement | null;
                    if (imgEl) imgEl.style.transform = 'scale(1.06)';
                    if (quickBtn) {
                      quickBtn.style.opacity = '1';
                      quickBtn.style.transform = 'translateY(0)';
                      quickBtn.style.backgroundColor = '#3CBEEE';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
                    const imgEl = e.currentTarget.querySelector('img') as HTMLImageElement | null;
                    const quickBtn = e.currentTarget.querySelector('.quickview-btn') as HTMLButtonElement | null;
                    if (imgEl) imgEl.style.transform = 'scale(1)';
                    if (quickBtn) {
                      quickBtn.style.opacity = '0';
                      quickBtn.style.transform = 'translateY(10px)';
                      quickBtn.style.backgroundColor = '#000';
                    }
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={v.img}
                      alt={v.title}
                      className="card-img-top"
                      style={{ height: '220px', objectFit: 'cover', transition: 'transform 280ms ease' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)' }} />
                    <button
                      className="btn btn-dark position-absolute bottom-0 end-0 m-3 rounded-pill py-1 px-3 quickview-btn"
                      style={{ 
                        opacity: 0.0, 
                        transition: 'opacity 220ms ease, transform 220ms ease, background-color 220ms ease',
                        transform: 'translateY(10px)'
                      }}
                      onMouseEnter={(e) => {
                        const card = e.currentTarget.parentElement as HTMLElement | null;
                        const imgEl = card ? (card.querySelector('img') as HTMLImageElement | null) : null;
                        if (imgEl) imgEl.style.transform = 'scale(1.06)';
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.backgroundColor = '#3CBEEE';
                      }}
                      onMouseLeave={(e) => {
                        const card = e.currentTarget.parentElement as HTMLElement | null;
                        const imgEl = card ? (card.querySelector('img') as HTMLImageElement | null) : null;
                        if (imgEl) imgEl.style.transform = 'scale(1)';
                        e.currentTarget.style.opacity = '0';
                        e.currentTarget.style.transform = 'translateY(10px)';
                        e.currentTarget.style.backgroundColor = '#000';
                      }}
                      onClick={() => handleQuickView(idx)}
                    >
                      <i className="fas fa-eye me-1"></i>Explore
                    </button>
                    <span className="position-absolute top-0 start-0 badge rounded-end" style={{ backgroundColor: '#3CBEEE' }}>Popular</span>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold" style={{ color: '#021016' }}>{v.title}</h5>
                    <p className="card-text text-muted" style={{ flexGrow: 1 }}>{getExcerpt(v.desc)}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <button 
                        className="btn btn-outline-primary rounded-pill px-3 py-2"
                        onClick={() => handleQuickView(idx)}
                        style={{ transition: 'all 220ms ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3CBEEE';
                          e.currentTarget.style.borderColor = '#3CBEEE';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#3CBEEE';
                          e.currentTarget.style.color = '#3CBEEE';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <i className="fas fa-eye me-1"></i>Quick View
                      </button>
                      <div className="text-warning" aria-label="rating">
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {showModal && selectedIndex !== null && (
        <div 
          className="modal fade show d-block" 
          style={{ 
            backgroundColor: modalVisible ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
            zIndex: 1050,
            transition: 'background-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            backdropFilter: modalVisible ? 'blur(4px)' : 'blur(0px)'
          }}
          tabIndex={-1}
          onClick={handleCloseModal}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered position-relative" onClick={(e) => e.stopPropagation()}>

            <div 
              className="modal-content border-0 shadow-lg"
              style={{
                transform: modalVisible ? 'translateY(0) scale(1.1) rotateX(0deg)' : 'translateY(100px) scale(0.8) rotateX(15deg)',
                opacity: modalVisible ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: modalVisible ? '0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)' : '0 0 0 rgba(0,0,0,0)',
                maxWidth: '95vw',
                width: '95vw'
              }}
            >
              {(() => { 
                const r = selectedIndex !== null ? venues[selectedIndex] : null; 
                return (<>
              <div className="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                <h5 className="modal-title fw-bold text-primary mb-0" style={{ fontSize: '2.2rem' }}>{r?.title}</h5>
                <button 
                  type="button" 
                  className="btn-close-custom" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCloseModal();
                  }}
                  aria-label="Close"
                      style={{
                        fontSize: '1.8rem',
                        padding: '0.6rem',
                        lineHeight: '1',
                        background: 'rgba(255,255,255,0.95)',
                        border: '2px solid #e9ecef',
                        cursor: 'pointer',
                        color: '#6c757d',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        borderRadius: '50%',
                        width: '55px',
                        height: '55px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1
                      }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = '#dc3545';
                    e.currentTarget.style.borderColor = '#dc3545';
                    e.currentTarget.style.transform = 'scale(1.15) rotate(90deg)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220,53,69,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#6c757d';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.95)';
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                >
                  ×
                </button>
              </div>
              <div className="modal-body pt-0">
                <div className="row g-4">
                  <div className="col-12 col-md-12 col-lg-6 pe-lg-3">
                    <div 
                      className="position-relative overflow-hidden"
                      style={{
                        transform: modalVisible ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(-10deg)',
                        opacity: modalVisible ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s',
                        aspectRatio: window.innerWidth < 768 ? '16/9' : '4/3',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        minHeight: window.innerWidth < 768 ? '280px' : '400px',
                        marginRight: window.innerWidth >= 992 ? '15px' : '0px'
                      }}
                    >
                      <img 
                        src={r?.img as string} 
                        alt={r?.title as string}
                        className="img-fluid w-100"
                        style={{ 
                          width: '100%',
                          height: '100%', 
                          objectFit: 'cover',
                          objectPosition: 'center center',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100" 
                           style={{ 
                             background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.2) 100%)',
                             borderRadius: '12px'
                           }} />
                      
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 ps-lg-3">
                    <div 
                      className="d-flex align-items-center mb-4"
                      style={{
                        transform: modalVisible ? 'translateX(0)' : 'translateX(30px)',
                        opacity: modalVisible ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s',
                        paddingLeft: window.innerWidth >= 992 ? '15px' : '0px'
                      }}
                    >
                      <div className="text-warning me-3" aria-label="rating" style={{ fontSize: '1.3rem' }}>
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="fas fa-star me-1"></i>
                        <i className="far fa-star"></i>
                      </div>
                      <span className="badge bg-primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>Popular</span>
                    </div>
                    <p 
                      className="text-muted mb-4"
                      style={{
                        transform: modalVisible ? 'translateX(0)' : 'translateX(30px)',
                        opacity: modalVisible ? 1 : 0,
                        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s',
                        fontSize: '1rem',
                        lineHeight: '1.5',
                        marginTop: '1rem',
                        paddingLeft: window.innerWidth >= 992 ? '15px' : '0px'
                      }}
                    >
                      {getDetailed(r?.desc as string, r?.title as string)}
                    </p>
                    <button 
                      className="btn btn-primary rounded-pill px-5 py-3"
                      onClick={handleCloseModal}
                      style={{ 
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transform: modalVisible ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.9)',
                        opacity: modalVisible ? 1 : 0,
                        transitionDelay: '0.4s',
                        fontSize: '1rem',
                        fontWeight: '600',
                        paddingLeft: window.innerWidth >= 992 ? '15px' : '0px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#2a9fd4';
                        e.currentTarget.style.transform = 'translateX(0) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(60,190,238,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#3CBEEE';
                        e.currentTarget.style.transform = 'translateX(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                    >
                      <i className="fas fa-utensils me-2"></i>View Menu
                    </button>
                  </div>
                </div>
              </div>
              </>); })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;

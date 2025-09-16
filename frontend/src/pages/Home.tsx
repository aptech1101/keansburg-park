/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PromotionBanner from "../components/PromotionBanner";
import ScrollAnimation from "../components/ScrollAnimation";
import CountUp from "../components/CountUp";
import imgBanner from "../assets/img/home-banner.png";
import imgFeature1 from "../assets/img/home-attraction-1.jpg";
import imgFeature2 from "../assets/img/home-attraction-2.jpg";
import imgFeature3 from "../assets/img/home-attraction-3.jpg";
import imgAbout from "../assets/img/home-about.png";
import imgAttraction from "../assets/img/home-attraction.jpg";
import imgAttraction1 from "../assets/img/home-attraction-1.jpg";
import imgAttraction2 from "../assets/img/home-attraction-2.jpg";
import imgAttraction3 from "../assets/img/home-attraction-3.jpg";
import imgAttraction4 from "../assets/img/home-attraction-4.jpg";
import imgAttraction5 from "../assets/img/home-attraction-5.jpg";
import imgGallery1 from "../assets/img/home-gallery-1.png";
import imgGallery2 from "../assets/img/home-gallery-2.png";
import imgGallery3 from "../assets/img/home-gallery-3.png";
import imgGallery4 from "../assets/img/home-gallery-4.jpg";
import imgGallery5 from "../assets/img/home-gallery-5.png";
import imgGallery6 from "../assets/img/home-gallery-6.png";
import imgRes1 from "../assets/img/home-res-1.jpg";
import imgRes2 from "../assets/img/home-res-2.jpg";
import imgRes3 from "../assets/img/home-res-3.jpeg";
import imgBlog1 from "../assets/img/home-gallery-1.png";
import imgBlog2 from "../assets/img/home-gallery-2.png";
import imgBlog3 from "../assets/img/home-gallery-3.png";
import imgTestimonial1 from "../assets/img/home-testimonial-1.jpg";
import imgTestimonial2 from "../assets/img/home-testimonial-2.jpg";
import imgTestimonial3 from "../assets/img/home-testimonial-3.jpg";
import imgTestimonial from "../assets/img/home-testmonial.jpg";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const [restaurantSliderRef, setRestaurantSliderRef] = useState<Slider | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Array<{id:number;name:string;email:string;message:string;rating:number;created_at:string}>>([]);
  const [submitState, setSubmitState] = useState<{status:'idle'|'loading'|'success'|'error'; message?:string}>({status:'idle'});

  // Cấu hình endpoint ứng viên: nếu đang chạy Vite (5173) thì ưu tiên 8000; nếu chạy qua Apache thì ưu tiên /keansburg-park
  const isViteDev = window.location.port === '5173';
  const API_CANDIDATES = isViteDev
    ? [
        'http://localhost:8000',
        'http://localhost/keansburg-park/backend/public'
      ]
    : [
        `${window.location.origin}/keansburg-park/backend/public`,
        'http://localhost:8000'
      ];

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
    const timer = setTimeout(() => setIsLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  // Fetch latest reviews
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

  // Slider settings cho Customer Reviews
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

  // Carousel settings
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Restaurant carousel settings
  const restaurantCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    cssEase: "linear",
    customPaging: function(i: number) {
      return (
        <span 
          className="dot mx-1" 
          style={{ 
            height: '8px', 
            width: '8px', 
            backgroundColor: i === 0 ? '#3CBEEE' : 'rgba(255,255,255,0.5)', 
            borderRadius: '50%', 
            display: 'inline-block',
            cursor: 'pointer'
          }}
        ></span>
      );
    }
  };


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

      {/* Promotion Banner */}
      <PromotionBanner />

      {/* Hero Section Start */}

      {/* Hero Section with Booking Form */}
      <div className="header-carousel">
        <div className="header-carousel-item position-relative">
          <img src={imgBanner} className="img-fluid w-100" alt="Keansburg Park" style={{ height: '100vh', objectFit: 'cover' }} />
          <div className="carousel-caption position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="container">
              <div className="row g-5 align-items-center h-100">
                <div className="col-xl-7 fadeInLeft animated" data-animation="fadeInLeft" data-delay="1s" style={{ animationDelay: "1s" }}>
                  <div className="text-start">
                    <h1 className="display-4 text-uppercase text-white mb-4 fw-bold" style={{ lineHeight: '1.2' }}>
                      THE GREATEST WATER & AMUSEMENT PARK – KEANSBURG
                    </h1>
                    <p className="mb-4 fs-5 text-white" style={{ maxWidth: '600px' }}>
                      Thrill-seeking slides, family-friendly pools, and over 100 years of summer fun!
                    </p>
                    <div className="d-flex flex-shrink-0">
                      <Link to="/ticket" className="btn rounded-pill text-white py-3 px-5" style={{ backgroundColor: '#3CBEEE', fontSize: '16px', fontWeight: '600' }}>
                        Our Packages
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 fadeInRight animated" data-animation="fadeInRight" data-delay="1s" style={{ animationDelay: "1s" }}>
                  <div className="ticket-form p-5 bg-white rounded" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                    <h2 className="text-dark text-uppercase mb-4 fw-bold text-center" style={{ fontSize: '24px' }}>
                      BOOK YOUR TICKET
                    </h2>
                    <form>
                      <div className="row g-4">
                        <div className="col-12">
                          <input type="text" className="form-control border-0 py-3" id="name" placeholder="Your Name" style={{ backgroundColor: '#f8f9fa' }} />
                        </div>
                        <div className="col-12 col-xl-6">
                          <input type="email" className="form-control border-0 py-3" id="email" placeholder="Your Email" style={{ backgroundColor: '#f8f9fa' }} />
                        </div>
                        <div className="col-12 col-xl-6">
                          <input type="tel" className="form-control border-0 py-3" id="phone" placeholder="Phone" style={{ backgroundColor: '#f8f9fa' }} />
                        </div>
                        <div className="col-12">
                          <select className="form-select border-0 py-3" aria-label="Default select example" defaultValue="Select Packages" style={{ backgroundColor: '#f8f9fa' }}>
                            <option value="Select Packages">Select Packages</option>
                            <option value="1">Family Packages</option>
                            <option value="2">Basic Packages</option>
                            <option value="3">Premium Packages</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <input className="form-control border-0 py-3" type="date" placeholder="dd/mm/yy" style={{ backgroundColor: '#f8f9fa' }} />
                        </div>
                        <div className="col-12">
                          <input type="number" className="form-control border-0 py-3" id="number" placeholder="Number of Guests" style={{ backgroundColor: '#f8f9fa' }} />
                        </div>
                        <div className="col-12">
                          <button type="button" className="btn w-100 py-3 px-5 text-white fw-bold" style={{ backgroundColor: '#3CBEEE', fontSize: '16px' }}>
                            Book Now
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Section End */}

      {/* About Start */}
      <div className="container-fluid about py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-xl-6">
              <div>
                <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>About Amusement Park & Water Park</h4>
                <h1 className="display-5 mb-4 fw-bold">The Best Theme & Amusement Park For Your Family</h1>
                <p className="mb-5 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
                  Keansburg Amusement Park & Runaway Rapids Waterpark have been family favorites for decades. With exciting rides, refreshing water attractions, and safe spaces for kids, it's the perfect summer destination.
                </p>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="feature-item d-flex align-items-start">
                      <div className="me-3" style={{ color: '#3CBEEE' }}>
                        <i className="fas fa-glass-cheers fa-2x"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Food & Drinks</h5>
                        <p className="mb-1" style={{ color: '#666666', fontSize: '14px' }}>Enjoy Tasty Bites</p>
                        <p className="mb-0" style={{ color: '#666666', fontSize: '13px' }}>From quick snacks to family meals, Keansburg offers plenty of food & drink options to recharge your energy.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item d-flex align-items-start">
                      <div className="me-3" style={{ color: '#3CBEEE' }}>
                        <i className="fas fa-dot-circle fa-2x"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Many Attractions</h5>
                        <p className="mb-1" style={{ color: '#666666', fontSize: '14px' }}>Fun for All Ages</p>
                        <p className="mb-0" style={{ color: '#666666', fontSize: '13px' }}>Over 50 rides & water attractions – from thrilling slides to safe kiddie lagoons, there's something for everyone.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item d-flex align-items-start">
                      <div className="me-3" style={{ color: '#3CBEEE' }}>
                        <i className="fas fa-hand-holding-usd fa-2x"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Affordable Price</h5>
                        <p className="mb-1" style={{ color: '#666666', fontSize: '14px' }}>Family-Friendly Pricing</p>
                        <p className="mb-0" style={{ color: '#666666', fontSize: '13px' }}>Budget-friendly daily passes, season tickets, and special family packages to make your trip affordable.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-item d-flex align-items-start">
                      <div className="me-3" style={{ color: '#3CBEEE' }}>
                        <i className="fas fa-lock fa-2x"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">Safety Lockers</h5>
                        <p className="mb-1" style={{ color: '#666666', fontSize: '14px' }}>Safe & Convenient</p>
                        <p className="mb-0" style={{ color: '#666666', fontSize: '13px' }}>Secure lockers and changing rooms are available, so you can relax and enjoy your day worry-free.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-xl-6">
              <div className="position-relative">
                {/* Banner 100+ Years Experience */}
                <div className="position-absolute top-50 start-50 translate-middle-x" style={{ zIndex: 2, width: '75%' }}>
                  <div className="experience-banner text-white text-center py-4 px-5 rounded">
                    <i className="fas fa-award me-3 fa-2x"></i>
                    <span className="fw-bold" style={{ fontSize: '24px' }}>100+ Years Experience</span>
                  </div>
                </div>
                
                <div className="rounded mt-4">
                  <img src={imgAbout} className="img-fluid rounded w-100" alt="About Keansburg Park" style={{ height: '400px', objectFit: 'cover' }} />
                </div>
                
                <div className="row g-4 mt-4">
                  <div className="col-6">
                    <div className="stats-card bg-primary rounded text-center p-4 h-100" style={{ backgroundColor: '#3CBEEE' }}>
                      <div className="mb-3">
                        <i className="fas fa-thumbs-up fa-3x text-white"></i>
                      </div>
                      <h2 className="text-white mb-2 fw-bold count-up">
                        <CountUp end={150} suffix="K+" duration={2000} />
                      </h2>
                      <p className="text-white mb-0" style={{ fontSize: '14px' }}>Visitors Every Summer</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stats-card bg-dark rounded text-center p-4 h-100">
                      <div className="mb-3">
                        <i className="fas fa-certificate fa-3x text-white"></i>
                      </div>
                      <h2 className="text-white mb-2 fw-bold count-up">
                        <CountUp end={50} suffix="+" duration={2000} />
                      </h2>
                      <p className="text-white mb-0" style={{ fontSize: '14px' }}>Rides & Attractions</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Attractions Start */}
      <div className="container-fluid attractions py-5" style={{ marginTop: '100px' }}>
        <div className="container attractions-section py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: '800px' }}>
            <h4 className="text-primary mb-3">Attractions</h4>
            <h1 className="display-5 text-white mb-4 fw-bold">Explore WaterLand Park Attractions</h1>
            <p className="text-white mb-0 fs-5" style={{ lineHeight: '1.6' }}>
              Keansburg Amusement Park & Runaway Rapids Waterpark have been family favorites for decades. With exciting rides, refreshing water attractions, and safe spaces for kids, it's the perfect summer destination.
            </p>
          </div>
          
          <div className="owl-carousel attractions-carousel wow fadeInUp" data-wow-delay="0.1s">
            {/* Custom Navigation Arrows */}
            <button 
              className="btn btn-primary position-absolute owl-prev" 
              style={{ 
                top: '43%',
                left: '3%',
                backgroundColor: '#3CBEEE', 
                color: 'white',
                padding: '6px 35px',
                borderRadius: '30px',
                transition: '0.5s',
                border: 'none'
              }}
              onClick={() => sliderRef?.slickPrev()}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#3CBEEE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3CBEEE';
                e.currentTarget.style.color = 'white';
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="btn btn-primary position-absolute owl-next" 
              style={{ 
                top: '43%',
                right: '3%',
                backgroundColor: '#3CBEEE', 
                color: 'white',
                padding: '6px 35px',
                borderRadius: '30px',
                transition: '0.5s',
                border: 'none'
              }}
              onClick={() => sliderRef?.slickNext()}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#3CBEEE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3CBEEE';
                e.currentTarget.style.color = 'white';
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            <Slider 
              ref={setSliderRef}
              {...carouselSettings}
              prevArrow={<div></div>}
              nextArrow={<div></div>}
            >
              {/* Carousel Item 1 */}
              <div className="px-2">
                <div className="attractions-item wow fadeInUp" data-wow-delay="0.2s">
                  <img src={imgAttraction1} className="img-fluid rounded w-100" alt="Roller Coaster" style={{ height: '320px', objectFit: 'cover' }} />
                  <a href="#" className="attractions-name">Carousel</a>
                </div>
              </div>

              {/* Carousel Item 2 */}
              <div className="px-2">
                <div className="attractions-item wow fadeInUp" data-wow-delay="0.4s">
                  <img src={imgAttraction2} className="img-fluid rounded w-100" alt="Swing Ride" style={{ height: '320px', objectFit: 'cover' }} />
                  <a href="#" className="attractions-name">Arcades</a>
                </div>
              </div>

              {/* Carousel Item 3 */}
              <div className="px-2">
                <div className="attractions-item wow fadeInUp" data-wow-delay="0.6s">
                  <img src={imgAttraction3} className="img-fluid rounded w-100" alt="Arcade Games" style={{ height: '320px', objectFit: 'cover' }} />
                  <a href="#" className="attractions-name">Hanging Carousel</a>
                </div>
              </div>

              {/* Carousel Item 4 */}
              <div className="px-2">
                <div className="attractions-item wow fadeInUp" data-wow-delay="0.8s">
                  <img src={imgAttraction4} className="img-fluid rounded w-100" alt="Carousel" style={{ height: '320px', objectFit: 'cover' }} />
                  <a href="#" className="attractions-name">Soaring Thunder</a>
                </div>
              </div>

              {/* Carousel Item 5 */}
              <div className="px-2">
                <div className="attractions-item wow fadeInUp" data-wow-delay="1s">
                  <img src={imgAttraction5} className="img-fluid rounded w-100" alt="Water Slides" style={{ height: '320px', objectFit: 'cover' }} />
                  <a href="#" className="attractions-name">Go Karts</a>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      {/* Attractions End */}

      {/* Restaurant & Dining Start */}
     <div className="container-fluid restaurant py-5">
  <div className="container py-5">
    <ScrollAnimation
      animation="fadeInUp"
      delay={200}
      className="text-center mx-auto pb-5"
      style={{ maxWidth: "800px" }}
    >
      <h4
        className="text-primary mb-3"
        style={{ fontSize: "16px", letterSpacing: "1px" }}
      >
        Restaurant & Dining
      </h4>
      <h1 className="display-5 mb-4 fw-bold">Taste the Flavors at Keansburg</h1>
      <p className="mb-0 fs-5" style={{ color: "#666666", lineHeight: "1.6" }}>
        From quick bites to family dining – we've got it all.
      </p>
    </ScrollAnimation>

    {/* Row chỉnh stretch để 2 ô cao bằng nhau */}
    <div className="row g-5 align-items-stretch">
      
      {/* Card bên trái */}
      <ScrollAnimation animation="fadeInLeft" delay={200} className="col-lg-6">
        <div
          className="bg-primary rounded p-5 h-100 text-center"
          style={{ backgroundColor: "#3CBEEE" }}
        >
          <div className="d-flex flex-column h-100">
            <div className="dining-options mb-4">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <i className="fas fa-utensils fa-2x text-white me-3"></i>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-1">Boardwalk Bites</h5>
                  <p className="text-white-50 mb-0">Quick snacks & drinks</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <i className="fas fa-pizza-slice fa-2x text-white me-3"></i>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-1">Pizza Palace</h5>
                  <p className="text-white-50 mb-0">Family pizza dining</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <i className="fas fa-hamburger fa-2x text-white me-3"></i>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-1">Burger Shack</h5>
                  <p className="text-white-50 mb-0">Classic burgers & fries</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-4">
                <i className="fas fa-cocktail fa-2x text-white me-3"></i>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-1">Refreshing Drinks</h5>
                  <p className="text-white-50 mb-0">Sodas, juices & mocktails</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-5">
                <i className="fas fa-ice-cream fa-2x text-white me-3"></i>
                <div className="text-center">
                  <h5 className="text-white fw-bold mb-1">Sweet Treats</h5>
                  <p className="text-white-50 mb-0">Ice cream & desserts</p>
                </div>
              </div>
            </div>
            <div className="mt-auto d-flex justify-content-center">
              <Link to="/restaurant" className="btn btn-dark rounded-pill py-2 px-4">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Card bên phải */}
      <ScrollAnimation animation="fadeInRight" delay={400} className="col-lg-6">
        <div
          className="bg-primary rounded p-5 text-center h-100"
          style={{ backgroundColor: "#3CBEEE" }}
        >
          <h3 className="text-white mb-4 fw-bold">Taste the Fun!</h3>
          <div className="position-relative mb-4">
            <Slider ref={setRestaurantSliderRef} {...restaurantCarouselSettings}>
              <div>
                <img
                  src={imgRes1}
                  className="img-fluid rounded"
                  alt="Featured Pizza"
                  style={{ height: "300px", objectFit: "cover", width: "100%" }}
                />
              </div>
              <div>
                <img
                  src={imgRes2}
                  className="img-fluid rounded"
                  alt="Gourmet Burger"
                  style={{ height: "300px", objectFit: "cover", width: "100%" }}
                />
              </div>
              <div>
                <img
                  src={imgRes3}
                  className="img-fluid rounded"
                  alt="Ice Cream Sundae"
                  style={{ height: "300px", objectFit: "cover", width: "100%" }}
                />
              </div>
            </Slider>
          </div>
          <Link to="/restaurant" className="btn btn-dark rounded-pill py-2 px-4">
            View Full Menu <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </ScrollAnimation>
    </div>
  </div>
</div>
{/* Restaurant & Dining End */}


      {/* Gallery Start */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Our Gallery</h4>
            <h1 className="display-5 mb-4 fw-bold">Captured Moments in Keansburg</h1>
            <p className="mb-0 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
              Discover the joy and excitement through our visitors' favorite moments. From thrilling water slides and relaxing pools to family fun at the kiddie lagoon, every picture tells a story of summer fun memories at Keansburg.
            </p>
          </ScrollAnimation>
          <div className="row g-4">
            <ScrollAnimation animation="zoomIn" delay={200} className="col-md-6">
              <div className="gallery-item position-relative">
                <img src={imgGallery1} className="img-fluid rounded w-100" alt="Gallery 1" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery1)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery2} className="img-fluid rounded w-100" alt="Gallery 2" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery2)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery3} className="img-fluid rounded w-100" alt="Gallery 3" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery3)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery4} className="img-fluid rounded w-100" alt="Gallery 4" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery4)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery5} className="img-fluid rounded w-100" alt="Gallery 5" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery5)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="zoomIn" delay={600} className="col-md-6">
              <div className="gallery-item position-relative">
                <img src={imgGallery6} className="img-fluid rounded w-100" alt="Gallery 6" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => setSelectedImage(imgGallery6)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Gallery End */}

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
            <img src={selectedImage} alt="Preview" style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} />
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

      {/* Team Start */}
      <div className="container-fluid team py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Meet Our Team</h4>
            <h1 className="display-5 mb-4 fw-bold">The Creative Minds Behind This Website</h1>
            <p className="mb-0 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
              We're not just coders - we're bug fighters, coffee drinkers, and late-night debuggers. Here's the team who brought this project to life.
            </p>
          </ScrollAnimation>
          <div className="row g-4 justify-content-center">
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-md-6 col-lg-4 col-xl-2">
              <div className="team-item bg-white rounded p-4 text-center h-100" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div className="team-content">
                  <h5 className="fw-bold mb-2" style={{ color: '#3CBEEE' }}>Công Minh</h5>
                  <p className="mb-0" style={{ color: '#666666' }}>Project Leader</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-6 col-lg-4 col-xl-2">
              <div className="team-item bg-white rounded p-4 text-center h-100" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div className="team-content">
                  <h5 className="fw-bold mb-2" style={{ color: '#3CBEEE' }}>Trường Tam</h5>
                  <p className="mb-0" style={{ color: '#666666' }}>Frontend Developer</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-md-6 col-lg-4 col-xl-2">
              <div className="team-item bg-white rounded p-4 text-center h-100" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div className="team-content">
                  <h5 className="fw-bold mb-2" style={{ color: '#3CBEEE' }}>Xuân Quang</h5>
                  <p className="mb-0" style={{ color: '#666666' }}>Backend Developer</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={800} className="col-md-6 col-lg-4 col-xl-2">
              <div className="team-item bg-white rounded p-4 text-center h-100" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div className="team-content">
                  <h5 className="fw-bold mb-2" style={{ color: '#3CBEEE' }}>Thái Hải</h5>
                  <p className="mb-0" style={{ color: '#666666' }}>Designer</p>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={1000} className="col-md-6 col-lg-4 col-xl-2">
              <div className="team-item bg-white rounded p-4 text-center h-100" style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                <div className="team-content">
                  <h5 className="fw-bold mb-2" style={{ color: '#3CBEEE' }}>Sỹ Sơn</h5>
                  <p className="mb-0" style={{ color: '#666666' }}>Tester / QA</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Team End */}

      {/* Feedback Form Start */}
      <div className="container-fluid feedback py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Feedback</h4>
            <h1 className="display-5 mb-4 fw-bold">Leave Your Feedback and Review</h1>
          </ScrollAnimation>
          <div className="row justify-content-center">
            <ScrollAnimation animation="slideInUp" delay={400} className="col-lg-10">
              <div className="rounded p-5" style={{ backgroundColor: '#3CBEEE', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="text-center mb-4">
                  <h3 className="text-white fw-bold mb-0" style={{ fontSize: '24px' }}>Leave Your Feedback and Review</h3>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const payload = {
                    name: (form.querySelector('#fb-name') as HTMLInputElement)?.value || '',
                    email: (form.querySelector('#fb-email') as HTMLInputElement)?.value || '',
                    message: (form.querySelector('#fb-message') as HTMLTextAreaElement)?.value || '',
                    rating: rating || 5,
                  };
                  setSubmitState({status:'loading'});
                  try {
                    const json = await fetchJson('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    if (json.status === 'success') {
                      setSubmitState({status:'success', message:'Thanks for your feedback!'});
                      form.reset();
                      setRating(0);
                      // refresh list
                      const r = await fetchJson('/api/reviews?limit=8');
                      if (r.status === 'success') setReviews(r.data || []);
                    } else {
                      setSubmitState({status:'error', message: json.message || 'Submit failed'});
                    }
                  } catch (err) {
                    setSubmitState({status:'error', message:'Network error'});
                  }
                }}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <input id="fb-name" type="text" className="form-control border-0 py-3 rounded" placeholder="Your Name" style={{ backgroundColor: 'white' }} />
                    </div>
                    <div className="col-md-4">
                      <input id="fb-email" type="email" className="form-control border-0 py-3 rounded" placeholder="Your Email" style={{ backgroundColor: 'white' }} />
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center h-100">
                        <div className="rating d-flex align-items-center">
                          <div className="d-flex">
                            {[1,2,3,4,5].map((star) => (
                              <i
                                key={star}
                                className={`fas fa-star fa-2x me-1 ${ (hoverRating || rating) >= star ? 'text-warning' : 'text-white' }`}
                                style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setRating(star); }}
                                onFocus={() => setHoverRating(star)}
                                onBlur={() => setHoverRating(0)}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                aria-label={`Đánh giá ${star} sao`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <textarea 
                        id="fb-message"
                        className="form-control border-0 py-3 rounded" 
                        rows={4} 
                        placeholder="Your Feedback...." 
                        style={{ backgroundColor: 'white' }}
                      ></textarea>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-between flex-wrap" style={{ rowGap: '10px' }}>
                      <button
                        type="submit"
                        className="btn py-3 px-5 text-white fw-bold rounded"
                        style={{ backgroundColor: '#021016', fontSize: '16px' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.borderColor = '#3CBEEE';
                          e.currentTarget.classList.remove('text-white');
                          e.currentTarget.classList.add('text-primary');
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#021016';
                          e.currentTarget.style.borderColor = '#021016';
                          e.currentTarget.classList.remove('text-primary');
                          e.currentTarget.classList.add('text-white');
                        }}
                      >
                        {submitState.status === 'loading' ? 'Sending...' : 'Send Feedback'}
                      </button>
                      {submitState.status !== 'idle' && (
                        <span
                          className="px-3 py-2 rounded"
                          style={{
                            backgroundColor: submitState.status === 'success' ? '#d1e7dd' : submitState.status === 'error' ? '#f8d7da' : '#e2e3e5',
                            color: submitState.status === 'success' ? '#0f5132' : submitState.status === 'error' ? '#842029' : '#41464b',
                            fontWeight: 600,
                            minWidth: '220px',
                            textAlign: 'center'
                          }}
                        >
                          {submitState.message || (submitState.status === 'loading' ? 'Sending...' : '')}
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Feedback Form End */}

      {/* Customer Reviews Start */}
      <div className="container-fluid testimonial py-5" style={{ 
        backgroundImage: `url(${imgTestimonial})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        position: 'relative',
        animation: 'backgroundZoom 8s ease-in-out infinite'
      }}>
        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Customer Reviews</h4>
            <h1 className="display-5 text-white mb-4 fw-bold">What Our Customers Say</h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fadeInUp" delay={400} className="row justify-content-center">
            <div className="col-lg-10">
              {reviews.length === 0 ? (
                <div className="text-center text-white-50">No reviews yet. Be the first to leave feedback!</div>
              ) : (
                <Slider {...reviewSliderSettings}>
                  {reviews.map((r) => {
                    const masked = r.email.replace(/(^.)[^@]*(@.*$)/, (_, a, b) => a + '***' + b);
                    return (
                      <div key={r.id}>
                        <div className="testimonial-item bg-white rounded p-5 text-center" style={{ backdropFilter: 'blur(10px)', opacity: 0.95 }}>
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
          </ScrollAnimation>
        </div>
        {/* Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }}></div>
      </div>
      {/* Customer Reviews End */}

      {/* Footer removed: using global layout Footer */}

    </>
  );
}

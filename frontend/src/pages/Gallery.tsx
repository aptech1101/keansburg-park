/// <reference types="vite/client" />
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import imgBanner from "../assets/img/page-banner.png";
import imgGallery1 from "../assets/img/home-gallery-1.png";
import imgGallery2 from "../assets/img/home-gallery-2.png";
import imgGallery3 from "../assets/img/home-gallery-3.png";
import imgGallery4 from "../assets/img/home-gallery-4.jpg";
import imgGallery5 from "../assets/img/home-gallery-5.png";
import imgGallery6 from "../assets/img/home-gallery-6.png";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

      {/* Navbar removed: using global layout Navbar */}

      {/* Banner Section */}
      <div className="bg-breadcrumb position-relative" style={{
        backgroundImage: `url(${imgBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-12 text-center text-white">
               <h1 className="display-4 fw-bold mb-3 text-white">Our Gallery</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/gallery" className="text-white text-decoration-none">Pages</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Gallery</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

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

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}

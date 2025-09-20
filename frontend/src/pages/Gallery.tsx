/// <reference types="vite/client" />
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import imgBanner from "../assets/img/gallery-banner.jpg";
import imgGallery1 from "../assets/img/home-gallery-1.jpg";
import imgGallery2 from "../assets/img/home-gallery-2.jpg";
import imgGallery3 from "../assets/img/home-gallery-3.jpg";
import imgGallery4 from "../assets/img/home-gallery-4.jpg";
import imgGallery5 from "../assets/img/home-gallery-5.png";
import imgGallery6 from "../assets/img/home-gallery-6.jpg";
import imgGallery7 from "../assets/img/gallery-7.jpg";
import imgGallery8 from "../assets/img/gallery-8.png";
import imgGallery9 from "../assets/img/gallery-9.jpg";
import imgGallery10 from "../assets/img/gallery-10.jpg";
import imgGallery11 from "../assets/img/gallery-11.jpg";
import imgGallery12 from "../assets/img/gallery-12.png";
import imgGallery13 from "../assets/img/gallery-13.jpg";
import imgGallery14 from "../assets/img/gallery-14.jpg";
import imgGallery15 from "../assets/img/gallery-15.jpg";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Gallery images array for navigation
  const galleryImages = [
    imgGallery1, imgGallery2, imgGallery3, imgGallery4, imgGallery5, imgGallery6,
    imgGallery7, imgGallery8, imgGallery9, imgGallery10, imgGallery11, imgGallery12,
    imgGallery13, imgGallery14, imgGallery15
  ];

  // Navigation functions
  const openImageModal = (imageSrc: string) => {
    const index = galleryImages.indexOf(imageSrc);
    setCurrentImageIndex(index);
    setSelectedImage(imageSrc);
  };

  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

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
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery1)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery2} className="img-fluid rounded w-100" alt="Gallery 2" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery2)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery3} className="img-fluid rounded w-100" alt="Gallery 3" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery3)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery4} className="img-fluid rounded w-100" alt="Gallery 4" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery4)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery5} className="img-fluid rounded w-100" alt="Gallery 5" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery5)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="zoomIn" delay={600} className="col-md-6">
              <div className="gallery-item position-relative">
                <img src={imgGallery6} className="img-fluid rounded w-100" alt="Gallery 6" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery6)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>

            {/* New Gallery Images 7-15 */}
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-md-4">
              <div className="gallery-item position-relative">
                <img src={imgGallery7} className="img-fluid rounded w-100" alt="Gallery 7" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery7)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-4">
              <div className="gallery-item position-relative">
                <img src={imgGallery8} className="img-fluid rounded w-100" alt="Gallery 8" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery8)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-md-4">
              <div className="gallery-item position-relative">
                <img src={imgGallery9} className="img-fluid rounded w-100" alt="Gallery 9" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery9)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="zoomIn" delay={200} className="col-md-6">
              <div className="gallery-item position-relative">
                <img src={imgGallery10} className="img-fluid rounded w-100" alt="Gallery 10" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery10)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery11} className="img-fluid rounded w-100" alt="Gallery 11" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery11)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery12} className="img-fluid rounded w-100" alt="Gallery 12" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery12)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery13} className="img-fluid rounded w-100" alt="Gallery 13" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery13)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-md-3">
              <div className="gallery-item position-relative">
                <img src={imgGallery14} className="img-fluid rounded w-100" alt="Gallery 14" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery14)}>
                    <i className="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="zoomIn" delay={600} className="col-md-6">
              <div className="gallery-item position-relative">
                <img src={imgGallery15} className="img-fluid rounded w-100" alt="Gallery 15" style={{ height: '400px', objectFit: 'cover' }} />
                <div className="search-icon position-absolute">
                  <button type="button" className="btn btn-light btn-lg-square rounded-circle" onClick={() => openImageModal(imgGallery15)}>
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
          onClick={closeModal}
        >
          <div
            className="bg-white rounded position-relative"
            style={{ padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Preview" style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} />
            
            {/* Close Button */}
            <button
              type="button"
              className="btn btn-light position-absolute"
              style={{ top: 8, right: 8 }}
              onClick={closeModal}
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Previous Button */}
            <button
              type="button"
              className="btn btn-light position-absolute d-flex align-items-center justify-content-center"
              style={{ 
                top: '50%', 
                left: 8, 
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                zIndex: 1051
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous Image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="btn btn-light position-absolute d-flex align-items-center justify-content-center"
              style={{ 
                top: '50%', 
                right: 8, 
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                zIndex: 1051
              }}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next Image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Image Counter */}
            <div
              className="position-absolute"
              style={{ 
                bottom: 8, 
                left: '50%', 
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                zIndex: 1051
              }}
            >
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Footer removed: using global layout Footer */}

       
    </>
  );
}

/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgGallery1 from "../assets/img/gallery-1.jpg";
import imgGallery2 from "../assets/img/gallery-2.jpg";
import imgGallery3 from "../assets/img/gallery-3.jpg";
import imgGallery4 from "../assets/img/gallery-4.jpg";
import imgGallery5 from "../assets/img/gallery-5.jpg";
import imgGallery6 from "../assets/img/gallery-6.jpg";
import imgPayment from "../assets/img/payment.png";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);

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

      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Our Gallery</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Gallery</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Gallery Start */}
      <div className="container-fluid gallery py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Our Gallery</h4>
            <h1 className="display-5 mb-4">Captured Moments In Waterland</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          {/* TODO: Replace with React Lightbox (e.g., yet-another-react-lightbox) */}
          <div className="row g-4">
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src={imgGallery1} className="img-fluid rounded w-100 h-100" alt="Gallery 1" />
                <div className="search-icon">
                  <a href={imgGallery1} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-1"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src={imgGallery2} className="img-fluid rounded w-100 h-100" alt="Gallery 2" />
                <div className="search-icon">
                  <a href={imgGallery2} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-2"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src={imgGallery3} className="img-fluid rounded w-100 h-100" alt="Gallery 3" />
                <div className="search-icon">
                  <a href={imgGallery3} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-3"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src={imgGallery4} className="img-fluid rounded w-100 h-100" alt="Gallery 4" />
                <div className="search-icon">
                  <a href={imgGallery4} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-4"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src={imgGallery5} className="img-fluid rounded w-100 h-100" alt="Gallery 5" />
                <div className="search-icon">
                  <a href={imgGallery5} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-5"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src={imgGallery6} className="img-fluid rounded w-100 h-100" alt="Gallery 6" />
                <div className="search-icon">
                  <a href={imgGallery6} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-6"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}

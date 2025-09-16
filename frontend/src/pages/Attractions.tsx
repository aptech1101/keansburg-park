/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgAttraction1 from "../assets/img/home-attraction-1.jpg";
import imgAttraction2 from "../assets/img/home-attraction-2.jpg";
import imgAttraction3 from "../assets/img/home-attraction-3.jpg";
import imgAttraction4 from "../assets/img/home-attraction-4.jpg";
import imgPayment from "../assets/img/payment.png";

export default function Attractions() {
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
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Attractions</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Attractions</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Attractions Start */}
      <div className="container-fluid attractions py-5" style={{ marginTop: "100px" }}>
        <div className="container attractions-section py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Attractions</h4>
            <h1 className="display-5 text-white mb-4">Explore WaterLand Park Attractions</h1>
            <p className="text-white mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          {/* TODO: Extract AttractionCard component if reused */}
          <div className="owl-carousel attractions-carousel wow fadeInUp" data-wow-delay="0.1s">
            <div className="attractions-item wow fadeInUp" data-wow-delay="0.2s">
              <img src={imgAttraction1} className="img-fluid rounded w-100" alt="Attraction 1" />
              <a href="#" className="attractions-name">Roller Coaster</a>
            </div>
            <div className="attractions-item wow fadeInUp" data-wow-delay="0.4s">
              <img src={imgAttraction2} className="img-fluid rounded w-100" alt="Attraction 2" />
              <a href="#" className="attractions-name">Carousel</a>
            </div>
            <div className="attractions-item wow fadeInUp" data-wow-delay="0.6s">
              <img src={imgAttraction3} className="img-fluid rounded w-100" alt="Attraction 3" />
              <a href="#" className="attractions-name">Arcade Game</a>
            </div>
            <div className="attractions-item wow fadeInUp" data-wow-delay="0.8s">
              <img src={imgAttraction4} className="img-fluid rounded w-100" alt="Attraction 4" />
              <a href="#" className="attractions-name">Hanging Carousel</a>
            </div>
            <div className="attractions-item wow fadeInUp" data-wow-delay="1s">
              <img src={imgAttraction2} className="img-fluid rounded w-100" alt="Attraction 2" />
              <a href="#" className="attractions-name">Carousel</a>
            </div>
          </div>
        </div>
      </div>
      {/* Attractions End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}



/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgPayment from "../assets/img/payment.png";

export default function Ticket() {
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
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Ticket Packages</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Ticket</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Ticket Packages Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-12 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="packages-item h-100">
                <h4 className="text-primary">Ticket Packages</h4>
                <h1 className="display-5 mb-4">Choose The Best Packages For Your Family</h1>
                <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                </p>
                <p><i className="fa fa-check text-primary me-2"></i>Best Waterpark in the world</p>
                <p><i className="fa fa-check text-primary me-2"></i>Best Packages For Your Family</p>
                <p><i className="fa fa-check text-primary me-2"></i>Enjoy Various Kinds of Water Park</p>
                <p className="mb-5"><i className="fa fa-check text-primary me-2"></i>Win Up To 3 Free All Day Tickets</p>
                <a href="#" className="btn btn-primary rounded-pill py-3 px-5"> Book Now</a>
              </div>
            </div>
            {/* TODO: Replace static pricing with data-driven component (API) */}
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="pricing-item bg-dark rounded text-center p-5 h-100">
                <div className="pb-4 border-bottom">
                  <h2 className="mb-4 text-primary">Family Packages</h2>
                  <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolorum!</p>
                  <h2 className="mb-0 text-primary">$260,90<span className="text-body fs-5 fw-normal">/family</span></h2>
                </div>
                <div className="py-4">
                  <p className="mb-4"><i className="fa fa-check text-primary me-2"></i>All Access To Waterpark</p>
                  <p className="mb-4"><i className="fa fa-check text-primary me-2"></i>Get Two Gazebo</p>
                  <p className="mb-4"><i className="fa fa-check text-primary me-2"></i>Free Soft Drinks</p>
                  <p className="mb-4"><i className="fa fa-check text-primary me-2"></i>Get Four Lockers</p>
                  <p className="mb-4"><i className="fa fa-check text-primary me-2"></i>Free Four Towels</p>
                </div>
                <a href="#" className="btn btn-light rounded-pill py-3 px-5"> Book Now</a>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="pricing-item bg-primary rounded text-center p-5 h-100">
                <div className="pb-4 border-bottom">
                  <h2 className="text-dark mb-4">Basic Packages</h2>
                  <p className="text-white mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolorum!</p>
                  <h2 className="text-dark mb-0">$60,90<span className="text-white fs-5 fw-normal">/person</span></h2>
                </div>
                <div className="text-white py-4">
                  <p className="mb-4"><i className="fa fa-check text-dark me-2"></i>Get Small Gazebo</p>
                  <p className="mb-4"><i className="fa fa-check text-dark me-2"></i>Free Soft Drink</p>
                  <p className="mb-4"><i className="fa fa-check text-dark me-2"></i>Get One Locker</p>
                  <p className="mb-4"><i className="fa fa-check text-dark me-2"></i>Free Towel</p>
                </div>
                <a href="#" className="btn btn-dark rounded-pill py-3 px-5"> Book Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ticket Packages End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}

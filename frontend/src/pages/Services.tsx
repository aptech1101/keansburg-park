/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgFeature1 from "../assets/img/home-attraction-1.jpg";
import imgFeature2 from "../assets/img/home-attraction-2.jpg";
import imgFeature3 from "../assets/img/home-attraction-3.jpg";
import imgTestimonial1 from "../assets/img/home-testimonial-1.jpg";
import imgTestimonial2 from "../assets/img/home-testimonial-2.jpg";
import imgTestimonial3 from "../assets/img/home-testimonial-3.jpg";
import imgPayment from "../assets/img/payment.png";

export default function Services() {
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
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Our Services</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Service</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Service Start */}
      <div className="container-fluid service py-5" style={{ marginTop: "100px" }}>
        <div className="container service-section py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Our Service</h4>
            <h1 className="display-5 text-white mb-4">Explore Waterland Park service</h1>
            <p className="mb-0 text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-0 col-md-1 col-lg-2 col-xl-2"></div>
            <div className="col-md-10 col-lg-8 col-xl-8 wow fadeInUp" data-wow-delay="0.2s">
              <div className="service-days p-4">
                <div className="py-2 border-bottom border-top d-flex align-items-center justify-content-between flex-wrap"><h4 className="mb-0 pb-2 pb-sm-0">Monday - Friday</h4> <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i>11:00 AM - 16:00 PM</p></div>
                <div className="py-2 border-bottom d-flex align-items-center justify-content-between flex-shrink-1 flex-wrap"><h4 className="mb-0 pb-2 pb-sm-0">Saturday - Sunday</h4> <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i>09:00 AM - 17:00 PM</p></div>
                <div className="py-2 border-bottom d-flex align-items-center justify-content-between flex-shrink-1 flex-wrap"><h4 className="mb-0">Holiday</h4> <p className="mb-0"><i className="fas fa-clock text-primary me-2"></i>09:00 AM - 17:00 PM</p></div>
              </div>
            </div>
            <div className="col-0 col-md-1 col-lg-2 col-xl-2"></div>

            {/* TODO: Extract ServiceItem component if reused */}
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="service-item p-4">
                <div className="service-content">
                  <div className="mb-4">
                    <i className="fas fa-home fa-4x"></i>
                  </div>
                  <a href="#" className="h4 d-inline-block mb-3">Private Gazebo</a>
                  <p className="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="service-item p-4">
                <div className="service-content">
                  <div className="mb-4">
                    <i className="fas fa-utensils fa-4x"></i>
                  </div>
                  <a href="#" className="h4 d-inline-block mb-3">Delicious Food</a>
                  <p className="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="service-item p-4">
                <div className="service-content">
                  <div className="mb-4">
                    <i className="fas fa-door-closed fa-4x"></i>
                  </div>
                  <a href="#" className="h4 d-inline-block mb-3">Safety Lockers</a>
                  <p className="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp" data-wow-delay="0.8s">
              <div className="service-item p-4">
                <div className="service-content">
                  <div className="mb-4">
                    <i className="fas fa-swimming-pool fa-4x"></i>
                  </div>
                  <a href="#" className="h4 d-inline-block mb-3">River Rides</a>
                  <p className="mb-0">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet vel beatae numquam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Service End */}

      {/* Feature Start */}
      <div className="container-fluid feature py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="feature-item">
                <img src={imgFeature1} className="img-fluid rounded w-100" alt="Feature 1" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Best Pools</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="feature-item">
                <img src={imgFeature2} className="img-fluid rounded w-100" alt="Feature 2" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">Waterslides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="feature-item">
                <img src={imgFeature3} className="img-fluid rounded w-100" alt="Feature 3" />
                <div className="feature-content p-4">
                  <div className="feature-content-inner">
                    <h4 className="text-white">River Rides</h4>
                    <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis porro soluta voluptatum laborum mollitia blanditiis suscipit,
                    </p>
                    <a href="#" className="btn btn-primary rounded-pill py-2 px-4">Read More <i className="fa fa-arrow-right ms-1"></i></a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Review Start */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Review</h4>
            <h1 className="display-5 text-white mb-4">Our Clients Riviews</h1>
            <p className="text-white mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
            <div className="testimonial-item p-4">
              <p className="text-white fs-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque.
              </p>
              <div className="testimonial-inner">
                <div className="testimonial-img">
                  <img src={imgTestimonial1} className="img-fluid" alt="Testimonial 1" />
                  <div className="testimonial-quote btn-lg-square rounded-circle"><i className="fa fa-quote-right fa-2x"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h4>Person Name</h4>
                  <p className="text-start text-white">Profession</p>
                  <div className="d-flex text-primary">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-item p-4">
              <p className="text-white fs-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque.
              </p>
              <div className="testimonial-inner">
                <div className="testimonial-img">
                  <img src={imgTestimonial2} className="img-fluid" alt="Testimonial 2" />
                  <div className="testimonial-quote btn-lg-square rounded-circle"><i className="fa fa-quote-right fa-2x"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h4>Person Name</h4>
                  <p className="text-start text-white">Profession</p>
                  <div className="d-flex text-primary">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star text-white"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-item p-4">
              <p className="text-white fs-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque.
              </p>
              <div className="testimonial-inner">
                <div className="testimonial-img">
                  <img src={imgTestimonial3} className="img-fluid" alt="Testimonial 3" />
                  <div className="testimonial-quote btn-lg-square rounded-circle"><i className="fa fa-quote-right fa-2x"></i>
                  </div>
                </div>
                <div className="ms-4">
                  <h4>Person Name</h4>
                  <p className="text-start text-white">Profession</p>
                  <div className="d-flex text-primary">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Review End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}

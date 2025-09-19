/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgAbout from "../assets/img/home-about.png";
import imgFeature1 from "../assets/img/home-attraction-1.jpg";
import imgFeature2 from "../assets/img/home-attraction-2.jpg";
import imgFeature3 from "../assets/img/home-attraction-3.jpg";
import imgGallery1 from "../assets/img/home-gallery-1.jpg";
import imgGallery2 from "../assets/img/home-gallery-2.jpg";
import imgGallery3 from "../assets/img/home-gallery-3.jpg";
import imgGallery4 from "../assets/img/home-gallery-4.jpg";
import imgGallery5 from "../assets/img/home-gallery-5.png";
import imgGallery6 from "../assets/img/home-gallery-6.jpg";
import imgTeam1 from "../assets/img/home-testimonial-1.jpg";
import imgTeam2 from "../assets/img/home-testimonial-2.jpg";
import imgTeam3 from "../assets/img/home-testimonial-3.jpg";
import imgPayment from "../assets/img/payment.png";

export default function About() {
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
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">About Us</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">About</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      {/* TODO: replace jQuery-only effects with React */}
      <div className="container-fluid about py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-xl-6 wow fadeInUp" data-wow-delay="0.2s">
              <div>
                <h4 className="text-primary">About Waterland</h4>
                <h1 className="display-5 mb-4">The Best Theme & Amusement Park For Your Family</h1>
                <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis eligendi illum inventore maiores incidunt vero id. Est ipsam, distinctio veritatis earum inventore ab fugit officiis ut ullam, laudantium facere sapiente?
                </p>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3"><i className="fas fa-glass-cheers fa-3x text-primary"></i></div>
                      <div>
                        <h4>Food & Drinks</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3"><i className="fas fa-dot-circle fa-3x text-primary"></i></div>
                      <div>
                        <h4>Many Attractions</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3"><i className="fas fa-hand-holding-usd fa-3x text-primary"></i></div>
                      <div>
                        <h4>Affordable Price</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex">
                      <div className="me-3"><i className="fas fa-lock fa-3x text-primary"></i></div>
                      <div>
                        <h4>Safety Lockers</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInUp" data-wow-delay="0.4s">
              <div className="position-relative rounded">
                <div className="rounded" style={{ marginTop: "40px" }}>
                  <div className="row g-0">
                    <div className="col-lg-12">
                      <div className="rounded mb-4">
                        <img src={imgAbout} className="img-fluid rounded w-100" alt="About" />
                      </div>
                      <div className="row gx-4 gy-0">
                        <div className="col-6">
                          <div className="counter-item bg-primary rounded text-center p-4 h-100">
                            <div className="counter-item-icon mx-auto mb-3">
                              <i className="fas fa-thumbs-up fa-3x text-white"></i>
                            </div>
                            <div className="counter-counting mb-3">
                              <span className="text-white fs-2 fw-bold" data-toggle="counter-up">150</span>
                              <span className="h1 fw-bold text-white">K +</span>
                            </div>
                            <h5 className="text-white mb-0">Happy Visitors</h5>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="counter-item bg-dark rounded text-center p-4 h-100">
                            <div className="counter-item-icon mx-auto mb-3">
                              <i className="fas fa-certificate fa-3x text-white"></i>
                            </div>
                            <div className="counter-counting mb-3">
                              <span className="text-white fs-2 fw-bold" data-toggle="counter-up">122</span>
                              <span className="h1 fw-bold text-white"> +</span>
                            </div>
                            <h5 className="text-white mb-0">Awwards Winning</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded bg-primary p-4 position-absolute d-flex justify-content-center" style={{ width: "90%", height: "80px", top: "-40px", left: "50%", transform: "translateX(-50%)" }}>
                  <h3 className="mb-0 text-white">20 Years Experiance</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Feature Start */}
      {/* TODO: replace jQuery-only effects with React */}
      <div className="container-fluid feature pb-5">
        <div className="container pb-5">
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

      {/* Gallery Start */}
      {/* TODO: replace jQuery-only effects with React */}
      <div className="container-fluid gallery pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Our Gallery</h4>
            <h1 className="display-5 mb-4">Captured Moments In Waterland</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src={imgGallery1} className="img-fluid rounded w-100 h-100" alt="Gallery 1" />
                <div className="search-icon">
                  <a href={imgGallery1} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-1"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src={imgGallery2} className="img-fluid rounded w-100 h-100" alt="Gallery 2" />
                <div className="search-icon">
                  <a href={imgGallery2} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-2"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.6s">
              <div className="gallery-item">
                <img src={imgGallery3} className="img-fluid rounded w-100 h-100" alt="Gallery 3" />
                <div className="search-icon">
                  <a href={imgGallery3} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-3"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.2s">
              <div className="gallery-item">
                <img src={imgGallery4} className="img-fluid rounded w-100 h-100" alt="Gallery 4" />
                <div className="search-icon">
                  <a href={imgGallery4} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-4"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-3 wow fadeInUp" data-wow-delay="0.4s">
              <div className="gallery-item">
                <img src={imgGallery5} className="img-fluid rounded w-100 h-100" alt="Gallery 5" />
                <div className="search-icon">
                  <a href={imgGallery5} className="btn btn-light btn-lg-square rounded-circle" data-lightbox="Gallery-5"><i className="fas fa-search-plus"></i></a>
                </div>
              </div>
            </div>
            <div className="col-6 wow fadeInUp" data-wow-delay="0.6s">
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

      {/* Team Start */}
      <div className="container-fluid team pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary">Meet Our Team</h4>
            <h1 className="display-5 mb-4">Our Waterland Park Dedicated Team Member</h1>
            <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">David James</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src={imgTeam1} className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="Team 1" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.4s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">William John</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src={imgTeam2} className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="Team 2" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.6s">
              <div className="team-item p-4">
                <div className="team-content">
                  <div className="d-flex justify-content-between border-bottom pb-4">
                    <div className="text-start">
                      <h4 className="mb-0">Michael John</h4>
                      <p className="mb-0">Profession</p>
                    </div>
                    <div>
                      <img src={imgTeam3} className="img-fluid rounded" style={{ width: "100px", height: "100px" }} alt="Team 3" />
                    </div>
                  </div>
                  <div className="team-icon rounded-pill my-4 p-3">
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-facebook-f"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-twitter"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-3" href=""><i className="fab fa-linkedin-in"></i></a>
                    <a className="btn btn-primary btn-sm-square rounded-circle me-0" href=""><i className="fab fa-instagram"></i></a>
                  </div>
                  <p className="text-center mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, quibusdam eveniet itaque provident sequi deserunt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      {/* Footer removed: using global layout Footer */}

    </>
  );
}

import React, { useEffect, useState } from 'react';
import Feature1 from '../assets/img/home-attraction-1.jpg';
import Feature2 from '../assets/img/home-attraction-2.jpg';
import Feature3 from '../assets/img/home-attraction-3.jpg';
import PaymentImg from '../assets/img/payment.png';

const Features: React.FC = () => {
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
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {/* Spinner End */}

            {/* Navbar removed: using global layout Navbar */}

            {/* Header Start */}
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-5" style={{ maxWidth: 900 }}>
                    <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Our Features</h4>
                    <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-primary">Feature</li>
                    </ol>    
                </div>
            </div>
            {/* Header End */}

            {/* Feature Start */}
            <div className="container-fluid feature py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 800 }}>
                        <h4 className="text-primary">Our Features</h4>
                        <h1 className="display-5 mb-4">Explore Waterland Park Best Features</h1>
                        <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                        </p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
                            <div className="feature-item">
                                <img src={Feature1} className="img-fluid rounded w-100" alt="Best Pools" />
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
                                <img src={Feature2} className="img-fluid rounded w-100" alt="Waterslides" />
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
                                <img src={Feature3} className="img-fluid rounded w-100" alt="River Rides" />
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

            {/* Footer removed: using global layout Footer */}

            {/* Back to Top */}
            <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
        </>
  );
};

export default Features;



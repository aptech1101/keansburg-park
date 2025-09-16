import React, { useEffect, useState } from 'react';
import Testimonial1 from '../assets/img/home-testimonial-1.jpg';
import Testimonial2 from '../assets/img/home-testimonial-2.jpg';
import Testimonial3 from '../assets/img/home-testimonial-3.jpg';
import PaymentImg from '../assets/img/payment.png';

const Review: React.FC = () => {
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
                    <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Review</h4>
                    <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-primary">Customer Reviews</li>
                    </ol>    
                </div>
            </div>
            {/* Header End */}

            {/* Customer Reviews Start */}
            <div className="container-fluid testimonial py-5" style={{ marginTop: 100 }}>
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 800 }}>
                        <h4 className="text-primary">Review</h4>
                        <h1 className="display-5 text-white mb-4">Our Clients Riviews</h1>
                        <p className="text-white mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur adipisci facilis cupiditate recusandae aperiam temporibus corporis itaque quis facere, numquam, ad culpa deserunt sint dolorem autem obcaecati, ipsam mollitia hic.
                        </p>
                    </div>
                    {/* TODO: Replace jQuery carousel with Swiper React */}
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.2s">
                        <div className="testimonial-item p-4">
                            <p className="text-white fs-4 mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos mollitia fugiat, nihil autem reprehenderit aperiam maxime minima consequatur, nam iste eius velit perferendis voluptatem at atque neque soluta reiciendis doloremque.
                            </p>
                            <div className="testimonial-inner">
                                <div className="testimonial-img">
                                    <img src={Testimonial1} className="img-fluid" alt="Testimonial 1" />
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
                                    <img src={Testimonial2} className="img-fluid" alt="Testimonial 2" />
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
                                    <img src={Testimonial3} className="img-fluid" alt="Testimonial 3" />
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
            {/* Customer Reviews End */}

            {/* Footer removed: using global layout Footer */}

            {/* Back to Top */}
            <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
        </>
    );
};

export default Review;


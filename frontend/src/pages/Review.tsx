import React, { useEffect, useState } from 'react';
import PaymentImg from '../assets/img/payment.png';
import Testimonial1 from '../assets/img/home-testimonial-1.jpg';
import Testimonial2 from '../assets/img/home-testimonial-2.jpg';
import Testimonial3 from '../assets/img/home-testimonial-3.jpg';
import { ReviewDisplay } from '../types/feedback';
const Review: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState<ReviewDisplay[]>([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 0);
        return () => clearTimeout(timer);
    }, []);

    // API configuration
    const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
    const fallbackUrlA = `${window.location.origin}/keansburg-park/backend/public`;
    const fallbackUrlB = 'http://localhost:8000';
    const API_CANDIDATES = [apiUrl, fallbackUrlA, fallbackUrlB].filter(Boolean) as string[];

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

    // Fetch reviews from API
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoadingReviews(true);
                const json = await fetchJson('/api/reviews?status=approved&limit=20');
                if (json && json.status === 'success') {
                    setReviews(json.data || []);
                }
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
                setReviews([]);
            } finally {
                setLoadingReviews(false);
            }
        };
        fetchReviews();
    }, []);

    // Helper function to render stars
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <i 
                key={index} 
                className={`fas fa-star ${index < rating ? 'text-primary' : 'text-white'}`}
            />
        ));
    };
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

        </>
    );
};

export default Review;


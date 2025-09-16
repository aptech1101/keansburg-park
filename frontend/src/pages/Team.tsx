import React, { useEffect, useState } from 'react';
import Team1 from '../assets/img/home-testimonial-1.jpg';
import Team2 from '../assets/img/home-testimonial-2.jpg';
import Team3 from '../assets/img/home-testimonial-3.jpg';
import PaymentImg from '../assets/img/payment.png';

const Team: React.FC = () => {
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
                    <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Our Team</h4>
                    <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-primary">Team</li>
                    </ol>    
                </div>
            </div>
            {/* Header End */}

            {/* Team Start */}
            <div className="container-fluid team py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 800 }}>
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
                                            <img src={Team1} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="David James avatar" />
                                        </div>
                                    </div>
                                    <div className="team-icon rounded-pill my-4 p-3">
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
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
                                            <img src={Team2} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="William John avatar" />
                                        </div>
                                    </div>
                                    <div className="team-icon rounded-pill my-4 p-3">
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
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
                                            <img src={Team3} className="img-fluid rounded" style={{ width: '100px', height: '100px' }} alt="Michael John avatar" />
                                        </div>
                                    </div>
                                    <div className="team-icon rounded-pill my-4 p-3">
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-3" href="" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                                        <a className="btn btn-primary btn-sm-square rounded-circle me-0" href="" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
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

            {/* Back to Top */}
            <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
        </>
    );
};

export default Team;



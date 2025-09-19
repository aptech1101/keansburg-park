import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import payment from '../assets/img/payment.png';

const NotFound: React.FC = () => {
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
					<h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">404 Pages</h4>
					<ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
						<li className="breadcrumb-item"><a href="index.html">Home</a></li>
						<li className="breadcrumb-item"><a href="#">Pages</a></li>
						<li className="breadcrumb-item active text-primary">404 Page</li>
					</ol>
				</div>
			</div>
			{/* Header End */}

			{/* 404 Start */}
			<div className="container-fluid bg-light py-5">
				<div className="container py-5 text-center">
					<div className="row justify-content-center">
						<div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
							<i className="bi bi-exclamation-triangle display-1 text-primary"></i>
							<h1 className="display-1">404</h1>
							<h1 className="mb-4">Page Not Found</h1>
							<p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
							<Link className="btn btn-primary rounded-pill py-3 px-5" to="/">Go Home</Link>
						</div>
					</div>
				</div>
			</div>
			{/* 404 End */}

			{/* Footer removed: using global layout Footer */}

		</>
  );
};

export default NotFound;

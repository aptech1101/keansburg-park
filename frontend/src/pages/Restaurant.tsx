import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import imgRes1 from "../assets/img/home-res-1.jpg";
import imgRes2 from "../assets/img/home-res-2.jpg";
import imgRes3 from "../assets/img/home-res-3.jpeg";

export default function Restaurant() {
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

      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5" style={{ backgroundColor: '#3CBEEE' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <ScrollAnimation animation="fadeInUp" delay={200}>
                <h1 className="display-4 text-white mb-4 fw-bold">Restaurant & Dining</h1>
                <p className="fs-5 text-white mb-0">
                  From quick bites to family dining – we've got it all.
                </p>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Dining Options Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Our Dining Options</h4>
            <h1 className="display-5 mb-4 fw-bold">Taste the Flavors at Keansburg</h1>
            <p className="mb-0 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
              Discover our diverse dining options that cater to every taste and appetite. From quick snacks to full family meals, we have something delicious for everyone.
            </p>
          </ScrollAnimation>

          <div className="row g-5">
            {/* Boardwalk Bites */}
            <ScrollAnimation animation="fadeInUp" delay={200} className="col-lg-6">
              <div className="dining-card bg-white rounded p-5 h-100" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="d-flex align-items-center mb-4">
                  <div className="dining-icon me-4" style={{ color: '#3CBEEE' }}>
                    <i className="fas fa-utensils fa-3x"></i>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-2">Boardwalk Bites</h3>
                    <p className="text-muted mb-0">Quick snacks & drinks</p>
                  </div>
                </div>
                <p className="mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                  Perfect for a quick energy boost between rides. Enjoy fresh pretzels, hot dogs, cotton candy, and refreshing beverages.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Fresh pretzels & hot dogs</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Cotton candy & popcorn</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Cold drinks & slushies</li>
                  <li className="mb-0"><i className="fas fa-check text-primary me-2"></i>Quick service</li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Pizza Palace */}
            <ScrollAnimation animation="fadeInUp" delay={400} className="col-lg-6">
              <div className="dining-card bg-white rounded p-5 h-100" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="d-flex align-items-center mb-4">
                  <div className="dining-icon me-4" style={{ color: '#3CBEEE' }}>
                    <i className="fas fa-pizza-slice fa-3x"></i>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-2">Pizza Palace</h3>
                    <p className="text-muted mb-0">Family pizza dining</p>
                  </div>
                </div>
                <p className="mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                  Our family-friendly pizza restaurant serves delicious wood-fired pizzas with fresh ingredients and a cozy atmosphere.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Wood-fired pizzas</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Fresh ingredients</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Family seating</li>
                  <li className="mb-0"><i className="fas fa-check text-primary me-2"></i>Kid-friendly options</li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Burger Shack */}
            <ScrollAnimation animation="fadeInUp" delay={600} className="col-lg-6">
              <div className="dining-card bg-white rounded p-5 h-100" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="d-flex align-items-center mb-4">
                  <div className="dining-icon me-4" style={{ color: '#3CBEEE' }}>
                    <i className="fas fa-hamburger fa-3x"></i>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-2">Burger Shack</h3>
                    <p className="text-muted mb-0">Classic burgers & fries</p>
                  </div>
                </div>
                <p className="mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                  Satisfy your hunger with our juicy burgers, crispy fries, and classic American comfort food favorites.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Juicy beef burgers</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Crispy golden fries</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Chicken sandwiches</li>
                  <li className="mb-0"><i className="fas fa-check text-primary me-2"></i>Veggie options</li>
                </ul>
              </div>
            </ScrollAnimation>

            {/* Sweet Treats */}
            <ScrollAnimation animation="fadeInUp" delay={800} className="col-lg-6">
              <div className="dining-card bg-white rounded p-5 h-100" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <div className="d-flex align-items-center mb-4">
                  <div className="dining-icon me-4" style={{ color: '#3CBEEE' }}>
                    <i className="fas fa-ice-cream fa-3x"></i>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-2">Sweet Treats</h3>
                    <p className="text-muted mb-0">Ice cream & desserts</p>
                  </div>
                </div>
                <p className="mb-4" style={{ color: '#666666', lineHeight: '1.6' }}>
                  End your day on a sweet note with our premium ice cream, frozen treats, and delicious desserts.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Premium ice cream</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Frozen yogurt</li>
                  <li className="mb-2"><i className="fas fa-check text-primary me-2"></i>Fresh fruit smoothies</li>
                  <li className="mb-0"><i className="fas fa-check text-primary me-2"></i>Churros & funnel cakes</li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Dining Options End */}

      {/* Featured Menu Start */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center mx-auto pb-5" style={{ maxWidth: "800px" }}>
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Featured Menu</h4>
            <h1 className="display-5 mb-4 fw-bold">Taste the Fun!</h1>
            <p className="mb-0 fs-5" style={{ color: '#666666', lineHeight: '1.6' }}>
              Check out our featured dishes and seasonal specials that are sure to delight your taste buds.
            </p>
          </ScrollAnimation>

          <div className="row g-5">
            <ScrollAnimation animation="fadeInLeft" delay={200} className="col-lg-4">
              <div className="menu-item bg-white rounded overflow-hidden" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={imgRes1} className="img-fluid w-100" alt="Featured Pizza" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="p-4">
                  <h5 className="fw-bold mb-2">Signature Pizza</h5>
                  <p className="text-muted mb-3">Our most popular wood-fired pizza with fresh mozzarella, basil, and premium toppings.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-5">$18.99</span>
                    <button className="btn btn-primary btn-sm">Order Now</button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400} className="col-lg-4">
              <div className="menu-item bg-white rounded overflow-hidden" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={imgRes2} className="img-fluid w-100" alt="Gourmet Burger" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="p-4">
                  <h5 className="fw-bold mb-2">Gourmet Burger</h5>
                  <p className="text-muted mb-3">Juicy beef patty with premium cheese, fresh vegetables, and our special sauce.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-5">$14.99</span>
                    <button className="btn btn-primary btn-sm">Order Now</button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInRight" delay={600} className="col-lg-4">
              <div className="menu-item bg-white rounded overflow-hidden" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={imgRes3} className="img-fluid w-100" alt="Ice Cream Sundae" style={{ height: '250px', objectFit: 'cover' }} />
                <div className="p-4">
                  <h5 className="fw-bold mb-2">Ice Cream Sundae</h5>
                  <p className="text-muted mb-3">Premium ice cream with chocolate sauce, whipped cream, and your choice of toppings.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary fs-5">$8.99</span>
                    <button className="btn btn-primary btn-sm">Order Now</button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* Featured Menu End */}

      {/* Call to Action Start */}
      <div className="container-fluid py-5" style={{ backgroundColor: '#3CBEEE' }}>
        <div className="container py-5">
          <ScrollAnimation animation="fadeInUp" delay={200} className="text-center">
            <h2 className="display-5 text-white mb-4 fw-bold">Ready to Dine with Us?</h2>
            <p className="fs-5 text-white mb-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Visit our restaurants during your park visit and enjoy delicious meals that will fuel your fun-filled day.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/ticket" className="btn btn-light btn-lg px-5 py-3 fw-bold">
                Book Your Visit <i className="fas fa-arrow-right ms-2"></i>
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                Contact Us <i className="fas fa-phone ms-2"></i>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </div>
      {/* Call to Action End */}
    </>
  );
}

/// <reference types="vite/client" />
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import imgPayment from "../assets/img/payment.png";

export default function Contact() {
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
          <h4 className="text-white display-4 mb-4 wow fadeInDown" data-wow-delay="0.1s">Contact Us</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-primary">Contact</li>
          </ol>    
        </div>
      </div>
      {/* Header End */}

      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="row g-5"> 
            <div className="col-12 col-xl-6 wow fadeInUp" data-wow-delay="0.2s">
              <div>
                <div className="pb-5">
                  <h4 className="text-primary">Get in Touch</h4>
                  <p className="mb-0">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a className="text-primary fw-bold" href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                </div>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="contact-add-item rounded bg-light p-4">
                      <div className="contact-icon text-primary mb-4">
                        <i className="fas fa-map-marker-alt fa-2x"></i>
                      </div>
                      <div>
                        <h4>Address</h4>
                        <p className="mb-0">123 Street New York.USA</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-add-item rounded bg-light p-4">
                      <div className="contact-icon text-primary mb-4">
                        <i className="fas fa-envelope fa-2x"></i>
                      </div>
                      <div>
                        <h4>Mail Us</h4>
                        <p className="mb-0">info@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-add-item rounded bg-light p-4">
                      <div className="contact-icon text-primary mb-4">
                        <i className="fa fa-phone-alt fa-2x"></i>
                      </div>
                      <div>
                        <h4>Telephone</h4>
                        <p className="mb-0">(+012) 3456 7890</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-add-item rounded bg-light p-4">
                      <div className="contact-icon text-primary mb-4">
                        <i className="fab fa-firefox-browser fa-2x"></i>
                      </div>
                      <div>
                        <h4>Yoursite@ex.com</h4>
                        <p className="mb-0">(+012) 3456 7890</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-around bg-light rounded p-4">
                      <a className="btn btn-xl-square btn-primary rounded-circle" href="#"><i className="fab fa-facebook-f"></i></a>
                      <a className="btn btn-xl-square btn-primary rounded-circle" href="#"><i className="fab fa-twitter"></i></a>
                      <a className="btn btn-xl-square btn-primary rounded-circle" href="#"><i className="fab fa-instagram"></i></a>
                      <a className="btn btn-xl-square btn-primary rounded-circle" href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInUp" data-wow-delay="0.4s">
              <div className="bg-light p-5 rounded h-100">
                <h4 className="text-primary mb-4">Send Your Message</h4>
                <form onSubmit={(e)=>e.preventDefault()}>
                  <div className="row g-4">
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="name" placeholder="Your Name" />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input type="email" className="form-control border-0" id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input type="phone" className="form-control border-0" id="phone" placeholder="Phone" />
                        <label htmlFor="phone">Your Phone</label>
                      </div>
                    </div>
                    <div className="col-lg-12 col-xl-6">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="project" placeholder="Project" />
                        <label htmlFor="project">Your Project</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control border-0" id="subject" placeholder="Subject" />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control border-0" placeholder="Leave a message here" id="message" style={{ height: "160px" }}></textarea>
                        <label htmlFor="message">Message</label>
                      </div>

                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 wow fadeInUp" data-wow-delay="0.2s">
              <div className="rounded" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                <iframe className="rounded w-100" 
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" 
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}

      {/* Footer removed: using global layout Footer */}

      {/* Back to Top */}
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top"><i className="fa fa-arrow-up"></i></a>   
    </>
  );
}

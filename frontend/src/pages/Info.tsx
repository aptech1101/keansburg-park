import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import heroPreferred from '../assets/img/images (1).jpg';
import imgFerry from '../assets/img/ferry_web.png';
import imgFrog from '../assets/img/Frog-Hopper-768x512.jpg';
import imgNewspaperDetail from '../assets/img/newspaper_detail_web1-768x512.png';
import imgParkReopens from '../assets/img/Park-Reopens-768x510.jpg';
import imgSharkproof from '../assets/img/sharkproof-net_web.png';
import imgSpookHouse from '../assets/img/spook-house-1940s.jpg';
import imgConstruction from '../assets/img/2004-11-09-13.26.50.jpg';
import imgSandyReal from '../assets/img/2012-10-31-13.53.58-2.jpg';
import imgIcecream from '../assets/img/icecreamwafflecone-600x420.jpg';
import imgNewBanner from '../assets/img/4180801a-3680-4cf8-8d2c-0d7ea0f0fb7f.jpg';

const Info: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'faq'>('about');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Contact form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const heroImg = imgNewBanner;

  // Handle query parameter navigation to FAQ
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab');
    if (tab === 'faq') {
      // Scroll to top first
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Then change tab after a short delay
      setTimeout(() => {
        setActiveTab('faq');
      }, 100);
    }
  }, [location.search]);

  return (
    <div className="container-fluid p-0">
      {/* Hero Section with Background + Breadcrumb */}
      <section className="position-relative d-flex align-items-center" style={{ minHeight: '360px' }}>
        {/* Background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url('${heroImg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'contrast(1.12) saturate(1.12) brightness(0.95)'
          }}
        />
        {/* Gradient overlay for better readability */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,19,27,0.32) 0%, rgba(3,19,27,0.56) 60%, rgba(3,19,27,0.42) 100%)'
          }}
        />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row py-5">
            <div className="col-12 text-center text-white">
              <ScrollAnimation animation="fadeInUp" delay={300}>
              <h1 className="display-5 fw-bold mb-2" style={{ color: '#FFFFFF', textShadow: '0 6px 22px rgba(0,0,0,0.35)', letterSpacing: '0.5px' }}>Park Information</h1>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={500}>
              <p className="mb-3" style={{ color: '#FFFFFF', opacity: 0.98 }}>All you need to know before your visit</p>
              </ScrollAnimation>
              <ScrollAnimation animation="fadeInUp" delay={700}>
              <nav aria-label="breadcrumb" className="d-inline-block px-3 py-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Info</li>
                </ol>
              </nav>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <ScrollAnimation animation="fadeInUp" delay={900}>
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills justify-content-center" style={{ gap: '12px' }}>
                <li className="nav-item">
                  <button
                    className={`nav-link px-4 py-2 rounded-pill ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                    style={activeTab === 'about' ? { backgroundColor: '#3CBEEE', color: '#fff', boxShadow: '0 6px 18px rgba(60,190,238,0.35)' } : { backgroundColor: '#ffffff', color: '#3CBEEE', border: '1px solid #dceef6' }}
                  >
                    About
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link px-4 py-2 rounded-pill ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                    style={activeTab === 'contact' ? { backgroundColor: '#3CBEEE', color: '#fff', boxShadow: '0 6px 18px rgba(60,190,238,0.35)' } : { backgroundColor: '#ffffff', color: '#3CBEEE', border: '1px solid #dceef6' }}
                  >
                    Contact
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link px-4 py-2 rounded-pill ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                    style={activeTab === 'faq' ? { backgroundColor: '#3CBEEE', color: '#fff', boxShadow: '0 6px 18px rgba(60,190,238,0.35)' } : { backgroundColor: '#ffffff', color: '#3CBEEE', border: '1px solid #dceef6' }}
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </ScrollAnimation>

      {/* Tab Bodies */}
      <section className="py-5">
        <div className="container">
          {/* About */}
          {activeTab === 'about' && (
            <div className="row">
              <div className="col-lg-12">
                {/* Intro copy */}
                <ScrollAnimation animation="fadeInUp" delay={200}>
                <div className="text-center mb-4">
                  <h2 className="mb-3">About Keansburg Park</h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '860px' }}>
                    Keansburg Amusement Park is one of the Jersey Shore's classic seaside parks, just steps from Raritan Bay in Keansburg, NJ.
                    The park traces its roots back to <strong>1904</strong> and has grown into a family destination featuring <strong>40+</strong> rides and attractions.
                    In <strong>1996</strong>, the Runaway Rapids Family Waterpark opened, ushering in a new era of summertime fun.
                    Still guided by the <strong>Gehlhaus</strong> family tradition, the park blends safety, friendliness and community spirit with a timeless boardwalk vibe.
                  </p>
                </div>
                </ScrollAnimation>

                {/* Highlights */}
                <ScrollAnimation animation="fadeInUp" delay={60}>
                <div className="row g-3 mb-5">
                  <div className="col-6 col-md-3">
                    <div className="bg-light rounded-3 p-3 text-center h-100 shadow-sm" style={{ transition: 'transform 220ms ease, box-shadow 220ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=''; }}>
                      <div className="fw-bold" style={{ fontSize: '1.8rem', color: '#3CBEEE' }}>1904</div>
                      <div className="small text-muted">Founded</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="bg-light rounded-3 p-3 text-center h-100 shadow-sm" style={{ transition: 'transform 220ms ease, box-shadow 220ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=''; }}>
                      <div className="fw-bold" style={{ fontSize: '1.8rem', color: '#3CBEEE' }}>40+</div>
                      <div className="small text-muted">Rides & Attractions</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="bg-light rounded-3 p-3 text-center h-100 shadow-sm" style={{ transition: 'transform 220ms ease, box-shadow 220ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=''; }}>
                      <div className="fw-bold" style={{ fontSize: '1.8rem', color: '#3CBEEE' }}>1996</div>
                      <div className="small text-muted">Runaway Rapids Opens</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="bg-light rounded-3 p-3 text-center h-100 shadow-sm" style={{ transition: 'transform 220ms ease, box-shadow 220ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,0.12)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=''; }}>
                      <div className="fw-bold" style={{ fontSize: '1.8rem', color: '#3CBEEE' }}>Family</div>
                      <div className="small text-muted">Proud Family‑Run Tradition</div>
                    </div>
                  </div>
                </div>
                </ScrollAnimation>

                <ScrollAnimation animation="fadeInUp" delay={300}>
                <h2 className="text-center mb-4">History</h2>
                </ScrollAnimation>

                {/* Timeline Start with animations */}
                <div className="container">
                  {/* 1904 - Breaking Ground */}
                  <ScrollAnimation animation="fadeInUp" delay={100}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">1904</small>
                      <h5 className="mt-2">Breaking Ground</h5>
                      <p className="mb-0">
                        Park founder William Gehlhaus and his associates purchase waterfront property to build a
                        summer resort.
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgSharkproof} alt="Breaking Ground" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 1910 - Keansburg Steamboat Company */}
                  <ScrollAnimation animation="fadeInUp" delay={150}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">1910</small>
                      <h5 className="mt-2">Keansburg Steamboat Company</h5>
                      <p className="mb-0">
                        New Yorkers can now take a 50‑cent roundtrip voyage from Battery Park to Keansburg’s newest
                        boardwalk & attractions.
                      </p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgFerry} alt="Keansburg Steamboat" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 1931 - Mystery Ride Opens */}
                  <ScrollAnimation animation="fadeInUp" delay={200}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">1931</small>
                      <h5 className="mt-2">Mystery Ride Opens</h5>
                      <p className="mb-0">
                        One of the world’s oldest operating dark rides opens — The Spook House! (operated until
                        Hurricane Sandy).
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgSpookHouse} alt="Spook House" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 1995 - The Next Generation */}
                  <ScrollAnimation animation="fadeInUp" delay={250}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">1995</small>
                      <h5 className="mt-2">The Next Generation</h5>
                      <p className="mb-0">The grandsons of William Gehlhaus purchase the park.</p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgNewspaperDetail} alt="Next Generation" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 1996 - A Second Park */}
                  <ScrollAnimation animation="fadeInUp" delay={300}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">1996</small>
                      <h5 className="mt-2">A Second Park!</h5>
                      <p className="mb-0">Runaway Rapids Waterpark is built in 9 short months and brings a new era to the park.</p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgConstruction} alt="Waterpark Construction" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 2012 - Superstorm Sandy */}
                  <ScrollAnimation animation="fadeInUp" delay={350}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">2012</small>
                      <h5 className="mt-2">Superstorm Sandy</h5>
                      <p className="mb-0">
                        Following a great summer, one of the most devastating storms in recent memory impacts the park
                        and surrounding communities.
                      </p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgSandyReal} alt="Superstorm Sandy" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 2013 - Back in Action! */}
                  <ScrollAnimation animation="fadeInUp" delay={400}>
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">2013</small>
                      <h5 className="mt-2">Back in Action!</h5>
                      <p className="mb-0">
                        The parks re‑open after a great deal of teamwork, dedication and rebuilding in Sandy’s wake.
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgParkReopens} alt="Back in Action" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* 2015 - The Summer of Fun! */}
                  <ScrollAnimation animation="fadeInUp" delay={450}>
                  <div className="row align-items-center py-4 border-top border-bottom">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">2015</small>
                      <h5 className="mt-2">The Summer of Fun!</h5>
                      <p className="mb-0">You make your triumphant return to Keansburg Amusement Park & Runaway Rapids waterpark!</p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgFrog} alt="Frog Ride" style={{ transition: 'transform 280ms ease, box-shadow 280ms ease' }} onMouseEnter={(e)=>{ e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 14px 28px rgba(0,0,0,0.18)'; }} onMouseLeave={(e)=>{ e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow=''; }} />
                    </div>
                  </div>
                  </ScrollAnimation>
                </div>
                {/* Timeline End */}
              </div>
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div>
              {/* Contact Info and Form Side by Side */}
              <div className="row g-4 mb-4">
                {/* Left Column - Contact Info */}
                <div className="col-12 col-lg-6">
                  <ScrollAnimation animation="fadeInUp" delay={200}>
                  <div>
                    <div className="pb-4">
                      <h4 className="text-primary">Get in Touch</h4>
                      <p className="mb-0">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a className="text-primary fw-bold" href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                    </div>
                    <div className="row g-4">
                      <div className="col-12 col-sm-6">
                        <div className="contact-add-item rounded bg-light p-4">
                          <div className="contact-icon text-primary mb-4">
                            <i className="fas fa-map-marker-alt fa-2x"></i>
                          </div>
                          <div>
                            <h4>Address</h4>
                            <p className="mb-0">275 Beachway Ave, Keansburg, NJ 07734, USA</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="contact-add-item rounded bg-light p-4">
                          <div className="contact-icon text-primary mb-4">
                            <i className="fas fa-envelope fa-2x"></i>
                          </div>
                          <div>
                            <h4>Mail Us</h4>
                            <p className="mb-0">info@keansburgamusementpark.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="contact-add-item rounded bg-light p-4">
                          <div className="contact-icon text-primary mb-4">
                            <i className="fa fa-phone-alt fa-2x"></i>
                          </div>
                          <div>
                            <h4>Telephone</h4>
                            <p className="mb-0">+1 (732) 495-1400</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="contact-add-item rounded bg-light p-4">
                          <div className="contact-icon text-primary mb-4">
                            <i className="fab fa-firefox-browser fa-2x"></i>
                          </div>
                          <div>
                            <h4>Website</h4>
                            <p className="mb-0">keansburgamusementpark.com</p>
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
                  </ScrollAnimation>
                </div>
                
                {/* Right Column - Contact Form */}
                <div className="col-12 col-lg-6">
                  <ScrollAnimation animation="fadeInUp" delay={400}>
                  <div className="bg-light p-5 rounded h-100" style={{ marginTop: '60px' }}>
                    <h4 className="text-primary mb-4">Send Your Message</h4>
                    {submitMsg && (
                      <div className="alert alert-success py-2 mb-3" role="alert">
                        {submitMsg}
                      </div>
                    )}
                    <form onSubmit={async (e)=>{
                      e.preventDefault();
                      if (submitting) return;
                      setSubmitting(true);
                      setSubmitMsg(null);
                      try {
                        const res = await fetch('/api/messages', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(form)
                        });
                        const data = await res.json();
                        if (res.ok && data?.status === 'success') {
                          setSubmitMsg('Your message has been sent to admin. Thank you!');
                          setForm({ name: '', email: '', phone: '', project: '', subject: '', message: '' });
                        } else {
                          setSubmitMsg('Failed to send, please try again later.');
                        }
                      } catch (err) {
                        setSubmitMsg('Network error, please try again later.');
                      } finally {
                        setSubmitting(false);
                      }
                    }}>
                      <div className="row g-4">
                        <div className="col-lg-12 col-xl-6">
                          <div className="form-floating">
                            <input type="text" className="form-control border-0" id="name" placeholder="Your Name" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} />
                            <label htmlFor="name">Your Name</label>
                          </div>
                        </div>
                        <div className="col-lg-12 col-xl-6">
                          <div className="form-floating">
                            <input type="email" className="form-control border-0" id="email" placeholder="Your Email" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} />
                            <label htmlFor="email">Your Email</label>
                          </div>
                        </div>
                        <div className="col-lg-12 col-xl-6">
                          <div className="form-floating">
                            <input type="phone" className="form-control border-0" id="phone" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({ ...form, phone: e.target.value })} />
                            <label htmlFor="phone">Your Phone</label>
                          </div>
                        </div>
                        <div className="col-lg-12 col-xl-6">
                          <div className="form-floating">
                            <input type="text" className="form-control border-0" id="project" placeholder="Project" value={form.project} onChange={(e)=>setForm({ ...form, project: e.target.value })} />
                            <label htmlFor="project">Your Project</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <input type="text" className="form-control border-0" id="subject" placeholder="Subject" value={form.subject} onChange={(e)=>setForm({ ...form, subject: e.target.value })} />
                            <label htmlFor="subject">Subject</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating">
                            <textarea className="form-control border-0" placeholder="Leave a message here" id="message" style={{ height: "160px" }} value={form.message} onChange={(e)=>setForm({ ...form, message: e.target.value })}></textarea>
                            <label htmlFor="message">Message</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-primary w-100 py-3" type="submit" disabled={submitting}>
                            {submitting ? 'Sending…' : 'Send Message'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  </ScrollAnimation>
                </div>
              </div>
              
              {/* Google Maps Below - Larger */}
              <div className="row mt-5">
                <div className="col-12">
                  <h4 className="text-primary mb-3">Our Location</h4>
                  <div className="rounded shadow" style={{ height: "600px", overflow: "hidden" }}>
                    <iframe
                      className="w-100 h-100"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.123456789!2d-74.1407203!3d40.45474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2343186bdbad9%3A0x864cd2ecfd57b4f!2s275%20Beachway%20Ave%2C%20Keansburg%2C%20NJ%2007734%2C%20USA!5e0!3m2!1sen!2sus!4v1694259649153!5m2!1sen!2sus"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ (Enhanced Accordion) */}
          {activeTab === 'faq' && (
            <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="accordion" id="infoAccordion">
                  {/* Keansburg Amusement Park */}
                  <ScrollAnimation animation="fadeInUp" delay={80}>
                  <div className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id="head0">
                      <button 
                        className={`accordion-button ${openIndex === 0 ? '' : 'collapsed'} border-0 rounded-3`} 
                        type="button" 
                        onClick={() => toggle(0)} 
                        aria-expanded={openIndex === 0} 
                        aria-controls="collapse0"
                        style={{
                          backgroundColor: openIndex === 0 ? '#3CBEEE' : '#f8fbff',
                          color: openIndex === 0 ? '#fff' : '#2c3e50',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-ferris-wheel me-3"></i>
                        Keansburg Amusement Park
                      </button>
                    </h2>
                    <div id="collapse0" className={`accordion-collapse collapse${openIndex === 0 ? ' show' : ''}`} aria-labelledby="head0">
                      <div className="accordion-body bg-light rounded-bottom-3" style={{ padding: '2rem' }}>
                        <p className="text-muted mb-4"><em>Keansburg Amusement Park offers over 40 rides including kiddie family and thrill rides. It is our commitment to ensuring all of our guests have a safe and enjoyable visit.</em></p>
                        
                        <div className="row g-4">
                          <div className="col-12 col-sm-6">
                            <div className="d-flex mb-3">
                              <div className="flex-shrink-0 me-3">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <i className="fas fa-ruler"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="text-primary fw-bold mb-1">PHYSICAL, HEIGHT AND SAFETY REQUIREMENTS</h6>
                                <p className="text-muted small mb-0">Rider requirements are set by the state of New Jersey. All requirements are subject to change and are posted at each ride.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-12 col-sm-6">
                            <div className="d-flex mb-3">
                              <div className="flex-shrink-0 me-3">
                                <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <i className="fas fa-ban"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="text-primary fw-bold mb-1">CASTS, BRACES & PREGNANCY</h6>
                                <p className="text-muted small mb-0">For your safety, riders with casts, braces, recent surgery, back injuries or who are pregnant are NOT permitted on rides.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-12 col-sm-6">
                            <div className="d-flex mb-3">
                              <div className="flex-shrink-0 me-3">
                                <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <i className="fas fa-tools"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="text-primary fw-bold mb-1">OPERATIONS & ATTRACTIONS</h6>
                                <p className="text-muted small mb-0">Rides may be closed for maintenance. Refunds will not be given when attractions are closed for maintenance.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-12 col-sm-6">
                            <div className="d-flex mb-3">
                              <div className="flex-shrink-0 me-3">
                                <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <i className="fas fa-shield-alt"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="text-primary fw-bold mb-1">RIDE RESTRAINT SYSTEMS</h6>
                                <p className="text-muted small mb-0">All guests must use restraint systems properly. Tampering with safety systems is prohibited by law.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-white rounded-3 border">
                          <h6 className="text-primary fw-bold mb-2">Additional Information</h6>
                          <ul className="list-unstyled mb-0">
                            <li className="mb-1"><i className="fas fa-check text-success me-2"></i>Loose articles not permitted on thrill rides</li>
                            <li className="mb-1"><i className="fas fa-check text-success me-2"></i>Closed toe shoes required for Go Karts</li>
                            <li className="mb-1"><i className="fas fa-check text-success me-2"></i>Family-friendly dress code enforced</li>
                            <li className="mb-0"><i className="fas fa-check text-success me-2"></i>Outside alcohol not permitted</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* Runaway Rapids */}
                  <ScrollAnimation animation="fadeInUp" delay={140}>
                  <div className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id="head1">
                      <button 
                        className={`accordion-button ${openIndex === 1 ? '' : 'collapsed'} border-0 rounded-3`} 
                        type="button" 
                        onClick={() => toggle(1)} 
                        aria-expanded={openIndex === 1} 
                        aria-controls="collapse1"
                        style={{
                          backgroundColor: openIndex === 1 ? '#3CBEEE' : '#f8fbff',
                          color: openIndex === 1 ? '#fff' : '#2c3e50',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-swimming-pool me-3"></i>
                        Runaway Rapids
                      </button>
                    </h2>
                    <div id="collapse1" className={`accordion-collapse collapse${openIndex === 1 ? ' show' : ''}`} aria-labelledby="head1">
                      <div className="accordion-body bg-light rounded-bottom-3" style={{ padding: '2rem' }}>
                        <h6 className="text-primary fw-bold">WHAT ARE THE PHYSICAL REQUIREMENTS & HEIGHT AND SAFETY</h6>
                        <p>Runaway Rapids is a family-friendly, participatory waterpark with physically demanding activities. It is our Guest’s responsibility to know and understand their own physical limitations, capabilities and swim ability before engaging in activity at the waterpark. If you are “non-athletic” in nature or overweight for your body type, we urge you to use caution when choosing which activities, you choose to participate in at the waterpark.</p>
                        <h6 className="text-primary fw-bold">CAN YOU PARTICIPATE WITH A CAST, OR A BRACE, OR WHILE PREGNANT?</h6>
                        <p>For your safety, riders with casts, braces or splints of any kind, recent surgery, back injuries or who are pregnant are NOT permitted on rides at Runaway Rapids Waterpark.</p>
                        <h6 className="text-primary fw-bold">ARE THERE HEIGHT AND SAFETY REQUIREMENTS?</h6>
                        <p>All Guests must obey all height and safety restrictions posted at each attraction. All height and safety requirements are set by the park, attractions manufacturer, and state New Jersey. Additionally, all guests who participate must have full body control, ability to climb all stairs to slides without assistance and ability to hold themselves in the position required to ride the attraction. All height and safety requirements are listed under each attraction on our website.</p>
                        <h6 className="text-primary fw-bold">DO YOU PROVIDE LIFE JACKETS?</h6>
                        <p>Only you know your swimming ability, and that of your children and anyone you are supervising. We strongly recommend all guests under 48” who are weak swimmers or non-swimmers wear a U.S. Coast Guard-approved life jacket. We offer FREE of charge life jackets throughout Runaway Rapids Waterpark.</p>
                        <h6 className="text-primary fw-bold">WHAT IS THE DRESS CODE?</h6>
                        <p>Bathing suits are required for all water attractions in the water park.</p>
                        <ul>
                          <li><strong>Safety –</strong> bathing suits are lightweight and are made to not absorb a lot of water, making it much easier for a person to swim.</li>
                          <li><strong>Hygiene –</strong> street clothing can introduce bacteria, detergents and dyes into the water.</li>
                        </ul>
                        <p>Appropriate swimwear means suits designed specifically for swimming, made of synthetic materials such as polyester, nylon, and Lycra or spandex. Clothing NOT considered appropriate includes Workout Shorts, T‑Shirts, pants of all kinds (including jeans/cut‑offs), Cover Ups, Sports Bras, and all other clothing not made for swimming. Swimsuits with rivets, buckles, zippers or exposed metal are not allowed. Hair Clips and Sunglasses are not recommended and should be worn at your own risk.</p>
                        <h6 className="text-primary fw-bold">WHAT IS THE DIAPER POLICY?</h6>
                        <p>For the safety of all of our guests, diapers are not permitted in any pool. All babies and toddlers who wear diapers MUST wear disposable swim diapers or waterproof diaper covers to go in the water. Changing diapers is not permitted in the pool or deck areas – changing stations are located in our changing rooms.</p>
                        <h6 className="text-primary fw-bold">ARE THERE LIFEGUARDS?</h6>
                        <p>Yes! Ellis‑trained lifeguards are stationed throughout the park to ensure guests ride attractions safely.</p>
                        <h6 className="text-primary fw-bold">WHERE CAN I STORE MY PERSONAL ARTICLES?</h6>
                        <p>Lockers are available to rent at The Tiki Hut. Lockers are $10 daily plus a $10 deposit (returned when the key is returned). Prohibited items: Alcohol, glass containers, pets, coolers and outside food. Bags are subject to search.</p>
                        <h6 className="text-primary fw-bold">CAN YOU BRING IN OUTSIDE FOOD?</h6>
                        <p>Outside food is not permitted at Runaway Rapids. Several food choices are available in the park.</p>
                        <h6 className="text-primary fw-bold">CAN YOU GRILL AT THE PARK?</h6>
                        <p>Grilling is strictly prohibited.</p>
                        <h6 className="text-primary fw-bold">OPERATIONS & ATTRACTIONS</h6>
                        <p>For safety, slides and attractions may be closed for maintenance or repairs. Refunds are not given when attractions are closed for maintenance or repairs.</p>
                        <h6 className="text-primary fw-bold">APPROPRIATE BEHAVIOR</h6>
                        <p>Guests must obey all height and safety restrictions and signage. Failure to follow rules may result in immediate ejection without refund.</p>
                        <h6 className="text-primary fw-bold">CAN YOU SMOKE IN THE PARK?</h6>
                        <p>Smoking in Runaway Rapids is prohibited.</p>
                        <h6 className="text-primary fw-bold">WEATHER POLICY</h6>
                        <p>During severe weather, the park may close temporarily and reopen when safe. If the park must close early due to severe weather, a come‑back pass may be issued before leaving the park.</p>
                        <h6 className="text-primary fw-bold">WHERE IS CONVENIENT PARKING?</h6>
                        <p>More convenient parking is the lot behind the amusement park by the batting cages. Waterpark guests can cut through the amusement park to the waterpark. Metered parking is limited and strictly enforced.</p>
                        <h6 className="text-primary fw-bold">WHAT KIND OF COUPONS DOES RUNAWAY RAPIDS ACCEPT</h6>
                        <p>Currently accepts coupons from Kidstuff, Groupon, LocalFlavor and any coupons generated from the park. Third‑party coupon sites are not accepted.</p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* Group Outings */}
                  <ScrollAnimation animation="fadeInUp" delay={200}>
                  <div className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id="head2">
                      <button 
                        className={`accordion-button ${openIndex === 2 ? '' : 'collapsed'} border-0 rounded-3`} 
                        type="button" 
                        onClick={() => toggle(2)} 
                        aria-expanded={openIndex === 2} 
                        aria-controls="collapse2"
                        style={{
                          backgroundColor: openIndex === 2 ? '#3CBEEE' : '#f8fbff',
                          color: openIndex === 2 ? '#fff' : '#2c3e50',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-users me-3"></i>
                        Group Outings
                      </button>
                    </h2>
                    <div id="collapse2" className={`accordion-collapse collapse${openIndex === 2 ? ' show' : ''}`} aria-labelledby="head2">
                      <div className="accordion-body bg-light rounded-bottom-3" style={{ padding: '2rem' }}>
                        <p>Go to the Group Packages page, send us an email, or call the office at 732-495-1400 ext. 3 to make your reservation.</p>
                        <h6 className="text-primary fw-bold">HOW MANY CAMPERS DO I NEED FOR GROUP RATES?</h6>
                        <p>All groups must have 25 or more in order to take advantage of our group rates.</p>
                        <h6 className="text-primary fw-bold">WHAT IF I DON'T COME WITH THE EXPECTED AMOUNT OF CAMPERS, DO I HAVE TO PAY FOR THEM?</h6>
                        <p>As long as you have 25 or more you will pay for the actual amount of campers you have. If you are under 25 you must pay for the minimum of 25. If your numbers increase by 10 or more please call the group sales office and let us know at 732-495-1400 ext. 3.</p>
                        <h6 className="text-primary fw-bold">WHAT WILL I NEED TO GET BOOKED?</h6>
                        <p>You will need your deposit and a contract to reserve your date.</p>
                        <h6 className="text-primary fw-bold">WHERE DO WE GO WHEN WE ARRIVE?</h6>
                        <p>If you are visiting the Waterpark, Amusement Park or both, please send two Group Representatives to the front of the waterpark to check in.</p>
                        <h6 className="text-primary fw-bold">CAN I PAY WITH A PERSONAL CHECK?</h6>
                        <p>No, we do not accept personal checks the day of your trip. We will accept, Cash, Credit card, or Business Checks.</p>
                        <h6 className="text-primary fw-bold">CAN A CAMPER WITH A CAST GO ON ALL RIDES?</h6>
                        <p>No camper can go on any rides in either park with a cast or any kind of brace due to insurance requirements.</p>
                        <h6 className="text-primary fw-bold">DOES THE WATERPARK PROVIDE LIFEJACKETS?</h6>
                        <p>Yes, you may use any of the available life Jackets we supply at the waterpark.</p>
                        <h6 className="text-primary fw-bold">ARE THERE HEIGHT AND/OR WEIGHT RESTRICTION ON RIDES & ATTRACTIONS?</h6>
                        <p>Yes, you may view our website for height and weight restrictions on all of our rides & attractions.</p>
                        <h6 className="text-primary fw-bold">ARE THERE ANY RIDES AT THE WATER PARK WE CANNOT USE?</h6>
                        <p>Groups are not permitted to enter the 10ft pool. A waiver may be signed to take responsibility for swimming abilities; however a life jacket is required in the 10ft pool regardless of age.</p>
                        <h6 className="text-primary fw-bold">WHAT IF WE RUN LATE FOR OUR SCHEDULED TIME?</h6>
                        <p>If you are going to be late please call the waterpark and ask for group sales at 732-495-5241. If we can accommodate you, we will; otherwise time may be reduced due to conflicts with other reservations and closing time.</p>
                        <h6 className="text-primary fw-bold">DO YOU HAVE A FIRST AID STATION AT EACH PARK?</h6>
                        <p>Yes.</p>
                        <h6 className="text-primary fw-bold">DO YOU HAVE GROUP RATE FOOD PACKAGES?</h6>
                        <p>Yes, food packages are available at both parks. Call group sales at 732-495-1400 ext. 3 for details.</p>
                        <h6 className="text-primary fw-bold">IS THERE A RECREATION AREA FOR LUNCH?</h6>
                        <p>Several picnic/recreation areas are available but specific times cannot be guaranteed on busy days.</p>
                        <h6 className="text-primary fw-bold">CAN WE BRING OUR OWN LUNCH AND COOLERS?</h6>
                        <p>No coolers or food are allowed in Runaway Rapids. You may bring coolers/lunches to the Amusement Park side during lunch time. No grilling. Please remove belongings after lunch.</p>
                        <h6 className="text-primary fw-bold">CAN OUR CHILDREN BRING THEIR BACKPACKS?</h6>
                        <ul>
                          <li><strong>Keansburg Amusement Park:</strong> leave backpacks on the bus during ride time; we are not responsible for lost/stolen items.</li>
                          <li><strong>Runaway Rapids:</strong> bins will be provided; do not leave belongings on the ground.</li>
                        </ul>
                        <h6 className="text-primary fw-bold">ARE THERE LOCKERS AT THE WATERPARK?</h6>
                        <p>Yes, lockers are available for a fee.</p>
                        <h6 className="text-primary fw-bold">ARE THERE CHANGING ROOMS?</h6>
                        <p>Yes.</p>
                        <h6 className="text-primary fw-bold">DO ADULTS HAVE TO PAY TO RIDE?</h6>
                        <p>Yes, everyone riding the rides must pay.</p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* Birthday Parties */}
                  <ScrollAnimation animation="fadeInUp" delay={260}>
                  <div className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id="head3">
                      <button 
                        className={`accordion-button ${openIndex === 3 ? '' : 'collapsed'} border-0 rounded-3`} 
                        type="button" 
                        onClick={() => toggle(3)} 
                        aria-expanded={openIndex === 3} 
                        aria-controls="collapse3"
                        style={{
                          backgroundColor: openIndex === 3 ? '#3CBEEE' : '#f8fbff',
                          color: openIndex === 3 ? '#fff' : '#2c3e50',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-birthday-cake me-3"></i>
                        Birthday Parties
                      </button>
                    </h2>
                    <div id="collapse3" className={`accordion-collapse collapse${openIndex === 3 ? ' show' : ''}`} aria-labelledby="head3">
                      <div className="accordion-body bg-light rounded-bottom-3" style={{ padding: '2rem' }}>
                        <h6 className="text-primary fw-bold">WHERE DOES EACH PARTY MEET WHEN THEY ARRIVE?</h6>
                        <p><strong>PACKAGE 1 & 2:</strong> The Ultimate Birthday & Party Splashtacular – Meet Birthday host at the front gate of the Waterpark near the Toucan Grille & Blue Picnic Table</p>
                        <p><strong>PACKAGE 3, 4, 5, & 6:</strong> The Funbelievable, Unlimited Funbelievable Party, & Go Kart Parties: Meet Birthday host at the carousel building located next to the Game Room Arcade on the street side of the amusement park</p>
                        <h6 className="text-primary fw-bold">DO YOU ACCEPT CREDIT CARDS?</h6>
                        <p>Yes, credit cards are accepted for both deposits and final payment.</p>
                        <h6 className="text-primary fw-bold">DO I NEED TO PREARRANGE MY PARTY?</h6>
                        <p>Yes, a minimum of 7 days advance registration is required with a 50% deposit. Please call (732) 495-1400 ext 7 or book online. Parties are not confirmed until you receive a phone call confirmation from our birthday party staff.</p>
                        <h6 className="text-primary fw-bold">WILL SOMEONE FROM THE PARK COORDINATE THE PARTY?</h6>
                        <p>Yes. Party chaperones are provided for all parties to help coordinate the guests’ arrival, determine party location and celebration. The chaperone does not stay with the guests during play time at the water park but does serve food along with ice cream and cake (if provided). However, at the amusement park, the chaperone will escort guests around to the rides for approximately one hour and then leave party under guest-provided supervision, in order to be able to set up food, drinks and party celebration.</p>
                        <h6 className="text-primary fw-bold">WHERE CAN THE GUESTS OF THE PARTY PARK?</h6>
                        <p>Parking is most convenient in the parking lot behind the amusement park by the batting cages. Parking is $7.00 per day during weekdays and $10 per day on weekends and holidays.</p>
                        <h6 className="text-primary fw-bold">IS THE BIRTHDAY CHILD FREE?</h6>
                        <p>The birthday child is <strong>NOT FREE</strong> and is included in the 10 guests for each party package. So this means that the birthday child plus nine guests are included in the birthday party package price.</p>
                        <h6 className="text-primary fw-bold">IS BIRTHDAY CAKE PROVIDED?</h6>
                        <p>No, but we provide each child with ice cream. If you decide to bring your own cake, it will be served by your party chaperone at no extra charge.</p>
                        <p>As an alternate option, you can order your cake online from Cups and Cakes bakery, and they will deliver your cake directly to the Park. To order, please check out their website here: <a href="http://cupsandcakesrumson.com/celebrations/" target="_blank" rel="noopener noreferrer">http://cupsandcakesrumson.com/celebrations/</a></p>
                        <p><em>*Keansburg Amusement Park is not affiliated with Cups and Cakes bakery. We are not responsible for any lost or damaged items or issues with your order.</em></p>
                        <h6 className="text-primary fw-bold">ARE PAPER PRODUCTS SUPPLIED?</h6>
                        <p>Yes, we provide birthday plates, cups, napkins, and utensils that are generic/no theme. We also supply candles.</p>
                        <h6 className="text-primary fw-bold">CAN YOU BRING OUTSIDE FOOD AND BEVERAGE INTO THE WATERPARK?</h6>
                        <p>No, you are only permitted to bring in cake or cupcakes.</p>
                        <h6 className="text-primary fw-bold">IS THERE A HEIGHT REQUIREMENT FOR THE KIDDIE GO-KARTS?</h6>
                        <p>Yes, the minimum height requirement is 32″ and maximum height requirement is 42″.</p>
                        <h6 className="text-primary fw-bold">WHAT IS THE PRICE FOR ADULT GUEST SUPERVISORS AT THE PARTY?</h6>
                        <p>At the waterpark, dry spectators/guest supervisors are allowed in FREE to help monitor fun but NO WATER ENTRY IS PERMITTED. The first 2 participating guest supervisors who plan on going in the water are FREE, all others are charged a special rate of only $32.00. At the amusement park, there is not an entrance fee so all guest supervisors are free. For both parks, this does not include the price of the food.</p>
                        <h6 className="text-primary fw-bold">IS THERE A SPECIAL MEAL RATE FOR ADULT GUEST SUPERVISORS AT THE PARTY?</h6>
                        <p>Yes, in the waterpark guest supervisors can get a hamburger or hot dog with french fries and a beverage for only $10.00. Additional pizza is not available at the waterpark on Saturday & Sundays. The price for each extra pitcher of soda is $7.00. Food for the guest supervisors can be ordered through your party chaperone at the beginning of the party.</p>
                        <h6 className="text-primary fw-bold">CAN A RAIN DATE BE SCHEDULED AND WHAT IS THE CANCELLATION POLICY?</h6>
                        <p>Yes. Rain dates are strongly encouraged when booking. The date and time cannot be guaranteed because of other reservations. Please be assured that if this should happen, you will always be accommodated to the closest time and date possible. For the Splashtacular package, in the event of inclement weather during the party, the discount will be determined based upon the time spent at park.</p>
                        <p>Cancellations must be made at least one (1) week in advance of scheduled party to be eligible for a deposit refund.</p>
                        <h6 className="text-primary fw-bold">WHAT HAPPENS IF THERE IS INCLEMENT WEATHER DURING THE PARTY?</h6>
                        <p>Closing either park will be up to the discretion of management to ensure the safety of all guests. If the park should close during the party, please refer to rain date facts directly above.</p>
                        <h6 className="text-primary fw-bold">WHAT HAPPENS IF WE ARRIVE LATE?</h6>
                        <p>In consideration of other scheduled parties, a late fee of $25 per ½ hour will be charged. We will do our best to still provide the amount of time scheduled but cannot guarantee this because of possible conflicts with other reservations and park closing time. Please allow time for travel, parking, and seasonal traffic.</p>
                        <h6 className="text-primary fw-bold">IS GRATUITY FOR THE PARTY ATTENDANT INCLUDED IN THE PACKAGE?</h6>
                        <p>No, a gratuity is not included in the price but is greatly appreciated.</p>
                        <h6 className="text-primary fw-bold">ADDITIONAL INFORMATION</h6>
                        <p>Please check our operating calendar before booking your party. Parties cannot be booked on days we are not open.</p>
                        <p>Party Guests are expected to follow all height and safety requirements on all rides at Keansburg Amusement Park and all slides at Runaway Rapids.</p>
                        <p>Party Guests with casts/braces or bandages of any kind, recent surgery, back injuries or are pregnant are not permitted on any of the rides at Keansburg Amusement Park.</p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>

                  {/* Parking */}
                  <ScrollAnimation animation="fadeInUp" delay={320}>
                  <div className="accordion-item border-0 mb-3 shadow-sm">
                    <h2 className="accordion-header" id="head4">
                      <button 
                        className={`accordion-button ${openIndex === 4 ? '' : 'collapsed'} border-0 rounded-3`} 
                        type="button" 
                        onClick={() => toggle(4)} 
                        aria-expanded={openIndex === 4} 
                        aria-controls="collapse4"
                        style={{
                          backgroundColor: openIndex === 4 ? '#3CBEEE' : '#f8fbff',
                          color: openIndex === 4 ? '#fff' : '#2c3e50',
                          fontWeight: '600',
                          fontSize: '1.1rem',
                          padding: '1.25rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-parking me-3"></i>
                        Parking
                      </button>
                    </h2>
                    <div id="collapse4" className={`accordion-collapse collapse${openIndex === 4 ? ' show' : ''}`} aria-labelledby="head4">
                      <div className="accordion-body bg-light rounded-bottom-3" style={{ padding: '2rem' }}>
                        <h6 className="text-primary fw-bold">WHERE CAN MY PARTY GUESTS PARK?</h6>
                        <p>It is more convenient for Your Guests to park in the lot behind the amusement park. The cost to park ALL DAY LONG is $7 Monday through Friday and $10 on weekends and holidays. All guests who park in this lot will receive a coupon sheet full of savings available at Keansburg Amusement Park. Waterpark birthday guests can conveniently cut through the amusement park to get to the waterpark.</p>
                        <p>Metered parking is limited and available on the street and in the lot next to the Go-Kart tracks. The Borough of Keansburg owns and operates the meters and strictly enforces any time infractions. Please note that parking tickets will be given to any expired meters, which are owned and operated by the Borough of Keansburg.</p>
                        <h6 className="text-primary fw-bold">WHERE CAN MY PARTY GUESTS PARK? (DAILY RATE)</h6>
                        <p>It is more convenient for Your Guests to park in the lot behind the amusement park. The cost to park ALL DAY LONG $10 every day. Waterpark birthday guests can conveniently cut through the amusement park to get to the waterpark.</p>
                        <p>Metered parking is limited and available on the street and in the lot next to the Go-Kart tracks. The Borough of Keansburg owns and operates the meters and strictly enforces any time infractions. Please note that parking tickets will be given to any expired meters, which are owned and operated by the Borough of Keansburg.</p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>
                </div>
              </div>
            </div>
            </ScrollAnimation>
          )}
        </div>
      </section>
    </div>
  );
};

export default Info;

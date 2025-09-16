import React, { useState } from 'react';
import imgFerry from '../assets/img/ferry_web.png';
import imgFrog from '../assets/img/Frog-Hopper-768x512.jpg';
import imgNewspaperDetail from '../assets/img/newspaper_detail_web1-768x512.png';
import imgParkReopens from '../assets/img/Park-Reopens-768x510.jpg';
import imgSharkproof from '../assets/img/sharkproof-net_web.png';
import imgSpookHouse from '../assets/img/spook-house-1940s.jpg';
import imgConstruction from '../assets/img/2004-11-09-13.26.50.jpg';
import imgSandyReal from '../assets/img/2012-10-31-13.53.58-2.jpg';

const Info: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'faq'>('about');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="container-fluid">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold mb-4">Park Information</h1>
              <p className="lead">Learn about Keansburg Park and our guest services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                    onClick={() => setActiveTab('contact')}
                  >
                    Contact
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveTab('faq')}
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Bodies */}
      <section className="py-5">
        <div className="container">
          {/* About */}
          {activeTab === 'about' && (
            <div className="row">
              <div className="col-lg-12">
                <h2 className="text-center mb-5">History</h2>

                {/* Timeline Start */}
                <div className="container">
                  {/* 1904 - Breaking Ground */}
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
                      <img className="img-fluid rounded shadow hover-lift" src={imgSharkproof} alt="Breaking Ground" />
                    </div>
                  </div>

                  {/* 1910 - Keansburg Steamboat Company */}
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
                      <img className="img-fluid rounded shadow hover-lift" src={imgFerry} alt="Keansburg Steamboat" />
                    </div>
                  </div>

                  {/* 1931 - Mystery Ride Opens */}
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
                      <img className="img-fluid rounded shadow hover-lift" src={imgSpookHouse} alt="Spook House" />
                    </div>
                  </div>

                  {/* 1995 - The Next Generation */}
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">1995</small>
                      <h5 className="mt-2">The Next Generation</h5>
                      <p className="mb-0">The grandsons of William Gehlhaus purchase the park.</p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgNewspaperDetail} alt="Next Generation" />
                    </div>
                  </div>

                  {/* 1996 - A Second Park */}
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">1996</small>
                      <h5 className="mt-2">A Second Park!</h5>
                      <p className="mb-0">Runaway Rapids Waterpark is built in 9 short months and brings a new era to the park.</p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgConstruction} alt="Waterpark Construction" />
                    </div>
                  </div>

                  {/* 2012 - Superstorm Sandy */}
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
                      <img className="img-fluid rounded shadow hover-lift" src={imgSandyReal} alt="Superstorm Sandy" />
                    </div>
                  </div>

                  {/* 2013 - Back in Action! */}
                  <div className="row align-items-center py-4 border-top">
                    <div className="col-md-6">
                      <small className="text-muted">2013</small>
                      <h5 className="mt-2">Back in Action!</h5>
                      <p className="mb-0">
                        The parks re‑open after a great deal of teamwork, dedication and rebuilding in Sandy’s wake.
                      </p>
                    </div>
                    <div className="col-md-6 text-md-end mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgParkReopens} alt="Back in Action" />
                    </div>
                  </div>

                  {/* 2015 - The Summer of Fun! */}
                  <div className="row align-items-center py-4 border-top border-bottom">
                    <div className="col-md-6 order-md-2">
                      <small className="text-muted">2015</small>
                      <h5 className="mt-2">The Summer of Fun!</h5>
                      <p className="mb-0">You make your triumphant return to Keansburg Amusement Park & Runaway Rapids waterpark!</p>
                    </div>
                    <div className="col-md-6 order-md-1 mt-3 mt-md-0">
                      <img className="img-fluid rounded shadow hover-lift" src={imgFrog} alt="Frog Ride" />
                    </div>
                  </div>
                </div>
                {/* Timeline End */}
              </div>
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
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
          )}

          {/* FAQ (Controlled Accordion) */}
          {activeTab === 'faq' && (
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="accordion" id="infoAccordion">
                  {/* Keansburg Amusement Park */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="head0">
                      <button className="accordion-button collapsed" type="button" onClick={() => toggle(0)} aria-expanded={openIndex === 0} aria-controls="collapse0">
                        Keansburg Amusement Park
                      </button>
                    </h2>
                    <div id="collapse0" className={`accordion-collapse collapse${openIndex === 0 ? ' show' : ''}`} aria-labelledby="head0">
                      <div className="accordion-body">
                        <p><em>Keansburg Amusement Park offers over 40 rides including kiddie family and thrill rides. It is our commitment to ensuring all of our guests have a safe and enjoyable visit.</em></p>
                        <h6 className="text-primary fw-bold">WHAT ARE THE PHYSICAL, HEIGHT AND SAFETY REQUIREMENTS?</h6>
                        <p>Rider requirements are set by the state of New Jersey. All requirements are subject to change. Each attraction is inspected and subject to the laws in New Jersey. All state law requirements, such as height and weight restrictions, are posted at each ride and are strictly enforced. Any guest who violates any written safety regulation or engages in behavior that poses a safety issue to either themselves or our guests may result in criminal prosecution under N.J.S.A 5:3-36.1. Any violator of park safety regulations may be subject to fines up to $1,000 and up to 6 months in prison. Children should be self supporting when riding rides.</p>
                        <h6 className="text-primary fw-bold">CAN YOU RIDE WITH A CAST, OR A BRACE, OR WHILE PREGNANT?</h6>
                        <p>For your safety, riders with hard or soft casts or splints of any kind, any type of brace, recent surgery, back injuries or who are pregnant are NOT permitted on rides at Keansburg Amusement Park.</p>
                        <h6 className="text-primary fw-bold">OPERATIONS & ATTRACTIONS</h6>
                        <p>At times, for the safety of our guests, rides, and attractions will be closed for maintenance. Refunds will not be given when attractions are closed for maintenance. Wristbands can not be shared, traded, or exchanged. Wristbands are only valid on day of purchase. Ride rules vary. Please check signs on entrances.</p>
                        <h6 className="text-primary fw-bold">RIDE RESTRAINT SYSTEMS</h6>
                        <p>All guests are required to use all ride restraint systems properly at all times. Guests who are large framed, very tall or too small may not be allowed to ride certain rides due to safety regulations. Any guest who tampers with a safety restraint system will be subject to prosecution under New Jersey State Law. Any violator may be subject to fines up to $1000 and up to 6 months in jail.</p>
                        <h6 className="text-primary fw-bold">LOOSE ARTICLES</h6>
                        <p>Loose articles including cell phones, wallets, purses, keys, etc. may not be taken on thrill and select family rides. Please leave all personal items while you are riding with a companion. Employees are not allowed to watch over personal articles of guests.</p>
                        <h6 className="text-primary fw-bold">WHAT IS THE DRESS CODE?</h6>
                        <p>Keansburg Amusement Park is a family-friendly amusement park. And as such, any clothing with profanity, illegal substances or suggestive/offensive material is prohibited. For your safety, shoes should be worn during your visit to the park at all times. Certain attractions, such as our Go Karts, require closed toe shoes. All guests must be wearing a shirt while riding the attraction. Guests may not wear swimwear out of courtesy to our other guests.</p>
                        <h6 className="text-primary fw-bold">APPROPRIATE BEHAVIOR</h6>
                        <p>Keansburg Amusement Park is a family friendly amusement park and privately owned. We reserve the right to remove any guest who prevents other guests from enjoying the park. Any guest who is removed from the park will not be issued a refund.</p>
                        <h6 className="text-primary fw-bold">ALCOHOLIC BEVERAGES</h6>
                        <p>Outside alcoholic beverages are not permitted at Keansburg Amusement Park. Guests may visit our three establishments, The Olde Heidelberg, The Pavilion, and The Miami Club to enjoy alcoholic beverages. Any beverage purchased at these establishments may not be taken outside the confines of such establishment.</p>
                        <h6 className="text-primary fw-bold">CAN YOU GRILL AT THE PARK?</h6>
                        <p>Grilling is prohibited at Keansburg Amusement Park</p>
                        <h6 className="text-primary fw-bold">WHAT IS THE WEATHER POLICY?</h6>
                        <p>When there is inclement weather, rides may be temporarily suspended. Rides will reopen when it is deemed to safely resume operations.</p>
                        <h6 className="text-primary fw-bold">ARE PETS, SKATEBOARDS & BIKES ALLOWED?</h6>
                        <p>For the safety of our guests, pets, skateboards, and bikes are not permitted at Keansburg Amusement Park.</p>
                        <h6 className="text-primary fw-bold">WHAT KIND OF FOOD DOES THE PARK OFFER?</h6>
                        <p>There are several Jersey boardwalk style food establishments at Keansburg Amusement Park at very affordable prices including ice cream, hot dogs, pizza and more.</p>
                        <h6 className="text-primary fw-bold">WHERE IS THE MOST CONVENIENT PLACE TO PARK?</h6>
                        <p>It is more convenient for our Guests to park in the lot behind the amusement park. Guests can enter the parking lot by driving under the Keansburg archway and proceed to the parking attendent. The cost to park ALL DAY LONG is $10. Monday through Friday after 4pm all day parking is discounted to $7. Cash only.</p>
                        <p>Metered parking is limited and available on the street and in the lot next to the Go-Kart tracks. The Borough of Keansburg owns and operates the meters and strictly enforces any time infractions. Please note that parking tickets will be given to any expired meters, which are owned and operated by the Borough of Keansburg.</p>
                        <h6 className="text-primary fw-bold">WHAT COUPONS DOES THE PARK ACCEPT</h6>
                        <p>Keansburg Amusement Park only accepts coupons that come directly from the park.</p>
                      </div>
                    </div>
                  </div>

                  {/* Runaway Rapids */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="head1">
                      <button className="accordion-button collapsed" type="button" onClick={() => toggle(1)} aria-expanded={openIndex === 1} aria-controls="collapse1">
                        Runaway Rapids
                      </button>
                    </h2>
                    <div id="collapse1" className={`accordion-collapse collapse${openIndex === 1 ? ' show' : ''}`} aria-labelledby="head1">
                      <div className="accordion-body">
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

                  {/* Group Outings */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="head2">
                      <button className="accordion-button collapsed" type="button" onClick={() => toggle(2)} aria-expanded={openIndex === 2} aria-controls="collapse2">
                        Group Outings
                      </button>
                    </h2>
                    <div id="collapse2" className={`accordion-collapse collapse${openIndex === 2 ? ' show' : ''}`} aria-labelledby="head2">
                      <div className="accordion-body">
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

                  {/* Birthday Parties */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="head3">
                      <button className="accordion-button collapsed" type="button" onClick={() => toggle(3)} aria-expanded={openIndex === 3} aria-controls="collapse3">
                        Birthday Parties
                      </button>
                    </h2>
                    <div id="collapse3" className={`accordion-collapse collapse${openIndex === 3 ? ' show' : ''}`} aria-labelledby="head3">
                      <div className="accordion-body">
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

                  {/* Parking */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="head4">
                      <button className="accordion-button collapsed" type="button" onClick={() => toggle(4)} aria-expanded={openIndex === 4} aria-controls="collapse4">
                        Parking
                      </button>
                    </h2>
                    <div id="collapse4" className={`accordion-collapse collapse${openIndex === 4 ? ' show' : ''}`} aria-labelledby="head4">
                      <div className="accordion-body">
                        <h6 className="text-primary fw-bold">WHERE CAN MY PARTY GUESTS PARK?</h6>
                        <p>It is more convenient for Your Guests to park in the lot behind the amusement park. The cost to park ALL DAY LONG is $7 Monday through Friday and $10 on weekends and holidays. All guests who park in this lot will receive a coupon sheet full of savings available at Keansburg Amusement Park. Waterpark birthday guests can conveniently cut through the amusement park to get to the waterpark.</p>
                        <p>Metered parking is limited and available on the street and in the lot next to the Go-Kart tracks. The Borough of Keansburg owns and operates the meters and strictly enforces any time infractions. Please note that parking tickets will be given to any expired meters, which are owned and operated by the Borough of Keansburg.</p>
                        <h6 className="text-primary fw-bold">WHERE CAN MY PARTY GUESTS PARK? (DAILY RATE)</h6>
                        <p>It is more convenient for Your Guests to park in the lot behind the amusement park. The cost to park ALL DAY LONG $10 every day. Waterpark birthday guests can conveniently cut through the amusement park to get to the waterpark.</p>
                        <p>Metered parking is limited and available on the street and in the lot next to the Go-Kart tracks. The Borough of Keansburg owns and operates the meters and strictly enforces any time infractions. Please note that parking tickets will be given to any expired meters, which are owned and operated by the Borough of Keansburg.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Info;

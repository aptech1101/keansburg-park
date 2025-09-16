import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import imgBanner from "../assets/img/page-banner.png";
import imgSlides from "../assets/img/water-slides.jpg";
import imgGLagoon from "../assets/img/water-kiddie-lagoon.png";
import imgTubPools from "../assets/img/water-hot-tub-warming-pools.jpg";
import imgRooms from "../assets/img/water-changing-rooms.jpg";
import imgLockers from "../assets/img/water-lockers.png";
import imgDining from "../assets/img/water-dining.png";
import imgPricing from "../assets/img/water-pricing.jpg";

export default function WaterPark() {
  return (
    <>
     
      {/* Banner Section */}
      <div className="bg-breadcrumb position-relative" style={{
        backgroundImage: `url(${imgBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-12 text-center text-white">
               <h1 className="display-4 fw-bold mb-3 text-white">Water Park</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/zones" className="text-white text-decoration-none">Zones</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Water Park</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        {/* Introduction Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Water Park</h4>
            <h1 className="display-5 fw-bold mb-4">Make a Splash at Keansburg Water Park</h1>
             <p className="fs-5 fst-italic mb-4" style={{ color: '#021016' }}>
               Slides, pools, and water play for the whole family.
             </p>
             <p className="fs-5 mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
               Runaway Rapids has over 18 thrilling water slides, a kiddie lagoon, separate toddler play
                area, crazy lazy river and two spa pools. Enjoy our crystal clear water with Ellis-trained
                lifeguards, locker rentals, showers, changing facility and much more!
             </p>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="row g-5">
          {/* Slides */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgSlides} 
                     className="img-fluid w-100 h-100" 
                     alt="Slides" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Slides</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Check out all the slides at Runaway Rapids!
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kiddie Lagoon */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgGLagoon} 
                     className="img-fluid w-100 h-100" 
                     alt="Kiddie Lagoon" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Kiddie Lagoon</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     The kids will love the Kiddie Lagoon at Runaway Rapids!
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hot Tub & Warming Pools */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgTubPools} 
                     className="img-fluid w-100 h-100" 
                     alt="Hot Tub & Warming Pools" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Hot Tub & Warming Pools</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Relax at the Hot Tub & Warming Pools at Runaway Rapids!
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Changing Rooms */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgRooms} 
                     className="img-fluid w-100 h-100" 
                     alt="Changing Rooms" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Changing Rooms</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     We have changing rooms!
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lockers */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgLockers} 
                     className="img-fluid w-100 h-100" 
                     alt="Lockers" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Lockers</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Keep your belongings safe in our lockers.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dining */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgDining} 
                     className="img-fluid w-100 h-100" 
                     alt="Dining" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Dining</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     We have a wide variety of eats and treats at Runaway Rapids Waterpark!
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgPricing} 
                     className="img-fluid w-100 h-100" 
                     alt="Pricing" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Pricing</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Check out our pricing page.
                   </p>
                </div>
              </div>
            </div>
          </div>
         </div>
       </div>

    
     </>
   );
 }

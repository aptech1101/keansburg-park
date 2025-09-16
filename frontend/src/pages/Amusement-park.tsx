import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import imgBanner from "../assets/img/page-banner.png";
import imgRides from "../assets/img/amusement-rides.jpeg";
import imgGoKarts from "../assets/img/amusement-go-karts.jpeg";
import imgGames from "../assets/img/amusement-keansburg-games.jpeg";
import imgBeach from "../assets/img/amusement-beach.jpg";
import imgBatting from "../assets/img/amusement-batting-cages.jpg";
import imgArcades from "../assets/img/amusement-arcades.jpg";
import imgFishing from "../assets/img/amusement-fishing-pier.jpg";

export default function AmusementPark() {
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
               <h1 className="display-4 fw-bold mb-3 text-white">Amusement Park</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/zones" className="text-white text-decoration-none">Zones</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">Amusement Park</li>
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
            <h4 className="text-primary mb-3" style={{ fontSize: '16px', letterSpacing: '1px' }}>Amusement Park</h4>
            <h1 className="display-5 fw-bold mb-4">Thrills & Fun at Keansburg Amusement Park</h1>
             <p className="fs-5 fst-italic mb-4" style={{ color: '#021016' }}>
               From classic rides to heart racing thrills - excitement for all ages.
             </p>
             <p className="fs-5 mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
               Since 1904, our family mission remains rooted in delivering a magical blend of tradition,
               excitement, and safety, making Keansburg Amusement Park & Runaway Rapids Waterpark
               the heartbeat of family enjoyment for over a century. With its classic seaside charm and an
               array of attractions, Keansburg Amusement Park continues to capture the hearts of guests
               from near and far. Visitors can relive the magic of traditional boardwalk amusements while
               enjoying modern rides and entertainment. Welcome!
             </p>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="row g-5">
          {/* Rides */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgRides} 
                     className="img-fluid w-100 h-100" 
                     alt="Rides" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Rides</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Experience gravity-defying rides and pulse-pounding coasters that will leave you breathless. 
                     From gentle family rides to extreme thrill machines, we have something for every adventure level.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Go Karts */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgGoKarts} 
                     className="img-fluid w-100 h-100" 
                     alt="Go Karts" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Go Karts</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Speed, Thrills, and Laughs at Fast Trax Go Karts. Race against friends and family on our 
                     professional-grade go-kart track. Feel the adrenaline rush as you navigate sharp turns and straightaways.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Keansburg Games */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgGames} 
                     className="img-fluid w-100 h-100" 
                     alt="Keansburg Games" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Keansburg Games</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Test your skills at our exhilarating games and win amazing prizes! From classic carnival games 
                     to modern arcade challenges, every game promises fun and the chance to win lifelong memories.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beach */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgBeach} 
                     className="img-fluid w-100 h-100" 
                     alt="Beach" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Beach</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Relax and unwind on our beautiful sandy beaches. Experience the classic seaside charm 
                     with stunning ocean views, perfect for families looking to combine thrills with tranquility.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Batting Cages */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgBatting} 
                     className="img-fluid w-100 h-100" 
                     alt="Batting Cages" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Batting Cages</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Step up to the plate and swing for the fences! Our batting cages offer the perfect opportunity 
                     to practice your swing and pursue your home run dreams in a fun, safe environment.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Arcades */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6 order-md-2">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgArcades} 
                     className="img-fluid w-100 h-100" 
                     alt="Arcades" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6 order-md-1">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Arcades</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Dive into endless fun at Bev & WaLLy's Family Fun Center & The Game Room. From classic 
                     arcade games to the latest interactive experiences, there's entertainment for every age and interest.
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fishing Pier */}
          <div className="col-12">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                 <div className="position-relative overflow-hidden" style={{ height: '350px', borderRadius: '8px' }}>
                   <img 
                     src={imgFishing} 
                     className="img-fluid w-100 h-100" 
                     alt="Fishing Pier" 
                     style={{ objectFit: 'cover' }}
                   />
                 </div>
               </div>
               <div className="col-md-6">
                 <div className="h-100 d-flex flex-column justify-content-center text-center">
                   <h3 className="fw-bold mb-3" style={{ color: '#3CBEEE' }}>Fishing Pier</h3>
                   <p className="mb-0" style={{ color: '#021016', lineHeight: '1.6' }}>
                     Enjoy the day fishing on our 2000 foot pier overlooking the Raritan Bay. Whether you're 
                     a seasoned angler or trying fishing for the first time, our pier offers the perfect setting for a relaxing day by the water.
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

import React from 'react';
import img1 from '../assets/img/Keansburg-APWP-New-Grid-600x420.png';
import img2 from '../assets/img/grilled-burgers-recipe-how-to-grill-burgers-1-of-9-650x650-1-600x420.jpg';
import img3 from '../assets/img/1A0C78F4-2588-47D7-B2F3-AF60EFD6A470-600x420.jpg';
import img4 from '../assets/img/IMG_4365-600x420.jpg';
import img5 from '../assets/img/DSC05145-600x420.jpg';
import img6 from '../assets/img/IMG_4379-600x420.jpg';
import img7 from '../assets/img/image0-2-600x420.jpeg';
import img8 from '../assets/img/10E198FC-10B3-4837-A65E-191D4575D8AC-600x420.jpeg';
import img9 from '../assets/img/IMG_4354-600x420.jpg';
import img10 from '../assets/img/DSC04927.jpg_compressed-600x420.jpeg';
import img11 from '../assets/img/unspecified-1-600x420.jpg';
import img12 from '../assets/img/shaved-ice-600x420.jpg';
import img13 from '../assets/img/IMG_4388-600x420.jpg';
import img14 from '../assets/img/IMG_4363-600x420.jpg';
import img15 from '../assets/img/DSC05097.jpg_compressed-600x420.jpeg';
import img16 from '../assets/img/kap-funnel-cake-600x420.jpg';
import img17 from '../assets/img/IMG_4351-600x420.jpg';
import img18 from '../assets/img/icecreamwafflecone-600x420.jpg';

const venues = [
  {
    title: 'Fish & Sips',
    desc: 'Fried Seafood + Raw Bar by Keyport Fishery.',
    img: img1,
  },
  {
    title: 'Toucan Grille',
    desc:
      'Indulge in mouthwatering delights at Toucan Grille, nestled within the vibrant atmosphere of Runaway Rapids Family Waterpark. Our menu boasts an array of delectable options, from our signature charcoaled hamburgers and cheeseburgers to California burgers bursting with flavor. Sink your teeth into our quarter-pound hotdogs or savor the crispy goodness of our Mozzarella sticks and […]',
    img: img2,
  },
  {
    title: 'Pavilion Bar & Grille',
    desc: 'Cool down at the Pavilion Bar with a rum bucket or one of their signature frozen drinks.',
    img: img3,
  },
  {
    title: 'Flavor Burst',
    desc: 'Flavor Burst offers a variety of premium flavors from which to choose. The intrigue will capture your attention and the flavor that will bring you back for more.',
    img: img4,
  },
  {
    title: 'Cotton Candy',
    desc: 'Serving Cotton Candy, Fresh Lemonade, Churros, Pretzels and Refreshments!',
    img: img5,
  },
  {
    title: "Amanda's Italian Zeppole",
    desc: 'The absolute best zeppole on the Jersey Shore! Freshly made daily.',
    img: img6,
  },
  {
    title: "Mambo Nando's",
    desc:
      'Welcome to Mambo Nando\'s! We are a family-run boardwalk eatery bringing La Isla del Encanto to the Jersey shore. We serve authentic Puerto Rican cuisine and American favorites meant to be enjoyed as nature intended: by the beach with a refreshing sea breeze. Our traditional dishes are made fresh, based on family recipes passed down […]',
    img: img7,
  },
  {
    title: 'Frozen Flavors',
    desc:
      'Frozen Flavors Homemade Ice Cream & Italian Ice is a family operated business that serves premium handmade small-batch ice cream and Italian ice. Our menu features all the classics and more. We believe in serving our customers the best ingredients along with providing great service. We proudly serve our delicious desserts and frozen treats at […]',
    img: img8,
  },
  {
    title: "Glenda's Great Fries",
    desc: 'Classic boardwalk hand cut fries served with vinegar. A Keansburg Amusement Park boardwalk tradition!',
    img: img9,
  },
  {
    title: "Georgia's Lemonade",
    desc: "Fresh squeezed lemonade to quench everyone's thirst!",
    img: img10,
  },
  {
    title: 'Heidelberg',
    desc:
      'Established in 1934, enjoy one of Keansburg Amusement Park\'s oldest eateries! Famed hot dogs are again available along with German beer!',
    img: img11,
  },
  {
    title: 'Snowie Hawaiian Shaved Ice',
    desc: 'A cool treat on a hot summer day, Snowie shaved ice comes in fun flavors to go!',
    img: img12,
  },
  {
    title: 'Nickersons',
    desc:
      'Since 1946, Nickersons has been the go-to spot for all your favorite boardwalk classics, and we\'re proud to carry on that tradition! Under new ownership since 2019, we\'re keeping the legacy alive with our classic sausage sandwich recipe, complete with fresh-cut and sautéed onions and peppers. But wait, there\'s more! Indulge in the best cheese […]',
    img: img13,
  },
  {
    title: 'Coastal Ice Cream',
    desc: 'Enjoy a boardwalk favorite! Traditional Soft Served Ice Cream! Top off your treat with one of our several delicious toppings or order a Sundae, Thick-Shake, Slushie or Frozen Yogurt!',
    img: img14,
  },
  {
    title: "Dippin' Dots",
    desc: 'One of the best ways to enjoy Dippin\' Dots is at Runaway Rapids Family Waterpark while having fun with family and friends! Choose from a variety of your favorite flavors!',
    img: img15,
  },
  {
    title: "CJ's Spot",
    desc: 'At CJ\'s, it\'s all about our family serving the sweetest treats using our family recipes for generations. Enjoy the delight of our signature funnel cakes and Oreos, made to order, ensuring each bite is as fresh & delicious. We serve funnel cakes, churros, pretzels hot dogs fries, onion rings, chicken fingers & more!',
    img: img16,
  },
  {
    title: "Cheesy's Pizza",
    desc: 'Craving some traditional boardwalk pizza? Cheesy\'s is the place for you! Toppings include pepperoni, sausage, peppers, onions, and more! Traditional, Sicilian, or garlic knots! Yum!',
    img: img17,
  },
  {
    title: "Nickerson's Ice Cream",
    desc: 'Nickerson\'s Ice cream has been serving freshly made hard ice cream since 1946 . Choose a cone, sundae,milkshake, or our crowd favorite; a famous waffle and ice cream sandwich! The combinations are endless with toppings like hot fudge, caramel, sprinkles, and more!',
    img: img18,
  },
];

const Restaurants: React.FC = () => {
  return (
    <div className="container-fluid">
      {/* Hero */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="display-4 fw-bold mb-2">Restaurants</h1>
              <p className="lead mb-0">Find your favorite boardwalk eats</p>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-5" style={{ backgroundColor: '#f8fbff' }}>
        <div className="container">
          {venues.map((v, idx) => (
            <div key={v.title} className="row align-items-center g-4 py-4 border-bottom">
              <div className={`col-md-6 ${idx % 2 === 1 ? 'order-md-2' : ''}`}>
                <img src={v.img} alt={v.title} className="img-fluid rounded shadow-sm hover-lift" />
              </div>
              <div className={`col-md-6 ${idx % 2 === 1 ? 'order-md-1' : ''}`}>
                <h5 className="text-primary fw-bold mb-2">{v.title}</h5>
                <p className="mb-0 text-muted">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Restaurants;

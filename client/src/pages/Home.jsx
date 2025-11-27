
import React from "react";
import { allProducts } from "../data/products";
import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const Home = () => {
  const weekendDealsLogoStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover'
  };

  const categories = [
    "Phones",
    "Laptops",
    "Smartwatches",
    "Chargers",
    "Desktops",
    "5G Routers",
    "Printers"
  ];

  return (
    <div>
      <Hero />
      <AdBanner />

      <div className="container my-5">
        <div className="row text-center bg-light p-5 rounded-lg">
          <h2>Got an Old Phone?</h2>
          <p className="lead">Trade it in for a new one or get a store credit. We make it easy to upgrade.</p>
          <p>
            <Link to="/refurbish" className="btn btn-warning">Learn More</Link>
          </p>
        </div>
      </div>

      <div className="container-fluid my-5">
        {categories.map(category => (
          <ProductCarousel key={category} products={allProducts} category={category} />
        ))}
      </div>

      <div id="about-us-section" className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="mb-4">About Us</h2>
            <p className="lead">
              AA GOMBI GLOBAL GADGETS is a trusted name in the mobile and electronics industry. We are dedicated to providing our customers with the latest in mobile technology, including brand-new smartphones and high-quality, certified refurbished devices. Our commitment to quality, affordability, and customer satisfaction has made us a leader in the market.
            </p>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="text-center mb-4">
          <img src="/weekenddeals.png" alt="Weekend Deals" className="img-fluid" style={weekendDealsLogoStyle} />
          <p className="lead mt-3">Discover incredible prices on fairly used and budget-friendly refurbished phones. Our Weekend Deals are so good, they're gone in a flash! These offers are available exclusively on our WhatsApp channel.</p>
          <a href="https://whatsapp.com/channel/0029VbAlwXxLY6d8DGv81H3R" className="btn btn-success btn-lg" target="_blank" rel="noopener noreferrer">View Deals on WhatsApp</a>
        </div>
      </div>

    </div>
  );
};

export default Home;

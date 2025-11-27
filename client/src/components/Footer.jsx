
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    // Use the new a-gombi-footer class for the main footer container
    <footer className="a-gombi-footer pt-5">
      <div className="container text-center">
        <div className="row text-center">

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <img src="/logo.png" alt="AA Gombi Global Gadgets" className="img-fluid mb-3" style={{ maxWidth: '70px' }} />
            {/* Add footer-title class to the main heading */}
            <h5 className="text-uppercase mb-4 fw-bold footer-title">AA Gombi Global Gadgets</h5>
            <p>
              Your trusted source for the latest in mobile technology and high-quality refurbished devices. We are committed to quality and customer satisfaction.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            {/* Add footer-title class to the section headings */}
            <h5 className="text-uppercase mb-4 fw-bold footer-title">Quick Links</h5>
            {/* Use the new quick-link class for the links */}
            <p><Link to="/" className="quick-link">Home</Link></p>
            <p><Link to="/refurbish" className="quick-link">Refurbish</Link></p>
            <p><Link to="/about" className="quick-link">About Us</Link></p>
            <p><Link to="/contact" className="quick-link">Get in Touch</Link></p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            {/* Add footer-title class to the section headings */}
            <h5 className="text-uppercase mb-4 fw-bold footer-title">Follow Us</h5>
            <div className="d-flex justify-content-center fs-4">
              {/* Use the new social-icon class */}
              <a href="#" className="social-icon me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon me-3"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-icon me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-tiktok"></i></a>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            {/* Add footer-title class to the section headings */}
            <h5 className="text-uppercase mb-4 fw-bold footer-title">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest deals and updates.</p>
            <form className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your Email" aria-label="Your Email" />
              {/* This button already has the gold background */}
              <button className="btn btn-warning" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* This is the new, full-width copyright bar */}
      <div className="copyright-bar mt-4">
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <p className='mb-0'>&copy; {new Date().getFullYear()} AA GOMBI GLOBAL GADGETS. All Rights Reserved.</p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="bg-purple text-gold pt-5 pb-4">
      <div className="container text-center">
        <div className="row text-center">

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <img src="/logo.png" alt="AA Gombi Global Gadgets" className="img-fluid mb-3" style={{ maxWidth: '70px' }} />
            <h5 className="text-uppercase mb-4 fw-bold">AA Gombi Global Gadgets</h5>
            <p>
              Your trusted source for the latest in mobile technology and high-quality refurbished devices. We are committed to quality and customer satisfaction.
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Quick Links</h5>
            <p><Link to="/" className="text-gold text-decoration-none">Home</Link></p>
            <p><Link to="/refurbish" className="text-gold text-decoration-none">Refurbish</Link></p>
            <p><Link to="/about" className="text-gold text-decoration-none">About Us</Link></p>
            <p><Link to="/contact" className="text-gold text-decoration-none">Get in Touch</Link></p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center fs-4">
              <a href="#" className="text-gold me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-gold me-3"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-gold me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-gold"><i className="bi bi-tiktok"></i></a>
            </div>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold">Newsletter</h5>
            <p>Subscribe to our newsletter for the latest deals and updates.</p>
            <form className="input-group mb-3">
              <input type="email" className="form-control" placeholder="Your Email" aria-label="Your Email" />
              <button className="btn btn-warning" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <hr className='my-3' />

        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <p className='mb-0'>&copy; {new Date().getFullYear()} AA GOMBI GLOBAL GADGETS. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

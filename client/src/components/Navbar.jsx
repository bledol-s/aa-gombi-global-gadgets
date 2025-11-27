
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ContactDropdown from "./ContactDropdown";

const Navbar = () => {
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-purple py-3 fixed-top">
      <div className="container">
        <Link className="navbar-brand text-gold d-flex align-items-center" to="/">
          <img src="/logo.png" alt="AA GOMBI GLOBAL GADGETS Logo" width="50" height="50" className="me-2" />
          <span className="fs-5">AA GOMBI GLOBAL GADGETS</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link text-gold" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-gold" to="/refurbish">Refurbish</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-gold" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-gold" to="/signup">Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-gold" to="/cart">
                <i className="fas fa-shopping-cart me-1"></i>
                Cart
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button className="btn btn-warning" onClick={toggleContactForm}>Get in touch</button>
              {showContactForm && <ContactDropdown />}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

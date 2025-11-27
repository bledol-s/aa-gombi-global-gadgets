
import React from "react";

const Checkout = () => {
  return (
    <div className="checkout-container">
      <h1 className="section-title">Checkout</h1>
      <form className="checkout-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Enter your address" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Delivery Location</label>
          <input type="text" id="location" placeholder="Enter your delivery location" />
        </div>
        <button type="submit" className="btn btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;

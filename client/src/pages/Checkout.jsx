
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    location: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Helper function to parse the price string (e.g., "999,000") into a number
  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/,/g, ''));
    }
    return price; // Return as is if it's already a number
  };

  const total = cart.reduce((acc, item) => {
    const price = parsePrice(item.price);
    return acc + price * item.quantity;
  }, 0);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    // In a real app, you would process the payment here
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="container my-5 text-center">
        <div className="card shadow-sm p-4">
          <h2 className="text-success">Thank you for your order!</h2>
          <p className="lead">Your order has been placed successfully.</p>
          <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>
      {step === 1 && (
        <div className="row justify-content-center">
          <div className="col-md-7 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title">Delivery Information</h4>
                <form onSubmit={handleNextStep}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">Delivery Location</label>
                    <input type="text" className="form-control" id="location" value={formData.location} onChange={handleInputChange} required />
                  </div>
                  <button type="submit" className="btn btn-warning w-100 btn-lg">Proceed to Payment</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-title">Order Summary</h4>
                <ul className="list-group list-group-flush">
                  {cart.map(item => {
                    const price = parsePrice(item.price);
                    const itemTotal = price * item.quantity;
                    return (
                      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          {item.name}
                          <br />
                          <small className="text-muted">x{item.quantity}</small>
                        </div>
                        <span>₦{itemTotal.toLocaleString()}</span>
                      </li>
                    );
                  })}
                  <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                    <h5>Total</h5>
                    <h5 className="text-warning">₦{total.toLocaleString()}</h5>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center shadow-sm">
                <div className="card-body">
                    <h4 className="card-title">Confirm Order</h4>
                    <p>This is a mock payment screen. Press "Place Order" to finalize your purchase.</p>
                    <p className="fw-bold fs-4">Total: <span className="text-warning">₦{total.toLocaleString()}</span></p>
                    <button onClick={handlePlaceOrder} className="btn btn-success btn-lg">Place Order</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

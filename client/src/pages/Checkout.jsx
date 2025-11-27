
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

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Checkout</h1>
      {step === 1 && (
        <div className="row">
          <div className="col-md-8">
            <h4>Delivery Information</h4>
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
              <button type="submit" className="btn btn-warning">Proceed to Payment</button>
            </form>
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            {cart.map(item => (
              <div key={item.id} className="d-flex justify-content-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>₦{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5>₦{total.toFixed(2)}</h5>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="text-center">
          <h4>Mock Payment</h4>
          <p>This is a mock payment screen. In a real application, you would integrate a payment gateway.</p>
          <button onClick={handlePlaceOrder} className="btn btn-success">Place Order</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

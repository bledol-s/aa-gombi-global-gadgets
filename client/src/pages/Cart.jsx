
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCarousel from '../components/ProductCarousel';
import { allProducts as products } from '../data/products.js';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

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

  const recommendedProducts = products.filter(p => !cart.some(item => item.id === p.id)).slice(0, 6);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is currently empty.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <img src={item.image} className="img-fluid rounded-start p-2" alt={item.name} style={{ maxHeight: '150px' }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">Price: ₦{item.price}</p>
                    <div className="d-flex align-items-center mt-3">
                      <label htmlFor={`quantity-${item.id}`} className="me-2">Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        className="form-control" 
                        value={item.quantity}
                        min="1"
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-outline-danger ms-3">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end align-items-center mt-4">
            <h4 className="me-3">Total: <span className="text-warning">₦{total.toLocaleString()}</span></h4>
            <Link to="/checkout" className="btn btn-warning btn-lg">Proceed to Checkout</Link>
          </div>
        </div>
      )}
      <div className="mt-5 pt-4 border-top">
        <h3>You might also like...</h3>
        {/* The ProductCarousel now receives the filtered list directly */}
        <ProductCarousel products={recommendedProducts} category="Recommended for You" />
      </div>
    </div>
  );
};

export default Cart;

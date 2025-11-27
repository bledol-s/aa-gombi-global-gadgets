
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ProductCarousel from '../components/ProductCarousel';
import products from '../products';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const recommendedProducts = products.filter(p => !cart.some(item => item.id === p.id)).slice(0, 4);

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
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-2">
                  <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: ₦{item.price}</p>
                    <div className="d-flex align-items-center">
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
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-danger ms-3">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-end align-items-center mt-4">
            <h4>Total: ₦{total.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-warning ms-3">Proceed to Checkout</Link>
          </div>
        </div>
      )}
      <div className="mt-5">
        <h3>Would you like to add more products?</h3>
        <ProductCarousel products={recommendedProducts} category="Recommended for You" />
      </div>
    </div>
  );
};

export default Cart;

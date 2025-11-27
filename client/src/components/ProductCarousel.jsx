
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { CartContext } from '../context/CartContext';

const ProductCarousel = ({ products, category }) => {
  const { cart, addToCart } = useContext(CartContext);

  // If the category is a special case like "Recommended for You", use the products prop directly.
  // Otherwise, filter by the category name.
  const productsToShow = category === "Recommended for You" 
    ? products 
    : products.filter(p => p.category === category);

  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // If there are no products to show, don't render the component
  if (!productsToShow || productsToShow.length === 0) {
    return null;
  }

  return (
    <div className="my-5">
      <h2 className="mb-4">{category}</h2>
      <div className="product-carousel-container">
        <div className="product-row">
          {productsToShow.map((product, index) => (
            <Fade key={product.id} direction="up" delay={index * 100} triggerOnce>
              <div className="product-card-portrait">
                <div className="card h-100 shadow-sm a-gombi-card-border">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-warning">₦{product.price}</p>
                    <button 
                      onClick={() => addToCart(product)} 
                      className={`btn mt-auto ${isProductInCart(product.id) ? 'btn-purple' : 'btn-warning'}`}>
                      {isProductInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
      {cart.length > 0 && (
        <Link to="/cart" className="btn btn-primary floating-cart-button">
          Proceed to Cart
        </Link>
      )}
    </div>
  );
};

export default ProductCarousel;

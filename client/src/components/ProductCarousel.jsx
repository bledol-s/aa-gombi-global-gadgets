
import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import './ProductCarousel.css';

const ProductCarousel = ({ products, category }) => {
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <div className="my-5">
      <h2 className="mb-4">{category}</h2>
      <div className="product-carousel-container">
        <div className="product-row">
          {categoryProducts.map((product, index) => (
            <Fade key={product.id} direction="up" delay={index * 100} triggerOnce>
              <div className="product-card-portrait">
                <div className="card h-100">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-warning">₦{product.price}</p>
                    <Link to={`/products/${product.id}`} className="btn btn-warning mt-auto">Buy Now</Link>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;

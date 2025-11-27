
import React from "react";
import { useParams, Link } from "react-router-dom";
import { allProducts } from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container text-center my-5"><h2>Product not found</h2></div>;
  }

  const otherProducts = allProducts.filter(p => p.id !== parseInt(id)).slice(0, 3);

  const cardImageStyle = {
    height: '200px',
    objectFit: 'contain'
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card product-details-card">
            <div className="row g-0">
              <div className="col-md-6">
                <img src={product.image} className="card-img-top" alt={product.name} style={{...cardImageStyle, height: 'auto'}} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h1 className="card-title h2">{product.name}</h1>
                  <p className="card-text h4 text-warning">${product.price}</p>
                  
                  <div className="mt-4">
                    <h5>Colors:</h5>
                    <div className="d-flex flex-wrap">
                      {product.colors.map(color => (
                        <button key={color} className="btn btn-outline-secondary me-2 mb-2">{color}</button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button className="btn btn-warning btn-lg">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Description</h3>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Specifications</h3>
              <ul className="list-group list-group-flush">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="list-group-item d-flex justify-content-between">
                    <strong>{key}:</strong> 
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
          <h3 className="mb-4 text-center">You might also like</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {otherProducts.map(otherProduct => (
              <div className="col" key={otherProduct.id}>
              <div className="card h-100">
                <img src={otherProduct.image} className="card-img-top" alt={otherProduct.name} style={cardImageStyle} />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between">
                    <div style={{ width: '70%' }}>
                      <h5 className="card-title">{otherProduct.name}</h5>
                      <p className="card-text mb-0">${otherProduct.price}</p>
                    </div>
                    <div style={{ width: '30%' }} className="d-flex align-items-center justify-content-end">
                      <Link to={`/products/${otherProduct.id}`} className="btn btn-warning">Buy Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

    </div>
  );
};

export default ProductDetails;

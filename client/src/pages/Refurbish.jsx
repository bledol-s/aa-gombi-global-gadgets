
import React, { useState } from 'react';

const Refurbish = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Refurbish Your Gadget</h2>
      {submitted ? (
        <div className="alert alert-success text-center" role="alert">
          Thank you for your submission! We will get back to you shortly.
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phone" required />
              </div>
              <div className="mb-3">
                <label htmlFor="gadget" className="form-label">Gadget Type</label>
                <input type="text" className="form-control" id="gadget" placeholder="e.g., Smartphone, Laptop" required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Brief Description of the Issue</label>
                <textarea className="form-control" id="description" rows="3" required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="images" className="form-label">Upload Images</label>
                <input type="file" className="form-control" id="images" multiple />
              </div>
              <button type="submit" className="btn btn-warning">Submit for Evaluation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refurbish;

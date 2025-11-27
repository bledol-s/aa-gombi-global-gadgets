
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext.jsx'; // Import useAuth

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      login(userCredential.user); // Set user in AuthContext
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError(<>Account already exists. Would you like to <Link to="/login">login</Link>?</>);
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      login(userCredential.user); // Set user in AuthContext
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePhoneSignUp = async () => {
    setError('');
    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setConfirmationResult(confirmation);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOtpVerification = async () => {
    setError('');
    try {
      const userCredential = await confirmationResult.confirm(otp);
      login(userCredential.user); // Set user in AuthContext
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <p className="text-danger">{error}</p>}
              <form onSubmit={handleEmailSignUp}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100"><i className="bi bi-envelope-fill me-2"></i>Sign Up with Email</button>
              </form>
              <hr />
              <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn btn-danger w-100 mb-3"><i className="bi bi-google me-2"></i>Sign In with Google</button>
                <div id="recaptcha-container"></div>
                {confirmationResult ? (
                  <div className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="otp" className="form-label">Enter OTP</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="otp" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                      />
                    </div>
                    <button onClick={handleOtpVerification} className="btn btn-success w-100"><i className="bi bi-patch-check-fill me-2"></i>Verify OTP</button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                      />
                    </div>
                    <button onClick={handlePhoneSignUp} className="btn btn-info w-100"><i className="bi bi-telephone-fill me-2"></i>Sign Up with Phone</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

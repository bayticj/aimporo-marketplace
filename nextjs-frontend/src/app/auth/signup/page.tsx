'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './signup.css';
import { useAuth } from '@/context/AuthContext';

const SignUp = () => {
  const [isFocused, setIsFocused] = useState([false, false, false, false, false]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("buyer");
  const [isPassword, setIsPassword] = useState([false, false]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const { register, loading, error, clearError } = useAuth();

  const handleFocus = (index: number) => {
    const newFocusState = [...isFocused];
    newFocusState[index] = true;
    setIsFocused(newFocusState);
  };

  const handleBlur = (index: number) => {
    const newFocusState = [...isFocused];
    newFocusState[index] = false;
    setIsFocused(newFocusState);
  };

  const handleNameChange = (event: { target: { value: string } }) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: string } }) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: { target: { value: string } }) => {
    setConfirmPassword(event.target.value);
  };
  
  const handleAccountTypeChange = (event: { target: { value: string } }) => {
    setAccountType(event.target.value);
  };

  const togglePassword = (index: number) => {
    const newPasswordState = [...isPassword];
    newPasswordState[index] = !newPasswordState[index];
    setIsPassword(newPasswordState);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      setFormError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    // Register user
    await register(name, email, password, confirmPassword, accountType);
  };

  const loginslideroption = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    draggable: true,
    touchMove: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 700,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 550,
        settings: { slidesToShow: 1 }
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="row gx-0">
      {/* Banner Content */}
      <div className="col-lg-6">
        <div className="authentication-wrapper">
          <div className="authentication-content">
            <div className="login-carousel">
              <Slider {...loginslideroption}>
                <div className="login-slider">
                  <Image
                    src="/assets/img/login-card-01.svg"
                    className="img-fluid"
                    alt="img"
                    width={400}
                    height={300}
                  />
                  <h2>Looking to Buy a service?</h2>
                  <p>Browse Listing & More 900 Services</p>
                </div>
                <div className="login-slider">
                  <Image
                    src="/assets/img/login-card-02.svg"
                    className="img-fluid"
                    alt="img"
                    width={400}
                    height={300}
                  />
                  <h2>Looking to Sell a service?</h2>
                  <p>Browse Listing & More 900 Services</p>
                </div>
              </Slider>
            </div>
          </div>
          <div className="login-bg">
            <Image
              src="/assets/img/bg/shape-01.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-01"
            />
            <Image
              src="/assets/img/bg/shape-02.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-02"
            />
            <Image
              src="/assets/img/bg/shape-03.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-03"
            />
            <Image
              src="/assets/img/bg/shape-04.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-04"
            />
            <Image
              src="/assets/img/bg/shape-05.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-05"
            />
            <Image
              src="/assets/img/bg/shape-06.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-06"
            />
            <Image
              src="/assets/img/bg/shape-07.png"
              alt="shape"
              width={100}
              height={100}
              className="shape-07"
            />
          </div>
        </div>
      </div>

      {/* Register Content */}
      <div className="col-lg-6">
        <div className="login-wrapper">
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <div className="login-userset">
                <div className="login-logo">
                  <Link href="/">
                    <Image
                      src="/assets/img/aimporo-logo.png" 
                      alt="Aimporo Logo" 
                      width={150} 
                      height={40}
                      style={{ 
                        maxHeight: '40px', 
                        width: 'auto', 
                        objectFit: 'contain',
                        display: 'block'
                      }}
                    />
                  </Link>
                </div>
                <div className="login-card">
                  <div className="login-heading">
                    <h3>Create Account!</h3>
                    <p>Fill the fields to create your account</p>
                  </div>
                  
                  {(error || formError) && (
                    <div className="alert alert-danger" style={{
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <p style={{ margin: 0 }}>{formError || error}</p>
                      <button 
                        onClick={() => {
                          clearError();
                          setFormError(null);
                        }} 
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#721c24"
                        }}
                        type="button"
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <div className={`form-control ${isFocused[0] ? 'focused' : ''}`}>
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        onFocus={() => handleFocus(0)}
                        onBlur={() => handleBlur(0)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`form-control ${isFocused[1] ? 'focused' : ''}`}>
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => handleFocus(1)}
                        onBlur={() => handleBlur(1)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`form-control ${isFocused[2] ? 'focused' : ''}`}>
                      <label htmlFor="password">Password</label>
                      <input
                        type={isPassword[0] ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => handleFocus(2)}
                        onBlur={() => handleBlur(2)}
                        required
                      />
                      <span className="toggle-password" onClick={() => togglePassword(0)}>
                        {isPassword[0] ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`form-control ${isFocused[3] ? 'focused' : ''}`}>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type={isPassword[1] ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onFocus={() => handleFocus(3)}
                        onBlur={() => handleBlur(3)}
                        required
                      />
                      <span className="toggle-password" onClick={() => togglePassword(1)}>
                        {isPassword[1] ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className={`form-control ${isFocused[4] ? 'focused' : ''}`}>
                      <label htmlFor="accountType">Account Type</label>
                      <select
                        id="accountType"
                        value={accountType}
                        onChange={handleAccountTypeChange}
                        onFocus={() => handleFocus(4)}
                        onBlur={() => handleBlur(4)}
                        required
                      >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="both">Both (Buyer & Seller)</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-wrap">
                    <label className="custom_check mb-0">
                      I agree to the <Link href="/terms-condition">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>
                      <input 
                        type="checkbox" 
                        name="agreeTerms" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="form-wrap mantadory-info d-none">
                    <p>
                      <i className="feather icon-alert-triangle" />
                      Fill all the fields to submit
                    </p>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                  <div className="login-or">
                    <span className="span-or">or sign up with</span>
                  </div>
                  <ul className="login-social-link">
                    <li>
                      <Link href="#">
                        <Image
                          src="/assets/img/icons/google-icon.svg"
                          alt="Google"
                          width={24}
                          height={24}
                        />{" "}
                        Google
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <Image
                          src="/assets/img/icons/fb.svg"
                          alt="Facebook"
                          width={24}
                          height={24}
                        />{" "}
                        Facebook
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="acc-in">
                  <p>
                    Already have an account?{" "}
                    <Link href="/auth/signin">Sign In</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 
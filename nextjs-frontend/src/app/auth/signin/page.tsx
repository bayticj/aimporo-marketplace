'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import './signin.css';
import Slider from 'react-slick';

export default function SignInPage() {
  const [isFocused, setIsFocused] = useState([false, false]);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [isPassword, setIsPassword] = useState([false, false]);
  const { login, loading, error, clearError } = useAuth();

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

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue1(event.target.value);
  };
  
  const handleChange1 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue2(event.target.value);
  };

  const togglePassword = (index: number) => {
    const newPasswordState = [...isPassword];
    newPasswordState[index] = !newPasswordState[index];
    setIsPassword(newPasswordState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(inputValue2, inputValue1);
  };

  const loginslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    draggable: true,
    touchMove: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Sign In */}
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
                      width={400}
                      height={300}
                      className="img-fluid"
                      alt="img"
                    />
                    <h2>Looking to Buy a service?</h2>
                    <p>Browse Listing &amp; More 900 Services </p>
                  </div>
                  <div className="login-slider">
                    <Image
                      src="/assets/img/login-card-02.svg"
                      width={400}
                      height={300}
                      className="img-fluid"
                      alt="img"
                    />
                    <h2>Looking to Sell a service?</h2>
                    <p>Browse Listing &amp; More 900 Services </p>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="login-bg">
              <Image
                src="/assets/img/bg/shape-01.png"
                alt="img"
                width={100}
                height={100}
                className="shape-01"
              />
              <Image
                src="/assets/img/bg/shape-02.png"
                alt="img"
                width={100}
                height={100}
                className="shape-02"
              />
              <Image
                src="/assets/img/bg/shape-03.png"
                alt="img"
                width={100}
                height={100}
                className="shape-03"
              />
              <Image
                src="/assets/img/bg/shape-04.png"
                alt="img"
                width={100}
                height={100}
                className="shape-04"
              />
              <Image
                src="/assets/img/bg/shape-05.png"
                alt="img"
                width={100}
                height={100}
                className="shape-05"
              />
              <Image
                src="/assets/img/bg/shape-06.png"
                alt="img"
                width={100}
                height={100}
                className="shape-06"
              />
              <Image
                src="/assets/img/bg/shape-07.png"
                alt="img"
                width={100}
                height={100}
                className="shape-07"
              />
            </div>
          </div>
        </div>
        {/* /Banner Content */}
        {/* login Content */}
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
                      <h3>Hi, Welcome Back!</h3>
                      <p>Fill the fields to get into your account</p>
                    </div>
                    
                    {error && (
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
                        <p style={{ margin: 0 }}>{error}</p>
                        <button 
                          onClick={clearError} 
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                            color: "#721c24"
                          }}
                        >
                          <span>&times;</span>
                        </button>
                      </div>
                    )}
                    
                    <div className={`form-wrap form-focus ${
                        isFocused[0] || inputValue2.length > 0
                          ? "focused"
                          : ""
                      }`}>
                      <input
                        type="email"
                        className="pass-input form-control floating"
                        onFocus={() => handleFocus(0)}
                        onBlur={() => handleBlur(0)}
                        onChange={handleChange1}
                        value={inputValue2}
                      />
                      <label className="focus-label">Email</label>
                      <span
                        className="toggle-password"
                        tabIndex={0}
                        role="img"
                        aria-label="Email icon"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div
                      className={`form-wrap form-focus pass-group ${
                        isFocused[1] || inputValue1.length > 0
                          ? "focused"
                          : ""
                      }`}
                    >
                      <input
                        type={isPassword[1] ? "text" : "password"}
                        className="pass-input form-control floating"
                        onFocus={() => handleFocus(1)}
                        onBlur={() => handleBlur(1)}
                        onChange={handleChange}
                        value={inputValue1}
                      />
                      <label className="focus-label">
                        Password
                      </label>
                      <span
                        className="toggle-password"
                        onClick={() => togglePassword(1)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") togglePassword(1);
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={isPassword[1] ? "Hide password" : "Show password"}
                      >
                        {isPassword[1] ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        )}
                      </span>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-wrap">
                          <label className="custom_check mb-0">
                            Remember Me
                            <input type="checkbox" name="remeber" />
                            <span className="checkmark" />
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-wrap text-md-end">
                          <Link
                            href="/auth/forgot-password"
                            className="forgot-link"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-wrap mantadory-info d-none">
                      <p>
                        <i className="feather icon-alert-triangle" />
                        Fill all the fields to submit
                      </p>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className="login-or">
                      <span className="span-or">or sign in with</span>
                    </div>
                    <ul className="login-social-link">
                      <li>
                        <Link href="#">
                          <Image
                            src="/assets/img/icons/google-icon.svg"
                            alt="Google"
                            width={20}
                            height={20}
                          />{" "}
                          Google
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <Image
                            src="/assets/img/icons/fb.svg"
                            alt="Facebook"
                            width={20}
                            height={20}
                          />{" "}
                          Facebook
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="acc-in">
                    <p>
                      Don't have an account?{" "}
                      <Link href="/auth/signup">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Login Content */}
      </div>
      {/* /Sign In */}
    </div>
  );
} 
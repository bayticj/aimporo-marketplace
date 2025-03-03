'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './signup.css';

const SignUp = () => {
  const [isFocused, setIsFocused] = useState([false, false, false, false]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [isPassword, setIsPassword] = useState([false, false]);

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

  const handleChange = (event: { target: { value: string } }) => {
    setInputValue1(event.target.value);
  };

  const handleChange1 = (event: { target: { value: string } }) => {
    setInputValue2(event.target.value);
  };

  const handleChange3 = (event: { target: { value: string } }) => {
    setInputValue3(event.target.value);
  };

  const handleChange4 = (event: { target: { value: string } }) => {
    setInputValue4(event.target.value);
  };

  const togglePassword = (index: number) => {
    const newPasswordState = [...isPassword];
    newPasswordState[index] = !newPasswordState[index];
    setIsPassword(newPasswordState);
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
              <Slider {...loginslideroption} className="login-bg">
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
          <Image
            src="/assets/img/bg/shape-01.png"
            alt="shape"
            className="shape-01"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-02.png"
            alt="shape"
            className="shape-02"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-03.png"
            alt="shape"
            className="shape-03"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-04.png"
            alt="shape"
            className="shape-04"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-05.png"
            alt="shape"
            className="shape-05 bx-spin"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-06.png"
            alt="shape"
            className="shape-06"
            width={100}
            height={100}
          />
          <Image
            src="/assets/img/bg/shape-07.png"
            alt="shape"
            className="shape-07"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Register Content */}
      <div className="col-lg-6">
        <div className="login-wrapper">
          <div className="login-content">
            <form>
              <div className="login-userset">
                <div className="login-logo">
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
                </div>
                <div className="login-card">
                  <div className="login-heading">
                    <h3>Create Account!</h3>
                    <p>Fill the fields to create your account</p>
                  </div>
                  <div className={`form-wrap form-focus ${
                    isFocused[0] || inputValue1.length > 0 ? "focused" : ""
                  }`}>
                    <input
                      type="text"
                      className="form-control floating"
                      onFocus={() => handleFocus(0)}
                      onBlur={() => handleBlur(0)}
                      onChange={handleChange}
                      value={inputValue1}
                    />
                    <label className="focus-label">Full Name</label>
                    <span className="toggle-password">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                  </div>
                  <div className={`form-wrap form-focus ${
                    isFocused[1] || inputValue2.length > 0 ? "focused" : ""
                  }`}>
                    <input
                      type="email"
                      className="form-control floating"
                      onFocus={() => handleFocus(1)}
                      onBlur={() => handleBlur(1)}
                      onChange={handleChange1}
                      value={inputValue2}
                    />
                    <label className="focus-label">Email</label>
                    <span className="toggle-password">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                  </div>
                  <div className={`form-wrap form-focus pass-group ${
                    isFocused[2] || inputValue3.length > 0 ? "focused" : ""
                  }`}>
                    <input
                      type="password"
                      className="pass-input form-control floating"
                      onFocus={() => handleFocus(2)}
                      onBlur={() => handleBlur(2)}
                      onChange={handleChange3}
                      value={inputValue3}
                    />
                    <label className="focus-label">Password</label>
                    <span className="toggle-password">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                  </div>
                  <div className={`form-wrap form-focus pass-group ${
                    isFocused[3] || inputValue4.length > 0 ? "focused" : ""
                  }`}>
                    <input
                      type="password"
                      className="pass-input form-control floating"
                      onFocus={() => handleFocus(3)}
                      onBlur={() => handleBlur(3)}
                      onChange={handleChange4}
                      value={inputValue4}
                    />
                    <label className="focus-label">Confirm Password</label>
                    <span className="toggle-password">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                  </div>
                  <div className="form-wrap">
                    <label className="custom_check mb-0">
                      I agree to the <Link href="/terms-condition">Terms of Service</Link> and <Link href="/privacy-policy">Privacy Policy</Link>
                      <input type="checkbox" name="remeber" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="form-wrap mantadory-info d-none">
                    <p>
                      <i className="feather icon-alert-triangle" />
                      Fill all the fields to submit
                    </p>
                  </div>
                  <Link href="/" className="btn btn-primary w-100">
                    Sign Up
                  </Link>
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
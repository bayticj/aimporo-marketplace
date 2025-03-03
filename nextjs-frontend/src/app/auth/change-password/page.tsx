'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ChangePassword = () => {
  const [isFocused, setIsFocused] = useState([false, false]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
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

      {/* Change Password Content */}
      <div className="col-lg-6">
        <div className="login-wrapper">
          <div className="login-content">
            <form>
              <div className="login-userset">
                <div className="login-logo">
                  <Link href="/">
                    <img 
                      src="/assets/img/aimporo-logo.png" 
                      alt="Aimporo Logo" 
                      className="img-fluid"
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
                  <div className="login-heading text-start">
                    <h3>Change Password</h3>
                    <p>
                      Your new password must be different from previous used one
                    </p>
                  </div>
                  <div className={`form-wrap form-focus pass-group ${
                    isFocused[0] || inputValue1.length > 0 ? "focused" : ""
                  }`}>
                    <span className="form-icon">
                      <i className="feather icon-lock" />
                    </span>
                    <span
                      className="toggle-password"
                      onClick={() => togglePassword(0)}
                    >
                      <i className={`feather ${
                        isPassword[0] ? "icon-eye" : "icon-eye-off"
                      }`} />
                    </span>
                    <input
                      type={isPassword[0] ? "text" : "password"}
                      className="pass-input form-control floating"
                      onFocus={() => handleFocus(0)}
                      onBlur={() => handleBlur(0)}
                      onChange={handleChange}
                      value={inputValue1}
                    />
                    <label className="focus-label">New Password</label>
                  </div>
                  <div className={`form-wrap form-focus pass-group ${
                    isFocused[1] || inputValue2.length > 0 ? "focused" : ""
                  }`}>
                    <span className="form-icon">
                      <i className="feather icon-lock" />
                    </span>
                    <span
                      className="toggle-password"
                      onClick={() => togglePassword(1)}
                    >
                      <i className={`feather ${
                        isPassword[1] ? "icon-eye" : "icon-eye-off"
                      }`} />
                    </span>
                    <input
                      type={isPassword[1] ? "text" : "password"}
                      className="pass-input form-control floating"
                      onFocus={() => handleFocus(1)}
                      onBlur={() => handleBlur(1)}
                      onChange={handleChange1}
                      value={inputValue2}
                    />
                    <label className="focus-label">Confirm Password</label>
                  </div>
                  <div className="form-wrap mantadory-info d-none">
                    <p>
                      <i className="feather icon-alert-triangle" />
                      Enter Same Value
                    </p>
                  </div>
                  <Link href="/auth/signin" className="btn btn-primary w-100">
                    Update Password
                  </Link>
                </div>
                <div className="acc-in">
                  <p>
                    Remember Password?{" "}
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

export default ChangePassword; 
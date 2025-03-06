'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForgotPassword = () => {
  const [isFocused, setIsFocused] = useState([false]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validate email
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/password/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setSuccess('Password reset link has been sent to your email');
      setEmail("");
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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

      {/* Forgot Password Content */}
      <div className="col-lg-6">
        <div className="login-wrapper">
          <div className="login-content">
            <form onSubmit={handleSubmit}>
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
                    <h3>Forgot Password?</h3>
                    <p>Enter your email to receive a password reset link</p>
                  </div>
                  
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}
                  
                  <div className={`form-wrap form-focus ${
                    isFocused[0] || email.length > 0 ? "focused" : ""
                  }`}>
                    <span className="form-icon">
                      <i className="feather icon-mail" />
                    </span>
                    <input
                      type="email"
                      className="form-control floating"
                      onFocus={() => handleFocus(0)}
                      onBlur={() => handleBlur(0)}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <label className="focus-label">Email</label>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
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

export default ForgotPassword; 
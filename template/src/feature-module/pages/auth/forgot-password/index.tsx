import React, { useState } from 'react'
import ImageWithBasePath from '../../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../../router/all_routes';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForgotPassword = () => {
  const [isFocused, setIsFocused] = useState([false, false]);
  const [inputValue1, setInputValue1] = useState("");
  const [isPassword, setIsPassword] = useState([true, true]);

  const handleFocus = (index: number) => {
    const newFocusState = [...isFocused];
    newFocusState[index] = true;
    setIsFocused(newFocusState);
  };
  const loginslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    draggable: true,
    tochMove: true,
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
  const routes = all_routes;
  return (
    <div>
        <>
  {/* Forgot Password */}
  <div className="row gx-0">
    {/* Banner Content */}
    <div className="col-lg-6">
      <div className="authentication-wrapper">
        <div className="authentication-content">
          <div className="login-carousel ">
          <Slider {...loginslideroption} >
            <div className="login-slider">
              <ImageWithBasePath
                src="assets/img/login-card-01.svg"
                className="img-fluid"
                alt="img"
              />
              <h2>Looking to Buy a service?</h2>
              <p>Browse Listing &amp; More 900 Services </p>
            </div>
            <div className="login-slider">
              <ImageWithBasePath
                src="assets/img/login-card-02.svg"
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
          <ImageWithBasePath
            src="assets/img/bg/shape-01.png"
            alt="img"
            className="shape-01"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-02.png"
            alt="img"
            className="shape-02"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-03.png"
            alt="img"
            className="shape-03"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-04.png"
            alt="img"
            className="shape-04"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-05.png"
            alt="img"
            className="shape-05"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-06.png"
            alt="img"
            className="shape-06"
          />
          <ImageWithBasePath
            src="assets/img/bg/shape-07.png"
            alt="img"
            className="shape-07"
          />
        </div>
      </div>
    </div>
    {/* /Banner Content */}
    {/* Forgot Password Content */}
    <div className="col-lg-6">
      <div className="login-wrapper">
        <div className="login-content">
          <form >
            <div className="login-userset">
              <div className="login-logo">
                <ImageWithBasePath src="assets/img/logo.svg" alt="img" />
              </div>
              <div className="login-card">
                <div className="login-heading text-start">
                  <h3>Forgot Password?</h3>
                  <p>Fill the fields to get into your account</p>
                </div>
                <div className={`form-wrap form-focus  ${
                          isFocused[1] || inputValue1.length > 0
                            ? "focused"
                            : ""
                        }`}>
                        <span className="form-icon">
                          <i className="feather icon-mail" />
                        </span>
                        <input type="email" className="form-control" />
                        <label className="focus-label">Email</label>
                      </div>
                <div className="form-wrap mantadory-info d-none">
                  <p>
                    <i className="feather icon-alert-triangle" />
                    Fill all the fields to submit
                  </p>
                </div>
                <Link type="button" className="btn btn-primary" to={routes.changePassword}>
                  Send Email
                </Link>
              </div>
              <div className="acc-in">
                <p>
                  Already have an account? <Link to={routes.signIn}>Sign In</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Forgot Password Content */}
  </div>
  {/* /Forgot Password */}
</>

    </div>
  )
}

export default ForgotPassword
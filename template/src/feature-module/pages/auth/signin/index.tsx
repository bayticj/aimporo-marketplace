import React, { useState } from "react";
import ImageWithBasePath from "../../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../../router/all_routes";
import Slider from "react-slick";
type PasswordField = "password" | "confirmPassword";

const SignIn = () => {
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
  const routes = all_routes;
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
  return (
    <div>
      <>
        {/* Sign In */}
        <div className="row gx-0">
          {/* Banner Content */}
          <div className="col-lg-6">
            <div className="authentication-wrapper">
              <div className="authentication-content">
                <div className="login-carousel">
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
          {/* login Content */}
          <div className="col-lg-6">
            <div className="login-wrapper">
              <div className="login-content">
                <form>
                  <div className="login-userset">
                    <div className="login-logo">
                      <ImageWithBasePath src="assets/img/logo.svg" alt="img" />
                    </div>
                    <div className="login-card">
                      <div className="login-heading">
                        <h3>Hi, Welcome Back!</h3>
                        <p>Fill the fields to get into your account</p>
                      </div>
                      <div className={`form-wrap form-focus  ${
                          isFocused[2] || inputValue2.length > 0
                            ? "focused"
                            : ""
                        }`}>
                        <span className="form-icon">
                          <i className="feather icon-mail" />
                        </span>
                       
                        <input
                          type="email"
                          className="pass-input form-control floating"
                          onFocus={() => handleFocus(2)}
                          onBlur={() => handleBlur(2)}
                          onChange={handleChange1}
                          value={inputValue2}
                        />
                        <label className="focus-label">Email</label>
                      </div>
                      <div
                        className={`form-wrap form-focus pass-group ${
                          isFocused[1] || inputValue1.length > 0
                            ? "focused"
                            : ""
                        }`}
                      >
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(1)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") togglePassword(1);
                          }}
                        >
                          <i
                            className={`toggle-password feather ${
                              isPassword[1] ? "icon-eye" : "icon-eye-off"
                            }`}
                          ></i>
                        </span>
                        <input
                          type={isPassword[1] ? "text" : "password"}
                          className="pass-input form-control floating"
                          onFocus={() => handleFocus(1)}
                          onBlur={() => handleBlur(1)}
                          onChange={handleChange}
                          value={inputValue1}
                        />
                        <label className="focus-label" htmlFor="password">
                          Password
                        </label>
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
                              to={routes.forgotPassword}
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
                      <Link  className="btn btn-primary" to={routes.home}>
                        Sign In
                      </Link>
                      <div className="login-or">
                        <span className="span-or">or sign up with</span>
                      </div>
                      <ul className="login-social-link">
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/google-icon.svg"
                              alt="Facebook"
                            />{" "}
                            Google
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/fb.svg"
                              alt="Google"
                            />{" "}
                            Facebook
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="acc-in">
                      <p>
                        Don’t have an account?{" "}
                        <Link to={routes.signUp}>Sign Up</Link>
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
      </>
    </div>
  );
};

export default SignIn;

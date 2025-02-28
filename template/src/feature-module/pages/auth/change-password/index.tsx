import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../../router/all_routes';
import ImageWithBasePath from '../../../../core/img';
import Slider from 'react-slick';

const ChangePassword = () => {
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
  const [isFocused, setIsFocused] = useState([false, false]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [isPassword, setIsPassword] = useState([true, true]);

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
  const handleChange3 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue3(event.target.value);
  };
  const handleChange4 = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue4(event.target.value);
  };

  const togglePassword = (index: number) => {
    const newPasswordState = [...isPassword];
    newPasswordState[index] = !newPasswordState[index];
    setIsPassword(newPasswordState);
  };
  const routes = all_routes;
  return (
    <div>
        <>
  {/* Change Password */}
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
    {/* Change Password Content */}
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
                  <h3>Change Password</h3>
                  <p>
                    Your new password must be different from previous used one
                  </p>
                </div>
                <div
                        className={`form-wrap form-focus pass-group ${
                          isFocused[3] || inputValue3.length > 0
                            ? "focused"
                            : ""
                        }`}
                      >
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(3)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") togglePassword(3);
                          }}
                        >
                          <i
                            className={`toggle-password feather ${
                              isPassword[3] ? "icon-eye" : "icon-eye-off"
                            }`}
                          ></i>
                        </span>
                        <input
                          type={isPassword[3] ? "text" : "password"}
                          className="pass-input form-control floating"
                          onFocus={() => handleFocus(3)}
                          onBlur={() => handleBlur(3)}
                          onChange={handleChange3}
                          value={inputValue3}
                        />
                        <label className="focus-label" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <div
                        className={`form-wrap form-focus pass-group ${
                          isFocused[4] || inputValue4.length > 0
                            ? "focused"
                            : ""
                        }`}
                      >
                        <span
                          className="form-icon"
                          onClick={() => togglePassword(4)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") togglePassword(4);
                          }}
                        >
                          <i
                            className={`toggle-password feather ${
                              isPassword[4] ? "icon-eye" : "icon-eye-off"
                            }`}
                          ></i>
                        </span>
                        <input
                          type={isPassword[4] ? "text" : "password"}
                          className="pass-input form-control floating"
                          onFocus={() => handleFocus(4)}
                          onBlur={() => handleBlur(4)}
                          onChange={handleChange4}
                          value={inputValue4}
                        />
                        <label className="focus-label" htmlFor="password">
                         Confirm Password
                        </label>
                      </div>
                <div className="form-wrap mantadory-info d-none">
                  <p>
                    <i className="feather icon-alert-triangle" />
                    Enter Same Value
                  </p>
                </div>
                <Link type="button" className="btn btn-primary" to={routes.signIn}>
                  Update Password
                </Link>
              </div>
              <div className="acc-in">
                <p>
                  Remember Password? <Link to={routes.signIn}>Sign In</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* /Change Password Content */}
  </div>
  {/* /Change Password */}
</>

    </div>
  )
}

export default ChangePassword
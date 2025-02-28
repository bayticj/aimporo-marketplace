import React, { useState } from 'react'
import ImageWithBasePath from '../../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../../router/all_routes';

const LockScreen = () => {
  const routes = all_routes;
  const [isFocused, setIsFocused] = useState([false, false]);
  const [inputValue1, setInputValue1] = useState("");
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

  const togglePassword = (index: number) => {
    const newPasswordState = [...isPassword];
    newPasswordState[index] = !newPasswordState[index];
    setIsPassword(newPasswordState);
  };
  return (
    <div>
      <div className="row">
  <div className="col-lg-12 mx-auto">
    <div className="error-wrapper lock-screen">
      {/* Lock Screen */}
      <div className="error-item p-0">
        <div className="coming-soon text-center">
          <div className="header-logo">
            <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="img" />
          </div>
          <div className="login-card">
            <form >
              <div className="login-heading">
                <h3>Welcome Back</h3>
                <div className="lock-user">
                  <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="img" />
                  <p>John Doe</p>
                </div>
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
              <Link type="button" className="btn btn-primary w-100" to={routes.home}>
                Continue
              </Link>
            </form>
          </div>
          <div className="social-footer">
            <ul className="social-icon">
              <li>
                <Link to="#">
                  <i className="feather icon-facebook hi-icon" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="feather icon-linkedin hi-icon" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="feather icon-twitter hi-icon" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <i className="feather icon-instagram hi-icon" />
                </Link>
              </li>
            </ul>
            <p>Copyright 2024 © Aimporo Philippines</p>
          </div>
        </div>
      </div>
      {/* /Lock Screen */}
    </div>
    {/* Background Img */}
    <div className="error-imgs count-imgs">
      <ImageWithBasePath
        src="assets/img/bg/error-01.png"
        alt="img"
        className="error-01 error-bg"
      />
      <ImageWithBasePath
        src="assets/img/bg/error-01.png"
        alt="img"
        className="error-05 error-bg"
      />
      <ImageWithBasePath
        src="assets/img/bg/error-02.png"
        alt="img"
        className="error-02 error-bg"
      />
      <ImageWithBasePath
        src="assets/img/bg/error-04.png"
        alt="img"
        className="error-04 error-bg"
      />
    </div>
    {/* /Background Img */}
  </div>
</div>
  
    </div>
  )
}

export default LockScreen 
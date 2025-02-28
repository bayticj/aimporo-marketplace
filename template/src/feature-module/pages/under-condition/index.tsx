import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'

const UnderCondition = () => {
  return (
    <div>
      <>
  {/* Construction Content */}
  <div className="row">
    <div className="col-lg-12 mx-auto">
      <div className="error-wrapper maintanence-sec">
        {/* Under Construction */}
        <div className="error-item p-0">
          <div className="coming-soon text-center">
            <div className="header-logo">
              <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="img" />
            </div>
            <div className="coming-content">
              <div className="row justify-content-center gx-0">
                <div className="col-lg-5 col-md-6">
                  <h2>Website is Under Construction</h2>
                  <p>Our Website is 98% ready to serve you</p>
                  <div className="progress-wrap">
                    <div className="progress">
                      <div
                        className="progress-bar bg-success-light"
                        role="progressbar"
                        style={{ width: "98%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p>
                      0% <span>100%</span>
                    </p>
                  </div>
                  <div className="getback-content">
                    <p>We will notify you after construction</p>
                    <div className="mail-form">
                      <form action="#">
                        <div className="form-wrap">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                          <button type="submit" className="btn btn-primary">
                            Subscribe
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
        {/* /Under Construction */}
      </div>
      {/* Error Img */}
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
      {/* /Error Img */}
    </div>
  </div>
  {/* /Construction Content */}
</>

    </div>
  )
}

export default UnderCondition
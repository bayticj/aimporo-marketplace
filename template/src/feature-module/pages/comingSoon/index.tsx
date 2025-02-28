import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'

const ComingSoon = () => {
  return (
    <div>
<>
  {/* Content */}
  <div className="row">
    <div className="col-lg-12 mx-auto">
      <div className="error-wrapper">
        {/* Coming Soon */}
        <div className="error-item p-0">
          <div className="coming-soon text-center">
            <div className="header-logo">
              <ImageWithBasePath src="assets/img/logo.svg" className="img-fluid" alt="img" />
            </div>
            {/* Count Downs */}
            <div className="coming-content">
              <h2>COMING SOON</h2>
              <div className="days-count">
                <ul>
                  <li>
                    <h3 className="days">52</h3>
                    <p>DAYS</p>
                  </li>
                  <li>
                    <h3 className="hours">21</h3>
                    <p>HOURS</p>
                  </li>
                  <li>
                    <h3 className="minutes">2</h3>
                    <p>MINUTES</p>
                  </li>
                  <li>
                    <h3 className="seconds">20</h3>
                    <p>SECONDS</p>
                  </li>
                </ul>
                <div className="count-bgs">
                  <ImageWithBasePath
                    src="assets/img/bg/error-01.png"
                    alt="img"
                    className="count-01"
                  />
                  <ImageWithBasePath
                    src="assets/img/bg/error-03.png"
                    alt="img"
                    className="count-02"
                  />
                </div>
              </div>
              <div className="getback-content">
                <p>
                  We Will Back With Something Amazing to Get Latest Update,{" "}
                  <span className="d-block">
                    Please Sign Up to Our Newsletter
                  </span>
                </p>
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
            {/* /Count Downs */}
            {/* Social Icons */}
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
            {/* /Social Icons */}
          </div>
        </div>
        {/* /Coming Soon */}
      </div>
      {/* Error Img */}
      <div className="error-imgs count-imgs">
        <ImageWithBasePath
          src="assets/img/bg/error-01.png"
          alt="img"
          className="error-01 error-bg"
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
  {/* /Content */}
</>


    </div>
  )
}

export default ComingSoon
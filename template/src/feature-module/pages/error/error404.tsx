import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes';

const Error404 = () => {
  const routes = all_routes;
  return (
    <div>
      <>
  {/* Error */}
  <div className="error-wrapper">
    <div className="error-item">
      <div className="row w-100">
        {/* 404 Content */}
        <div className="col-md-6 col-sm-8 mx-auto">
          <div className="error-content text-center">
            <div className="error-img">
              <ImageWithBasePath
                src="assets/img/error/error-404.png"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="error-info">
              <h2>Looks like you are lost</h2>
              <p>We can’t seem to find the page you ara looking for</p>
              <Link to={routes.home} className="btn btn-primary">
                Go Back
                <i className="fa-solid fa-caret-right" />
              </Link>
            </div>
          </div>
        </div>
        {/* /404 Content */}
      </div>
      {/* Error Img */}
      <div className="error-imgs">
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
          src="assets/img/bg/error-03.png"
          alt="img"
          className="error-03 error-bg"
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
  {/* /Error */}
</>

    </div>
  )
}

export default Error404
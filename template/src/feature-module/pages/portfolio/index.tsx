import React from 'react'
import { Link } from 'react-router-dom'
import ImageWithBasePath from '../../../core/img'
import { all_routes } from '../../router/all_routes';

const Portfolio = () => {
  const routes = all_routes;
  return (
    <div>
      <>
  {/* Breadcrumb */}
  <div className="breadcrumb-bar">
    <div className="breadcrumb-img">
      <div className="breadcrumb-left">
        <ImageWithBasePath src="assets/img/bg/banner-bg-03.png" alt="img" />
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-12">
          <nav aria-label="breadcrumb" className="page-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={routes.home}>Home</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                portfolio
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">portfolio</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Contact Us */}
  <div className="page-content content">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-01.jpg"
              />
              <div className="gallery-overlay">
                <h4>Digital Marketing</h4>
                <p>Website Promotion</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-02.jpg"
              />
              <div className="gallery-overlay">
                <h4>Social Media</h4>
                <p>Ecommerce Seo</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-03.jpg"
              />
              <div className="gallery-overlay">
                <h4>Artificial Intelligence</h4>
                <p>Promoted Listings</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-04.jpg"
              />
              <div className="gallery-overlay">
                <h4>Digital Marketing</h4>
                <p>Website Promotion</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-05.jpg"
              />
              <div className="gallery-overlay">
                <h4>Videography</h4>
                <p>Promotion Video</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="gallery-widget">
            <Link to={routes.portfolioDetails}>
              <ImageWithBasePath
                className="img-fluid"
                alt="Image"
                src="assets/img/gallery/gallery-06.jpg"
              />
              <div className="gallery-overlay">
                <h4>Design</h4>
                <p>Logo Design</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Contact Us */}
</>

    </div>
  )
}

export default Portfolio
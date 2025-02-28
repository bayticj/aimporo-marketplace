import React from 'react'
import ImageWithBasePath from '../../../core/img'
import Slider from 'react-slick'
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';

const Categories2 = () => {
  const routes = all_routes;
  const settings1 = {
    dots: false,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
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
                Categories
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">Browse Categories</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Page Content */}
  <div className="page-content category-wrap">
    <div className="container">
      <div className="row">
        {/* Category Section */}
        <div className="col-md-12">
          <div className="marketing-section">
            <div className="marketing-content">
              <h2>All Categories</h2>
              <p>
                Digital marketing is an essential component of modern business,
                given the widespread use of the internet and digital devices.
              </p>
              <div className="marketing-bg">
                <ImageWithBasePath
                  src="assets/img/bg/market-bg.png"
                  alt="img"
                  className="market-bg"
                />
                <ImageWithBasePath
                  src="assets/img/bg/market-bg-01.png"
                  alt="img"
                  className="market-img"
                />
              </div>
            </div>
          </div>
          {/* Trending Categories */}
          <div className="trend-section">
            <div className="row align-items-center">
              <div className="col-sm-10">
                <h3>Trending Categories Today</h3>
              </div>
              <div className="col-sm-2 text-sm-end">
                <div className="owl-nav service-nav nav-control nav-top" />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="service-sliders ">
                <Slider {...settings1}>
                  <div className="service-box">
                    <div className="service-info">
                      <span className="service-icon">
                        <ImageWithBasePath src="assets/img/icons/service-01.svg" alt="icon" />
                      </span>
                      <div className="servive-name">
                        <h5>
                          <Link to={routes.service}>Programming &amp; Tech</Link>
                        </h5>
                        <p>5678 Sevices</p>
                      </div>
                    </div>
                    <Link to={routes.service}>
                      <i className="feather icon-arrow-up-right" />
                    </Link>
                  </div>
                  <div className="service-box">
                    <div className="service-info">
                      <span className="service-icon">
                        <ImageWithBasePath src="assets/img/icons/service-02.svg" alt="icon" />
                      </span>
                      <div className="servive-name">
                        <h5>
                          <Link to={routes.service}>Business</Link>
                        </h5>
                        <p>1590 Sevices</p>
                      </div>
                    </div>
                    <Link to={routes.service}>
                      <i className="feather icon-arrow-up-right" />
                    </Link>
                  </div>
                  <div className="service-box">
                    <div className="service-info">
                      <span className="service-icon">
                        <ImageWithBasePath src="assets/img/icons/service-03.svg" alt="icon" />
                      </span>
                      <div className="servive-name">
                        <h5>
                          <Link to={routes.service}>Social Media</Link>
                        </h5>
                        <p>7860 Sevices</p>
                      </div>
                    </div>
                    <Link to={routes.service}>
                      <i className="feather icon-arrow-up-right" />
                    </Link>
                  </div>
                  <div className="service-box">
                    <div className="service-info">
                      <span className="service-icon">
                        <ImageWithBasePath src="assets/img/icons/service-04.svg" alt="icon" />
                      </span>
                      <div className="servive-name">
                        <h5>
                          <Link to={routes.service}>Artificial Intelligence</Link>
                        </h5>
                        <p>4590 Sevices</p>
                      </div>
                    </div>
                    <Link to={routes.service}>
                      <i className="feather icon-arrow-up-right" />
                    </Link>
                  </div>
                  <div className="service-box">
                    <div className="service-info">
                      <span className="service-icon">
                        <ImageWithBasePath src="assets/img/icons/service-02.svg" alt="icon" />
                      </span>
                      <div className="servive-name">
                        <h5>
                          <Link to={routes.service}>Business</Link>
                        </h5>
                        <p>590 Sevices</p>
                      </div>
                    </div>
                    <Link to={routes.service}>
                      <i className="feather icon-arrow-up-right" />
                    </Link>
                  </div>
                  </Slider>
                </div>
                {/* /Service Slider */}
              </div>
            </div>
          </div>
          {/* /Trending Categories */}
        </div>
        {/* /Category Section */}
        {/* Sort By */}
        <div className="sortby-title">
          <div className="row align-items-center">
            <div className="col-md-12">
              <h4>
                10 Categories found with <span>14,787</span> Services
              </h4>
            </div>
          </div>
        </div>
        {/* /Sort By */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-01.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Business</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-02.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Social Media</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-03.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Artificial Intelligence</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-04.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Music &amp; Audio</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-05.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Programming &amp; Tech</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-06.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Digital Marketing</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-07.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Writing &amp; Translation</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-08.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Photography</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-09.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Marketing &amp; Sales</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-10.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Design</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-11.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Copywriting</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
        {/* Categories List */}
        <div className="col-xl-3 col-lg-4 col-sm-6">
          <div className="category-item">
            <div className="category-img">
              <Link to={routes.service}>
                <ImageWithBasePath
                  src="assets/img/category/category-12.jpg"
                  className="img-fluid"
                  alt="category img"
                />
              </Link>
              <div className="category-slug">
                <Link to={routes.service}>Events</Link>
              </div>
            </div>
            <div className="category-list">
              <ul>
                <li>
                  <Link to={routes.service}>
                    Finance &amp; Accounting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Consulting
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Legal Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Management &amp; Development
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
                <li>
                  <Link to={routes.service}>
                    Other Business Services
                    <i className="feather icon-arrow-up-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Categories List */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

    </div>
  )
}

export default Categories2
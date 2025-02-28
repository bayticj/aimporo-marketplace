import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonSelect from '../../core/common/common-select/commonSelect';
import { marketing } from '../../core/common/selectOption';
import { all_routes } from '../router/all_routes';


const Home = () => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const imgslideroption = {
    dots: false,
    nav: false,
    infinite: true,
    speed: 500,
    swipe:true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
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
  const slideslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    draggable:true,
    tochMove:true,
    swipe:true,
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
  const clientslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 3,
        },
      },
    ],
  };
  const testimonialslideroption  = {
    dots: false,
    loop:true,
    nav: true,
    infinite: true,
    smartSpeed: 500,
    slidesToShow: 3,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
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
  const locationslideroption = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 3,
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
    <div style={{ overflowX: 'hidden' }}>
     <>
  {/* Hero Section */}
  <section className="hero-section">
    <div className="banner-bg-imgs">
      <ImageWithBasePath
        src="assets/img/bg/banner-bg-01.png"
        className="banner-bg-one"
        alt="img"
      />
      <ImageWithBasePath
        src="assets/img/bg/banner-bg-02.png"
        className="banner-bg-two"
        alt="img"
      />
      <ImageWithBasePath
        src="assets/img/bg/banner-bg-03.png"
        className="banner-bg-three"
        alt="img"
      />
      <ImageWithBasePath
        src="assets/img/bg/banner-bg-04.png"
        className="banner-bg-four"
        alt="img"
      />
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="banner-content aos" data-aos="fade-up">
            <div className="banner-head">
              <h1>Find the Best Instant Services Marketplace.</h1>
              <p>
                A large number of individuals use us to transform their thoughts
                into the real world.
              </p>
            </div>
            <div className="banner-form">
              <form >
                <div className="banner-search-list">
                  <div className="input-block position-relative ">
                    <label>Category</label>
                    <CommonSelect
                        className="select homeselect"
                        options={marketing}
                        defaultValue={marketing[0]}
                      />
                  </div>
                  <div className="input-block">
                    <label>Location</label>
                    <div className="input-locaion">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Miami, USA"
                      />
                      <ImageWithBasePath
                        src="assets/img/icons/map-pin-heart.svg"
                        alt="Icon"
                      />
                    </div>
                  </div>
                  <div className="input-block border-0">
                    <label>Keyword</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Need Graphic Designer"
                    />
                  </div>
                </div>
                <div className="input-block-btn">
                  <Link className="btn btn-primary" type="button" to={routes.service}>
                    <i className="fas fa-magnifying-glass" /> Search
                  </Link>
                </div>
              </form>
            </div>
            <div className="popular-search">
              <h5>Popular Searches : </h5>
              <ul>
                <li>
                  <Link to={routes.serviceGridSidebar}>Online Mockup</Link>
                </li>
                <li>
                  <Link to={routes.serviceGridSidebar}>Carpentering</Link>
                </li>
                <li>
                  <Link to={routes.serviceGridSidebar}>Event Organiser</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="banner-img">
            <div className="banner-img-right">
              <ImageWithBasePath
                src="assets/img/banner-img.png"
                className="img-fluid"
                alt="img"
              />
            </div>
            <ImageWithBasePath
              src="assets/img/bg/banner-small-bg-01.svg"
              className="banner-small-bg-one"
              alt="img"
            />
            <ImageWithBasePath
              src="assets/img/bg/banner-small-bg-02.png"
              className="banner-small-bg-two"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Hero Section */}
  {/* Explore Gigs */}
  <section className="explore-gigs-section">
    <div className="container">
      <div className="section-head d-flex">
        <div className="section-header aos" data-aos="fade-up">
          <h2>
            <span>Explore</span> Our Gigs.
          </h2>
        </div>
        <div className="section-tab">
          <ul
            className="nav nav-pills inner-tab aos"
            id="pills-tab"
            role="tablist"
            data-aos="fade-up"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-popular-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-popular"
                type="button"
                role="tab"
                aria-controls="pills-popular"
                aria-selected="false"
              >
                Popular
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-latest-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-latest"
                type="button"
                role="tab"
                aria-controls="pills-latest"
                aria-selected="true"
              >
                Latest
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-rating-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-rating"
                type="button"
                role="tab"
                aria-controls="pills-rating"
                aria-selected="false"
              >
                Top Ratings
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-trend-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-trend"
                type="button"
                role="tab"
                aria-controls="pills-trend"
                aria-selected="false"
              >
                Trending{" "}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content dashboard-tab">
        <div
          className="tab-pane fade show active"
          id="pills-popular"
          role="tabpanel"
          aria-labelledby="pills-popular-tab"
        >
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider">
              <Slider {...imgslideroption} className="gigs-card-slider">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={1}  onClick={() => handleItemClick(1)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[1] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming &amp; Tech
                      </Link>
                      <small>+1</small>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Newyork
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        5.0 (28 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={2}  onClick={() => handleItemClick(2)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[2] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        London
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.3 (22 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={3}  onClick={() => handleItemClick(3)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[3] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Canada
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.6 (475 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={4}  onClick={() => handleItemClick(4)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[4] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Digital Marketing
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Indonesia
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.5 (40 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 4 days</span>
                      </div>
                      <h5>$900</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                 
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={5}  onClick={() => handleItemClick(5)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[5] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing &amp; Translation
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Tunsania
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        3.8 (70 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-latest"
          role="tabpanel"
          aria-labelledby="pills-latest-tab"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="gigs-card-slider">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={6}  onClick={() => handleItemClick(6)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[6] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming &amp; Tech
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Newyork
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do english or german transcript of any audio
                          file or video
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        5.0 (28 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={7}  onClick={() => handleItemClick(7)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[7] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Videography
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        London
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.3 (22 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 5 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={8}  onClick={() => handleItemClick(8)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[8] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Canada
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.6 (475 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 8 days</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={9}  onClick={() => handleItemClick(9)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[9] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Digital Marketing
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Indonesia
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.5 (40 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$900</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={10}  onClick={() => handleItemClick(10)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[10] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing &amp; Translation
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Tunsania
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        3.8 (70 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-rating"
          role="tabpanel"
          aria-labelledby="pills-rating-tab"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="gigs-card-slider">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={11}  onClick={() => handleItemClick(11)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[11] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming &amp; Tech
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Newyork
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do english or german transcript of any audio
                          file or video
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        5.0 (28 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 7 days</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={12}  onClick={() => handleItemClick(12)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[12] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Videography
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        London
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.3 (22 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 10 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={13}  onClick={() => handleItemClick(13)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[13] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Canada
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.6 (475 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={14}  onClick={() => handleItemClick(14)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[14] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Digital Marketing
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Indonesia
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.5 (40 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 3 days</span>
                      </div>
                      <h5>$900</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={15}  onClick={() => handleItemClick(15)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[15] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing &amp; Translation
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Tunsania
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        3.8 (70 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="pills-trend"
          role="tabpanel"
          aria-labelledby="pills-trend-tab"
        >
          <div className="row">
            <div className="col-md-12">
              <div className="gigs-card-slider">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={16}  onClick={() => handleItemClick(16)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[16] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming &amp; Tech
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Newyork
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do english or german transcript of any audio
                          file or video
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        5.0 (28 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 12 days</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={17}  onClick={() => handleItemClick(17)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[17] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Videography
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        London
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.3 (22 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 5 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={18}  onClick={() => handleItemClick(18)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[18] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Canada
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.6 (475 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 9 days</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={19}  onClick={() => handleItemClick(19)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[19] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Digital Marketing
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Indonesia
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.5 (40 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 3 days</span>
                      </div>
                      <h5>$900</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={20}  onClick={() => handleItemClick(20)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[20] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing &amp; Translation
                      </Link>
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                        Tunsania
                      </p>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        3.8 (70 Reviews)
                      </span>
                    </div>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 4 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Explore Gigs */}
  {/* Popular */}
  <section className="popular-section">
    <div className="popular-img">
      <div className="popular-img-left">
        <ImageWithBasePath src="assets/img/bg/banner-bg-04.png" alt="Shape" />
      </div>
      <div className="popular-img-right">
        <ImageWithBasePath src="assets/img/bg/shape-08.png" alt="Shape" />
      </div>
    </div>
    <div className="container">
      <div className="section-header aos" data-aos="fade-up">
        <h2 className="text-white">
          <span>Popular</span> Categories.
        </h2>
      </div>
      <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-03.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Digital Marketing</h5>
              <p>100 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-06.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Digital Marketing</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-04.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Programming &amp; Tech</h5>
              <p>200 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-05.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Programming &amp; Tech</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-05.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Writing Translation</h5>
              <p>180 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-07.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Writing Translation</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-06.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Photography</h5>
              <p>230 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-08.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Photography</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-07.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Artificial Intelligence</h5>
              <p>310 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-02.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Artificial Intelligence</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-08.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Music &amp; Audio</h5>
              <p>270 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-04.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Music &amp; Audio</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-09.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Design</h5>
              <p>450 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-11.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Design</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-10.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Business</h5>
              <p>330 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-03.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Business</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-11.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Marketing &amp; Sales</h5>
              <p>250 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-09.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Marketing &amp; Sales</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
        {/* Category Grid */}
        <div className="col d-flex aos" data-aos="fade-up">
          <div className="category-grid flex-fill">
            <div className="popular-icon">
              <span>
                <ImageWithBasePath src="assets/img/icons/category-icon-12.svg" alt="Icon" />
              </span>
            </div>
            <div className="popular-content">
              <h5>Social Media</h5>
              <p>180 Services</p>
            </div>
            <div className="category-overlay">
              <Link to={routes.categories}>
                <div className="category-overlay-img">
                  <ImageWithBasePath
                    src="assets/img/service/service-01.jpg"
                    className="img-fluid"
                    alt="Service"
                  />
                  <div className="category-overlay-content">
                    <h5>Social Media</h5>
                    <i className="feather icon-arrow-up-right" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* /Category Grid */}
      </div>
    </div>
  </section>
  {/* /Popular */}
  {/* Listings */}
  <section className="listing-section">
    <div className="container">
      <div className="section-header aos" data-aos="fade-up">
        <h2>
          <span>Our</span> Inspiring Listings
        </h2>
      </div>
      {/* Listing Tabs */}
      <div className="listing-tab">
        <div className="listing-slider">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#writing_translation"
              >
                Writing &amp; Translation
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#ai_services"
              >
                AI Services
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#graphics_design"
              >
                Graphics &amp; Design
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#data_analysis"
              >
                Data Analysis
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#analytics_strategy"
              >
                Analytics &amp; Strategy
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#search_list"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#video_animation"
              >
                Video &amp; Animation
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* /Listing Tabs */}
      <div className="tab-content">
        {/* Writing & Translation */}
        <div
          className="tab-pane fade show active"
          id="writing_translation"
          role="tabpanel"
        >
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={21}  onClick={() => handleItemClick(21)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[21] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider ">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={22}  onClick={() => handleItemClick(22)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[22] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={23}  onClick={() => handleItemClick(23)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[23] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={24}  onClick={() => handleItemClick(24)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[24] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Writing & Translation */}
        {/* AI Services */}
        <div className="tab-pane fade" id="ai_services" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={25}  onClick={() => handleItemClick(25)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[25] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do english or german transcript of any audio
                          file or video
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={26}  onClick={() => handleItemClick(26)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[26] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={27}  onClick={() => handleItemClick(27)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[27] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...imgslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={28}  onClick={() => handleItemClick(28)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[28] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Marketing
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /AI Services */}
        {/* Graphics & Design */}
        <div className="tab-pane fade" id="graphics_design" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={29}  onClick={() => handleItemClick(29)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[29] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Logo Design
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional, unique and modern business
                          logo
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      California, Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={30}  onClick={() => handleItemClick(30)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[30] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Vector Graphics
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will design unique, simple and modern custom icons
                          set
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-02.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-01.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={31}  onClick={() => handleItemClick(31)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[31] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Illustration
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do vector tracing or convert to vector quickly
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={32}  onClick={() => handleItemClick(32)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[32] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Design
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will simple, unique and modern design custom icons
                          set
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Graphics & Design */}
        {/* Search */}
        <div className="tab-pane fade" id="search_list" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={33}  onClick={() => handleItemClick(33)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[33] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Writing
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={34}  onClick={() => handleItemClick(34)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[34] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={35}  onClick={() => handleItemClick(35)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[35] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={36}  onClick={() => handleItemClick(36)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[36] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Search */}
        {/* Data Analysis */}
        <div className="tab-pane fade" id="data_analysis" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={37}  onClick={() => handleItemClick(37)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[37] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Data
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do product data information &amp; syetem
                          analysis
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={38}  onClick={() => handleItemClick(39)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[38] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={39}  onClick={() => handleItemClick(39)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[39] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={40}  onClick={() => handleItemClick(40)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[40] ? 'selected' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Data Analysis */}
        {/* Analytics & Strategy */}
        <div className="tab-pane fade" id="analytics_strategy" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-10.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={41}  onClick={() => handleItemClick(41)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[41] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Translation
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do implementing chatbots on websites or
                          messaging apps
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={42}  onClick={() => handleItemClick(42)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[42] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do product &amp; professional lifestyle
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={43}  onClick={() => handleItemClick(43)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[43] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-09.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={44}  onClick={() => handleItemClick(44)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[44] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Analytics & Strategy */}
        {/* Video & Animation */}
        <div className="tab-pane fade" id="video_animation" role="tabpanel">
          <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
            <div className="col-md-12">
              <div className="gigs-card-slider listing-gigs">
              <Slider {...imgslideroption}>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={45}  onClick={() => handleItemClick(45)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[45] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Music &amp; Audio
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.6 (475 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will develop openai, dalle, chat gpt app for mobile
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Canada
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$830</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                  
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-12.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-07.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-08.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                      </Link>
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={46}  onClick={() => handleItemClick(46)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[46] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Programming
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0 (28 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do english or german transcript of any audio
                          file or video
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Newyork
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 1 day</span>
                      </div>
                      <h5>$780</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-11.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-05.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-06.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={47}  onClick={() => handleItemClick(47)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[47] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="User" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link to={routes.service} className="badge bg-primary-light">
                        Videography
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3 (22 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I I will do professional lifestyle and product
                          photography
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      London
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 2 days</span>
                      </div>
                      <h5>$350</h5>
                    </div>
                  </div>
                </div>
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-13.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-03.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/list/list-04.jpg"
                            className="img-fluid"
                            alt="Gigs"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="card-overlay-badge">
                      <Link to={routes.service}>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </Link>
                    </div>
                    <div className="fav-selection" key={48}  onClick={() => handleItemClick(48)}>
                      <Link to="#">
                        <i className="feather icon-video" />
                      </Link>
                      <Link to="#"  className={`fav-icon ${
                          selectedItems[48] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                    <div className="user-thumb">
                      <Link to={routes.userProfile}>
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Marketing
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8 (11 Reviews)
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations
                        </Link>
                      </h3>
                    </div>
                    <p className="gigs-location">
                      <span>
                        <ImageWithBasePath
                          src="assets/img/icons/map-pin-check.svg"
                          alt="Icon"
                        />
                      </span>
                      Tunsania
                    </p>
                    <div className="gigs-card-footer">
                      <div className="gigs-share">
                        <Link to="#" className="img-icon">
                          <i className="feather icon-image" />
                        </Link>
                        <Link to="#" className="img-icon">
                          <i className="feather icon-video" />
                        </Link>
                        <Link to="#">
                          <i className="feather icon-share-2" />
                        </Link>
                        <span className="badge">Delivery in 6 days</span>
                      </div>
                      <h5>$400</h5>
                    </div>
                  </div>
                </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* /Video & Animation */}
      </div>
    </div>
  </section>
  {/* /Listings */}
  {/* Find Your Needs */}
  <section className="provide-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-9">
          <div className="section-header aos" data-aos="fade-up">
            <h2>
              <span>We'r</span> here help to find your Needs.
            </h2>
            <p>Over 74K listings of Gigs- available today for you.</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6">
          <div className="provide-box">
            <div className="provide-icon">
              <ImageWithBasePath src="assets/img/icons/ipad-icon.svg" alt="icon" />
            </div>
            <h3>Buy a Service</h3>
            <p>Explore homy's 50K+ Service and uncover your ideal needs.</p>
            <Link to={routes.service} className="btn btn-primary">
              Get Started
              <i className="fa-solid fa-caret-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="provide-box">
            <div className="provide-icon">
              <ImageWithBasePath src="assets/img/icons/service-icon.svg" alt="icon" />
            </div>
            <h3>Sell a Service</h3>
            <p>Explore homy's 50K+ Service and uncover your ideal needs.</p>
            <Link to={routes.addGigs} className="btn btn-primary">
              Add Service
              <i className="fa-solid fa-caret-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="provide-box">
            <div className="provide-icon">
              <ImageWithBasePath src="assets/img/icons/user-icon-01.svg" alt="icon" />
            </div>
            <h3>Join Us</h3>
            <p>Explore homy's 50K+ Service and uncover your ideal needs.</p>
            <Link to={routes.signUp} className="btn btn-primary">
              Get Started
              <i className="fa-solid fa-caret-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Find Your Needs */}
  {/* Clinets */}
  <div className="client-slider-sec">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-header aos" data-aos="fade-up">
            <p>Trusted by 300+ Client around globe</p>
          </div>
          <div className="clients-slider">
          <Slider {...clientslideroption}>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-01.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-02.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-03.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-04.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-05.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-06.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            <div className="client-logo">
              <ImageWithBasePath
                src="assets/img/company/company-logo-07.svg"
                className="w-auto"
                alt="img"
              />
            </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Clinets */}
  {/* Popular Lists */}
  <section className="top-listing-section">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-header aos" data-aos="fade-up">
            <h2>
              <span>Top</span> Popular Location Based Listing
            </h2>
          </div>
          {/* Listing Tabs */}
          <div className="listing-tab">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#uae"
                >
                  UAE <span>(200)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#usa"
                >
                  USA <span>(250)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#india"
                >
                  India <span>(340)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#bolivia"
                >
                  Bolivia <span>(230)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#canada"
                >
                  Canada <span>(210)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#kuwait"
                >
                  Kuwait <span>(400)</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* /Listing Tabs */}
          <div className="tab-content country-lists">
            {/* UAE */}
            <div className="tab-pane fade show active" id="uae" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider ">
                        
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-01.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                          
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-02.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Artificial Intelligence
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-03.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Programming &amp; Tech
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-04.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /UAE */}
            {/* USA */}
            <div className="tab-pane fade" id="usa" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-05.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Videography
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider ">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-06.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Music
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider ">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-07.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Tech
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-08.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /USA */}
            {/* India */}
            <div className="tab-pane fade" id="india" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-09.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Ui Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-10.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Artificial Intelligence
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-11.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Audio
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-12.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /India */}
            {/* Bolivia */}
            <div className="tab-pane fade" id="bolivia" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-13.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-14.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Artificial Intelligence
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-03.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Programming &amp; Tech
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-04.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /Bolivia */}
            {/* Canada */}
            <div className="tab-pane fade" id="canada" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-02.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-02.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Digital Marketing
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-12.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Writing
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-01.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /Canada */}
            {/* Kuwait */}
            <div className="tab-pane fade" id="kuwait" role="tabpanel">
              <div className="row aos" data-aos="fade-up" data-aos-delay={500}>
                <div className="col-md-12">
                  <div className="gigs-card-slider listing-gigs">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-02.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              UI Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will develop modern responsive webflow website
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Regina</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$780
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-07.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Marketing
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Newyork
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (40 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will convert figma, xd and PSD to unbounce,
                              instapage
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Venassa</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$350
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-06.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Programming &amp; Tech
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            Alabama
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will give you mixing, mastering and production
                              lessons
                            </Link>
                          </h3>
                          <p className="loc-user-name">By Aron Fletcher</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$830
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider owl-carousel">
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/list/gigs-05.jpg"
                                className="img-fluid"
                                alt="Gigs"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="card-overlay-badge">
                          <Link to={routes.service}>
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <p className="gigs-location">
                            <ImageWithBasePath
                              src="assets/img/icons/map-pin-check.svg"
                              alt="Icon"
                            />
                            California
                          </p>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              5.0{" "}
                              <span className="fw-semibold ms-1">
                                {" "}
                                (28 Reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do implementing chatbots on websites or
                              messaging apps
                            </Link>
                          </h3>
                          <p className="loc-user-name">By John</p>
                        </div>
                        <div className="gigs-card-footer">
                          <h5>
                            <span>From</span>$400
                          </h5>
                          <div className="gigs-share">
                            <Link to="#">
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 6 days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            {/* /Kuwait */}
          </div>
          <div className="cta-section">
            <div className="cta-wrap">
              <div className="row gx-0 align-items-center">
                <div className="col-md-8">
                  <div className="cta-info">
                    <span className="badge">
                      Exploring unique services for your needs
                    </span>
                    <h3>Looking to Buy/Sell a service?</h3>
                  </div>
                </div>
                <div className="col-md-4 text-md-end">
                  <div className="cta-btn">
                    <Link to={routes.service} className="btn btn-primary">
                      Find a Premium Provider
                      <i className="fa-solid fa-caret-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="cta-bg">
                <div className="cta-bg1">
                  <ImageWithBasePath src="assets/img/bg/contact-bg-01.png" alt="Shape" />
                </div>
                <div className="cta-bg2">
                  <ImageWithBasePath src="assets/img/bg/contact-bg-02.png" alt="Shape" />
                </div>
              </div>
            </div>
          </div>
          <div className="popular-services">
            <div className="row">
              <div className="col-md-12">
                <div className="section-header aos" data-aos="fade-up">
                  <h2>
                    <span>Explore</span> Popular Services 2024
                  </h2>
                </div>
              </div>
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="category-item">
                  <div className="category-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/category/category-13.jpg"
                        className="img-fluid"
                        alt="category img"
                      />
                    </Link>
                    <div className="category-slug">
                      <Link to={routes.service}>Gaming</Link>
                    </div>
                  </div>
                  <div className="category-list">
                    <ul>
                      <li>
                        <Link to={routes.service}>
                          Game Coaching
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Game Sessions
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Gameplay Recording
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Game Testing
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Other Gaming Services
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
                      <Link to={routes.service}>Self Improvement</Link>
                    </div>
                  </div>
                  <div className="category-list">
                    <ul>
                      <li>
                        <Link to={routes.service}>
                          Self Improvement
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Online Tutoring
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Language Lessons
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Career Counseling
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Life Coaching
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
                      <Link to={routes.service}>Wellness &amp; Fitness</Link>
                    </div>
                  </div>
                  <div className="category-list">
                    <ul>
                      <li>
                        <Link to={routes.service}>
                          Fitness Lessons
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Workout Plans
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Recipe Creation
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Meal Plans
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Nutrition Coaching
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
                      <Link to={routes.service}>Lifestyle</Link>
                    </div>
                  </div>
                  <div className="category-list">
                    <ul>
                      <li>
                        <Link to={routes.service}>
                          Product Photographers
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Food Photographers
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Lifestyle Photographers
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Fashion Photographers
                          <i className="feather icon-arrow-up-right" />
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.service}>
                          Outdoor
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
      </div>
    </div>
    <div className="con-bg">
      <ImageWithBasePath src="assets/img/bg/contact-bg.png" alt="icon" />
    </div>
  </section>
  {/* /Popular Lists */}
  {/* Testimonials */}
  <section className="testimonial-section">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-header aos" data-aos="fade-up">
            <h2>
              <span>Why</span> People Love with Aimporo Philippines
            </h2>
          </div>
          <div className="testimonial-slider">
          <Slider {...testimonialslideroption}>

            <div className="testimonial-item aos" data-aos="fade-up">
              <div className="testimonial-icon">
                <ImageWithBasePath src="assets/img/icons/arrow-icon.svg" alt="icon" />
              </div>
              <h4>Great Work</h4>
              <p>
                "The best part about this service is the variety of skills
                available. I've hired designers, writers, and developers, all in
                one place."
              </p>
              <div className="star-rate">
                <span>
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                </span>
              </div>
              <div className="testimonial-user">
                <ImageWithBasePath src="assets/img/user/user-17.jpg" alt="img" />
                <div className="testimonial-info">
                  <h6>Gloria Weber</h6>
                  <p>United States</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item aos" data-aos="fade-up">
              <div className="testimonial-icon">
                <ImageWithBasePath src="assets/img/icons/arrow-icon.svg" alt="icon" />
              </div>
              <h4>Seamless Experience</h4>
              <p>
                "I've completed several gigs on this site, and the experience
                has been seamless every time. Great for both freelancers and
                clients!"
              </p>
              <div className="star-rate">
                <span>
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                </span>
              </div>
              <div className="testimonial-user">
                <ImageWithBasePath src="assets/img/user/user-18.jpg" alt="img" />
                <div className="testimonial-info">
                  <h6>John Cramer</h6>
                  <p>UK</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item aos" data-aos="fade-up">
              <div className="testimonial-icon">
                <ImageWithBasePath src="assets/img/icons/arrow-icon.svg" alt="icon" />
              </div>
              <h4>Great Work</h4>
              <p>
                "Finding the right freelancer for my project has never been
                easier. The platform is user-friendly, and the quality of talent
                is exceptional."
              </p>
              <div className="star-rate">
                <span>
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                </span>
              </div>
              <div className="testimonial-user">
                <ImageWithBasePath src="assets/img/user/user-19.jpg" alt="img" />
                <div className="testimonial-info">
                  <h6>Mary Marquez</h6>
                  <p>United States</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item aos" data-aos="fade-up">
              <div className="testimonial-icon">
                <ImageWithBasePath src="assets/img/icons/arrow-icon.svg" alt="icon" />
              </div>
              <h4>Great Effort</h4>
              <p>
                "I've completed several gigs on this site, and the experience
                has been seamless every time. Great for both freelancers and
                clients!"
              </p>
              <div className="star-rate">
                <span>
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                  <i className="fa-solid fa-star filled" />
                </span>
              </div>
              <div className="testimonial-user">
                <ImageWithBasePath src="assets/img/user/user-16.jpg" alt="img" />
                <div className="testimonial-info">
                  <h6>James Don</h6>
                  <p>Canada</p>
                </div>
              </div>
            </div>
           
            </Slider>
          </div>
        </div>
      </div>
    </div>
    <div className="testimonial-bg">
      <div className="testimonial-bg1">
        <ImageWithBasePath src="assets/img/bg/testimonial-bg-01.png" alt="Shape" />
      </div>
      <div className="testimonial-bg2">
        <ImageWithBasePath src="assets/img/bg/testimonial-bg-02.png" alt="Shape" />
      </div>
      <div className="testimonial-bg3">
        <ImageWithBasePath src="assets/img/bg/testimonial-bg-03.png" alt="Shape" />
      </div>
    </div>
  </section>
  {/* /Testimonials */}
  {/* Expert Section */}
  <section className="popular-section expert-section">
    <div className="popular-img">
      <div className="popular-img-left">
        <ImageWithBasePath src="assets/img/bg/banner-bg-04.png" alt="Shape" />
      </div>
      <div className="popular-img-right">
        <ImageWithBasePath src="assets/img/bg/shape-08.png" alt="Shape" />
      </div>
    </div>
    <div className="container">
      <div className="expert-header">
        <div className="section-header text-center aos" data-aos="fade-up">
          <h2>
            <span>What</span> Makes Aimporo Philippines Different
          </h2>
        </div>
      </div>
      <div className="expert-wrapper">
        <div className="row gx-0 justify-content-center">
          <div className="col-lg-4 col-md-6 aos" data-aos="fade-up">
            <div className="expert-item">
              <div className="expert-icon">
                <ImageWithBasePath src="assets/img/icons/flag-icon.svg" alt="img" />
              </div>
              <div className="expert-info">
                <h4>Trusted Services</h4>
                <p>
                  Kulla quis velit vel nunc commodo ullamcorper. Pellentesque
                  tincidunt et nisl eget porta. Vestibulum vel{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 aos" data-aos="fade-up">
            <div className="expert-item">
              <div className="expert-icon">
                <ImageWithBasePath src="assets/img/icons/expert-icon.svg" alt="img" />
              </div>
              <div className="expert-info">
                <h4>Transparent Pricing</h4>
                <p>
                  Kulla quis velit vel nunc commodo ullamcorper. Pellentesque
                  tincidunt et nisl eget porta. Vestibulum vel{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 aos" data-aos="fade-up">
            <div className="expert-item">
              <div className="expert-icon">
                <ImageWithBasePath src="assets/img/icons/users-icon.svg" alt="img" />
              </div>
              <div className="expert-info">
                <h4>Trusted Services</h4>
                <p>
                  Kulla quis velit vel nunc commodo ullamcorper. Pellentesque
                  tincidunt et nisl eget porta. Vestibulum vel{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Expert Section */}
  {/* FAQ */}
  <section className="explore-services-sec">
    <div className="section-bg">
      <ImageWithBasePath
        src="assets/img/bg/section-bg-06.png"
        className="explore-bg1"
        alt="img"
      />
    </div>
    <div className="container">
      <div className="faq-sec">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="faq-heading aos" data-aos="fade-up">
              <div className="section-header">
                <h2>
                  <span>Your</span> Frequently Added Question's
                </h2>
              </div>
              <p>Don't find the answer? We can help you.</p>
              <Link to={routes.faq} className="btn btn-primary">
                Ask a Question
                <i className="fa-solid fa-caret-right" />
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="faq-wrapper faq-lists">
              <div className="faq-card aos" data-aos="fade-up">
                <h4 className="faq-title">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#faqone"
                    aria-expanded="false"
                  >
                    What are website development services?
                  </Link>
                </h4>
                <div id="faqone" className="card-collapse collapse">
                  <div className="faq-content">
                    <p>
                      Whether you're looking to launch, update, or overhaul your
                      website, we offers a talented pool of freelancers who turn
                      ideas into action. From personal brand pages to eCommerce
                      stores and everything in between, website development
                      services cover virtually any use case, industry, and
                      niche. In turn, you can make every digital first
                      impression count.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-card aos" data-aos="fade-up">
                <h4 className="faq-title">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#faqtwo"
                    aria-expanded="false"
                  >
                    What are the stages of a project?
                  </Link>
                </h4>
                <div id="faqtwo" className="card-collapse collapse">
                  <div className="faq-content">
                    <p>
                      Yes! My service guarantees you 24/7 lifetime support for
                      anything related to your website. Whenever you encounter a
                      problem, feel free to reach out to me anytime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-card aos" data-aos="fade-up">
                <h4 className="faq-title">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#faqOne"
                    aria-expanded="false"
                  >
                    What types of service can I pick?
                  </Link>
                </h4>
                <div id="faqOne" className="card-collapse collapse">
                  <div className="faq-content">
                    <p>
                      Yes! My service guarantees you 24/7 lifetime support for
                      anything related to your website. Whenever you encounter a
                      problem, feel free to reach out to me anytime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-card aos" data-aos="fade-up">
                <h4 className="faq-title">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#faqfour"
                    aria-expanded="false"
                  >
                    How much does it cost to develop a basic projects?
                  </Link>
                </h4>
                <div id="faqfour" className="card-collapse collapse">
                  <div className="faq-content">
                    <p>
                      Yes! My service guarantees you 24/7 lifetime support for
                      anything related to your website. Whenever you encounter a
                      problem, feel free to reach out to me anytime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="faq-card aos" data-aos="fade-up">
                <h4 className="faq-title">
                  <Link
                    className="collapsed"
                    data-bs-toggle="collapse"
                    to="#faqfive"
                    aria-expanded="false"
                  >
                    What are the most popular development platforms?
                  </Link>
                </h4>
                <div id="faqfive" className="card-collapse collapse">
                  <div className="faq-content">
                    <p>
                      Yes! My service guarantees you 24/7 lifetime support for
                      anything related to your website. Whenever you encounter a
                      problem, feel free to reach out to me anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trusted-customers-sec">
        <div className="section-bg">
          <ImageWithBasePath
            src="assets/img/bg/banner-bg-04.png"
            className="explore-bg2"
            alt="img"
          />
        </div>
        <div className="trusted-customers">
          <div className="section-bg">
            <ImageWithBasePath
              src="assets/img/bg/section-bg-03.png"
              className="trusted-bg-one"
              alt="img"
            />
            <ImageWithBasePath
              src="assets/img/bg/section-bg-03.png"
              className="trusted-bg-two"
              alt="img"
            />
          </div>
          <div
            className="section-header"
            data-aos="fade-up"
            data-aos-delay={500}
          >
            <h2>Find the right service for your needs</h2>
            <p>Over 74K listings of Gigs- available today for you.</p>
          </div>
          <div
            className="more-btn text-center"
            data-aos="fade-up"
            data-aos-delay={500}
          >
            <Link to={routes.service} className="btn btn-primary">
              <ImageWithBasePath
                src="assets/img/icons/list-search-icon.svg"
                className="me-2"
                alt="img"
              />
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /FAQ */}
</>

    </div>
  )
}

export default Home
import React, { useState } from 'react'
import ImageWithBasePath from '../../../core/img'
import Slider from 'react-slick'
import CommonSelect from '../../../core/common/common-select/commonSelect';
import { price } from '../../../core/common/selectOption';
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';

const ServiceGridSidebar = () => {
  const routes = all_routes;
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreLocation, setshowMoreLocation] = useState(false);
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
          slidesToShow: 1,
        },
      },
    ],
  };
  const toggleMoreCategories = () => {
    setShowMoreCategories((prevShow) => !prevShow);
  };
  const toggleMoreLocation = () => {
    setshowMoreLocation((prevShow) => !prevShow);
  };
  const serviceslideroption = {
    dots: false,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    draggable:true,
    tochMove:true,
    swipe:true,
    slidesToScroll: 1,
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
          slidesToShow: 1,
        },
      },
    ],
  };
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  return (
    <div>
      <>
  {/* Breadcrumb */}
  <div className="breadcrumb-bar breadcrumb-bar-info">
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
                Services
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Programming &amp; Tech
              </li>
            </ol>
          </nav>
          <div className="slide-title-wrap">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="slider-title">
                  <h2>
                    Browse Listing &amp; More{" "}
                    <span className="text-primary">“ 900 Services ”</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="owl-nav service-nav nav-control nav-top" />
              </div>
            </div>
          </div>
          {/* Service Slider */}
          <div className="service-sliders">
          <Slider {...serviceslideroption}>
            <div className="service-box">
              <div className="service-info">
                <span className="service-icon">
                  <ImageWithBasePath src="assets/img/icons/service-01.svg" alt="icon" />
                </span>
                <div className="servive-name">
                  <h5>
                    <Link to={routes.serviceGridSidebar}>
                      Programming &amp; Tech
                    </Link>
                  </h5>
                  <p>5678 Sevices</p>
                </div>
              </div>
              <Link to={routes.serviceGridSidebar}>
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
                    <Link to={routes.serviceGridSidebar}>Business</Link>
                  </h5>
                  <p>1590 Sevices</p>
                </div>
              </div>
              <Link to={routes.serviceGridSidebar}>
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
                    <Link to={routes.serviceGridSidebar}>Social Media</Link>
                  </h5>
                  <p>7860 Sevices</p>
                </div>
              </div>
              <Link to={routes.serviceGridSidebar}>
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
                    <Link to={routes.serviceGridSidebar}>
                      Artificial Intelligence
                    </Link>
                  </h5>
                  <p>4590 Sevices</p>
                </div>
              </div>
              <Link to={routes.serviceGridSidebar}>
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
                    <Link to={routes.serviceGridSidebar}>Business</Link>
                  </h5>
                  <p>590 Sevices</p>
                </div>
              </div>
              <Link to={routes.serviceGridSidebar}>
                <i className="feather icon-arrow-up-right" />
              </Link>
            </div>
            </Slider>
          </div>
          {/* /Service Slider */}
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      {/* Title */}
      <div className="title-section">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="title-header">
              <h3>Programming &amp; Tech</h3>
              <p>View all your Services for your Business</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="title-filter">
              <div className="form-group search-group">
                <span className="search-icon">
                  <i className="feather icon-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Category"
                />
              </div>
              <div className="search-filter-selected">
                <div className="form-group">
                  <span className="sort-text">Sort By</span>
                  <CommonSelect
                          className="select serviceselect"
                          options={price}
                          defaultValue={price[0]}
                        />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Title */}
      {/* Search Details */}
      <div className="service-gigs">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3 theiaStickySidebar">
            <div className="sidebar-widget">
              <div className="sidebar-header">
                <h3>Filter</h3>
                <Link to="#" className="reset-link">
                  Reset Filter
                </Link>
              </div>
              <div className="sidebar-body p-0">
                {/* Categories */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#categories"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath
                        src="assets/img/icons/category-icon.svg"
                        alt="icon"
                      />
                      Categories
                    </Link>
                  </h4>
                  <div id="categories" className="collapse show">
                    <div className="collapse-body">
                      <div className="form-group search-group">
                        <span className="search-icon">
                          <i className="feather icon-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Category"
                        />
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">
                              Programming &amp; Coding
                            </span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">
                              Data Science &amp; Analysis
                            </span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">Databases </span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">
                              Mobile App Development
                            </span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">
                              Email Template Development
                            </span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">
                              CMS Development
                            </span>
                          </label>
                        </li>
                        <li>
                          
                          <div className="view-content">
                          {showMoreCategories && (
                            <div className="viewall-one">
                              <ul>
                                <li>
                                  <label className="custom_check">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    <span className="checked-title">
                                      ECommerce CMS Development
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    <span className="checked-title">
                                      Programming
                                    </span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                             )}
                            <div className="view-all">
                              <Link
                                to="#"
                                onClick={toggleMoreCategories}
                                className="viewall-button-one"
                              >
                                <span>
                                      {showMoreCategories
                                        ? "Less Categories"
                                        : "More 20+ Categories"}
                                    </span>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Categories */}
                {/* Locations */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#locations"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath src="assets/img/icons/map-icon.svg" alt="icon" />
                      Locations
                    </Link>
                  </h4>
                  <div id="locations" className="collapse show">
                    <div className="collapse-body">
                      <div className="form-group search-group">
                        <span className="search-icon">
                          <i className="feather icon-search" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Locations"
                        />
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">Canada</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">Bolivia</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">Tunsania</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">Indonesia</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">UK</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">UAE</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="checked-title">USA</span>
                          </label>
                        </li>
                        <li>
                          <div className="view-content">
                          {showMoreLocation && (
                            <div className="viewall-location">
                              <ul>
                                <li>
                                  <label className="custom_check">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    <span className="checked-title">
                                      Malaysia
                                    </span>
                                  </label>
                                </li>
                                <li>
                                  <label className="custom_check">
                                    <input type="checkbox" />
                                    <span className="checkmark" />
                                    <span className="checked-title">Japan</span>
                                  </label>
                                </li>
                              </ul>
                            </div>
                             )}
                            <div className="view-all">
                              <Link
                                to="#"
                                onClick={toggleMoreLocation}
                                className="viewall-btn-location"
                              >
                               <span>
                                      {showMoreLocation
                                        ? "Less Location"
                                        : "More 20+ Location"}
                                    </span>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Locations */}
                {/* Seller Details */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#seller"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath src="assets/img/icons/user-icon.svg" alt="icon" />
                      Seller Details
                    </Link>
                  </h4>
                  <div id="seller" className="collapse show">
                    <div className="collapse-body">
                      <ul className="seller-list">
                        <li>
                          <Link to="#">
                            Seller Level
                            <span>
                              <i className="feather icon-chevron-right" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            Seller Availability
                            <span>
                              <i className="feather icon-chevron-right" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            Seller Speaks
                            <span>
                              <i className="feather icon-chevron-right" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            Seller Lives in
                            <span>
                              <i className="feather icon-chevron-right" />
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Seller Details */}
                {/* Ratings */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#ratings"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath src="assets/img/icons/rating-icon.svg" alt="icon" />
                      Ratings
                    </Link>
                  </h4>
                  <div id="ratings" className="collapse show">
                    <div className="collapse-body">
                      <ul className="checkbox-list star-rate">
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="ratings">
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                            </span>
                            <span className="rating-count">(5.0)</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="ratings">
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star" />
                            </span>
                            <span className="rating-count">(4.0)</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="ratings">
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star " />
                            </span>
                            <span className="rating-count">(3.0)</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="ratings">
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                            </span>
                            <span className="rating-count">(2.0)</span>
                          </label>
                        </li>
                        <li>
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" />
                            <span className="ratings">
                              <i className="fa-solid fa-star filled" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                              <i className="fa-solid fa-star" />
                            </span>
                            <span className="rating-count">(1.0)</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Ratings */}
                {/* Budget */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#budget"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath src="assets/img/icons/money-icon.svg" alt="icon" />
                      Budget
                    </Link>
                  </h4>
                  <div id="budget" className="collapse show">
                    <div className="collapse-body">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Custom Budget"
                        />
                      </div>
                      <ul className="checkbox-list">
                        <li>
                          <label className="custom_radio">
                            <input
                              type="radio"
                              name="budget"
                              defaultChecked
                            />
                            <span className="checkmark" />
                            <span className="text-dark"> Value :</span> Under
                            $4500
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            <span className="text-dark"> Mid-range :</span>{" "}
                            Under $4500
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            <span className="text-dark"> High-end :</span> Under
                            $4500
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Budget */}
                {/* Subscription */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#subscription"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath
                        src="assets/img/icons/subscribe-icon.svg"
                        alt="icon"
                      />
                      Subscription
                    </Link>
                  </h4>
                  <div id="subscription" className="collapse show">
                    <div className="collapse-body">
                      <ul className="checkbox-list">
                        <li>
                          <label className="custom_radio">
                            <input
                              type="radio"
                              name="budget"
                              defaultChecked
                            />
                            <span className="checkmark" />
                            All Subscription
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            Basic Plan
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            Premium Plan
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Subscription */}
                {/* Delivery Time */}
                <div className="collapse-card">
                  <h4 className="card-title">
                    <Link
                      className=""
                      data-bs-toggle="collapse"
                      to="#deivery"
                      aria-expanded="true"
                    >
                      <ImageWithBasePath src="assets/img/icons/time-icon.svg" alt="icon" />
                      Delivery Time
                    </Link>
                  </h4>
                  <div id="deivery" className="collapse show">
                    <div className="collapse-body">
                      <ul className="checkbox-list">
                        <li>
                          <label className="custom_radio">
                            <input
                              type="radio"
                              name="budget"
                              defaultChecked
                            />
                            <span className="checkmark" />
                            Enter 24H
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            Upto 3 days
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            Upto 7 days
                          </label>
                        </li>
                        <li>
                          <label className="custom_radio">
                            <input type="radio" name="budget" />
                            <span className="checkmark" />
                            Anytime
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Delivery Time */}
              </div>
              <Link to="#" className="btn btn-primary w-100">
                <i className="fa-solid fa-caret-right" />
                Filter
              </Link>
            </div>
          </div>
          {/* /Sidebar */}
          <div className="col-lg-9">
            <div className="row">
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-01.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="img"
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
                    <div className="fav-selection"  key={1}  onClick={() => handleItemClick(1)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[1] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Website Promotion
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          5.0
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
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="img" />
                        <p>By John</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Newyork
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$780</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-02.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="img"
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
                    <div className="fav-selection"  key={2}  onClick={() => handleItemClick(2)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[2] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Ecommerce-Seo
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3
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
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="img" />
                        <p>By Robert</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          London
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$350</h5>
                      <span className="badge">Delivery in 2 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-03.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="img"
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
                    <div className="fav-selection"  key={3}  onClick={() => handleItemClick(3)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[3] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
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
                          4.6
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
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-03.jpg" alt="img" />
                        <p>By Regina</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Canada
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$830</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-04.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="img"
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
                    <div className="fav-selection"  key={4}  onClick={() => handleItemClick(4)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[4] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Social Ecommerce
                      </Link>{" "}
                      <small>+1</small>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.5
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Embedded Android &amp; AOSP customizations...
                        </Link>
                      </h3>
                    </div>
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-04.jpg" alt="img" />
                        <p>By Charles</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Indonesia
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$900</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-05.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="fav-selection"  key={5}  onClick={() => handleItemClick(5)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[5] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Promoted Listing
                      </Link>{" "}
                      <small>+1</small>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8
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
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="img" />
                        <p>By George</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Tunsania
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$400</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="fav-selection"  key={6}  onClick={() => handleItemClick(6)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[6] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Ecommerce-Seo
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.8
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do integrating AR elements into marketing
                          strategies for customers...
                        </Link>
                      </h3>
                    </div>
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
                        <p>By Smith</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Bolivia
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$950</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="fav-selection"  key={7}  onClick={() => handleItemClick(7)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[7] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
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
                      </Link>{" "}
                      <small>+1</small>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.9
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          Managing and optimizing paid advertising campaigns for
                          search...
                        </Link>
                      </h3>
                    </div>
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-07.jpg" alt="img" />
                        <p>By Randoll</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Newyork
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$680</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-08.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-06.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-07.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="fav-selection"  key={8}  onClick={() => handleItemClick(8)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[8] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Promoted Listing
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          3.5
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do collaborating with influencers to promote
                          products and services.
                        </Link>
                      </h3>
                    </div>
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-08.jpg" alt="img" />
                        <p>By Pricilla</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Bristol
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$960</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              {/* Service List */}
              <div className="col-xl-4 col-md-6">
                <div className="gigs-grid">
                  <div className="gigs-img">
                    <div className="img-slider">
                    <Slider {...slideslideroption}>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-09.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-10.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      <div className="slide-images">
                        <Link to={routes.serviceDetails}>
                          <ImageWithBasePath
                            src="assets/img/gigs/gigs-11.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                        </Link>
                      </div>
                      </Slider>
                    </div>
                    <div className="fav-selection"  key={9}  onClick={() => handleItemClick(9)}>
                    <Link to="#"  className={`fav-icon ${
                          selectedItems[9] ? 'favourite' : ''
                        }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="gigs-content">
                    <div className="gigs-info">
                      <Link
                        to={routes.serviceDetails}
                        className="badge bg-primary-light"
                      >
                        Social Media
                      </Link>
                      <div className="star-rate">
                        <span>
                          <i className="fa-solid fa-star" />
                          4.3
                        </span>
                      </div>
                    </div>
                    <div className="gigs-title">
                      <h3>
                        <Link to={routes.serviceDetails}>
                          I will do designing and executing targeted email
                          campaigns
                        </Link>
                      </h3>
                    </div>
                    <ul className="gigs-user-info">
                      <li className="gigs-user">
                        <ImageWithBasePath src="assets/img/user/user-09.jpg" alt="img" />
                        <p>By James</p>
                      </li>
                      <li className="gigs-loc">
                        <p>
                          <i className="feather icon-map-pin" />
                          Derby
                        </p>
                      </li>
                    </ul>
                    <div className="gigs-card-footer">
                      <h5>$850</h5>
                      <span className="badge">Delivery in 1 day</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Service List */}
              <div className="col-md-12">
                {/* Pagination */}
                <div className="pagination">
                  <ul>
                    <li>
                      <Link to="#" className="previous">
                        <i className="fa-solid fa-chevron-left" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                    <li>
                      <Link to="#">5</Link>
                    </li>
                    <li>
                      <Link to="#" className="next">
                        <i className="fa-solid fa-chevron-right" />
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* /Pagination */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Service Details */}
    </div>
  </div>
  {/* /Page Content */}
</>

    </div>
  )
}

export default ServiceGridSidebar
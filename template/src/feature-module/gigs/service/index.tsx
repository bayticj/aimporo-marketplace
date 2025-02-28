import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { price } from "../../../core/common/selectOption";
import { all_routes } from "../../router/all_routes";

const Service = () => {
  const routes = all_routes;
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreLocation, setshowMoreLocation] = useState(false);
  type SectionState = {
    categories: boolean;
    locations: boolean;
    reviews: boolean;
    budget: boolean;
    sellerDetails: boolean;
    deliveryTime: boolean;
    more: boolean;
  };

  const [showSellerDetails, setShowSellerDetails] = useState(false);
  const toggleMoreCategories = () => {
    setShowMoreCategories((prevShow) => !prevShow);
  };
  const toggleMoreLocation = () => {
    setshowMoreLocation((prevShow) => !prevShow);
  };
  const [activeSections, setActiveSections] = useState<SectionState>({
    categories: false,
    locations: false,
    reviews: false,
    budget: false,
    sellerDetails: false,
    deliveryTime: false,
    more: false,
  });

  const toggleSection = (section: keyof SectionState) => {
    setActiveSections((prevState) => {
      const newState: SectionState = {
        categories: false,
        locations: false,
        reviews: false,
        budget: false,
        sellerDetails: false,
        deliveryTime: false,
        more: false,
      };
      return {
        ...newState,
        [section]: !prevState[section],
      };
    });
  };
  const handleShowMore = () => {
    setShowSellerDetails((prevShow) => !prevShow);
  };
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
  const trendslideroption = {
    dots: false,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
  const slideslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
          <div className="breadcrumb-img">
            <div className="breadcrumb-left">
              <ImageWithBasePath
                src="assets/img/bg/banner-bg-03.png"
                alt="img"
              />
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
                      Digital Marketing
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title mb-0">
                  Browse Digital Marketing Services{" "}
                  <span className="text-primary">“ 900 Services ”</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* Category Section */}
                <div className="marketing-section">
                  <div className="marketing-content">
                    <h2>Digital Marketing</h2>
                    <p>
                      Digital marketing is an essential component of modern
                      business, given the widespread use of the internet and
                      digital devices.
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
                {/* /Category Section */}
                {/* Trending Categories */}
                <div className="trend-section">
                  <div className="row align-items-center">
                    <div className="col-sm-10">
                      <h3>Trending Categories on Digital Marketing</h3>
                    </div>
                    <div className="col-sm-2 text-sm-end">
                      <div className="owl-nav trend-nav nav-control nav-top" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="trend-items ">
                        <Slider {...trendslideroption}>
                          <div className="trend-box">
                            <div className="trend-info">
                              <h6>
                                <Link to={routes.serviceSubCategory}>
                                  Website Promotion
                                </Link>
                              </h6>
                              <p>(80 Services)</p>
                            </div>
                            <Link to={routes.serviceSubCategory}>
                              <i className="feather icon-arrow-up-right" />
                            </Link>
                          </div>
                          <div className="trend-box">
                            <div className="trend-info">
                              <h6>
                                <Link to={routes.serviceSubCategory}>
                                  Ecommerce-Seo
                                </Link>
                              </h6>
                              <p>(42 Services)</p>
                            </div>
                            <Link to={routes.serviceSubCategory}>
                              <i className="feather icon-arrow-up-right" />
                            </Link>
                          </div>
                          <div className="trend-box">
                            <div className="trend-info">
                              <h6>
                                <Link to={routes.serviceSubCategory}>
                                  Promoted Listing
                                </Link>
                              </h6>
                              <p>(24 Services)</p>
                            </div>
                            <Link to={routes.serviceSubCategory}>
                              <i className="feather icon-arrow-up-right" />
                            </Link>
                          </div>
                          <div className="trend-box">
                            <div className="trend-info">
                              <h6>
                                <Link to={routes.serviceSubCategory}>
                                  Social Ecommerce
                                </Link>
                              </h6>
                              <p>(55 Services)</p>
                            </div>
                            <Link to={routes.serviceSubCategory}>
                              <i className="feather icon-arrow-up-right" />
                            </Link>
                          </div>
                          <div className="trend-box">
                            <div className="trend-info">
                              <h6>
                                <Link to={routes.serviceSubCategory}>
                                  Promoted Listing
                                </Link>
                              </h6>
                              <p>(24 Services)</p>
                            </div>
                            <Link to={routes.serviceSubCategory}>
                              <i className="feather icon-arrow-up-right" />
                            </Link>
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Trending Categories */}
                {/* Filter */}
                <div className="filters-section">
                  <ul className="filters-wrap">
                    {/* Categories */}
                    <li>
                      <div
                        className={`collapse-card ${
                          activeSections.categories ? "active" : ""
                        }`}
                      >
                        <div className="filter-header">
                          <Link
                            to="#"
                            onClick={() => toggleSection("categories")}
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/category-icon.svg"
                              alt="icon"
                            />
                            Categories
                          </Link>
                        </div>
                        <div
                          id="categories"
                          className={`collapse-body ${
                            activeSections.categories ? "active" : "enable"
                          }`}
                          style={{
                            display: activeSections.categories
                              ? "block"
                              : "none",
                          }}
                        >
                          <>
                            <div className="form-group search-group">
                              <span className="search-icon">
                                <i className="feather icon -search" />
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
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Programming &amp; Coding
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Data Science &amp; Analysis
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Databases{" "}
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Mobile App Development
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Email Template Development
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    CMS Development
                                  </span>
                                </label>
                              </li>
                              <li>
                                {showMoreCategories && (
                                  <div className="view-content">
                                    <div className="viewall-one">
                                      <ul>
                                        <li>
                                          <label className="custom_check">
                                            <input type="checkbox" defaultChecked={true} />
                                            <span className="checkmark" />
                                            <span className="checked-title">
                                              ECommerce CMS Development
                                            </span>
                                          </label>
                                        </li>
                                        <li>
                                          <label className="custom_check">
                                            <input type="checkbox" defaultChecked={true} />
                                            <span className="checkmark" />
                                            <span className="checked-title">
                                              Programming
                                            </span>
                                          </label>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                )}
                                <div className="view-all">
                                  <Link
                                    onClick={toggleMoreCategories}
                                    to="#"
                                    className="viewall-button-one"
                                  >
                                    <span>
                                      {showMoreCategories
                                        ? "Less Categories"
                                        : "More 20+ Categories"}
                                    </span>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                            <div className="filter-btn">
                              <Link to="#">Reset</Link>
                              <button className="btn btn-primary">Apply</button>
                            </div>
                          </>
                        </div>
                      </div>
                    </li>
                    {/* /Categories */}
                    {/* Locations */}
                    <li>
                      <div
                        className={`collapse-card ${
                          activeSections.locations ? "active" : ""
                        }`}
                      >
                        <div className="filter-header">
                          <Link
                            to="#"
                            onClick={() => toggleSection("locations")}
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/map-icon.svg"
                              alt="icon"
                            />
                            Locations
                          </Link>
                        </div>
                        <div
                          id="locations"
                          className={`collapse-body ${
                            activeSections.locations ? "active" : "enable"
                          }`}
                          style={{
                            display: activeSections.locations
                              ? "block"
                              : "none",
                          }}
                        >
                          <>
                            <div className="form-group search-group">
                              <span className="search-icon">
                                <i className="feather icon -search" />
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
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">Canada</span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">Bolivia</span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Tunsania
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">
                                    Indonesia
                                  </span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">UK</span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">UAE</span>
                                </label>
                              </li>
                              <li>
                                <label className="custom_check">
                                  <input type="checkbox" defaultChecked={true} />
                                  <span className="checkmark" />
                                  <span className="checked-title">USA</span>
                                </label>
                              </li>
                              <li>
                                {showMoreLocation && (
                                  <div className="view-content">
                                    <div className="viewall-location">
                                      <ul>
                                        <li>
                                          <label className="custom_check">
                                            <input type="checkbox" defaultChecked={true} />
                                            <span className="checkmark" />
                                            <span className="checked-title">
                                              Malaysia
                                            </span>
                                          </label>
                                        </li>
                                        <li>
                                          <label className="custom_check">
                                            <input type="checkbox" defaultChecked={true} />
                                            <span className="checkmark" />
                                            <span className="checked-title">
                                              Japan
                                            </span>
                                          </label>
                                        </li>
                                      </ul>
                                    </div>
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
                              </li>
                            </ul>
                            <div className="filter-btn">
                              <Link to="#">Reset</Link>
                              <button className="btn btn-primary">Apply</button>
                            </div>
                          </>
                        </div>
                      </div>
                    </li>
                    {/* /Locations */}
                    {/* Ratings */}
                    <li>
                      <div
                        className={`collapse-card ${
                          activeSections.reviews ? "active" : ""
                        }`}
                      >
                        <div className="filter-header">
                          <Link to="#" onClick={() => toggleSection("reviews")}>
                            <ImageWithBasePath
                              src="assets/img/icons/rating-icon.svg"
                              alt="icon"
                            />
                            Reviews
                          </Link>
                        </div>
                        <div
                          id="ratings"
                          className={`collapse-body ${
                            activeSections.reviews ? "active" : "enable"
                          }`}
                          style={{
                            display: activeSections.reviews ? "block" : "none",
                          }}
                        >
                          <ul className="checkbox-list star-rate">
                            <li>
                              <label className="custom_check">
                                <input type="checkbox" defaultChecked={true} />
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
                                <input type="checkbox" defaultChecked={true} />
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
                                <input type="checkbox" defaultChecked={true} />
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
                                <input type="checkbox" defaultChecked={true} />
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
                                <input type="checkbox" defaultChecked={true} />
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
                          <div className="filter-btn">
                            <Link to="#">Reset</Link>
                            <button className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* /Ratings */}
                    {/* Budget */}
                    <li>
                      <div
                        className={`collapse-card ${
                          activeSections.budget ? "active" : ""
                        }`}
                      >
                        <div className="filter-header">
                          <Link to="#" onClick={() => toggleSection("budget")}>
                            <ImageWithBasePath
                              src="assets/img/icons/money-icon.svg"
                              alt="icon"
                            />
                            Budget
                          </Link>
                        </div>
                        <div
                          id="budget"
                          className={`collapse-body ${
                            activeSections.budget ? "active" : "enable"
                          }`}
                          style={{
                            display: activeSections.budget ? "block" : "none",
                          }}
                        >
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
                                <input type="radio" name="budget" defaultChecked />
                                <span className="checkmark" />
                                <span className="text-dark"> Value :</span>{" "}
                                Under $4500
                              </label>
                            </li>
                            <li>
                              <label className="custom_radio">
                                <input type="radio" name="budget" defaultChecked/>
                                <span className="checkmark" />
                                <span className="text-dark">
                                  {" "}
                                  Mid-range :
                                </span>{" "}
                                Under $4500
                              </label>
                            </li>
                            <li>
                              <label className="custom_radio">
                                <input type="radio" name="budget" defaultChecked/>
                                <span className="checkmark" />
                                <span className="text-dark">
                                  {" "}
                                  High-end :
                                </span>{" "}
                                Under $4500
                              </label>
                            </li>
                          </ul>
                          <div className="filter-btn">
                            <Link to="#">Reset</Link>
                            <button className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* /Budget */}
                    {showSellerDetails && (
                      <li>
                        <div
                          className={`collapse-card ${
                            activeSections.sellerDetails ? "active" : ""
                          }`}
                        >
                          <div className="filter-header">
                            <Link
                              to="#"
                              onClick={() => toggleSection("sellerDetails")}
                            >
                              <ImageWithBasePath
                                src="assets/img/icons/user-icon.svg"
                                alt="icon"
                              />
                              Seller Details
                            </Link>
                          </div>
                          <div
                            id="seller"
                            className={`collapse-body ${
                              activeSections.sellerDetails ? "active" : "hidden"
                            }`}
                            style={{
                              display: activeSections.sellerDetails
                                ? "block"
                                : "none",
                            }}
                          >
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
                            <div className="filter-btn">
                              <Link to="#">Reset</Link>
                              <button className="btn btn-primary">Apply</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                    {/* /Seller Details */}
                    {/* Delivery Time */}
                    <li>
                      <div
                        className={`collapse-card ${
                          activeSections.deliveryTime ? "active" : ""
                        }`}
                      >
                        <div className="filter-header">
                          <Link
                            to="#"
                            onClick={() => toggleSection("deliveryTime")}
                          >
                            <ImageWithBasePath
                              src="assets/img/icons/time-icon.svg"
                              alt="icon"
                            />
                            Delivery Time
                          </Link>
                        </div>
                        <div
                          id="deivery"
                          className={`collapse-body ${
                            activeSections.deliveryTime ? "active" : "hidden"
                          }`}
                          style={{
                            display: activeSections.deliveryTime
                              ? "block"
                              : "none",
                          }}
                        >
                          <ul className="checkbox-list">
                            <li>
                              <label className="custom_radio">
                                <input type="radio" name="budget"  defaultChecked />
                                <span className="checkmark" />
                                Enter 24H
                              </label>
                            </li>
                            <li>
                              <label className="custom_radio">
                                <input type="radio" name="budget" defaultChecked/>
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
                          <div className="filter-btn">
                            <Link to="#">Reset</Link>
                            <button className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* /Delivery Time */}
                    <li className="view-all">
                      <Link
                        to="#"
                        className="show-more"
                        onClick={handleShowMore}
                      >
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/add-icon.svg"
                            alt="img"
                          />
                        </span>
                        <span>
                          {" "}
                          {showSellerDetails ? "Show Less" : "Show More"}
                        </span>
                      </Link>
                    </li>
                  </ul>
                  {/* /Filter */}
                  {/* Sort By */}
                  <div className="search-filter-selected float-lg-end">
                    <div className="form-group">
                      <span className="sort-text">Sort By</span>
                      <CommonSelect
                        className="select serviceselect"
                        options={price}
                        defaultValue={price[0]}
                      />
                    </div>
                  </div>
                  {/* /Sort By */}
                </div>
                {/* /Filter */}
              </div>
            </div>
            {/* Service */}
            <div className="service-gigs">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
                      <div className="gigs-grid">
                        <div className="gigs-img">
                          <div className="img-slider ">
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
                          <div
                            className="fav-selection"
                            key={9}
                            onClick={() => handleItemClick(9)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[9] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-01.jpg"
                                alt="img"
                              />
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
                            <p>
                              <i className="feather icon-map-pin" />
                              Newyork
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                I will do english or german transcript of any
                                audio file or video
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$780</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={2}
                            onClick={() => handleItemClick(2)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[2] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-02.jpg"
                                alt="img"
                              />
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
                            <p>
                              <i className="feather icon-map-pin" />
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 2 day</span>
                            </div>
                            <h5>$350</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={3}
                            onClick={() => handleItemClick(3)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[3] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-03.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
                            <Link
                              to={routes.serviceDetails}
                              className="badge bg-primary-light"
                            >
                              Promoted Listings
                            </Link>
                            <p>
                              <i className="feather icon-map-pin" />
                              Canada
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                I will develop openai, dalle, chat gpt app for
                                mobile
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$830</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={4}
                            onClick={() => handleItemClick(4)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[4] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-01.jpg"
                                alt="img"
                              />
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
                            <p>
                              <i className="feather icon-map-pin" />
                              Indonesia
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                Embedded Android &amp; AOSP customizations...
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$900</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={5}
                            onClick={() => handleItemClick(5)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[5] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-02.jpg"
                                alt="img"
                              />
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
                            <p>
                              <i className="feather icon-map-pin" />
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$400</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={6}
                            onClick={() => handleItemClick(6)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[6] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-03.jpg"
                                alt="img"
                              />
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
                            <p>
                              <i className="feather icon-map-pin" />
                              Bolivia
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                I will do integrating AR elements into marketing
                                strategies for customers...
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
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$950</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={7}
                            onClick={() => handleItemClick(7)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[7] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-01.jpg"
                                alt="img"
                              />
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
                            </Link>{" "}
                            <small>+1</small>
                            <p>
                              <i className="feather icon-map-pin" />
                              Derby
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                Managing and optimizing paid advertising
                                campaigns for search...
                              </Link>
                            </h3>
                          </div>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              4.9 (120 Reviews)
                            </span>
                          </div>
                          <div className="gigs-card-footer">
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$680</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={8}
                            onClick={() => handleItemClick(8)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[8] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-08.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
                            <Link
                              to={routes.serviceDetails}
                              className="badge bg-primary-light"
                            >
                              Influence Marketing
                            </Link>
                            <p>
                              <i className="feather icon-map-pin" />
                              Bristol
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                I will do collaborating with influencers to
                                promote products and services.
                              </Link>
                            </h3>
                          </div>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              3.5 (220 Reviews)
                            </span>
                          </div>
                          <div className="gigs-card-footer">
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$960</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Service List */}
                    {/* Service List */}
                    <div className="col-lg-4 col-md-6">
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
                          <div
                            className="fav-selection"
                            key={9}
                            onClick={() => handleItemClick(9)}
                          >
                            <Link to="#" className="video-icon">
                              <i className="feather icon-video" />
                            </Link>
                            <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[9] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                          </div>
                          <div className="user-thumb">
                            <Link to={routes.userProfile}>
                              <ImageWithBasePath
                                src="assets/img/user/user-09.jpg"
                                alt="img"
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
                            <Link
                              to={routes.serviceDetails}
                              className="badge bg-primary-light"
                            >
                              Email Marketing
                            </Link>
                            <p>
                              <i className="feather icon-map-pin" />
                              Manchester
                            </p>
                          </div>
                          <div className="gigs-title">
                            <h3>
                              <Link to={routes.serviceDetails}>
                                I will do designing and executing targeted email
                                campaigns
                              </Link>
                            </h3>
                          </div>
                          <div className="star-rate">
                            <span>
                              <i className="fa-solid fa-star" />
                              4.3 (50 Reviews)
                            </span>
                          </div>
                          <div className="gigs-card-footer">
                            <div>
                              <Link to="#" className="share-icon">
                                <i className="feather icon-share-2" />
                              </Link>
                              <span className="badge">Delivery in 1 day</span>
                            </div>
                            <h5>$850</h5>
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
            {/* /Service */}
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default Service;

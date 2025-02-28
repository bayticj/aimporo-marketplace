import React from "react";
import ImageWithBasePath from "../../../core/img";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { arrivals } from "../../../core/common/selectOption";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const Categories = () => {
  const routes = all_routes;
  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
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
        <div className="page-content">
          <div className="container">
            <div className="row">
              {/* Category Section */}
              <div className="col-md-12">
                <div className="marketing-section">
                  <div className="marketing-content">
                    <h2>All Categories</h2>
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
              </div>
              {/* /Category Section */}
              {/* Sort By */}
              <div className="sortby-title">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h4>
                      10 Categories found with <span>14,787</span> Services
                    </h4>
                  </div>
                  <div className="col-md-6">
                    <div className="search-filter-selected float-md-end">
                      <div className="form-group">
                        <span className="sort-text">Sort By</span>

                        <CommonSelect
                          className="select serviceselect"
                          options={arrivals}
                          defaultValue={arrivals[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Sort By */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-01.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$4,580</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Social Media</Link>
                      </h4>
                      <span>7860 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-02.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$5,620</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Artificial Intelligence</Link>
                      </h4>
                      <span>4709 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-03.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$4,310</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Business</Link>
                      </h4>
                      <span>1590 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-04.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$2,780</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Music &amp; Audio</Link>
                      </h4>
                      <span>1458 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-05.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$8,060</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Programming &amp; Tech</Link>
                      </h4>
                      <span>5678 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-06.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$2,130</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Digital Marketing</Link>
                      </h4>
                      <span>1874 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-07.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$4,910</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Writing &amp; Translation</Link>
                      </h4>
                      <span>2478 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-08.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$3,040</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Photography</Link>
                      </h4>
                      <span>1454 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-09.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$2,850</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Consulting</Link>
                      </h4>
                      <span>1274 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-10.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$2,850</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Events</Link>
                      </h4>
                      <span>1874 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-11.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$4,950</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>Copywriting</Link>
                      </h4>
                      <span>2478 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Categories List */}
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="service-grid">
                  <div className="service-img">
                    <Link to={routes.service}>
                      <ImageWithBasePath
                        src="assets/img/service/service-12.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="avg-price">
                      <h6>Average Price</h6>
                      <span>$6,580</span>
                    </div>
                  </div>
                  <div className="service-type d-flex justify-content-between align-items-center">
                    <div className="servive-name">
                      <h4>
                        <Link to={routes.service}>CMS Development</Link>
                      </h4>
                      <span>1454 Sevices</span>
                    </div>
                    <div className="next-arrow">
                      <Link to={routes.service}>
                        <i className="feather icon-arrow-up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Categories List */}
              {/* Load More */}
              <div className="search-load-btn">
                <Link to="#" className="btn btn-secondary">
                  <ImageWithBasePath
                    src="assets/img/icons/loader-icon-01.svg"
                    className="spinner-border"
                    alt="Icon"
                  />{" "}
                  Load More
                </Link>
              </div>
              {/* /Load More */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default Categories;

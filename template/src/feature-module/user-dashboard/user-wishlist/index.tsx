import React, { useState } from "react";
import Breadcrumb from "../breadcrumb";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserSidebar from "../user-sidebar";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const UserWishlist = () => {
  const routes = all_routes;
  const [isClassAdded, setIsClassAdded] = useState<boolean[]>([true,true,true,true,true,true,true]);
  // const isClassAdded: boolean[] = [true,true,true,true,true,true,true];

  const slideslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    draggable: true,
    tochMove: true,
    swipe: true,
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
  const toggleClass = (index: number) => {
    setIsClassAdded(prevState => 
      prevState.map((item, i) => (i === index ? !item : item))
    );
  }
  return (
    <>
      <Breadcrumb page="Wishlist" />
      {/* Page Content */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
              <UserSidebar />
            </div>
            {/* /Sidebar */}
            {/*User Wishlist */}
            <div className="col-xl-9 col-lg-8">
              <div className="dashboard-header">
                <div className="main-title">
                  <h3>Wishlist</h3>
                  <p>Showing 1 to 7 of 17 entries</p>
                </div>
                <div className="head-info">
                  <p>
                    Total Wishlist <span className="text-primary">(17)</span>
                  </p>
                </div>
              </div>
              <div className="row">
                {/* Service List */}
                <div className="col-xl-4 col-md-6">
                  <div className="gigs-grid">
                    <div className="gigs-img">
                      <div className="img-slider owl-carousel">
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
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </div>
                      <div className="fav-selection">
                      <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[1] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[1] ? 'favourite':''}`}
                            onClick={()=>toggleClass(1)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
                          Software Development
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
                            Designing and developing software applications
                          </Link>
                        </h3>
                      </div>
                      <ul className="gigs-user-info">
                        <li className="gigs-user">
                          <ImageWithBasePath
                            src="assets/img/user/user-01.jpg"
                            alt="img"
                          />
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
                      <div className="img-slider owl-carousel">
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
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </div>
                      <div className="fav-selection">
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[2] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[2] ? 'favourite':''}`}
                            onClick={()=>toggleClass(2)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link to="" className="badge bg-primary-light">
                          Lifestyle
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
                          <ImageWithBasePath
                            src="assets/img/user/user-02.jpg"
                            alt="img"
                          />
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
                      <div className="img-slider owl-carousel">
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
                      <div className="fav-selection">
                      <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[3] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[3] ? 'favourite':''}`}
                            onClick={()=>toggleClass(3)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link to="" className="badge bg-primary-light">
                          Artificial Intelligence
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
                            I will develop openai, dalle, chat gpt app for
                            mobile
                          </Link>
                        </h3>
                      </div>
                      <ul className="gigs-user-info">
                        <li className="gigs-user">
                          <ImageWithBasePath
                            src="assets/img/user/user-03.jpg"
                            alt="img"
                          />
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
                      <div className="img-slider owl-carousel">
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
                      <div className="fav-selection">
                      <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[4] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[4] ? 'favourite':''}`}
                            onClick={()=>toggleClass(4)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link to="" className="badge bg-primary-light">
                          Artificial Intelligence
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
                            I will develop openai, dalle, chat gpt app for
                            mobile
                          </Link>
                        </h3>
                      </div>
                      <ul className="gigs-user-info">
                        <li className="gigs-user">
                          <ImageWithBasePath
                            src="assets/img/user/user-03.jpg"
                            alt="img"
                          />
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
                      <div className="img-slider owl-carousel">
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
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </div>
                      <div className="fav-selection">
                      <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[5] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[5] ? 'favourite':''}`}
                            onClick={()=>toggleClass(5)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link to="" className="badge bg-primary-light">
                          Lifestyle
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
                          <ImageWithBasePath
                            src="assets/img/user/user-02.jpg"
                            alt="img"
                          />
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
                      <div className="img-slider owl-carousel">
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
                        <span className="badge bg-warning">
                          <i className="feather icon-star" />
                          Featured
                        </span>
                        <span className="badge bg-danger">
                          <i className="fa-solid fa-meteor" />
                          Hot
                        </span>
                      </div>
                      <div className="fav-selection">
                      <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">{isClassAdded[6] ?'Remove From Wishlist' :'Add To Wishlist'}</Tooltip>}
                        >
                          <Link
                            to="#"
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            data-bs-original-title="Remove From Wishlist"
                            className={`fav-icon ${isClassAdded[6] ? 'favourite':''}`}
                            onClick={()=>toggleClass(6)}
                          >
                            <i className="feather icon-heart" />
                          </Link>
                        </OverlayTrigger>
                      </div>
                    </div>
                    <div className="gigs-content">
                      <div className="gigs-info">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
                          Software Development
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
                            Designing and developing software applications
                          </Link>
                        </h3>
                      </div>
                      <ul className="gigs-user-info">
                        <li className="gigs-user">
                          <ImageWithBasePath
                            src="assets/img/user/user-01.jpg"
                            alt="img"
                          />
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
              </div>
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
            </div>
            {/* /User Wishlist */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default UserWishlist;

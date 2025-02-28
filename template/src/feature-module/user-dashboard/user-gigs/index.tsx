import React from 'react'
import Breadcrumb from '../breadcrumb'
import UserSidebar from '../user-sidebar'
import ImageWithBasePath from '../../../core/img'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { all_routes } from '../../router/all_routes'
import { Link } from 'react-router-dom'
const UserGigs = () => {
  const routes = all_routes;
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
  return (
    <>
    <Breadcrumb page='Manage Gigs'/>
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-4 col-xl-3 theiaStickySidebar">
          <UserSidebar/>
        </div>
        {/* /Sidebar */}
        {/* Manage Gigs */}
        <div className="col-xl-9 col-lg-8">
          <div className="dashboard-header">
            <div className="main-title">
              <h3>Manage Gigs</h3>
            </div>
            <div className="head-info">
              <Link to={routes.addGigs} className="btn btn-primary">
                Add New Gig
              </Link>
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
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
                        I will do professional lifestyle and product photography
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
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
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
                  <div className="img-slider owl-carousel">
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
                      Programming &amp; Tech
                    </Link>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.7
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
                      <p>By James</p>
                    </li>
                    <li className="gigs-loc">
                      <p>
                        <i className="feather icon-map-pin" />
                        Bolivia
                      </p>
                    </li>
                  </ul>
                  <div className="gigs-card-footer">
                    <h5>$650</h5>
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link
                      to="#"
                      className="badge bg-primary-light"
                    >
                      Chatbot Integration
                    </Link>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.2
                      </span>
                    </div>
                  </div>
                  <div className="gigs-title">
                    <h3>
                      <Link to={routes.serviceDetails}>
                        I will do implementing chatbots on websites or messaging
                        apps
                      </Link>
                    </h3>
                  </div>
                  <ul className="gigs-user-info">
                    <li className="gigs-user">
                      <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="img" />
                      <p>By David</p>
                    </li>
                    <li className="gigs-loc">
                      <p>
                        <i className="feather icon-map-pin" />
                        Manchester
                      </p>
                    </li>
                  </ul>
                  <div className="gigs-card-footer">
                    <h5>$750</h5>
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
                      AR Marketing
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
                        I will do integrating AR elements into marketing
                        strategies for customers...
                      </Link>
                    </h3>
                  </div>
                  <ul className="gigs-user-info">
                    <li className="gigs-user">
                      <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
                      <p>By Lance</p>
                    </li>
                    <li className="gigs-loc">
                      <p>
                        <i className="feather icon-map-pin" />
                        Derby
                      </p>
                    </li>
                  </ul>
                  <div className="gigs-card-footer">
                    <h5>$800</h5>
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
                      PPC Advertising
                    </Link>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.4
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
                  <div className="img-slider owl-carousel">
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
                      Influence Marketing
                    </Link>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.0
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
                      <p>By Cindy</p>
                    </li>
                    <li className="gigs-loc">
                      <p>
                        <i className="feather icon-map-pin" />
                        Moscow
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
                  <div className="img-slider owl-carousel">
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
                  <div className="fav-selection">
                    <Link to={routes.editGigs}>
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
                <div className="gigs-content">
                  <div className="gigs-info">
                    <Link to="#" className="badge bg-primary-light">
                      Email Marketing
                    </Link>
                    <div className="star-rate">
                      <span>
                        <i className="fa-solid fa-star" />
                        4.1
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
                      <p>By Scott</p>
                    </li>
                    <li className="gigs-loc">
                      <p>
                        <i className="feather icon-map-pin" />
                        Norwich
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
        {/* /Manage Gigs */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

  )
}

export default UserGigs
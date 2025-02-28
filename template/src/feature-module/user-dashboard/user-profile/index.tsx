import React from "react";
import Breadcrumb from "../breadcrumb";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { location, review, Service } from "../../../core/common/selectOption";

const UserProfile = () => {
  const routes = all_routes;
  function SampleNextArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-next"
        style={{ ...style, display: "flex" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { style, onClick } = props;
    return (
      <div
        className="slick-nav slick-nav-prev"
        style={{ ...style, display: "flex" }}
        onClick={onClick}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
    );
  }
  const works = {
    dots: false,
    autoplay: false,
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
    <>
      <Breadcrumb page="My Profile" />
      <div style={{ overflowX: 'hidden' }}>
      <>
        {/* Content */}
        <div className="page-content content">
          <div className="container">
            <div className="row">
              {/* Service Details */}
              <div className="col-lg-8">
                <div className="service-wrap my-profile-info">
                  <div className="my-profile-details">
                    <div className="user-details">
                      <div className="user-img">
                        <ImageWithBasePath
                          src="assets/img/user/user-05.jpg"
                          alt="img"
                        />
                      </div>
                      <div className="user-info">
                        <h5>
                          <span className="me-2">Adrian Revolt</span>{" "}
                          <span className="badge badge-success">
                            <i className="fa-solid fa-circle" /> Online
                          </span>
                        </h5>
                        <h6>An abundance of creativity</h6>
                        <p>
                          <i className="fa-solid fa-star" />
                          Ratings 5.0 (45 Reviews)
                        </p>
                      </div>
                    </div>
                    <div className="user-edit">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/user-edit.svg"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <div className="more-details">
                        <span className="icon-info">
                          <ImageWithBasePath
                            src="assets/img/icons/map-pin-heart.svg"
                            alt=""
                          />
                        </span>
                        <h6>
                          From<span>United States</span>
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="more-details">
                        <span className="icon-info">
                          <ImageWithBasePath
                            src="assets/img/icons/user-star.svg"
                            alt=""
                          />
                        </span>
                        <h6>
                          Member SInce<span>25 Jan 2024</span>
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="more-details">
                        <span className="icon-info">
                          <ImageWithBasePath
                            src="assets/img/icons/language-katakana.svg"
                            alt=""
                          />
                        </span>
                        <h6>
                          Speaks<span>English, Portugese</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* About Me */}
                <div className="service-wrap">
                  <h3>About Me</h3>
                  <p>
                    Hello, Greetings! My name is Adrian, a professional
                    embroidery digitizer who converts an Image into embroidery
                    files such as DST, PES or any other. I can produce an
                    embroidery design file without any fabric puckering. I'm the
                    guy who has more than 15 years of experience in the field of
                    embroidery design digitizing. I love what I do because
                    embroidery digitizing is my passion and profession. so, get
                    in touch with me if you have any question. thank you!
                  </p>
                </div>
                {/* /About Me */}
                {/* Skills */}
                <div className="service-wrap skills-wrap">
                  <h3>Skills</h3>
                  <ul className="my-skills">
                    <li>
                      <span>
                        <i className="fa-solid fa-circle" />
                        Logo design
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa-solid fa-circle" />
                        Graphics Design
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa-solid fa-circle" />
                        Adobe illustrator
                      </span>
                    </li>
                  </ul>
                </div>
                {/* /Skills */}
                {/* Recent Works */}
                <div className="service-wrap">
                  <div className="row align-items-center">
                    <div className="col-sm-8">
                      <h3>Checkout My Recent Works</h3>
                    </div>
                    <div className="col-sm-4">
                      <div className="owl-nav mynav1 nav-control" />
                    </div>
                  </div>
                  <div className="owl-carousel recent-carousel">
                    <Slider {...works}>
                      <div className="recent-img">
                        <ImageWithBasePath
                          src="assets/img/service/service-slide-01.jpg"
                          className="img-fluid"
                          alt="Slider Img"
                        />
                      </div>
                      <div className="recent-img">
                        <ImageWithBasePath
                          src="assets/img/service/service-slide-02.jpg"
                          className="img-fluid"
                          alt="Slider Img"
                        />
                      </div>
                      <div className="recent-img">
                        <ImageWithBasePath
                          src="assets/img/service/service-slide-03.jpg"
                          className="img-fluid"
                          alt="Slider Img"
                        />
                      </div>
                      <div className="recent-img">
                        <ImageWithBasePath
                          src="assets/img/service/service-slide-04.jpg"
                          className="img-fluid"
                          alt="Slider Img"
                        />
                      </div>
                    </Slider>
                  </div>
                </div>
                {/* /Recent Works */}
                {/* Review Lists */}
                <div className="review-widget">
                  <div className="review-title sort-search-gigs">
                    <div className="row align-items-center">
                      <div className="col-sm-6">
                        <h3>Reviews (45)</h3>
                      </div>
                      <div className="col-sm-6">
                        <div className="search-filter-selected">
                          <div className="form-group mb-0">
                            <span className="sort-text">Sort By</span>

                            <CommonSelect
                              className="select serviceselect"
                              options={review}
                              defaultValue={review[0]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="review-lists">
                    <li>
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="review-img">
                            <ImageWithBasePath
                              src="assets/img/user/user-01.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="reviewer-info">
                            <div className="reviewer-loc">
                              <h6>
                                <Link to="#">kadajsalamander</Link>
                              </h6>
                              <p>
                                <i className="feather icon-map-pin" />
                                London
                              </p>
                            </div>
                            <div className="reviewer-rating">
                              <div className="star-rate">
                                <span className="ratings">
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                </span>
                                <span className="rating-count">5.0 </span>
                              </div>
                              <p>1 Months ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            I recently hired a him to help me with a project and
                            I must say, I am extremely impressed
                          </p>
                          <Link to="#" className="reply-btn">
                            <i className="feather icon-corner-up-left" />
                            Reply
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="review-img">
                            <ImageWithBasePath
                              src="assets/img/user/user-11.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="reviewer-info">
                            <div className="reviewer-loc">
                              <h6>
                                <Link to="#">Simon</Link>
                              </h6>
                              <p>
                                <i className="feather icon-map-pin" />
                                Newyork
                              </p>
                            </div>
                            <div className="reviewer-rating">
                              <div className="star-rate">
                                <span className="ratings">
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star" />
                                </span>
                                <span className="rating-count">4.0 </span>
                              </div>
                              <p>15 days ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            Firstly, the his communication skills were
                            top-notch.
                          </p>
                          <Link to="#" className="reply-btn">
                            <i className="feather icon-corner-up-left" />
                            Reply
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="review-img">
                            <ImageWithBasePath
                              src="assets/img/user/user-04.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="reviewer-info">
                            <div className="reviewer-loc">
                              <h6>
                                <Link to="#">Andy</Link>
                              </h6>
                              <p>
                                <i className="feather icon-map-pin" />
                                Bulgaria
                              </p>
                            </div>
                            <div className="reviewer-rating">
                              <div className="star-rate">
                                <span className="ratings">
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star" />
                                </span>
                                <span className="rating-count">4.0 </span>
                              </div>
                              <p>1 Months ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            One of the things that stood out to me the most was
                            the his ability to meet deadlines.
                          </p>
                          <Link to="#" className="reply-btn">
                            <i className="feather icon-corner-up-left" />
                            Reply
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="review-wrap">
                        <div className="review-user-info">
                          <div className="review-img">
                            <ImageWithBasePath
                              src="assets/img/user/user-06.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="reviewer-info">
                            <div className="reviewer-loc">
                              <h6>
                                <Link to="#">Dane jose</Link>
                              </h6>
                              <p>
                                <i className="feather icon-map-pin" />
                                Sweden
                              </p>
                            </div>
                            <div className="reviewer-rating">
                              <div className="star-rate">
                                <span className="ratings">
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                  <i className="fa-solid fa-star filled" />
                                </span>
                                <span className="rating-count">5.0 </span>
                              </div>
                              <p>1 Months ago</p>
                            </div>
                          </div>
                        </div>
                        <div className="review-content">
                          <p>
                            Overall, I highly recommend this freelancer to
                            anyone looking for high-quality work.
                          </p>
                          <Link to="#" className="reply-btn">
                            <i className="feather icon-corner-up-left" />
                            Reply
                          </Link>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <div className="review-wrap">
                            <div className="review-user-info">
                              <div className="review-img">
                                <ImageWithBasePath
                                  src="assets/img/user/user-02.jpg"
                                  alt="img"
                                />
                              </div>
                              <div className="reviewer-info">
                                <div className="reviewer-loc">
                                  <h6>
                                    <Link to="#">Harry</Link>
                                  </h6>
                                  <p>
                                    <i className="feather icon-map-pin" />
                                    France
                                  </p>
                                </div>
                                <div className="reviewer-rating">
                                  <div className="star-rate">
                                    <span className="ratings">
                                      <i className="fa-solid fa-star filled" />
                                      <i className="fa-solid fa-star filled" />
                                      <i className="fa-solid fa-star filled" />
                                      <i className="fa-solid fa-star filled" />
                                      <i className="fa-solid fa-star filled" />
                                    </span>
                                    <span className="rating-count">5.0 </span>
                                  </div>
                                  <p>1 Months ago</p>
                                </div>
                              </div>
                            </div>
                            <div className="review-content">
                              <p>Thank you</p>
                              <Link to="#" className="reply-btn">
                                <i className="feather icon-corner-up-left" />
                                Reply
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
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
                {/* /Review Lists */}
              </div>
              {/* /Service Details */}
              {/* Member Details */}
              <div className="col-lg-4 theiaStickySidebar">
                <div className="service-widget member-widget sticky-bar">
                  <ul className="member-info">
                    <li>
                      Last Project Delivery
                      <span>29 Jan 2024</span>
                    </li>
                    <li>
                      Avg. response time
                      <span>about 8 hours</span>
                    </li>
                  </ul>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#contact_me"
                    className="btn btn-primary mb-0 w-100"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
              {/* /Member Details */}
            </div>
            {/* Recent Work */}
            <div className="recent-works">
              <div className="row">
                <div className="col-md-12">
                  <div className="title-sec">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <h3>Recent Works</h3>
                      </div>
                    </div>
                  </div>
                  <div className="gigs-card-slider slider-space profile-work-slide listing-gigs owl-carousel">
                    <Slider {...works}>
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
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
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
                                I will develop modern responsive webflow
                                website...
                              </Link>
                            </h3>
                          </div>
                          <div className="gigs-card-footer">
                            <h5>$780</h5>
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
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Artificial Intelligence
                            </span>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
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
                          </div>
                          <div className="gigs-card-footer">
                            <h5>$350</h5>
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
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Programming &amp; Tech
                            </span>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
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
                          </div>
                          <div className="gigs-card-footer">
                            <h5>$830</h5>
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
                            <span className="badge bg-info">
                              <i className="fa-solid fa-circle" />
                              Graphics &amp; Design
                            </span>
                          </div>
                        </div>
                        <div className="gigs-content">
                          <div className="gigs-info">
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
                          </div>
                          <div className="gigs-card-footer">
                            <h5>$400</h5>
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
            {/* /Recent Work */}
          </div>
        </div>
        {/* /Content */}
      </>
      <>
        {/* Contact Me */}
        <div
          className="modal new-modal fade"
          id="contact_me"
          data-keyboard="false"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Me</h5>
                <button
                  type="button"
                  className="close-btn"
                  data-bs-dismiss="modal"
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body service-modal">
                <div className="row">
                  <div className="col-md-12">
                    <div className="user-details">
                      <div className="user-img">
                        <ImageWithBasePath
                          src="assets/img/user/user-05.jpg"
                          alt="img"
                        />
                      </div>
                      <div className="user-info">
                        <h5>
                          <span className="me-2">Adrian Revolt</span>{" "}
                          <span className="badge badge-success">
                            <i className="fa-solid fa-circle" /> Online
                          </span>
                        </h5>
                        <h6>An abundance of creativity</h6>
                        <p>
                          <i className="fa-solid fa-star" />
                          Ratings 5.0 (45 Reviews)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <CommonSelect
                        className="select"
                        options={Service}
                        defaultValue={Service[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="modal-form-group">
                      <CommonSelect
                        className="select"
                        options={location}
                        defaultValue={location[0]}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="modal-form-group">
                      <textarea
                        className="form-control"
                        rows={6}
                        placeholder="Enter Your Comments"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="modal-form-group">
                    <label className="custom_check mt-0 mb-0">
                      I agree to the <Link to="#">Terms &amp; Conditions</Link>
                      <input type="checkbox" name="remeber" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div className="modal-btn">
                  <Link
                    to="#"
                    data-bs-dismiss="modal"
                    className="btn btn-primary w-100"
                  >
                    Send Enquiry
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Contact Me */}
      </>
      </div>
    </>
  );
};

export default UserProfile;

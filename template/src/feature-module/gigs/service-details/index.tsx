import React, { useEffect, useRef, useState } from "react";
import ImageWithBasePath from "../../../core/img";
import Slider from "react-slick";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { Details } from "../../../core/common/selectOption";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const ServiceDetails = () => {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
  };
  const routes = all_routes;
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  const bigImgSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
    const navigate = useNavigate();

  const navigateToGigs = () => {
    // Remove the modal backdrop
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop && backdrop.parentNode) {
      backdrop.parentNode.removeChild(backdrop);
    }
     // Remove any modal-related classes from the body
     document.body.classList.remove("modal-open");
     document.body.style.paddingRight = '';
     document.body.style.overflow = '';
  };
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
}, []);
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
        breakpoint: 1,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const recentimgslideroption  = {
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
  const settings1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav2 || undefined, // Link to the second slider
    ref: (slider: any) => (sliderRef1.current = slider), // Assign the slider ref
   
};

const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: nav1 || undefined, // Link to the first slider
    ref: (slider: any) => (sliderRef2.current = slider), // Assign the slider ref
   
};
  return (
    <div style={{ overflowX: 'hidden' }}>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info breadcrumb-info">
          <div className="breadcrumb-img">
            <div className="breadcrumb-left">
              <ImageWithBasePath
                src="assets/img/bg/banner-bg-03.png"
                alt="img"
              />
            </div>
          </div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to={routes.home}>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to={routes.service}>Services</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Digital Marketing
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">
                  I will design, redesign wordpress website using elementor pro
                </h2>
                <ul className="info-links">
                  <li>
                    <i className="feather icon-calendar" />
                    Created 3 weeks ago
                  </li>
                  <li className="order-count">
                    <i className="feather icon-folder" />
                    15 Order in queue
                  </li>
                </ul>
              </div>
              <div className="col-lg-5 col-12">
                <ul className="breadcrumb-links">
                  <li>
                    <Link to="#">
                      <span>
                        <i className="feather icon-heart" />
                      </span>
                      Add to Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <span>
                        <i className="feather icon-share-2" />
                      </span>
                      Share this gigs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Content */}
        <div className="page-content content">
          <div className="container">
            <div className="row">
              {/* Service Details */}
              <div className="col-lg-8">
                {/* Slider */}
                <div className="slider-card">
                  <div className="slider service-slider">
                  <Slider {...settings1}>
                    <div className="service-img-wrap">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-01.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div className="service-img-wrap">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-02.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div className="service-img-wrap">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-03.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div className="service-img-wrap">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-04.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div className="service-img-wrap">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-05.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    </Slider>
                  </div>
                  <div className="slider slider-nav-thumbnails">
                  <Slider {...settings2}>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-01.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-02.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-03.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-04.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    <div>
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-05.jpg"
                        className="img-fluid"
                        alt="Slider Img"
                      />
                    </div>
                    </Slider>
                  </div>
                </div>
                {/* /Slider */}
                {/* Extra Services */}
                <div className="extra-service">
                  <h3>Get more with Extra Services</h3>
                  <ul className="service-time">
                    <li>
                      <div className="row align-items-center">
                        <div className="col-md-7">
                          <div className="delivery-info">
                            <h6>
                              Full website design and redesign using Elementor
                            </h6>
                            <p>Delivery in 1 day</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="delivery-amt">
                            <h6 className="amt">+200</h6>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="delivery-add">
                            <Link
                              to="#"
                              className="btn btn-light-primary add-btn"
                            >
                              <i className="feather icon-plus-circle" /> Add
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row align-items-center">
                        <div className="col-md-7">
                          <div className="delivery-info">
                            <h6>
                              Mobile responsiveness to ensure a seamless user{" "}
                            </h6>
                            <p>Delivery in 1 day</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="delivery-amt">
                            <h6 className="amt">+500</h6>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="delivery-add">
                            <Link
                              to="#"
                              className="btn btn-light-primary add-btn"
                            >
                              <i className="feather icon-plus-circle" /> Add
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row align-items-center">
                        <div className="col-md-7">
                          <div className="delivery-info">
                            <h6>Speed Optimization</h6>
                            <p>Delivery in 1 day</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="delivery-amt">
                            <h6 className="amt">+200</h6>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="delivery-add">
                            <Link
                              to="#"
                              className="btn btn-light-primary add-btn"
                            >
                              <i className="feather icon-plus-circle" /> Add
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* /Extra Services */}
                {/* About Gigs */}
                <div className="service-wrap">
                  <h3>About this Gig</h3>
                  <p>
                    Amazon affiliate marketing autopilot website with google SEO
                    Autoblog for Making Money OnlineAffiliate marketing is an
                    excellent way to earn passive income. this type of website
                    doesn't require any extra maintenance or technical knowledge
                    to run.
                  </p>
                  <p>
                    Every product will be linked with your unique affiliate ID
                    so that you will earn commissions on every sale. Autoblog
                    Feature will automatically add high-quality blog content
                    relevant to your niche to the site. No maintenance is
                    required!With my service, you will get a Complete Automatic
                    amazon affiliate website with auto blogs for passive income
                  </p>
                </div>
                {/* /About Gigs */}
                {/* Why Work With Me */}
                <div className="service-wrap">
                  <h3>Why Work With Me</h3>
                  <ul className="service-lists">
                    <li>
                      I have five years+ of experience in affiliate marketing,
                      and I am running my own affiliate marketing business, so I
                      have an understanding of how these things really work with
                      google SEO
                    </li>
                    <li>
                      I will not leave you alone after delivery like others.
                      Happy to provide Lifetime 24/7 Ongoing Support. Also, I
                      will give you a secret guide that will help you to get
                      Quick traffic and sales to the website.
                    </li>
                  </ul>
                  <p>
                    If you want to know more about how the Amazon Affiliate
                    website work, contact me, and I'll personally explain
                    everything in detail :)
                  </p>
                </div>
                {/* /Why Work With Me */}
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
                  <div className="recent-carousel">
                  <Slider {...recentimgslideroption} >
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
                {/* FAQ Lists */}
                <div className="service-wrap">
                  <h3>FAQ</h3>
                  <div className="faq-lists">
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqone"
                          aria-expanded="false"
                        >
                          Do you offer assistance after the order has been
                          completed?
                        </Link>
                      </h4>
                      <div id="faqone" className="card-collapse collapse">
                        <div className="faq-content">
                          <p>
                            Yes! My service guarantees you 24/7 lifetime support
                            for anything related to your website. Whenever you
                            encounter a problem, feel free to reach out to me
                            anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqtwo"
                          aria-expanded="false"
                        >
                          Can I choose my favorite Product category or Niche?
                        </Link>
                      </h4>
                      <div id="faqtwo" className="card-collapse collapse">
                        <div className="faq-content">
                          <p>
                            Yes! My service guarantees you 24/7 lifetime support
                            for anything related to your website. Whenever you
                            encounter a problem, feel free to reach out to me
                            anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqOne"
                          aria-expanded="false"
                        >
                          Can I add products myself?
                        </Link>
                      </h4>
                      <div id="faqOne" className="card-collapse collapse">
                        <div className="faq-content">
                          <p>
                            Yes! My service guarantees you 24/7 lifetime support
                            for anything related to your website. Whenever you
                            encounter a problem, feel free to reach out to me
                            anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="faq-card">
                      <h4 className="faq-title">
                        <Link
                          className="collapsed"
                          data-bs-toggle="collapse"
                          to="#faqfour"
                          aria-expanded="false"
                        >
                          Are there any additional or hidden charges?
                        </Link>
                      </h4>
                      <div id="faqfour" className="card-collapse collapse">
                        <div className="faq-content">
                          <p>
                            Yes! My service guarantees you 24/7 lifetime support
                            for anything related to your website. Whenever you
                            encounter a problem, feel free to reach out to me
                            anytime.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /FAQ Lists */}
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
                        options={Details}
                        defaultValue={Details[0]}
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
                                <Link to="#">
                                  kadajsalamander
                                </Link>
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
                            I must say, I am extremely impressed with their
                            work. From start to finish, the freelancer was
                            professional, efficient, and a pleasure to work
                            with.
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
                            One of the things that stood out to me the most was
                            the his ability to meet deadlines. He able to
                            deliver the project on time, despite a tight
                            deadline. This showed their professionalism and
                            dedication to their work.
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
                            anyone looking for high-quality work and exceptional
                            service. They are a true professional and I will
                            definitely be hiring them again for future projects.
                            Thank you for your hard work and dedication!
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
                              <Link
                                to="#"
                                className="reply-btn"
                              >
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
                {/* Related Tags */}
                <div className="service-wrap tags-widget">
                  <h3>Related Tags</h3>
                  <ul className="tags">
                    <li>
                      <Link to="#">Wordpress design</Link>
                    </li>
                    <li>
                      <Link to="#">Plugin</Link>
                    </li>
                  </ul>
                </div>
                {/* /Related Tags */}
              </div>
              {/* /Service Details */}
              {/* Member Details */}
              <div className="col-lg-4 theiaStickySidebar">
                <div className="sticky-bar">
                <div className="service-widget">
                  <div className="service-amt d-flex align-items-center justify-content-between">
                    <p>Price</p>
                    <h2>
                      $256{" "}
                      <span className="text-decoration-line-through fs-6">
                        $300
                      </span>
                    </h2>
                  </div>
                  <Link
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#order_details"
                    className="btn btn-primary w-100"
                  >
                    <i className="feather icon-shopping-cart" /> Buy this gig
                  </Link>
                  <div className="row gx-3 row-gap-3">
                    <div className="col-xl-4 col-lg-6 col-sm-4 col-6">
                      <div className="buy-box">
                        <i className="feather icon-clock" />
                        <p>Delivery Time</p>
                        <h6>1 day</h6>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-4 col-6">
                      <div className="buy-box">
                        <i className="feather icon-cloud" />
                        <p>Total Sales</p>
                        <h6>15</h6>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-sm-4 col-6">
                      <div className="buy-box">
                        <i className="feather icon-eye" />
                        <p>Total Views</p>
                        <h6>800</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="service-widget member-widget">
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
                      <p>
                        <i className="fa-solid fa-star" />
                        Ratings 5.0 (45 Reviews)
                      </p>
                    </div>
                  </div>
                  <ul className="member-info">
                    <li>
                      From
                      <span>United States</span>
                    </li>
                    <li>
                      Member Since
                      <span>25 Jan 2024</span>
                    </li>
                    <li>
                      Speaks
                      <span>English, Portugese</span>
                    </li>
                    <li>
                      Last Project Delivery
                      <span>29 Jan 2024</span>
                    </li>
                    <li>
                      Avg Response Time
                      <span>About 8 hours</span>
                    </li>
                  </ul>
                  <div className="about-me">
                    <h6>About Me</h6>
                    <p>
                      Hello, Greetings! My name is Adrian, and I am an
                      experienced affiliate marketer and website developer
                      {isReadMore && (
                    <span>
                        I have over five years of experience in digital affiliate marketing & WordPress website development.
                    </span>
                )}
                    </p>
                    <Link to="#" onClick={toggleReadMore} className="read-more">
                {isReadMore ? 'Read Less' : 'Read More'}
            </Link>
                  </div>
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
                      <div className="col-md-4">
                        <div className="owl-nav worknav nav-control nav-top" />
                      </div>
                    </div>
                  </div>
                  <div className="gigs-slider">
                  <Slider {...imgslideroption}>
                    <div className="gigs-grid">
                      <div className="gigs-img">
                        <div className="img-slider">
                        <Slider {...slideslideroption}>
                          <div className="slide-images">
                            <Link to={routes.serviceDetails}>
                              <ImageWithBasePath
                                src="assets/img/gigs/gigs-13.jpg"
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
                            <span className="badge bg-danger">
                              <i className="fa-solid fa-meteor" />
                              Hot
                            </span>
                          </Link>
                        </div>
                        <div className="fav-selection" key={1}
                            onClick={() => handleItemClick(1)}>
                          <Link to="#" className="video-icon">
                            <i className="feather icon-video" />
                          </Link>
                          <Link
                              to="#"
                              className={`fav-icon ${
                                selectedItems[1] ? "favourite" : ""
                              }`}
                            >
                              <i className="feather icon-heart" />
                            </Link>
                        </div>
                        <div className="user-thumb">
                          <Link to={routes.userProfile}>
                            <ImageWithBasePath
                              src="assets/img/user/user-10.jpg"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <Link to={routes.service}>
                            <span className="badge bg-primary-light">
                              Video Marketing
                            </span>
                          </Link>
                          <p>
                            <i className="feather icon-map-pin" />
                            Chicago
                          </p>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              I will do creating and promoting video content to
                              engage audiences
                            </Link>
                          </h3>
                        </div>
                        <div className="star-rate">
                          <span>
                            <i className="fa-solid fa-star" />
                            4.2 (65 Reviews)
                          </span>
                        </div>
                        <div className="gigs-card-footer">
                          <div>
                            <Link
                              to="#"
                              className="share-icon"
                            >
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                          <h5>$600</h5>
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
                                src="assets/img/gigs/gigs-14.jpg"
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
                        <div className="fav-selection" key={2}
                            onClick={() => handleItemClick(2)}>
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
                              src="assets/img/user/user-06.jpg"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <Link to={routes.service}>
                            <span className="badge bg-primary-light">
                              Local SEO
                            </span>
                          </Link>
                          <p>
                            <i className="feather icon-map-pin" />
                            Moscow
                          </p>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              Optimizing online presence to enhance visibility
                              in local search...
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
                            <Link
                              to="#"
                              className="share-icon"
                            >
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 day</span>
                          </div>
                          <h5>$550</h5>
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
                                src="assets/img/gigs/gigs-15.jpg"
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
                        <div className="fav-selection" key={2}
                            onClick={() => handleItemClick(2)}>
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
                              src="assets/img/user/user-03.jpg"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <Link to={routes.service}>
                            <span className="badge bg-primary-light">
                              Mobile Marketing
                            </span>
                          </Link>
                          <p>
                            <i className="feather icon-map-pin" />
                            Norwich
                          </p>
                        </div>
                        <div className="gigs-title">
                          <h3>
                            <Link to={routes.serviceDetails}>
                              Optimizing marketing strategies for mobiles &amp;
                              app based promotions
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
                            <Link
                              to="#"
                              className="share-icon"
                            >
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 1 day</span>
                          </div>
                          <h5>$720</h5>
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
                                alt="img"
                              />
                            </Link>
                          </div>
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
                                src="assets/img/gigs/gigs-02.jpg"
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
                        <div className="fav-selection"  key={3}
                            onClick={() => handleItemClick(3)}>
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
                              src="assets/img/user/user-04.jpg"
                              alt="img"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="gigs-content">
                        <div className="gigs-info">
                          <Link to={routes.service}>
                            <span className="badge bg-primary-light">
                              Digital Marketing
                            </span>
                          </Link>
                          <p>
                            <i className="feather icon-map-pin" />
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
                          <div>
                            <Link
                              to="#"
                              className="share-icon"
                            >
                              <i className="feather icon-share-2" />
                            </Link>
                            <span className="badge">Delivery in 2 day</span>
                          </div>
                          <h5>$900</h5>
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
  {/* Order Details */}
  
  <div
    className="modal new-modal fade"
    id="order_details"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Order Details</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>×</span>
          </button>
        </div>
        <div className="modal-body service-modal">
          <div className="row">
            <div className="col-md-12">
              <div className="order-status">
                <div className="order-item">
                  <div className="order-img">
                     <ImageWithBasePath
                      src="assets/img/service/service-slide-01.jpg"
                      alt="img"
                    />
                  </div>
                  <div className="order-info">
                    <h5>
                      I will design, redesign wordpress website using elementor
                      pro
                    </h5>
                    <ul>
                      <li>ID : #1245</li>
                      <li>Delivery : Jan 29 2024 8:10 AM</li>
                    </ul>
                  </div>
                </div>
                <h6 className="title">Details</h6>
                <div className="user-details">
                  <div className="user-img">
                     <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="img" />
                  </div>
                  <div className="user-info">
                    <h5>
                      Adrian Revolt <span className="location">From USA</span>
                    </h5>
                    <p>
                      <i className="fa-solid fa-star" />
                      Ratings 5.0 (45 Reviews)
                    </p>
                  </div>
                </div>
                <h6 className="title">Service Details</h6>
                <div className="detail-table table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Designing and developing...</td>
                        <td>1</td>
                        <td className="text-primary">$100</td>
                      </tr>
                      <tr>
                        <td>Additional 1 : I can clean</td>
                        <td>1</td>
                        <td className="text-primary">$100</td>
                      </tr>
                      <tr>
                        <td>Super Fast : Super fast delivery</td>
                        <td>1</td>
                        <td className="text-primary">$100</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={2}>Grand Total</th>
                        <th className="text-primary">$300</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="modal-btn">
                  <div className="row gx-2">
                    <div className="col-6">
                      <Link
                        to="#"
                        data-bs-dismiss="modal"
                        className="btn btn-secondary w-100 justify-content-center"
                      >
                        Cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to={routes.userPurchase}
                        className="btn btn-primary w-100" onClick={navigateToGigs}
                      >
                        Pay Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Order Details */}
</>

    </div>
  );
};

export default ServiceDetails;

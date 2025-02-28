import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes';
import Slider from 'react-slick';

const AboutUs = () => {
  const routes = all_routes;
  const popularcaregoryOption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
  const reviewslideroption = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  return (
    <div style={{ overflowX: 'hidden' }}>
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
                About Us{" "}
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">About Us</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* About Us */}
  <section className="about-us-section">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-sm-6">
              <div className="about-inner-img">
                <ImageWithBasePath
                  src="assets/img/aboutus/about-us-01.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-12">
                  <div className="about-inner-img">
                    <ImageWithBasePath
                      src="assets/img/aboutus/about-us-02.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="about-inner-img">
                    <ImageWithBasePath
                      src="assets/img/aboutus/about-us-03.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-us-info">
            <div className="about-us-head">
              <h6>About Us</h6>
              <h2>We Provide Best solutions For Your Business</h2>
              <p>
                Welcome to Aimporo Philippines, where innovation meets expertise. We are a
                dynamic and forward-thinking service marketplace dedicated to
                connecting individuals and businesses with the best
                professionals in various fields. Our platform is designed to
                simplify the process of finding and hiring top-tier services,
                ensuring a seamless experience for both service providers and
                seekers.
              </p>
              <h5>Our Mission</h5>
              <p>
                At Aimporo Philippines, our mission is to empower individuals and
                businesses by facilitating easy access to a diverse range of
                high-quality services. We believe in creating a collaborative
                and inclusive marketplace that fosters growth, creativity, and
                mutual success.
              </p>
            </div>
            <div className="about-features">
              <ul className="list-one">
                <li>
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/target-arrow-icon.svg"
                      alt="img"
                    />
                  </span>
                  Diverse Network of Professionals
                </li>
                <li>
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/target-arrow-icon.svg"
                      alt="img"
                    />
                  </span>
                  Trust and Transparency
                </li>
              </ul>
              <ul className="list-two">
                <li>
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/target-arrow-icon.svg"
                      alt="img"
                    />
                  </span>
                  User Friendly Platform
                </li>
                <li>
                  <span>
                    <ImageWithBasePath
                      src="assets/img/icons/target-arrow-icon.svg"
                      alt="img"
                    />
                  </span>
                  Innovation In Technology
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /About Us */}
  {/* Why Choose Us */}
  <section className="why-choose-sec">
    <div className="container">
      <div className="about-us-header">
        <h2>Why Choose Us</h2>
        <p>
          We prioritize your satisfaction through personalized solutions and a
          commitment to excellence.
        </p>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-01.svg" alt="img" />
            </div>
            <h4>Service Commitment</h4>
            <p>
              {" "}
              We deliver top-tier solutions, ensuring satisfaction through
              reliability, transparency, and a dedication to exceeding
              expectations.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-02.svg" alt="img" />
            </div>
            <h4>Fabulous Experience</h4>
            <p>
              {" "}
              Our intuitive interface offers an effortless journey, from
              browsing services to booking and beyond.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-03.svg" alt="img" />
            </div>
            <h4>Data Secure</h4>
            <p>
              {" "}
              We employ robust encryption, stringent access controls, and
              ongoing monitoring to safeguard your information.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-04.svg" alt="img" />
            </div>
            <h4>Fast Service</h4>
            <p>
              {" "}
              We prioritize speed without compromising quality, ensuring your
              needs are met promptly and effectively
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-05.svg" alt="img" />
            </div>
            <h4>Secure Payment</h4>
            <p>
              {" "}
              Enjoy peace of mind with encrypted transactions, trusted gateways,
              and a commitment to safeguarding your information.
            </p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="why-choose-card">
            <div className="card-icon">
              <ImageWithBasePath src="assets/img/icons/why-choose-icon-06.svg" alt="img" />
            </div>
            <h4>Dedicated Support</h4>
            <p>
              {" "}
              Our 24/7 customer service team is here to assist you every step of
              the way. Experience personalized assistance for a seamless journey
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Why Choose Us */}
  {/* Explore Popular Categories */}
  <section className="popular-category-sec">
    <div className="container">
      <div className="about-us-header">
        <h2>Explore Popular Categories</h2>
        <p>
          From in-demand services to crowd favourites, find what suits your
          needs
        </p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="popular-category-slider">
          <Slider {...popularcaregoryOption}>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-01.svg"
                    alt="img"
                  />
                </div>
                <h4>Digital Marketing </h4>
                <span>100 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-02.svg"
                    alt="img"
                  />
                </div>
                <h4>Programming &amp; Tech </h4>
                <span>200 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-03.svg"
                    alt="img"
                  />
                </div>
                <h4>Writing Translation </h4>
                <span>100 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-04.svg"
                    alt="img"
                  />
                </div>
                <h4>Photography </h4>
                <span>150 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-05.svg"
                    alt="img"
                  />
                </div>
                <h4>Artificial Intelligence </h4>
                <span>100 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-03.svg"
                    alt="img"
                  />
                </div>
                <h4>Writing Translation </h4>
                <span>100 Services</span>
              </div>
            </div>
            <div className="slider-cards">
              <div className="popular-cat-card">
                <div className="category-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/popular-category-04.svg"
                    alt="img"
                  />
                </div>
                <h4>Photography </h4>
                <span>150 Services</span>
              </div>
            </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Explore Popular Categories */}
  {/* What Our Client Say */}
  <section className="client-review-sec">
    <div className="container">
      <div className="about-us-header">
        <h2>What Our Client Say</h2>
        <p>
          Hear What Our Clients Have to Say. Explore the Testimonials that
          Showcase Our Commitment to Excellence
        </p>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="review-slider">
          <Slider {...reviewslideroption}>
            <div className="review-card">
              <span className="quotation-icon">
                <ImageWithBasePath src="assets/img/icons/quotation-icon.svg" alt="img" />
              </span>
              <h4>Great Work</h4>
              <p>
                "Amazing design, easy to customize and a design quality
                superlative account on its cloud platform for the optimized
                performance. And we didn't on our original designs."
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
              <div className="review-user">
                <Link to="#">
                  <ImageWithBasePath src="assets/img/user/user-17.jpg" alt="img" />
                </Link>
                <h6>
                  <Link to="#">Gloria Weber</Link>
                  <span>United States</span>
                </h6>
              </div>
            </div>
            <div className="review-card">
              <span className="quotation-icon">
                <ImageWithBasePath src="assets/img/icons/quotation-icon.svg" alt="img" />
              </span>
              <h4>Seamless Experience</h4>
              <p>
                "Communication with the service provider was smooth and
                efficient through the platform's messaging system. The built-in
                tools for file sharing ensuring a productive experience."
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
              <div className="review-user">
                <Link to="#">
                  <ImageWithBasePath src="assets/img/user/user-18.jpg" alt="img" />
                </Link>
                <h6>
                  <Link to="#">John Cramer</Link>
                  <span>United States</span>
                </h6>
              </div>
            </div>
            <div className="review-card">
              <span className="quotation-icon">
                <ImageWithBasePath src="assets/img/icons/quotation-icon.svg" alt="img" />
              </span>
              <h4>Great Work</h4>
              <p>
                "This service marketplace is a game-changer, delivering a
                polished and professional platform that exceeded our
                expectations and it saved us time and resources, allowing for a
                quick launch."
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
              <div className="review-user">
                <Link to="#">
                  <ImageWithBasePath src="assets/img/user/user-19.jpg" alt="img" />
                </Link>
                <h6>
                  <Link to="#">Mary Marquez</Link>
                  <span>United States</span>
                </h6>
              </div>
            </div>
            <div className="review-card">
              <span className="quotation-icon">
                <ImageWithBasePath src="assets/img/icons/quotation-icon.svg" alt="img" />
              </span>
              <h4>Great Work</h4>
              <p>
                "This service marketplace is a game-changer, delivering a
                polished and professional platform that exceeded our
                expectations and it saved us time and resources, allowing for a
                quick launch."
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
              <div className="review-user">
                <Link to="#">
                  <ImageWithBasePath src="assets/img/user/user-16.jpg" alt="img" />
                </Link>
                <h6>
                  <Link to="#">Joanne Parise</Link>
                  <span>United States</span>
                </h6>
              </div>
            </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /What Our Client Say */}
  {/* Start As Seller */}
  <section className="start-seller-sec">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex">
          <div className="seller-inner-img w-100">
            <ImageWithBasePath
              src="assets/img/aboutus/about-us-04.jpg"
              className="img-fluid"
              alt="img"
            />
          </div>
        </div>
        <div className="col-lg-6 d-flex">
          <div className="seller-info-content w-100">
            <div className="seller-head">
              <h3>Start As Seller</h3>
              <p>
                Embark on a Journey of Entrepreneurship, Launch Your Seller
                Profile Today.
              </p>
              <p className="seller-para">
                Showcase your expertise on a platform designed for success.
                Create your seller profile, highlight your skills, and set your
                services apart. Benefit from our robust marketplace that
                connects you with a global audience.
              </p>
            </div>
            <div className="seller-feature-list d-flex w-100">
              <div className="sllers-list">
                <ul>
                  <li>
                    <span>
                      <i className="feather icon-check-square" />
                    </span>
                    Set your prices
                  </li>
                  <li>
                    <span>
                      <i className="feather icon-check-square" />
                    </span>
                    Flexible schedule
                  </li>
                  <li>
                    <span>
                      <i className="feather icon-check-square" />
                    </span>
                    Build your reputation
                  </li>
                  <li>
                    <span>
                      <i className="feather icon-check-square" />
                    </span>
                    Provide 24/7 support
                  </li>
                </ul>
                <Link to={routes.signIn} className="btn btn-primary w-auto">
                  Become A Seller
                </Link>
              </div>
              <div className="seller-small-img w-100">
                <ImageWithBasePath
                  src="assets/img/aboutus/about-us-05.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Start As Seller */}
</>
 
    </div>
  )
}

export default AboutUs
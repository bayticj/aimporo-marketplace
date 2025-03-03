'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';

const AboutUs = () => {
  const popularCategoryOptions = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    draggable: true,
    touchMove: true,
    swipe: true,
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
    ],
  };

  const reviewSliderOptions = {
    dots: true,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    draggable: true,
    touchMove: true,
    swipe: true,
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
    ],
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-img">
          <div className="breadcrumb-left">
            <Image 
              src="/assets/img/bg/banner-bg-03.png" 
              alt="Background" 
              width={1920} 
              height={300}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    About Us
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
                    <Image
                      src="/assets/img/aboutus/about-us-01.jpg"
                      className="img-fluid"
                      alt="About Us"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="about-inner-img">
                        <Image
                          src="/assets/img/aboutus/about-us-02.jpg"
                          className="img-fluid"
                          alt="About Us"
                          width={400}
                          height={200}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="about-inner-img">
                        <Image
                          src="/assets/img/aboutus/about-us-03.jpg"
                          className="img-fluid"
                          alt="About Us"
                          width={400}
                          height={200}
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
                        <Image
                          src="/assets/img/icons/target-arrow-icon.svg"
                          alt="icon"
                          width={20}
                          height={20}
                        />
                      </span>
                      Diverse Network of Professionals
                    </li>
                    <li>
                      <span>
                        <Image
                          src="/assets/img/icons/target-arrow-icon.svg"
                          alt="icon"
                          width={20}
                          height={20}
                        />
                      </span>
                      Trust and Transparency
                    </li>
                  </ul>
                  <ul className="list-two">
                    <li>
                      <span>
                        <Image
                          src="/assets/img/icons/target-arrow-icon.svg"
                          alt="icon"
                          width={20}
                          height={20}
                        />
                      </span>
                      User Friendly Platform
                    </li>
                    <li>
                      <span>
                        <Image
                          src="/assets/img/icons/target-arrow-icon.svg"
                          alt="icon"
                          width={20}
                          height={20}
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
                  <Image src="/assets/img/icons/why-choose-icon-01.svg" alt="icon" width={60} height={60} />
                </div>
                <h4>Service Commitment</h4>
                <p>
                  We deliver top-tier solutions, ensuring satisfaction through
                  reliability, transparency, and a dedication to exceeding
                  expectations.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="why-choose-card">
                <div className="card-icon">
                  <Image src="/assets/img/icons/why-choose-icon-02.svg" alt="icon" width={60} height={60} />
                </div>
                <h4>Quality Assurance</h4>
                <p>
                  Our rigorous quality control ensures excellence in every service,
                  maintaining high standards through continuous improvement and
                  attention to detail.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="why-choose-card">
                <div className="card-icon">
                  <Image src="/assets/img/icons/why-choose-icon-03.svg" alt="icon" width={60} height={60} />
                </div>
                <h4>Customer Support</h4>
                <p>
                  Our dedicated team provides prompt, personalized assistance,
                  ensuring your needs are met with care and professionalism at every
                  step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Why Choose Us */}
    </div>
  );
};

export default AboutUs; 
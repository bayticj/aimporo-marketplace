import React from "react";
import ImageWithBasePath from "../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const ContactUsV2 = () => {
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
                      Contact Us
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Contact Us</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Contact Us */}
        <section className="contact-section">
          {/* Contact Bottom */}
          <div className="contact-bottom bg-white">
            <div className="container">
              <div className="row justify-content-center">
                {/* Contact Grid */}
                <div className="col-xl-4 col-lg-6 d-flex">
                  <div className="contact-grid con-info w-100">
                    <div className="contact-content">
                      <div className="contact-icon">
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/contact-mail.svg"
                            alt="Icon"
                          />
                        </span>
                      </div>
                      <div className="contact-details">
                        <p>
                          <Link to="#">
                            dreamgigs@example.com
                          </Link>
                        </p>
                        <p>
                          <Link to="#">
                            aimporophilippines@example.com
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Contact Grid */}
                {/* Contact Grid */}
                <div className="col-xl-4 col-lg-6 d-flex">
                  <div className="contact-grid con-info w-100">
                    <div className="contact-content">
                      <div className="contact-icon">
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/contact-phone.svg"
                            alt="Icon"
                          />
                        </span>
                      </div>
                      <div className="contact-details">
                        <p>+1 81649 48103</p>
                        <p>+1 78301 71940</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Contact Grid */}
                {/* Contact Grid */}
                <div className="col-xl-4 col-lg-6 d-flex">
                  <div className="contact-grid con-info w-100">
                    <div className="contact-content">
                      <div className="contact-icon">
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/contact-map.svg"
                            alt="Icon"
                          />
                        </span>
                      </div>
                      <div className="contact-details contact-details-address">
                        <p>
                          367 Hillcrest Lane, Irvine, California, United Sates
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Contact Grid */}
              </div>
            </div>
          </div>
          {/* /Contact Bottom */}
          {/* Contact Top */}
          <div className="contact-top pt-0">
            <div className="container">
              <div className="row align-items-center">
                {/* Contact Image */}
                <div className="col-lg-6 col-md-12 d-flex">
                  <div className="contact-img">
                    <ImageWithBasePath
                      src="assets/img/contact-01.png"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                </div>
                {/* /Contact Image */}
                {/* Contact Form */}
                <div className="col-lg-6 col-md-12 d-flex">
                  <div className="team-form w-100">
                    <div className="team-form-heading">
                      <h3>Get in Touch</h3>
                      <p>How can help I you? Please write down your query</p>
                    </div>
                    <form action="#">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Subject"
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Your Message"
                              defaultValue={""}
                            />
                          </div>
                          <div className="form-group mb-0">
                            <button type="submit" className="btn btn-primary">
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /Contact Form */}
              </div>
            </div>
          </div>
          {/* /Contact Top */}
          <div className="row">
            {/* Contact Map */}
            <div className="col-md-12">
              <div className="contact-map map-v3 w-100">
                <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.6088932774796!2d-117.8132203247921!3d33.64138153931407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcddf599c1986f%3A0x6826f6868b4f8e35!2sHillcrest%2C%20Irvine%2C%20CA%2092603%2C%20USA!5e0!3m2!1sen!2sin!4v1706772657955!5m2!1sen!2sin"
           
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            height={500}
          />
              </div>
            </div>
            {/* /Contact Map */}
          </div>
        </section>
        {/* /Contact Us */}
      </>
    </div>
  );
};

export default ContactUsV2;

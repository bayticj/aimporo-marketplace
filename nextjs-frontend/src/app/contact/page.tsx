'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div>
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
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info">
                <div className="section-header-contact">
                  <h2>Get In Touch</h2>
                  <p>
                    We're here to help! Reach out to us for any questions, feedback, or support needs. Our dedicated team is ready to assist you.
                  </p>
                </div>
                <div className="contact-address">
                  <div className="contact-address-info">
                    <div className="contact-address-icon">
                      <Image 
                        src="/assets/img/icons/contact-icon-01.svg" 
                        alt="Contact Icon" 
                        width={40} 
                        height={40}
                      />
                    </div>
                    <div className="contact-address-text">
                      <h4>Phone Number</h4>
                      <p>+63 (2) 8123 4567</p>
                    </div>
                  </div>
                  <div className="contact-address-info">
                    <div className="contact-address-icon">
                      <Image 
                        src="/assets/img/icons/contact-icon-02.svg" 
                        alt="Contact Icon" 
                        width={40} 
                        height={40}
                      />
                    </div>
                    <div className="contact-address-text">
                      <h4>Email Address</h4>
                      <p>support@aimporo.ph</p>
                    </div>
                  </div>
                  <div className="contact-address-info">
                    <div className="contact-address-icon">
                      <Image 
                        src="/assets/img/icons/contact-icon-03.svg" 
                        alt="Contact Icon" 
                        width={40} 
                        height={40}
                      />
                    </div>
                    <div className="contact-address-text">
                      <h4>Office Address</h4>
                      <p>123 Bonifacio Global City, Taguig, Metro Manila, Philippines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form">
                <form action="#">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Subject"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="col-form-label">Message</label>
                        <textarea
                          className="form-control"
                          placeholder="Write Message"
                          defaultValue={""}
                          rows={4}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button className="btn btn-primary" type="submit">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Contact Us */}

      {/* Map */}
      <section className="contact-map">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802548850011!2d121.04345937497657!3d14.553710985755202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8efd99aad53%3A0xb64b39847a866fde!2sBonifacio%20Global%20City%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1709453876545!5m2!1sen!2sph"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* /Map */}
    </div>
  );
};

export default ContactUs; 
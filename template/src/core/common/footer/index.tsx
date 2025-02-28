import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../img";
import { all_routes } from "../../../feature-module/router/all_routes";

const Footer = () => {
  const routes = all_routes;
  return (
    <div>
      <>
        {/* Footer */}
        <footer className="footer">
          <div className="section-bg">
            <ImageWithBasePath
              src="assets/img/bg/footer-bg-01.png"
              className="footer-bg-one"
              alt="img"
            />
            <ImageWithBasePath
              src="assets/img/bg/footer-bg-02.png"
              className="footer-bg-two"
              alt="img"
            />
          </div>
          <div className="container">
            <div className="footer-top">
              <div className="row">
                <div
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12"
                  data-aos="fade-up"
                  data-aos-delay={500}
                >
                  <div className="footer-widget">
                    <Link to={routes.home}>
                      <ImageWithBasePath src="assets/img/aimporo-logo.png" alt="Aimporo Logo" />
                    </Link>
                    <p>
                      Our mission is to lead the way in digital transformation
                      and automation. We aim to enabling them to navigate the
                      evolving digital landscape with confidence.
                    </p>
                    <div className="social-links">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-facebook" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-x-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-google" />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <i className="fa-brands fa-youtube" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-2 col-lg-2 col-md-6 col-sm-6"
                  data-aos="fade-up"
                  data-aos-delay={600}
                >
                  <div className="footer-widget">
                    <h3>Our Company</h3>
                    <ul className="menu-items">
                      <li>
                        <Link to={routes.aboutUs}>About Us</Link>
                      </li>
                      <li>
                        <Link to={routes.categories2}>Categories</Link>
                      </li>
                      <li>
                        <Link to={routes.addGigs}>Create Gigs</Link>
                      </li>
                      <li>
                        <Link to={routes.pricing}>Pricing</Link>
                      </li>
                      <li>
                        <Link to={routes.faq}>FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-xl-2 col-lg-2 col-md-6 col-sm-6"
                  data-aos="fade-up"
                  data-aos-delay={800}
                >
                  <div className="footer-widget">
                    <h3>Dashboard</h3>
                    <ul className="menu-items">
                      <li>
                        <Link to={routes.userPurchase}>Purchase</Link>
                      </li>
                      <li>
                        <Link to={routes.userSales}>Sales</Link>
                      </li>
                      <li>
                        <Link to={routes.userPayment}>Payments</Link>
                      </li>
                      <li>
                        <Link to={routes.userFiles}>Files</Link>
                      </li>
                      <li>
                        <Link to={routes.userWishlist}>Wishlist</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                  data-aos="fade-up"
                  data-aos-delay={700}
                >
                  <div className="footer-widget">
                    <h3>Featured Categories</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="menu-items">
                          <li>
                            <Link to={routes.categories}>Programming &amp; Tech</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Music &amp; Audio</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Lifestyle</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Photography</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Business</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="menu-items extra-menu">
                          <li>
                            <Link to={routes.categories}>eBook Publishing</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>AI Artists</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>AI Services</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Data</Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>Consulting</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-widget">
                <div className="row align-items-center">
                  <div className="col-xl-9">
                    <ul className="location-list">
                      <li>
                        <span>
                          <i className="feather icon-map-pin" />
                        </span>
                        <div className="location-info">
                          <h6>Address</h6>
                          <p>367 Hillcrest Lane, Irvine, California,USA</p>
                        </div>
                      </li>
                      <li>
                        <span>
                          <i className="feather icon-phone" />
                        </span>
                        <div className="location-info">
                          <h6>Phone</h6>
                          <p>310-437-2766</p>
                        </div>
                      </li>
                      <li>
                        <span>
                          <i className="feather icon-mail" />
                        </span>
                        <div className="location-info">
                          <h6>Email</h6>
                          <p>info@example.com</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-3 text-xl-end">
                    <div className="paypal-icons">
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/stripe-icon.svg"
                          alt="icon"
                        />
                      </Link>
                      <Link to="#">
                        <ImageWithBasePath
                          src="assets/img/icons/paypal-icon.svg"
                          alt="icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="copy-right">
                    <p>Copyright © 2024 Aimporo Philippines. All rights reserved.</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="footer-bottom-links">
                    <ul>
                      <li>
                        <Link to={routes.privacyPolicy}>Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to={routes.termCondition}>
                          Terms &amp; Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* /Footer */}
      </>
    </div>
  );
};

export default Footer;

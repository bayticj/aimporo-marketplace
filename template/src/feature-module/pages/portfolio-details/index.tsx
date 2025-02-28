import React from "react";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/img";

const PortfolioDetails = () => {
  const routes = all_routes;
  return (
    <div>
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
                    <li className="breadcrumb-item">
                      <Link to={routes.portfolio}>Portfolio</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Portfolio Detail
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Portfolio Detail</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              {/* Portfolio Details */}
              <div className="col-lg-12">
                <div className="portfolio-details">
                  <div className="portfolio-detail-img">
                    <ImageWithBasePath
                      src="assets/img/portfolio/portfolio-large-01.jpg"
                      className="img-fluid"
                      alt="img"
                    />
                  </div>
                  <div className="portfolio-header">
                    <h2>Mobile App Development for HealthCo</h2>
                    <span className="badge bg-primary-light">
                      Programming &amp; Tech
                    </span>
                  </div>
                  <div className="portfolio-contents">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="portfolio-scope">
                          <h5>Project Scope</h5>
                          <p>
                            HealthCo approached Innovative Solutions seeking
                            expertise in mobile app development. Their goal was
                            to create an intuitive health and fitness tracking
                            app that stood out in a crowded marketplace. The
                            challenges were to ensure the app was engaging, easy
                            to navigate, and offered unique features that
                            catered to individual user needs.
                          </p>
                        </div>
                        <div className="portfolio-scope">
                          <h5>Project Scope</h5>
                          <p>
                            Develop a user-friendly mobile application for
                            health tracking that caters to a broad user base,
                            focusing on personalization and ease of use.
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="portfolio-info">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="portfolio-box">
                                <h6>Client:</h6>
                                <p>HealthCo</p>
                              </div>
                              <div className="portfolio-box">
                                <h6>Website:</h6>
                                <p>healthco.com</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="portfolio-box">
                                <h6>Date:</h6>
                                <p>January 29, 2024</p>
                              </div>
                              <div className="portfolio-box">
                                <h6>Category:</h6>
                                <p>Programming &amp; Tech</p>
                              </div>
                            </div>
                            <div className="portfolio-social">
                              <h6>Share Project:</h6>
                              <ul className="social-icon">
                                <li>
                                  <Link to="#">
                                    <i className="feather icon-facebook" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="feather icon-twitter" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="feather icon-instagram" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="portfolio-scope">
                      <h5>Solution</h5>
                      <p>
                        A team of skilled developers and designers from
                        Innovative Solutions was assembled to work on this
                        project. The approach was multi-faceted:
                      </p>
                      <ul>
                        <li>
                          User Experience Design: The team focused on creating a
                          simple yet effective user interface that would appeal
                          to users of all ages and technical abilities. This
                          included intuitive navigation and a clean, accessible
                          design.
                        </li>
                        <li>
                          Personalization Features: Understanding the importance
                          of personalization in health tracking, the app was
                          equipped with features that allowed users to set
                          personal goals, track their progress, and receive
                          customized recommendations.
                        </li>
                        <li>
                          Integration of Advanced Technologies: To set the app
                          apart, technologies like AI and machine learning were
                          integrated for smart tracking and predictive
                          analytics, offering users insights into their health
                          patterns.
                        </li>
                        <li>
                          Testing and Feedback Loop: Rigorous testing was
                          conducted, including beta testing with a sample of
                          HealthCo's target audience to gather feedback and make
                          necessary adjustments.
                        </li>
                      </ul>
                    </div>
                    <div className="portfolio-scope">
                      <h5>Outcome</h5>
                      <p>
                        The project was a resounding success, marked by the
                        following achievements:
                      </p>
                      <ul>
                        <li>
                          User Adoption: The app received over 10,000 downloads
                          within the first month of its launch, with a high user
                          retention rate.
                        </li>
                        <li>
                          Positive Reviews: Users praised the app for its ease
                          of use, personalized features, and insightful health
                          tracking, reflected in positive reviews on app stores.
                        </li>
                        <li>
                          Client Satisfaction: HealthCo was thrilled with the
                          product, noting an increase in their brand's
                          visibility and customer engagement.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog-pagination">
                    <div className="row">
                      <div className="col-6">
                        <div className="page-previous page-link">
                          <Link to="#">
                            <i className="feather icon-chevron-left" />
                            Previous
                          </Link>
                          <p>
                            The Future of Remote Work: Trends and Predictions
                          </p>
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <div className="page-next page-link">
                          <Link to="#" className="justify-content-end">
                            Next
                            <i className="feather icon-chevron-right" />
                          </Link>
                          <p>
                            Top 10 In-Demand Skills in the Gig Economy for 2024
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Related Tags */}
                  <div className="service-wrap tags-widget m-0">
                    <h3>Related Tags</h3>
                    <ul className="tags">
                      <li>
                        <Link to="#">Hiring Tips</Link>
                      </li>
                      <li>
                        <Link to="#">Freelancer Selection</Link>
                      </li>
                      <li>
                        <Link to="#">Project Management</Link>
                      </li>
                    </ul>
                  </div>
                  {/* /Related Tags */}
                </div>
              </div>
              {/* /Portfolio Details */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default PortfolioDetails;

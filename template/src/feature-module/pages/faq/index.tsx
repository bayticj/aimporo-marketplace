import React from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const Faq = () => {
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
                      FAQ
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">FAQ</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Faq Sction */}
        <section className="faq-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="faq-wrapper faq-lists">
                  <div className="faq-card aos" data-aos="fade-up">
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#faqone"
                        aria-expanded="false"
                      >
                        What are website development services?
                      </Link>
                    </h4>
                    <div id="faqone" className="card-collapse collapse">
                      <div className="faq-content">
                        <p>
                          Whether you’re looking to launch, update, or overhaul
                          your website, we offers a talented pool of freelancers
                          who turn ideas into action. From personal brand pages
                          to eCommerce stores and everything in between, website
                          development services cover virtually any use case,
                          industry, and niche. In turn, you can make every
                          digital first impression count.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="faq-card aos" data-aos="fade-up">
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#faqtwo"
                        aria-expanded="false"
                      >
                        What are the stages of a project?
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
                  <div className="faq-card aos" data-aos="fade-up">
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#faqOne"
                        aria-expanded="false"
                      >
                        What types of service can I pick?
                      </Link>
                    </h4>
                    <div
                      id="faqOne"
                      className="card-collapse collapse"
                      style={{}}
                    >
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
                  <div className="faq-card aos" data-aos="fade-up">
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#faqfour"
                        aria-expanded="false"
                      >
                        How much does it cost to develop a basic projects?
                      </Link>
                    </h4>
                    <div
                      id="faqfour"
                      className="card-collapse collapse"
                      style={{}}
                    >
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
                  <div className="faq-card aos" data-aos="fade-up">
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#faqfive"
                        aria-expanded="false"
                      >
                        What are the most popular development platforms?
                      </Link>
                    </h4>
                    <div
                      id="faqfive"
                      className="card-collapse collapse"
                      style={{}}
                    >
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
            </div>
          </div>
        </section>
        {/* /Faq Sction */}
      </>
    </div>
  );
};

export default Faq;

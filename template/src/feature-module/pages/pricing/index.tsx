import React from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes';

const Pricing = () => {
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
              <li className="breadcrumb-item" aria-current="page">
                Pricing
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">Pricing</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Price Sction */}
  <section className="price-section">
    <div className="container">
      <div className="pricing-tab align-items-center justify-content-center">
        <ul className="nav">
          <li>
            <Link
              className="active"
              to="#"
              data-bs-toggle="tab"
              data-bs-target="#monthly"
            >
              Monthly
            </Link>
          </li>
          <li>
            <Link to="#" data-bs-toggle="tab" data-bs-target="#yearly">
              Yearly
            </Link>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div className="tab-pane active show" id="monthly">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Basic</h3>
                  </div>
                  <div className="amt-item">
                    <h2>49$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      10 Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      50 Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      20 Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Limited Time Support
                    </li>
                    <li className="inactive">
                      <span>
                        <i className="bx bx-x" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card active aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration={1000}
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Standard</h3>
                    <span className="badge">Recommended</span>
                  </div>
                  <div className="amt-item">
                    <h2>99$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      20 Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      100 Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      50 Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      24/7 Customer support
                    </li>
                    <li className="inactive">
                      <span>
                        <i className="bx bx-x" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration={2000}
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Premium</h3>
                  </div>
                  <div className="amt-item">
                    <h2>199$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      24/7 Customer Support
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="yearly">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Basic</h3>
                  </div>
                  <div className="amt-item">
                    <h2>149$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      10 Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      50 Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      20 Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Limited Time Support
                    </li>
                    <li className="inactive">
                      <span>
                        <i className="bx bx-x" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration={1000}
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Standard</h3>
                  </div>
                  <div className="amt-item">
                    <h2>299$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      20 Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      100 Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      50 Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      24/7 Customer support
                    </li>
                    <li className="inactive">
                      <span>
                        <i className="bx bx-x" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div
                className="price-card aos"
                data-aos="flip-right"
                data-aos-easing="ease-out-cubic"
                data-aos-duration={2000}
              >
                <div className="price-title">
                  <div className="plan-type">
                    <h3>Premium</h3>
                  </div>
                  <div className="amt-item">
                    <h2>599$</h2>
                    <p>month</p>
                  </div>
                </div>
                <div className="price-features">
                  <h6>Includes</h6>
                  <ul>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Staffs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Listings / Services
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Unlimited Orders / Jobs
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      24/7 Customer Support
                    </li>
                    <li>
                      <span>
                        <i className="bx bx-check-double" />
                      </span>
                      Portfolio
                    </li>
                  </ul>
                </div>
                <div className="price-btn">
                  <Link to="#" className="btn-primary">
                    Choose Plan
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Price Sction */}
</>

    </div>
  )
}

export default Pricing
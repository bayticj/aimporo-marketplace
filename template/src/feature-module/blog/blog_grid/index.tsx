import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { all_routes } from "../../router/all_routes";
import { Link } from "react-router-dom";

const BlogGrid = () => {
  const routes = all_routes;
  const [isClassAdded, setIsClassAdded] = useState<boolean[]>([false,false,false,false,false,false,false,false,false]);
  const toggleClass = (index: number) => {
    setIsClassAdded(prevState => 
      prevState.map((item, i) => (i === index ? !item : item))
    );
  }
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
                      Blog Grid{" "}
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Blog Grid</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            {/* Blogs */}
            <div className="blog">
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-01.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                        <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[1] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(1)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-06.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Robert Hollenbeck</Link>
                            <span>Jan 20, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Freelancing
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            How to Choose the Right Freelancer for Your Project
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          10 - 15 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-02.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                      <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[2] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(2)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-10.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Abigail Garett</Link>
                            <span>Jan 21, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            In-Demand Skills
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Top 10 In-Demand Skills in the Gig Economy for 2024
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          05 - 10 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-03.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                      <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[3] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(3)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-11.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">David Shorey</Link>
                            <span>Jan 23, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            User Guide
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Understanding Service Marketplace Fees: A Guide for
                            New Users
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          10 - 15 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-04.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                      <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[4] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(4)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-12.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Amanda Hansford</Link>
                            <span>Jan 24, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Future Trends
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            The Future of Remote Work: Trends and Predictions
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          15 - 20 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-05.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                      <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[5] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(5)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to={routes.blogDetails}>
                            <ImageWithBasePath
                              src="assets/img/user/user-09.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Kent Choi</Link>
                            <span>Jan 25, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Business
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Effective Strategies for Growing Your Freelance
                            Business
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          5 - 10 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-06.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                      <Link
                          to="#"
                          className={`fav-icon ${
                            isClassAdded[6] ? "favourite" : ""
                          }`}
                          onClick={() => toggleClass(6)}
                        >
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-13.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Anne Castaneda</Link>
                            <span>Jan 27, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Portfolio
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            The Importance of a Portfolio and How to Create One
                            That Stands Out
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          10 - 15 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-07.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                        <Link to="#" className="fav-icon">
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-14.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Joanne Parise</Link>
                            <span>Jan 28, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Home Care
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Understanding the Benefits of Professional Cleaning
                            Services
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          15 - 20 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-08.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                        <Link to="#" className="fav-icon">
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-15.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Kylee Zamudio</Link>
                            <span>Jan 29, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Digital Marketing
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Leveraging Digital Marketing Services for Small
                            Businesses
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          10 - 15 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="blog-grid">
                    <div className="blog-img">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          src="assets/img/blog/blog-09.jpg"
                          className="img-fluid"
                          alt="img"
                        />
                      </Link>
                      <div className="fav-selection">
                        <Link to="#" className="fav-icon">
                          <i className="feather icon-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="user-head">
                        <div className="user-info">
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/user/user-16.jpg"
                              alt="img"
                            />
                          </Link>
                          <h6>
                            <Link to="#">Dann Bowman</Link>
                            <span>Jan 30, 2024</span>
                          </h6>
                        </div>
                        <div className="badge-text">
                          <Link to="#" className="badge bg-primary-light">
                            Graphic Design
                          </Link>
                        </div>
                      </div>
                      <div className="blog-title">
                        <h3>
                          <Link to={routes.blogDetails}>
                            Graphic Design for Social Media: Tips to Engage Your
                            Audience
                          </Link>
                        </h3>
                      </div>
                      <div className="blog-content-footer d-flex justify-content-between align-items-center">
                        <p>
                          <span>
                            <i className="feather icon-clock" />
                          </span>
                          05 - 10 mins read
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pagination */}
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
              {/* /Pagination */}
            </div>
            {/* /Blogs */}
          </div>
        </div>
        {/* /Page Content */}
      </>
    </div>
  );
};

export default BlogGrid;

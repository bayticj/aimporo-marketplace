import React from 'react'
import ImageWithBasePath from '../../../core/img'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { all_routes } from '../../router/all_routes';
import { Link } from 'react-router-dom';
import CommonSelect from '../../../core/common/common-select/commonSelect';
import { Details } from '../../../core/common/selectOption';

const BlogDetailsRightSidebar = () => {
  const routes = all_routes
  const settings1 = {
    dots: true,
    nav: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
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
    <div>
      <>
  {/* Breadcrumb */}
  <div className="breadcrumb-bar breadcrumb-info">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-7 col-12">
          <nav aria-label="breadcrumb" className="page-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={routes.home}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={routes.blogGrid}>Blog</Link>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Blog Detail
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title">
            How to Choose the Right Freelancer for Your Project
          </h2>
          <ul className="info-links">
            <li>
              <i className="feather icon icon-calendar" />
              Jan 20, 2024
            </li>
          </ul>
        </div>
        <div className="col-lg-5 col-12">
          <ul className="breadcrumb-links">
            <li>
              <Link to="#">
                <span>
                  <i className="feather icon icon-heart" />
                </span>
                Add to Wishlist
              </Link>
            </li>
            <li>
              <Link to="#">
                <span>
                  <i className="feather icon icon-share-2" />
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
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      {/* Blogs */}
      <div className="row">

        {/* Blog Details */}
        <div className="col-lg-8">
          <div className="blog-details">
            <div className="blog-detail-img">
              <ImageWithBasePath
                src="assets/img/blog/blog-02.jpg"
                className="img-fluid"
                alt="img"
              />
            </div>
            <div className="blog-contents">
              <p>
                In today’s fast-paced business world, leveraging the skills of
                freelancers has become an essential strategy for project
                success. With the rise of the gig economy, you now have access
                to a global pool of talented individuals ready to contribute to
                your endeavors. However, the key to harnessing this potential
                lies in selecting the right freelancer. This guide walks you
                through the steps to ensure you make the best choice for your
                project needs.
              </p>
              <p>
                Before diving into the sea of freelancers, it’s crucial to have
                a clear understanding of what your project entails. Defining the
                scope of work involves outlining specific tasks, deliverables,
                and deadlines. A well-articulated project description not only
                helps you understand your own needs but also allows freelancers
                to accurately assess if they can fulfill your requirements.
              </p>
              <div className="blog-wrap">
                <p>
                  Once you’ve chosen a freelancer, ensure that there is a clear
                  contract in place. This should outline project scope, payment
                  terms, deadlines, and any other important details. A
                  well-defined contract protects both you and the freelancer and
                  sets clear expectations.
                </p>
              </div>
              <p>
                If you’ve requested proposals, compare them not just on price,
                but also on the value each freelancer brings to the table. Look
                at their proposed timelines, strategies, and any additional
                benefits they offer.
              </p>
              <p>
                Choosing the right freelancer for your project requires a
                thoughtful approach. By clearly defining your project, carefully
                searching and evaluating candidates, and ensuring a solid
                contractual agreement, you can establish a successful and
                productive working relationship. Remember, the right freelancer
                can not only help complete your project but also add immense
                value through their specialized skills and perspectives.
              </p>
            </div>
            <div className="blog-author">
              <div className="author-img">
                <ImageWithBasePath
                  src="assets/img/user/user-06.jpg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
              <div className="author-detail">
                <h5>Author</h5>
                <h6>Robert Hollenbeck</h6>
                <p>
                  I am experienced project manager and consultant with a rich
                  background in digital project execution and freelance talent
                  acquisition. With over 10 years in the industry, I have
                  mastered the art of identifying and collaborating with
                  top-tier freelance talent across various fields including
                  technology, marketing, and creative services.
                </p>
              </div>
            </div>
            <div className="blog-pagination">
              <div className="row">
                <div className="col-sm-6">
                  <div className="page-previous page-link">
                    <Link to="#">
                      <i className="feather icon icon-chevron-left" />
                      Previous Post
                    </Link>
                    <p>The Future of Remote Work: Trends and Predictions</p>
                  </div>
                </div>
                <div className="col-sm-6 text-sm-end">
                  <div className="page-next page-link">
                    <Link to="#" className="justify-content-sm-end">
                      Next Post
                      <i className="feather icon icon-chevron-right" />
                    </Link>
                    <p>Top 10 In-Demand Skills in the Gig Economy for 2024</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Review Lists */}
            <div className="review-widget">
              <div className="review-title sort-search-gigs">
                <div className="row align-items-center">
                  <div className="col-sm-6">
                    <h3>Comments (10)</h3>
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
                        <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="img" />
                      </div>
                      <div className="reviewer-info">
                        <div className="reviewer-loc">
                          <h6>
                            <Link to="#">kadajsalamander</Link>
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
                        I recently hired a him to help me with a project and I
                        must say, I am extremely impressed with their work. From
                        start to finish, the freelancer was professional,
                        efficient, and a pleasure to work with.
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
                        <ImageWithBasePath src="assets/img/user/user-11.jpg" alt="img" />
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
                        One of the things that stood out to me the most was the
                        his ability to meet deadlines. He able to deliver the
                        project on time, despite a tight deadline. This showed
                        their professionalism and dedication to their work.
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
                        <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
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
                        Overall, I highly recommend this freelancer to anyone
                        looking for high-quality work and exceptional service.
                        They are a true professional and I will definitely be
                        hiring them again for future projects. Thank you for
                        your hard work and dedication!
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
                            <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="img" />
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
                          <Link to="#" className="reply-btn">
                            <i className="feather icon-corner-up-left" />
                            Reply
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="pagination justify-content-center">
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
            {/* Leave a Comment */}
            <div className="comment-section">
              <h3>Leave a Comment</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Enter Your Comments"
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-wrap">
                    <label className="custom_check mb-0">
                      Save my name &amp; email in this browser for the next time
                      I comment
                      <input type="checkbox" name="remeber" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            {/* /Leave a Comment */}
          </div>
        </div>
        {/* /Blog Details */}
                {/* Blog Sidebar */}
                <div className="col-lg-4 theiaStickySidebar">
          <div className="blog-sidebar sticky-bar card-bottom">
            {/* Search */}
            <div className="card search-widget">
              <div className="card-header">
                <h6>
                  <ImageWithBasePath src="assets/img/icons/search-icon.svg" alt="icon" />
                  Search
                </h6>
              </div>
              <div className="card-body">
                <form action="#">
                  <div className="form-group search-group mb-0">
                    <span className="search-icon">
                      <i className="feather icon icon-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Keyword"
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* /Search */}
            {/* Categories */}
            <div className="card category-widget">
              <div className="card-header">
                <h6>
                  <ImageWithBasePath src="assets/img/icons/category-icon.svg" alt="icon" />
                  Categories
                </h6>
              </div>
              <div className="card-body">
                <ul className="categories">
                  <li>
                    <Link to={routes.categories}>
                      Programming &amp; Coding <span>05</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.categories}>
                      Data Science &amp; Analysis <span>08</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.categories}>
                      Databases <span>10</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={routes.categories}>
                      Mobile App Development <span>05</span>
                    </Link>
                  </li>
                  <li className="mb-0">
                    <div className="view-content">
                      <div className="viewall-one">
                        <ul>
                          <li>
                            <Link to={routes.categories}>
                              Digital Marketing <span>01</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={routes.categories}>
                              Future trends <span>10</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="view-all">
                        <Link
                          to="#"
                          className="viewall-button-one"
                        >
                          More 20+ Categories
                        </Link>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Categories */}
            {/* Recent Blogs */}
            <div className="card recent-widget">
              <div className="card-header">
                <h6>
                  <ImageWithBasePath src="assets/img/icons/blog-icon.svg" alt="icon" />
                  Recent Blogs
                </h6>
              </div>
              <div className="card-body">
                <ul className="latest-posts">
                  <li>
                    <div className="post-thumb">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          className="img-fluid"
                          src="assets/img/blog/blog-thumb-01.jpg"
                          alt="blog-image"
                        />
                      </Link>
                    </div>
                    <div className="post-info">
                      <h6>
                        <Link to={routes.blogDetails}>
                          Understanding Service Marketplace Fees: A Guide...
                        </Link>
                      </h6>
                      <div className="blog-user">
                        <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="user" />
                        <div className="blog-user-info">
                          <p>David Shorey</p>
                          <p className="xs-text">Jan 23, 2024</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-thumb">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          className="img-fluid"
                          src="assets/img/blog/blog-thumb-02.jpg"
                          alt="blog-image"
                        />
                      </Link>
                    </div>
                    <div className="post-info">
                      <h6>
                        <Link to={routes.blogDetails}>
                          The Importance of a Portfolio and How to Create..
                        </Link>
                      </h6>
                      <div className="blog-user">
                        <ImageWithBasePath src="assets/img/user/user-13.jpg" alt="user" />
                        <div className="blog-user-info">
                          <p>Anne Castaneda</p>
                          <p className="xs-text">Jan 27, 2024</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="post-thumb">
                      <Link to={routes.blogDetails}>
                        <ImageWithBasePath
                          className="img-fluid"
                          src="assets/img/blog/blog-thumb-03.jpg"
                          alt="blog-image"
                        />
                      </Link>
                    </div>
                    <div className="post-info">
                      <h6>
                        <Link to={routes.blogDetails}>
                          Graphic Design for Social Media: Tips to Engage Your..
                        </Link>
                      </h6>
                      <div className="blog-user">
                        <ImageWithBasePath src="assets/img/user/user-16.jpg" alt="user" />
                        <div className="blog-user-info">
                          <p>Dann Bowman</p>
                          <p className="xs-text">Jan 30, 2024</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Recent Blogs */}
            {/* Popular Tags */}
            <div className="card tag-widget mb-0">
              <div className="card-header">
                <h6>
                  <ImageWithBasePath src="assets/img/icons/tag-icon.svg" alt="icon" />
                  Popular Tags
                </h6>
              </div>
              <div className="card-body">
                <ul className="tags-list">
                  <li>
                    <Link to="#">In-Demand Skills</Link>
                  </li>
                  <li>
                    <Link to="#">Freelancing</Link>
                  </li>
                  <li>
                    <Link to="#">Business</Link>
                  </li>
                  <li>
                    <Link to="#">Future Trends</Link>
                  </li>
                  <li>
                    <Link to="#">Digital Marketing</Link>
                  </li>
                  <li>
                    <Link to="#">Home Care</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Popular Tags */}
          </div>
        </div>
        {/* /Blog Sidebar */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
  {/* Related Posts */}
  <div className="relate-post-section">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>Related Posts</h3>
          <div className="relate-slider">
          <Slider {...settings1}>
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
                  <Link to="#" className="fav-icon">
                    <i className="feather icon-heart" />
                  </Link>
                </div>
              </div>
              <div className="blog-content">
                <div className="user-head">
                  <div className="user-info">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
                    </Link>
                    <h6>
                      <Link to="">Robert Hollenbeck</Link>
                      <span>Jan 20, 2024</span>
                    </h6>
                  </div>
                  <div className="badge-text">
                    <Link
                      to="#"
                      className="badge bg-primary-light"
                    >
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
                  <Link to="#" className="fav-icon">
                    <i className="feather icon-heart" />
                  </Link>
                </div>
              </div>
              <div className="blog-content">
                <div className="user-head">
                  <div className="user-info">
                    <Link to="#">
                      <ImageWithBasePath src="assets/img/user/user-10.jpg" alt="img" />
                    </Link>
                    <h6>
                      <Link to="#">Abigail Garett</Link>
                      <span>Jan 21, 2024</span>
                    </h6>
                  </div>
                  <div className="badge-text">
                    <Link
                      to="#"
                      className="badge bg-primary-light"
                    >
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
                  <Link to="#" className="fav-icon">
                    <i className="feather icon-heart" />
                  </Link>
                </div>
              </div>
              <div className="blog-content">
                <div className="user-head">
                  <div className="user-info">
                    <Link to="#">
                      <ImageWithBasePath src="assets/img/user/user-11.jpg" alt="img" />
                    </Link>
                    <h6>
                      <Link to="#">David Shorey</Link>
                      <span>Jan 23, 2024</span>
                    </h6>
                  </div>
                  <div className="badge-text">
                    <Link to="" className="badge bg-primary-light">
                      User Guide
                    </Link>
                  </div>
                </div>
                <div className="blog-title">
                  <h3>
                    <Link to={routes.blogDetails}>
                      Understanding Service Marketplace Fees: A Guide for New
                      Users
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
            </Slider>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Related Posts */}
</>

    </div>
  )
}

export default BlogDetailsRightSidebar
import React, { useState } from 'react'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom';
import { all_routes } from '../../router/all_routes';

const BlogRightSidebar = () => {
  const routes = all_routes
  const [showMore, setShowMore] = useState(false);

  const toggleVisibility = () => {
    setShowMore(!showMore);
  };
  const [selectedItems, setSelectedItems] = useState(Array(10).fill(false));
  const handleItemClick = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };
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
      <div className="row">
        <div className="col-lg-8">
          <div className="blog">
            <div className="row">
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-01.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection" key={1}
                      onClick={() => handleItemClick(1)}>
                      <Link to="#" className={`fav-icon ${
                            selectedItems[1] ? "favourite" : ""
                          }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="user-head">
                      <div className="user-info">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
                        </Link>
                        <h6>
                          <Link to="#">Robert Hollenbeck</Link>
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
              </div>
              {/* /Blog */}
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-02.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection"  key={2}
                      onClick={() => handleItemClick(2)}>
                      <Link to="#" className={`fav-icon ${
                            selectedItems[2] ? "favourite" : ""
                          }`}>
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
              </div>
              {/* /Blog */}
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-04.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection" key={3}
                      onClick={() => handleItemClick(3)}>
                      <Link to="#"   className={`fav-icon ${
                            selectedItems[3] ? "favourite" : ""
                          }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="user-head">
                      <div className="user-info">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/user/user-12.jpg" alt="img" />
                        </Link>
                        <h6>
                          <Link to="#">Amanda Hansford</Link>
                          <span>Jan 24, 2024</span>
                        </h6>
                      </div>
                      <div className="badge-text">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
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
              {/* /Blog */}
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-05.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection" key={4}
                      onClick={() => handleItemClick(4)}>
                      <Link to="#" className={`fav-icon ${
                            selectedItems[4] ? "favourite" : ""
                          }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="user-head">
                      <div className="user-info">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/user/user-09.jpg" alt="img" />
                        </Link>
                        <h6>
                          <Link to="#">Kent Choi</Link>
                          <span>Jan 25, 2024</span>
                        </h6>
                      </div>
                      <div className="badge-text">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
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
              {/* /Blog */}
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-07.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection"  key={5}
                      onClick={() => handleItemClick(5)}>
                      <Link to="#" className={`fav-icon ${
                            selectedItems[5] ? "favourite" : ""
                          }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="user-head">
                      <div className="user-info">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/user/user-14.jpg" alt="img" />
                        </Link>
                        <h6>
                          <Link to="#">Joanne Parise</Link>
                          <span>Jan 28, 2024</span>
                        </h6>
                      </div>
                      <div className="badge-text">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
                          Home Care
                        </Link>
                      </div>
                    </div>
                    <div className="blog-title">
                      <h3>
                        <Link to={routes.blogDetails}>
                          Understanding the Benefits of Professional Cleaning
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
              {/* /Blog */}
              {/* Blog */}
              <div className="col-lg-6">
                <div className="blog-grid">
                  <div className="blog-img">
                    <Link to={routes.blogDetails}>
                      <ImageWithBasePath
                        src="assets/img/blog/blog-08.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </Link>
                    <div className="fav-selection" key={7}
                      onClick={() => handleItemClick(7)}>
                      <Link to="#" className={`fav-icon ${
                            selectedItems[7] ? "favourite" : ""
                          }`}>
                        <i className="feather icon-heart" />
                      </Link>
                    </div>
                  </div>
                  <div className="blog-content">
                    <div className="user-head">
                      <div className="user-info">
                        <Link to="#">
                          <ImageWithBasePath src="assets/img/user/user-15.jpg" alt="img" />
                        </Link>
                        <h6>
                          <Link to="#">Kylee Zamudio</Link>
                          <span>Jan 29, 2024</span>
                        </h6>
                      </div>
                      <div className="badge-text">
                        <Link
                          to="#"
                          className="badge bg-primary-light"
                        >
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
              {/* /Blog */}
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
        {/* Blog Sidebar */}
        <div className="col-lg-4 theiaStickySidebar">
          <div className="blog-sidebar sticky-bar mb-0">
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
                      <i className="feather icon-search" />
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
        {showMore && (
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
        )}
        <div className="view-all">
          <Link
            to="#"
            className="viewall-button-one"
            onClick={toggleVisibility}
          >
            {showMore ? 'Less Categories' : 'More 20+ Categories'}
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
</>

    </div>
  )
}

export default BlogRightSidebar
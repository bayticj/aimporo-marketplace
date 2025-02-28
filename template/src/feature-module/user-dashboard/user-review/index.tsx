import React from 'react'
import Breadcrumb from '../breadcrumb'
import UserSidebar from '../user-sidebar'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'
import { DatePicker } from 'antd'
import CommonSelect from '../../../core/common/common-select/commonSelect'
import { reviewer } from '../../../core/common/selectOption'

const UserReview = () => {
  return (
    <>
    <Breadcrumb page='Reviews' />
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-4 col-xl-3 theiaStickySidebar">
          <UserSidebar/>
        </div>
        {/* /Sidebar */}
        {/*User Reviews */}
        <div className="col-xl-9 col-lg-8">
          <div className="dashboard-header">
            <div className="main-title">
              <h3>Reviews</h3>
              <p>Showing 1 to 7 of 17 entries</p>
            </div>
            <div className="head-info">
              <p>
                Total Reviews <span className="text-primary">(17)</span>
              </p>
            </div>
          </div>
          <div className="table-filter">
            <ul className="filter-item">
              <li>
                <p>Filter</p>
              </li>
              <li>
                <div className="form-sort form-wrap">
                  <span className="form-icon">
                    <ImageWithBasePath src="assets/img/icons/calendar-icon.svg" alt="icon" />
                  </span>
                  <DatePicker
                        format={{
                          format: "DD-MM-YYYY",
                          type: "mask",
                        }}
                        className="form-control datetimepicker"
                        placeholder="From Date"
                      />
                </div>
              </li>
              <li>
                <div className="form-sort form-wrap">
                  <span className="form-icon">
                    <ImageWithBasePath src="assets/img/icons/user-heart.svg" alt="icon" />
                  </span>
                  
                  <CommonSelect
                        className="select"
                        options={reviewer}
                        defaultValue={reviewer[0]}
                      />
                </div>
              </li>
            </ul>
            <div className="form-wrap search-form">
              <span className="form-icon">
                <i className="feather icon-search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="user-review">
            <ul className="review-lists">
              <li>
                <div className="review-wrap">
                  <div>
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
                          <p>2 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-content">
                      <h6>
                        I will do designing and executing targeted email
                        campaigns
                      </h6>
                      <p>
                        I recently hired a him to help me with a project and I
                        must say, I am extremely impressed with their work. From
                        start to finish, the freelancer was professional,
                        efficient, and a pleasure to work with.
                      </p>
                    </div>
                  </div>
                  <div className="table-action">
                    <Link to="#">
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="review-wrap">
                  <div>
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
                              <i className="fa-solid fa-star filled" />
                            </span>
                            <span className="rating-count">5.0 </span>
                          </div>
                          <p>15 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-content">
                      <h6>
                        I will do implementing chatbots on websites or messaging
                        apps
                      </h6>
                      <p>
                        One of the things that stood out to me the most was the
                        his ability to meet deadlines. He able to deliver the
                        project on time, despite a tight deadline. This showed
                        their professionalism and dedication to their work.
                      </p>
                    </div>
                  </div>
                  <div className="table-action">
                    <Link to="#">
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="review-wrap">
                  <div>
                    <div className="review-user-info">
                      <div className="review-img">
                        <ImageWithBasePath src="assets/img/user/user-06.jpg" alt="img" />
                      </div>
                      <div className="reviewer-info">
                        <div className="reviewer-loc">
                          <h6>
                            <Link to="#">Andy</Link>
                          </h6>
                          <p>
                            <i className="feather icon-map-pin" />
                            Bulgaria
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
                          <p>1 Months ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="review-content">
                      <h6>
                        I will do professional lifestyle and product photography
                      </h6>
                      <p>
                        Overall, I highly recommend this freelancer to anyone
                        looking for high-quality work and exceptional service.
                        They are a true professional and I will definitely be
                        hiring them again for future projects. Thank you for
                        your hard work and dedication!
                      </p>
                    </div>
                  </div>
                  <div className="table-action">
                    <Link to="#">
                      <i className="feather icon-edit" />
                    </Link>
                    <Link to="#">
                      <i className="feather icon-trash-2" />
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
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
          </div>
        </div>
        {/* /User Reviews */}
      </div>
    </div>
  </div>
  {/* /Page Content */}

</>

  )
}

export default UserReview 
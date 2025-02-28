import React from 'react'
import ImageWithBasePath from '../../core/img'
import { Link } from 'react-router-dom'

const SalesModal = () => {
  return (
    <>
  {/* Order Cancel */}
  <div
    className="modal new-modal fade"
    id="cancel_order"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Cancel your Order</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="form-wrap form-item">
                  <textarea
                    className="form-control"
                    placeholder="Reason"
                    defaultValue={""}
                  />
                </div>
                <div className="modal-btn">
                  <button className="btn btn-primary w-100" type="button" data-bs-dismiss="modal">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Order Cancel */}
  {/* Change Your Status */}
  <div
    className="modal new-modal fade"
    id="order_status"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Change Your Status</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="form-wrap form-item">
                  <label className="col-form-label">Order Status</label>
                  <select className="select">
                    <option>Select Status</option>
                    <option>New</option>
                    <option>Processing</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="modal-btn">
                  <button className="btn btn-primary w-100" type="button" data-bs-dismiss="modal">
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Change Your Status */}
  {/* Add Review */}
  <div
    className="modal new-modal fade"
    id="add_review"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Review</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="review-item review-wrap">
                  <div className="review-user-info">
                    <div className="review-img">
                      <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="img" />
                    </div>
                    <div className="reviewer-info">
                      <div className="reviewer-loc">
                        <h6>
                          <Link to="#">kadajsalamander</Link>
                        </h6>
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
                    <h6>
                      I will do designing and executing targeted email campaigns
                    </h6>
                    <p className="mb-0">
                      I recently hired a him to help me with a project and I
                      must say, I am extremely impressed with their work. From
                      start to finish, the freelancer was professional,
                      efficient, and a pleasure to work with.
                    </p>
                  </div>
                </div>
                <div className="review-item review-wrap reply-box mb-0">
                  <div className="review-user-info">
                    <div className="review-img">
                      <ImageWithBasePath src="assets/img/user/user-02.jpg" alt="img" />
                    </div>
                    <div className="reviewer-info">
                      <div className="reviewer-loc">
                        <h6>
                          <Link to="#">Andrew</Link>
                        </h6>
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
                        <p>1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="review-content">
                    <p className="mb-0">Thank You</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Review */}
  {/* Add Review */}
  <div
    className="modal new-modal fade"
    id="add_review1"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Review</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="review-item review-wrap">
                  <div className="review-user-info">
                    <div className="review-img">
                      <ImageWithBasePath src="assets/img/user/user-01.jpg" alt="img" />
                    </div>
                    <div className="reviewer-info">
                      <div className="reviewer-loc">
                        <h6>
                          <Link to="#">kadajsalamander</Link>
                        </h6>
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
                    <h6>
                      I will do designing and executing targeted email campaigns
                    </h6>
                    <p className="mb-0">
                      I recently hired a him to help me with a project and I
                      must say, I am extremely impressed with their work. From
                      start to finish, the freelancer was professional,
                      efficient, and a pleasure to work with.
                    </p>
                  </div>
                </div>
                <div className="form-wrap form-item">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Reply"
                    defaultValue={""}
                  />
                </div>
                <div className="modal-btn">
                  <button className="btn btn-primary w-100" type="button" data-bs-dismiss="modal">
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Review */}
  {/* Order Details */}
  <div
    className="modal new-modal fade"
    id="order_details"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title d-flex align-items-center">
            Sales Details{" "}
            <span className="badge bg-success new-badge ms-2">New</span>
          </h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>x</span>
          </button>
        </div>
        <div className="modal-body service-modal">
          <div className="row">
            <div className="col-md-12">
              <form >
                <div className="order-status">
                  <div className="order-item">
                    <div className="order-img">
                      <ImageWithBasePath
                        src="assets/img/service/service-slide-01.jpg"
                        alt="img"
                      />
                    </div>
                    <div className="order-info">
                      <h5>
                        I will design, redesign wordpress website using
                        elementor pro
                      </h5>
                      <ul>
                        <li>ID : #1245</li>
                        <li>Delivery : Jan 29 2024 8:10 AM</li>
                      </ul>
                    </div>
                  </div>
                  <h6 className="title">Service Details</h6>
                  <div className="detail-table table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Designing and developing...</td>
                          <td>1</td>
                          <td className="text-primary">$100</td>
                        </tr>
                        <tr>
                          <td>Additional 1 : I can clean</td>
                          <td>1</td>
                          <td className="text-primary">$100</td>
                        </tr>
                        <tr>
                          <td>Super Fast : Super fast delivery</td>
                          <td>1</td>
                          <td className="text-primary">$100</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={2}>Grand Total</th>
                          <th className="text-primary">$300</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <h6 className="title">Customer Details</h6>
                  <div className="user-details">
                    <div className="user-img">
                      <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="img" />
                    </div>
                    <div className="user-info">
                      <h5>
                        Adrian Revolt <span className="location">From USA</span>
                      </h5>
                      <p>
                        <i className="fa-solid fa-star" />
                        Ratings 5.0 (45 Reviews)
                      </p>
                    </div>
                  </div>
                  <h6 className="title">Upload Final Files</h6>
                  <div className="form-wrap form-item">
                    <div className="drag-upload">
                      <input type="file" accept="video/*" />
                      <div className="img-upload">
                        <p>
                          <i className="feather icon-upload-cloud" />
                          Drag or Upload Video
                        </p>
                      </div>
                    </div>
                    <p>Maximum file upload size 5MB</p>
                  </div>
                  <div className="form-wrap form-item">
                    <div className="upload-wrap mb-0">
                      <div className="upload-image">
                        <span>
                          <i className="feather icon-image" />
                        </span>
                        <div>
                          <h6>Video_gig-1.mp4</h6>
                          <p>Size: 353KB</p>
                        </div>
                      </div>
                      <Link to="#" className="del-action">
                        <i className="feather icon-trash-2" />
                      </Link>
                    </div>
                  </div>
                  <div className="modal-btn">
                    <div className="row gx-2">
                      <div className="col-6">
                        <Link
                          to="#"
                          data-bs-dismiss="modal"
                          className="btn btn-secondary w-100 justify-content-center"
                        >
                          Cancel
                        </Link>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-primary w-100" type="button" data-bs-dismiss="modal">
                          Save &amp; Complete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Order Details */}
</>

  )
}

export default SalesModal
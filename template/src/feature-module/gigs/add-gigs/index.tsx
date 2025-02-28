import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link, useNavigate } from "react-router-dom";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { category, subcategory } from "../../../core/common/selectOption";
import { all_routes } from "../../router/all_routes";
import { Modal } from "react-bootstrap";
interface FormRow {
  id: number;
  iCan: string;
  forAmount: string;
  inDays: string;
}
const AddGigs = () => {
  // const navigate = useNavigate();

  // const navigateToGigs = () => {
  //   // Remove the modal backdrop
  //   const backdrop = document.querySelector(".modal-backdrop");
  //   if (backdrop && backdrop.parentNode) {
  //     backdrop.parentNode.removeChild(backdrop);
  //   }
  //    // Remove any modal-related classes from the body
  //    document.body.classList.remove("modal-open");
  //    document.body.style.paddingRight = '';
  //    document.body.style.overflow = '';
  // };
  const [openModal, setOpenModal] = useState(false);
  const routes = all_routes;
  const [formRows, setFormRows] = useState<FormRow[]>([]);

  const addNewRow = () => {
    setFormRows([
      ...formRows,
      { id: Date.now(), iCan: "", forAmount: "", inDays: "" },
    ]);
  };

  const removeRow = (id: number) => {
    setFormRows(formRows.filter((row) => row.id !== id));
  };

  const handleChange = (id: number, field: keyof FormRow, value: string) => {
    setFormRows(
      formRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar breadcrumb-bar-info">
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
                      Add New Gigs
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title mb-0">Add New Gigs</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="marketing-section gig-post">
                  <div className="marketing-content">
                    <h2>
                      <span className="text-primary">Post a Gig</span> in few
                      seconds
                    </h2>
                    <p>
                      Gig: a packed service you can deliver remotely or around
                      you for a fixed price in a set time frame.
                    </p>
                  </div>
                  <div className="gigs-step">
                    <ul>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-01.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 01</p>
                        <h6>Create your gig</h6>
                      </li>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-02.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 02</p>
                        <h6>Publish</h6>
                      </li>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-03.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 03</p>
                        <h6>Receive Orders</h6>
                      </li>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-01.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 04</p>
                        <h6>Deliver the work</h6>
                      </li>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-04.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 05</p>
                        <h6>Get Paid</h6>
                      </li>
                      <li>
                        <span>
                          <ImageWithBasePath
                            src="assets/img/icons/book-05.svg"
                            alt="img"
                          />
                        </span>
                        <p>Step 06</p>
                        <h6>Withdraw Funds</h6>
                      </li>
                    </ul>
                  </div>
                  <div className="marketing-bg">
                    <ImageWithBasePath
                      src="assets/img/bg/market-bg.png"
                      alt="img"
                      className="market-bg"
                    />
                    <ImageWithBasePath
                      src="assets/img/bg/market-bg-01.png"
                      alt="img"
                      className="market-img"
                    />
                  </div>
                </div>
              </div>
              {/* General */}
              <div className="col-lg-4">
                <div className="property-info">
                  <h4>General</h4>
                  <p>
                    Add the Details of your Gig to know the user to receive
                    orders
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="add-property-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-wrap">
                        <label className="col-form-label">
                          Title for your Gig *
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">
                          Select Category
                        </label>
                        <CommonSelect
                          className="select"
                          options={category}
                          defaultValue={category[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-wrap">
                        <label className="col-form-label">
                          Select Sub Category
                        </label>

                        <CommonSelect
                          className="select"
                          options={subcategory}
                          defaultValue={subcategory[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-wrap">
                        <label className="col-form-label">Description</label>
                        <textarea
                          className="form-control"
                          rows={6}
                          placeholder="Provide more details about your gig *"
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-wrap gig-option">
                        <h6>Gig Option</h6>
                        <label className="custom_check">
                          <input type="checkbox" />
                          <span className="checkmark" />
                          Featured
                        </label>
                        <label className="custom_check">
                          <input type="checkbox" />
                          <span className="checkmark" />
                          Hot
                        </label>
                        <label className="custom_check">
                          <input type="checkbox" />
                          <span className="checkmark" />
                          New
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /General */}
              {/* Buyer */}
              <>
                <div className="col-lg-4">
                  <div className="property-info">
                    <h4>Buyer</h4>
                    <p>
                      Add Extra Service &amp; Other Details Of the Gigs to earn
                      Extra Amount
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="add-property-wrap">
                    <div className="add-content">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-wrap">
                            <label className="col-form-label">I Can</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-wrap">
                            <label className="col-form-label">For ($)</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-wrap">
                            <label className="col-form-label">In (Day)</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Link
                          to="#"
                          className="btn btn-secondary amount-add"
                          onClick={addNewRow}
                        >
                          <i className="feather icon-plus-circle" />
                          Add New
                        </Link>
                      </div>
                      {formRows.map((row) => (
                        <div className="row sign-cont" key={row.id}>
                          <div className="col-md-4">
                            <div className="form-wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="I Can"
                                value={row.iCan}
                                onChange={(e) =>
                                  handleChange(row.id, "iCan", e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-wrap">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="For ($)"
                                value={row.forAmount}
                                onChange={(e) =>
                                  handleChange(
                                    row.id,
                                    "forAmount",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-wrap d-flex align-items-center">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="In (Day)"
                                value={row.inDays}
                                onChange={(e) =>
                                  handleChange(row.id, "inDays", e.target.value)
                                }
                              />
                              <Link
                                to="#"
                                className="trash-sign ms-2 text-danger"
                                onClick={() => removeRow(row.id)}
                              >
                                <i className="feather icon-trash-2"></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-md-12">
                        <label className="custom_check extra-serv">
                          <input type="checkbox" className="disable-check" />
                          <span className="checkmark" />
                          Superfast Delivery
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div className="form-wrap">
                          <label className="col-form-label">I Can</label>
                          <input
                            type="text"
                            className="form-control exta-label"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-wrap">
                          <label className="col-form-label">For ($)</label>
                          <input
                            type="text"
                            className="form-control exta-label"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-wrap">
                          <label className="col-form-label">In (Day)</label>
                          <input
                            type="text"
                            className="form-control exta-label"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <h6>How are you planning to work with the Buyer? *</h6>
                        <div className="form-wrap gig-option">
                          <label className="custom_radio">
                            <input type="radio" name="buyer" defaultChecked />
                            <span className="checkmark" />
                            Remote
                          </label>
                          <label className="custom_radio">
                            <input type="radio" name="buyer" />
                            <span className="checkmark" />
                            On-site
                          </label>
                        </div>
                        <div className="form-wrap">
                          <label className="col-form-label">Description</label>
                          <textarea
                            className="form-control"
                            rows={6}
                            placeholder="What do you need from the Buyer to get started"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>

              {/* /Buyer */}
              {/* Upload */}
              <div className="col-lg-4">
                <div className="property-info">
                  <h4>Upload</h4>
                  <p>Add images and videos for your gigs.</p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="add-property-wrap">
                  <div className="row">
                    <div className="col-md-12">
                      <h6>Upload images videos and more</h6>
                      <ul className="nav upload-list">
                        <li>
                          <Link
                            to="#"
                            className="active"
                            data-bs-toggle="tab"
                            data-bs-target="#upload-img"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/upload-01.svg"
                                alt="icon"
                              />
                            </span>
                            <h6>Upload Image</h6>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            data-bs-toggle="tab"
                            data-bs-target="#upload-video"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/upload-02.svg"
                                alt="icon"
                              />
                            </span>
                            <h6>Upload Videos</h6>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            data-bs-toggle="tab"
                            data-bs-target="#upload-link"
                          >
                            <span>
                              <ImageWithBasePath
                                src="assets/img/icons/upload-03.svg"
                                alt="icon"
                              />
                            </span>
                            <h6>Upload Video Link</h6>
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div className="tab-pane show active" id="upload-img">
                          <div className="drag-upload form-wrap">
                            <input type="file" accept="image/*" />
                            <div className="img-upload">
                              <p>
                                <i className="feather icon-upload-cloud" />
                                Drag or Upload Image
                              </p>
                            </div>
                          </div>
                          <div className="upload-wrap">
                            <div className="upload-image">
                              <span>
                                <i className="feather icon-image" />
                              </span>
                              <h6>Worklog.png</h6>
                            </div>
                            <Link to="#" className="del-action">
                              <i className="feather icon-trash-2" />
                            </Link>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="upload-video">
                          <div className="drag-upload form-wrap">
                            <input type="file" accept="video/*" />
                            <div className="img-upload">
                              <p>
                                <i className="feather icon-upload-cloud" />
                                Drag or Upload Video
                              </p>
                            </div>
                          </div>
                          <div className="upload-wrap">
                            <div className="upload-image">
                              <span>
                                <i className="feather icon-image" />
                              </span>
                              <h6>Video_gig-1.mp4</h6>
                            </div>
                            <Link to="#" className="del-action">
                              <i className="feather icon-trash-2" />
                            </Link>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="upload-link">
                          <div className="form-wrap">
                            <label className="col-form-label">
                              Upload video link *
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-wrap">
                            <label className="col-form-label">
                              Vimeo link *
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="confirm-content">
                        <div className="form-wrap">
                          <label className="custom_check">
                            <input type="checkbox" />
                            <span className="checkmark" /> I confirm that I am
                            able to deliver this service to Buyers within the
                            delivery time specified.I will update or pause my
                            Gig if I can no longer meet this delivery time.I
                            understand that late delivery will adversely affect
                            my rankings on Aimporo Philippines And will entitle the buyer
                            to a refund. See Terms &amp; Conditions
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-item text-end">
                  <Link to="#" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-primary"
                    onClick={() => setOpenModal(true)}
                  >
                    Publish Gig
                  </Link>
                </div>
              </div>
              {/* /Upload */}
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
      <>
        {/* Success Contact */}
        <Modal show={openModal} onHide={() => setOpenModal(false)}>
            <div className="modal-body">
              <div className="success-message text-center">
                <div className="success-popup-icon">
                  <ImageWithBasePath
                    src="assets/img/icons/happy-icon.svg"
                    alt="icon"
                  />
                </div>
                <div className="success-content">
                  <h4>Gigs Published Successfully</h4>
                  <p>
                    Updated New Gigs{" "}
                    <span>
                      "Designing and developing software applications"
                    </span>{" "}
                    in the list
                  </p>
                </div>
                <div className="col-lg-12 text-center">
                  <Link to={routes.userGigs} className="btn btn-primary">
                    Back to Gigs
                  </Link>
                </div>
              </div>
            </div>
          </Modal>
        {/* /Success Contact */}
      </>
    </div>
  );
};

export default AddGigs;

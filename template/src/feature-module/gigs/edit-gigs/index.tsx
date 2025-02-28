import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { Modal } from "react-bootstrap";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { category, subcategory } from "../../../core/common/selectOption";
interface FormRow {
  id: number;
  iCan: string;
  forAmount: string;
  inDays: string;
}
const EditGigs = () => {
  const routes = all_routes;
  const [formData, setFormData] = useState([
    { canDo: "", forAmount: "", inDays: "" },
  ]);
  const [superfastDelivery, setSuperfastDelivery] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [workMode, setWorkMode] = useState("Remote");
  const [description, setDescription] = useState("");

  const addNewRow = () => {
    setFormData([...formData, { canDo: "", forAmount: "", inDays: "" }]);
  };

  const removeRow = (index: number) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData(updatedFormData);
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
                      Edit Gigs
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title mb-0">Edit Gigs</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="page-content">
          <div className="container">
            <div className="row">
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
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title for your Gig *"
                          defaultValue="Designing and developing software"
                        />
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
                          defaultValue={category[1]}
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
                          defaultValue={subcategory[1]}
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
                          defaultValue={
                            "Amazon affiliate marketing autopilot website with google SEO Autoblog for Making Money OnlineAffiliate marketing is an excellent way to earn passive income. this type of website doesn't require any extra maintenance or technical knowledge to run."
                          }
                        />
                      </div>
                      <div className="form-wrap gig-option">
                        <h6>Gig Option</h6>
                        <label className="custom_check">
                          <input type="checkbox" disabled />
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
                          <input
                            type="text"
                            className="form-control"
                            placeholder="I Can"
                            defaultValue="Full website design and redesign using Elementor"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-wrap">
                          <label className="col-form-label">For ($)</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="For ($)"
                            defaultValue={+200}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-wrap">
                          <label className="col-form-label">In (Day)</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="In (Day)"
                            defaultValue={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-secondary amount-add"
                        onClick={addNewRow}
                      >
                        <i className="feather icon-plus-circle"></i>Add New
                      </button>
                    </div>
                    {formData.map((item, index) => (
                      <div className="row sign-cont" key={index}>
                        <div className="col-md-4">
                          <div className="form-wrap">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="I Can"
                              name="canDo"
                              value={item.canDo}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-wrap">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="For ($)"
                              name="forAmount"
                              value={item.forAmount}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-wrap d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="In (Day)"
                              name="inDays"
                              value={item.inDays}
                              onChange={(e) => handleChange(index, e)}
                            />
                            <Link
                              to="#"
                              className="trash-sign ms-2 text-danger"
                              onClick={() => removeRow(index)}
                            >
                              <i className="feather icon-trash-2"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-md-12">
                      <label className="custom_check extra-serv">
                        <input
                          type="checkbox"
                          className="disable-check"
                          defaultChecked={superfastDelivery}
                          onChange={() =>
                            setSuperfastDelivery(!superfastDelivery)
                          }
                        />
                        <span className="checkmark"></span>Superfast Delivery
                      </label>
                    </div>
                    <div className="col-md-4">
                      <div className="form-wrap">
                        <label className="col-form-label" htmlFor="Can">
                          I Can
                        </label>
                        <input
                          type="text"
                          className="form-control exta-label"
                          placeholder="I Can"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-wrap">
                        <label className="col-form-label" htmlFor="For">
                          For ($)
                        </label>
                        <input
                          type="text"
                          className="form-control exta-label"
                          placeholder="For ($)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-wrap">
                        <label className="col-form-label" htmlFor="In">
                          In (Day)
                        </label>
                        <input
                          type="text"
                          className="form-control exta-label"
                          placeholder="In (Day)"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h6>How are you planning to work with the Buyer? *</h6>
                      <div className="form-wrap gig-option">
                        <label className="custom_radio">
                          <input
                            type="radio"
                            name="buyer"
                            value="Remote"
                            defaultChecked={workMode === "Remote"}
                            onChange={(e) => setWorkMode(e.target.value)}
                          />
                          <span className="checkmark"></span>Remote
                        </label>
                        <label className="custom_radio">
                          <input
                            type="radio"
                            name="buyer"
                            value="On-site"
                            defaultChecked={workMode === "On-site"}
                            onChange={(e) => setWorkMode(e.target.value)}
                          />
                          <span className="checkmark"></span>On-site
                        </label>
                      </div>
                      <div className="form-wrap">
                        <label className="col-form-label" htmlFor="Description">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          placeholder="What do you need from the Buyer to get started"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                            my rankings on Aimporo Philippines And will entitle
                            the buyer to a refund. See Terms &amp; Conditions
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
        <>
          {/* Gigs Publish */}

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
          {/* /Gigs Publish */}
        </>
      </>
    </div>
  );
};

export default EditGigs;

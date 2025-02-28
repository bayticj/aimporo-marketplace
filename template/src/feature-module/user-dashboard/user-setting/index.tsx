import React from 'react'
import Breadcrumb from '../breadcrumb'
import SettingsTab from '../settingsTab'
import ImageWithBasePath from '../../../core/img'
import { Link } from 'react-router-dom'

const UserSetting = () => {
  return (
    <>
    <Breadcrumb page='Settings'/>
  {/* Page Content */}
  <div className="page-content content">
    <div className="container">
      <SettingsTab/>
      <div className="row">
        <div className="col-lg-6">
          <div className="settings-card">
            <div className="settings-card-head">
              <h4>Personal Information</h4>
            </div>
            <form >
              <div className="settings-card-body">
                <div className="img-upload-head">
                  <div className="profile-img">
                    <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="" />
                  </div>
                  <div className="img-formate">
                    <p>
                      Max file size is 5MB, Minimum dimension: 150x150 And
                      Suitable files are .jpg &amp; .png
                    </p>
                    <div className="upload-remove-btns">
                      <div className="drag-upload form-wrap">
                        <input type="file" accept="image/*" />
                        <div className="img-upload">
                          <p>Upload Image</p>
                        </div>
                      </div>
                      <div className="img-remove-btn">
                        <Link to="">Remove Image</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-wrap">
                      <label>First Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-wrap">
                      <label>Last Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-wrap">
                      <label>Email</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-wrap">
                      <label>Phone number</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Date of Birth</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Address</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings-card-footer">
                <div className="btn-item">
                  <Link to="#" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button className="btn btn-primary" type="button">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="settings-card">
            <div className="settings-card-head">
              <h4>Personal Information</h4>
            </div>
            <form >
              <div className="settings-card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Job title</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Language Known</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Skill Set</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>About You</label>
                      <textarea
                        rows={5}
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Why Work with me</label>
                      <textarea
                        rows={5}
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings-card-footer">
                <div className="btn-item">
                  <Link to="#" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button className="btn btn-primary" type="button">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="settings-card">
            <div className="settings-card-head">
              <h4>Change Email</h4>
            </div>
            <form >
              <div className="settings-card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Current Email</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>New Email</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-wrap">
                      <label>Confirm Email</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="settings-card-footer">
                <div className="btn-item">
                  <Link to="#" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button className="btn btn-primary" type="button">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

  )
}

export default UserSetting
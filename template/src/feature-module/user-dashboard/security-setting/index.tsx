import React from "react";
import Breadcrumb from "../breadcrumb";
import SettingsTab from "../settingsTab";
import { Link } from "react-router-dom";

const SecuritySetting = () => {
  return (
    <>
      <Breadcrumb page="Settings" />
      {/* Page Content */}
      <div className="page-content content">
        <div className="container">
          <SettingsTab />
          <>
            <div className="row">
              <div className="col-lg-6">
                <div className="settings-card">
                  <div className="settings-card-head">
                    <h4>Password</h4>
                  </div>
                  <div className="settings-card-body">
                    <span className="changed-info">
                      Last Changed 20 Jan 2024, 09:00 AM
                    </span>
                  </div>
                  <div className="settings-card-footer">
                    <div className="btn-item">
                      <Link
                        to="#"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#change_password"
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="settings-card">
                  <div className="settings-card-head d-flex justify-content-between align-items-center">
                    <h4>Two Factor Authentication</h4>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="user2"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="user2" className="checktoggle" />
                    </div>
                  </div>
                  <div className="settings-card-body">
                    <span className="changed-info">
                      Last Changed 20 Jan 2024, 09:00 AM
                    </span>
                  </div>
                  <div className="settings-card-footer">
                    <div className="btn-item">
                      <Link to="#" className="btn btn-primary">
                        Disable
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="settings-card">
                  <div className="settings-card-head">
                    <h4>Device Management</h4>
                  </div>
                  <div className="settings-card-body">
                    <span className="changed-info">
                      Last Changed 20 Jan 2024, 09:00 AM
                    </span>
                  </div>
                  <div className="settings-card-footer">
                    <div className="btn-item">
                      <Link to="#" className="btn btn-primary">
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="settings-card">
                  <div className="settings-card-head">
                    <h4>Account Acitivity</h4>
                  </div>
                  <div className="settings-card-body">
                    <span className="changed-info">
                      Last Changed 20 Jan 2024, 09:00 AM
                    </span>
                  </div>
                  <div className="settings-card-footer">
                    <div className="btn-item">
                      <Link to="#" className="btn btn-primary">
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal new-modal fade"
              id="change_password"
              data-keyboard="false"
              data-backdrop="static"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Change Password</h5>
                    <button
                      type="button"
                      className="close-btn"
                      data-bs-dismiss="modal"
                    >
                      <span>×</span>
                    </button>
                  </div>
                  <div className="modal-body service-modal">
                    <form >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Current Password"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="New Password"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="btn-item">
                            <Link
                              to="#"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </Link>
                            <button className="btn btn-primary" type="button" data-bs-dismiss="modal">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default SecuritySetting;

import React from "react";
import Breadcrumb from "../breadcrumb";
import SettingsTab from "../settingsTab";
import { Link } from "react-router-dom";

const PreferenceSetting = () => {
  return (
    <>
      <Breadcrumb page="Settings" />
      {/* Page Content */}
      <div className="page-content content">
        <div className="container">
          <SettingsTab />
          <>
            <div className="row">
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Purchase List</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle1"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle1" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Sales List</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle2"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle2" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Uploaded Files</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle3"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle3" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Reviews</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle4"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle4" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Wishlist</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle5"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle5" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Chat</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle6"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle6" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Wallet</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle7"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle7" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="settings-card">
                  <div className="settings-card-body d-flex justify-content-between">
                    <h6>Payments</h6>
                    <div className="status-toggle d-flex align-items-center">
                      <input
                        type="checkbox"
                        id="toggle8"
                        className="check"
                        defaultChecked
                      />
                      <label htmlFor="toggle8" className="checktoggle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-item mb-4">
              <Link to="#" className="btn btn-secondary">
                Cancel
              </Link>
              <Link to="#" className="btn btn-primary">
                Save Changes
              </Link>
            </div>
          </>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default PreferenceSetting;

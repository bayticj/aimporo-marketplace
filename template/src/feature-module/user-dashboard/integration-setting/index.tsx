import React from "react";
import Breadcrumb from "../breadcrumb";
import SettingsTab from "../settingsTab";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/img";

const IntegrationSetting = () => {
  return (
    <>
      <Breadcrumb page="Settings" />
      {/* Page Content */}
      <div className="page-content content">
        <div className="container">
          <SettingsTab />
          <>
          <>
  <div className="row">
    <div className="col-lg-6">
      <div className="table-card integrated-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>SMS Gateway Integrations</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="custom-first-row">
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-01.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link
                    to="#"
                    className="settings-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#connect_nexmo"
                  >
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-1"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-1" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-02.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-2"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-2" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-03.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input type="checkbox" id="toggle-3" className="check" />
                    <label htmlFor="toggle-3" className="checktoggle" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="table-card integrated-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Email Integrations</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="custom-first-row">
                <td>
                  <div className="d-flex align-items-center integration-name">
                    <span className="integration-icon">
                      <ImageWithBasePath src="assets/img/gateway/gateway-04.svg" alt="" />
                    </span>
                    <h6>SendGrid</h6>
                  </div>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-4"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-4" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center integration-name">
                    <span className="integration-icon">
                      <ImageWithBasePath src="assets/img/gateway/gateway-05.svg" alt="" />
                    </span>
                    <h6>PHP Mailer</h6>
                  </div>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-5"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-5" className="checktoggle" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="table-card integrated-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Payment Gateway Integrations</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="custom-first-row">
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-09.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-9"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-9" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-10.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-10"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-10" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="integration-icon">
                    <ImageWithBasePath src="assets/img/gateway/gateway-11.svg" alt="" />
                  </span>
                </td>
                <td>
                  <span className="badge bg-soft-danger new-badge">
                    Not Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input type="checkbox" id="toggle-11" className="check" />
                    <label htmlFor="toggle-11" className="checktoggle" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="table-card integrated-table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Social Media Integrations</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="custom-first-row">
                <td>
                  <div className="d-flex align-items-center integration-name">
                    <span className="integration-icon">
                      <ImageWithBasePath src="assets/img/gateway/gateway-06.svg" alt="" />
                    </span>
                    <h6>Facebook</h6>
                  </div>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-6"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-6" className="checktoggle" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center integration-name">
                    <span className="integration-icon">
                      <ImageWithBasePath src="assets/img/gateway/gateway-07.svg" alt="" />
                    </span>
                    <h6>Twitter</h6>
                  </div>
                </td>
                <td>
                  <span className="badge bg-soft-secondary new-badge">
                    Connected
                  </span>
                </td>
                <td>
                  <Link to="#" className="settings-modal">
                    <i className="feather icon-settings" />
                  </Link>
                </td>
                <td>
                  <div className="status-toggle d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="toggle-7"
                      className="check"
                      defaultChecked
                    />
                    <label htmlFor="toggle-7" className="checktoggle" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  {/* Integrated Modal */}
  <div
    className="modal new-modal fade"
    id="connect_nexmo"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Nexmo</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>×</span>
          </button>
        </div>
        <div className="modal-body service-modal">
          <form >
            <div className="row">
              <div className="col-md-12">
                <div className="form-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="API Key"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="API Secret Key"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sender ID"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-wrap gig-option">
                  <label className="custom_radio">
                    <input type="radio" name="gateway" defaultChecked />
                    <span className="checkmark" />
                    Active
                  </label>
                  <label className="custom_radio">
                    <input type="radio" name="gateway" />
                    <span className="checkmark" />
                    Inactive
                  </label>
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
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* /Integrated Modal */}
</>


          </>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default IntegrationSetting;

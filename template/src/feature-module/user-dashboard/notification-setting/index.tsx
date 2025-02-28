import React from "react";
import Breadcrumb from "../breadcrumb";
import SettingsTab from "../settingsTab";
import { Link } from "react-router-dom";

const NotificationSetting = () => {
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
    <div className="table-card noti-setting-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Transactional Notifications</th>
              <th>Push</th>
              <th>Email</th>
              <th>SMS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order Confirmation</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle1"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle1" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle2"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle2" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle3"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle3" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Service Requests</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle4"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle4" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle5"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle5" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggle6" className="check" />
                  <label htmlFor="toggle6" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Payment Receipts</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle7"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle7" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle8"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle8" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggle9" className="check" />
                  <label htmlFor="toggle9" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Appointment Reminders</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle10"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle10" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle11"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle11" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle12"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle12" className="checktoggle" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-item mt-4">
        <Link to="#" className="btn btn-secondary">
          Cancel
        </Link>
        <Link to="#" className="btn btn-primary">
          Save Changes
        </Link>
      </div>
    </div>
    <div className="table-card noti-setting-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User Engagement Notifications</th>
              <th>Push</th>
              <th>Email</th>
              <th>SMS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Profile Completion Reminder</td>
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
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle-3"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle-3" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Feedback or Survey Requests</td>
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
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggle-6" className="check" />
                  <label htmlFor="toggle-6" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Achievements</td>
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
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle-8"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle-8" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggle-9" className="check" />
                  <label htmlFor="toggle-9" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Suggestions</td>
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
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle-11"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle-11" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggle-12"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggle-12" className="checktoggle" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-item mt-4">
        <Link to="#" className="btn btn-secondary">
          Cancel
        </Link>
        <Link to="#" className="btn btn-primary">
          Save Changes
        </Link>
      </div>
    </div>
  </div>
  <div className="col-lg-6">
    <div className="table-card noti-setting-table">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>System Notifications</th>
              <th>Push</th>
              <th>Email</th>
              <th>SMS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>System Maintenance Schedules</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-1"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-1" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-2"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-2" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-3"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-3" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Updates</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-4"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-4" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-5"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-5" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggles-6" className="check" />
                  <label htmlFor="toggles-6" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Security Alerts</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-7"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-7" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-8"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-8" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input type="checkbox" id="toggles-9" className="check" />
                  <label htmlFor="toggles-9" className="checktoggle" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Service Availability</td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-10"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-10" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-11"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-11" className="checktoggle" />
                </div>
              </td>
              <td>
                <div className="status-toggle d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="toggles-12"
                    className="check"
                    defaultChecked
                  />
                  <label htmlFor="toggles-12" className="checktoggle" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn-item mt-4">
        <Link to="#" className="btn btn-secondary">
          Cancel
        </Link>
        <Link to="#" className="btn btn-primary">
          Save Changes
        </Link>
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

export default NotificationSetting;

import React from "react";
import { all_routes } from "../router/all_routes";
import { Link, useLocation } from "react-router-dom";

const SettingsTab = () => {
  const routes = all_routes;
  const location = useLocation();
  return (
    <>
      <div className="page-back-btn">
        <Link to={routes.dashboard  }>
          <i className="feather icon-arrow-left me-2" />
          Back to Dashboard
        </Link>
      </div>
      <div className="settings-page-lists">
        <ul className="settings-head">
          <li>
            <Link
              to={routes.userSetting}
              className={`${
                routes.userSetting.includes(location.pathname) ? "active" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={routes.securitySetting}
              className={`${
                routes.securitySetting.includes(location.pathname)
                  ? "active"
                  : ""
              }`}
            >
              Security
            </Link>
          </li>
          <li>
            <Link
              to={routes.prefernceSetting}
              className={`${
                routes.prefernceSetting.includes(location.pathname)
                  ? "active"
                  : ""
              }`}
            >
              Preferences
            </Link>
          </li>
          <li>
            <Link
              to={routes.billingSetting}
              className={`${
                routes.billingSetting.includes(location.pathname)
                  ? "active"
                  : ""
              }`}
            >
              Plan &amp; Billing
            </Link>
          </li>
          <li>
            <Link
              to={routes.notificationSetting}
              className={`${
                routes.notificationSetting.includes(location.pathname)
                  ? "active"
                  : ""
              }`}
            >
              Notifications
            </Link>
          </li>
          <li>
            <Link
              to={routes.integrationSetting}
              className={`${
                routes.integrationSetting.includes(location.pathname)
                  ? "active"
                  : ""
              }`}
            >
              Integrations
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SettingsTab;

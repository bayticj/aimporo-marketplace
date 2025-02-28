import React from "react";
import ImageWithBasePath from "../../core/img";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../router/all_routes";

const UserSidebar = () => {
  const routes = all_routes;
  const location = useLocation();

  
  return (
    <div className="user-sidebar sticky-bar">
      <div className="user-head">
        <span className="flex-shrink-0">
          <ImageWithBasePath
            src="assets/img/user/user-05.jpg"
            className="img-fluid"
            alt="img"
          />
        </span>
        <div className="user-information">
          <div>
            <h6>Harry Brooks</h6>
            <ul>
              <li>USA</li>
              <li>
                <i className="fa-solid fa-star" /> 5.0 (45)
              </li>
            </ul>
          </div>
          <Link to={routes.userProfile} className="user-edit">
            <i className="fa-solid fa-user-pen" />
          </Link>
        </div>
      </div>
      <div className="user-body">
        <ul>
          <li>
            <Link to={routes.dashboard} className={`${
                routes.dashboard.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-01.svg"
                className="img-fluid"
                alt="img"
              />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={routes.userGigs} className={`${
                routes.userGigs.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-02.svg"
                className="img-fluid"
                alt="img"
              />
              Manage Gigs
            </Link>
          </li>
          <li>
            <Link to={routes.userPurchase} className={`${
                routes.userPurchase.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-03.svg"
                className="img-fluid"
                alt="img"
              />
              Purchase
            </Link>
          </li>
          <li>
            <Link
              to={routes.userSales}
              className={`${
                routes.userSales.includes(location.pathname) ? "active" : ""
              }`}
            >
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-04.svg"
                className="img-fluid"
                alt="img"
              />
              Sales
            </Link>
          </li>
          <li>
            <Link to={routes.userFiles} className={`${
                routes.userFiles.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-05.svg"
                className="img-fluid"
                alt="img"
              />
              Files
            </Link>
          </li>
          <li>
            <Link to={routes.userReview} className={`${
                routes.userReview.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-06.svg"
                className="img-fluid"
                alt="img"
              />
              My Reviews
            </Link>
          </li>
          <li>
            <Link to={routes.userWishlist} className={`${
                routes.userWishlist.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-07.svg"
                className="img-fluid"
                alt="img"
              />
              Wishlist
            </Link>
          </li>
          <li>
            <Link to={routes.userMessage} className={`${
                routes.userMessage.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-08.svg"
                className="img-fluid"
                alt="img"
              />
              Messages
            </Link>
          </li>
          <li>
            <Link to={routes.userWallet} className={`${
                routes.userWallet.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-09.svg"
                className="img-fluid"
                alt="img"
              />
              Wallet
            </Link>
          </li>
          <li>
            <Link to={routes.userPayment} className={`${
                routes.userPayment.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-10.svg"
                className="img-fluid"
                alt="img"
              />
              Payments
            </Link>
          </li>
          <li>
            <Link to={routes.userSetting} className={`${
                routes.userSetting.includes(location.pathname) ? "active" : ""
              }`}>
              <ImageWithBasePath
                src="assets/img/icons/dashboard-icon-11.svg"
                className="img-fluid"
                alt="img"
              />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserSidebar;

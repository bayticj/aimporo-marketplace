import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ImageWithBasePath from "../../img";
import { all_routes } from "../../../feature-module/router/all_routes";
import CommonSelect from "../common-select/commonSelect";
import { notification } from "../selectOption";

const Header = () => {
  const routes = all_routes;
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen1, setIsMenuOpen1] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const [isMenuOpen3, setIsMenuOpen3] = useState(false);
  const [isMenuOpen4, setIsMenuOpen4] = useState(false);
  const [isMenuOpen5, setIsMenuOpen5] = useState(false);
  const [isMenuOpen6, setIsMenuOpen6] = useState(false);
  const [isMenuOpen7, setIsMenuOpen7] = useState(false);
  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleMenuToggle1 = () => {
    setIsMenuOpen1(!isMenuOpen1);
  };
  const handleMenuToggle3 = () => {
    setIsMenuOpen3(!isMenuOpen3);
  };
  const handleMenuToggle4 = () => {
    setIsMenuOpen4(!isMenuOpen4);
  };
  const handleMenuToggle5 = () => {
    setIsMenuOpen5(!isMenuOpen5);
  };
  const handleMenuToggle6 = () => {
    setIsMenuOpen6(!isMenuOpen6);
  };
  const handleMenuToggle7 = () => {
    setIsMenuOpen7(!isMenuOpen7);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleModalClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };
 
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`main-wrapper ${isModalOpen ? 'menu-opened' : ''}`}>
      <>
        {/* Header */}
        <header className={`header ${isFixed ? "fixed" : ""}`}>
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg header-nav">
              <div className="navbar-header">
                <Link id="mobile_btn" to="#" onClick={toggleModalClose}>
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </Link>
                <Link to={routes.home} className="navbar-brand logo">
                  <ImageWithBasePath
                    src="assets/img/aimporo-logo.png"
                    className="img-fluid"
                    alt="Aimporo Logo"
                  />
                </Link>
                <Link to={routes.home} className="navbar-brand logo-small">
                  <ImageWithBasePath
                    src="assets/img/aimporo-logo.png"
                    className="img-fluid"
                    alt="Aimporo Logo"
                  />
                </Link>
              </div>
              <div className="main-menu-wrapper">
                <div className="menu-header">
                  <Link to={routes.home} className="menu-logo">
                    <ImageWithBasePath
                      src="assets/img/aimporo-logo.png"
                      className="img-fluid"
                      alt="Aimporo Logo"
                    />
                  </Link>
                  <Link id="menu_close" className="menu-close" to="#" onClick={toggleModal}>
                    {" "}
                    <i className="fas fa-times" />
                  </Link>
                </div>
                <ul className="main-nav navbar-nav">
                  <li className="nav-item">
                    <Link
                      to={routes.home}
                      className={`nav-link ${
                        location.pathname.includes("index") ? "active" : ""
                      }`}
                    >
                      Home
                    </Link>
                  </li>

                  <li
                    className={`has-submenu ${
                      location.pathname.includes("gigs") ? "active" : ""
                    }`}
                  >
                    <Link to="#" onClick={handleMenuToggle}  className={`has-submenu ${
                      location.pathname.includes("gigs") ? "active" : ""
                    }`}>
                      Gigs <i className="fas fa-chevron-down" />
                    </Link>
                    <ul className="submenu"  style={{ display: isMenuOpen ? 'block' : 'none' }}>
                      <li>
                        <NavLink
                          to={routes.service}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Gigs Grid
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={routes.serviceGridSidebar}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Gig Left Sidebar
                        </NavLink>
                      </li>
                      <li>
                        <Link
                          to={routes.serviceDetails}
                          className={
                            location.pathname.includes(routes.serviceDetails)
                              ? "active"
                              : ""
                          }
                        >
                          Gig Details
                        </Link>
                      </li>
                      <li>
                      <NavLink
                          to={routes.categories}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Gig Category 
                        </NavLink>
                      </li>
                      <li>
                        
                        <NavLink
                          to={routes.categories2}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Gig Category 2
                        </NavLink>
                      </li>
                      <li>
                        <Link
                          to={routes.serviceSubCategory}
                          className={
                            location.pathname.includes(
                              routes.serviceSubCategory
                            )
                              ? "active"
                              : ""
                          }
                        >
                          Gig Subcategory
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.addGigs}
                          className={
                            location.pathname.includes(routes.addGigs)
                              ? "active"
                              : ""
                          }
                        >
                          Create a Gig
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu ${
                      location.pathname.includes("pages") ? "active" : ""
                    }`}
                  >
                    <Link to="#" onClick={handleMenuToggle1} className={`has-submenu ${
                      location.pathname.includes("pages") ? "active" : ""
                    }`}>
                      Pages <i className="fas fa-chevron-down" />
                    </Link>
                    <ul className="submenu" style={{ display: isMenuOpen1 ? 'block' : 'none' }}>
                      <li>
                        <Link
                          to={routes.aboutUs}
                          className={
                            location.pathname.includes(routes.aboutUs)
                              ? "active"
                              : ""
                          }
                        >
                          About Us
                        </Link>
                      </li>
                      <li  className={`has-submenu ${
                      location.pathname.includes("team") ? "active" : ""
                    }`}>
                        <Link to="#">Our Team</Link>
                        <ul className="submenu">
                          <li>
                           
                            <NavLink
                          to={routes.team}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Team Grid
                        </NavLink>
                          </li>
                          <li>
                          <NavLink
                          to={routes.teamCarousel}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                         Team Carousel
                        </NavLink>
                          </li>
                          <li>
                            <NavLink
                          to={routes.teamDetails}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                         Team Details
                        </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li className="has-submenu">
                        <Link to="#">Authentication</Link>
                        <ul className="submenu">
                          <li>
                            <Link to={routes.signIn}>Login</Link>
                          </li>
                          <li>
                            <Link to={routes.signUp}>Register</Link>
                          </li>
                          <li>
                            <Link to={routes.forgotPassword}>
                              Forgot Password
                            </Link>
                          </li>
                          <li>
                            <Link to={routes.lockScreen}>Lock Screen</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="has-submenu">
                        <Link to="#">Error pages</Link>
                        <ul className="submenu">
                          <li>
                            <Link to={routes.error404}>Error 404</Link>
                          </li>
                          <li>
                            <Link to={routes.error500}>Error 500</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link
                          to={routes.portfolio}
                          className={
                            location.pathname.includes(routes.portfolio)
                              ? "active"
                              : ""
                          }
                        >
                          Portfolio
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.pricing}
                          className={
                            location.pathname.includes(routes.pricing)
                              ? "active"
                              : ""
                          }
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link to={routes.underCondition}>Maintenance</Link>
                      </li>
                      <li>
                        <Link to={routes.comingSoon}>Coming Soon</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu ${
                      location.pathname.includes("blog") ? "active" : ""
                    }`}
                  >
                    <Link to="#" onClick={handleMenuToggle3}  className={`has-submenu ${
                      location.pathname.includes("blog") ? "active" : ""
                    }`} >
                      Blog <i className="fas fa-chevron-down"/>
                    </Link>
                    <ul className="submenu" style={{ display: isMenuOpen3 ? 'block' : 'none' }}>
                      <li>
                        <Link
                          to={routes.blogGrid}
                          className={
                            location.pathname.includes(routes.blogGrid)
                              ? "active"
                              : ""
                          }
                        >
                          Blog 3 Grid
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blog2Grid}
                          className={
                            location.pathname.includes(routes.blog2Grid)
                              ? "active"
                              : ""
                          }
                        >
                          Blog 2 Grid
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blogList}
                          className={
                            location.pathname.includes(routes.blogList)
                              ? "active"
                              : ""
                          }
                        >
                          Blog List
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blogCarousel}
                          className={
                            location.pathname.includes(routes.blogCarousel)
                              ? "active"
                              : ""
                          }
                        >
                          Blog Carousal
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blogMansory}
                          className={
                            location.pathname.includes(routes.blogMansory)
                              ? "active"
                              : ""
                          }
                        >
                          Blog Mansory
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blogSidebar}
                          className={
                            location.pathname.includes(routes.blogSidebar)
                              ? "active"
                              : ""
                          }
                        >
                          Blog Left Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.blogRightSidebar}
                          className={
                            location.pathname.includes(routes.blogRightSidebar)
                              ? "active"
                              : ""
                          }
                        >
                          Blog Right Sidebar
                        </Link>
                      </li>
                      <li>
                       
                        <NavLink
                          to={routes.blogDetails}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                         Blog Details
                        </NavLink>
                      </li>
                      <li>
                        
                        <NavLink
                          to={routes.blogDetailsSidebar}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                         Blog Details Left Sidebar
                        </NavLink>

                      </li>
                      <li>
                        <Link
                          to={routes.blogDetailsRightSidebar}
                          className={
                            location.pathname.includes(
                              routes.blogDetailsRightSidebar
                            )
                              ? "active"
                              : ""
                          }
                        >
                          Blog Details Right Sidebar
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu ${
                      location.pathname.includes("user-dashboard")
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link to="#" onClick={handleMenuToggle6}  className={`has-submenu ${
                      location.pathname.includes("user-dashboard")
                        ? "active"
                        : ""
                    }`}>
                      User Dashboard <i className="fas fa-chevron-down" />
                    </Link>
                    <ul className="submenu" style={{ display: isMenuOpen6 ? 'block' : 'none' }}>
                      <li>
                        <Link
                          to={routes.dashboard}
                          className={
                            location.pathname.includes(routes.contactUs)
                              ? "active"
                              : ""
                          }
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userProfile}
                          className={
                            location.pathname.includes(routes.userProfile)
                              ? "active"
                              : ""
                          }
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userGigs}
                          className={
                            location.pathname.includes(routes.userGigs)
                              ? "active"
                              : ""
                          }
                        >
                          Manage Gigs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userPurchase}
                          className={
                            location.pathname.includes(routes.userPurchase)
                              ? "active"
                              : ""
                          }
                        >
                          Purchase
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userSales}
                          className={
                            location.pathname.includes(routes.userSales)
                              ? "active"
                              : ""
                          }
                        >
                          Sales
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userFiles}
                          className={
                            location.pathname.includes(routes.userFiles)
                              ? "active"
                              : ""
                          }
                        >
                          Files
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userReview}
                          className={
                            location.pathname.includes(routes.userReview)
                              ? "active"
                              : ""
                          }
                        >
                          My Reviews
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userWishlist}
                          className={
                            location.pathname.includes(routes.userWishlist)
                              ? "active"
                              : ""
                          }
                        >
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userMessage}
                          className={
                            location.pathname.includes(routes.userMessage)
                              ? "active"
                              : ""
                          }
                        >
                          Messages
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userWallet}
                          className={
                            location.pathname.includes(routes.userWallet)
                              ? "active"
                              : ""
                          }
                        >
                          Wallet
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userPayment}
                          className={
                            location.pathname.includes(routes.userPayment)
                              ? "active"
                              : ""
                          }
                        >
                          Payments
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={routes.userSetting}
                          className={
                            location.pathname.includes(routes.userSetting)
                              ? "active"
                              : ""
                          }
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={`has-submenu ${
                      location.pathname.includes("contact") ? "active" : ""
                    }`}
                  >
                    <Link to="#" onClick={handleMenuToggle7}  className={`has-submenu ${
                      location.pathname.includes("contact") ? "active" : ""
                    }`}>
                      Contact <i className="fas fa-chevron-down" />
                    </Link>
                    <ul className="submenu" style={{ display: isMenuOpen7 ? 'block' : 'none' }}>
                      <li>
                      <NavLink
                          to={routes.contactUs}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Contact
                        </NavLink>
                      </li>
                      <li>
                       
                        <NavLink
                          to={routes.contactUsV2}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Contact V2
                        </NavLink>
                      </li>
                      <li>
                      <NavLink
                          to={routes.contactUsV3}
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Contact V3
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item responsive-link">
                    <Link to={routes.signIn} className="nav-link">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item responsive-link">
                    <Link to={routes.signUp} className="nav-link">
                      Get Started
                    </Link>
                  </li>
                </ul>
              </div>
             {location.pathname.includes('user-dashboard') ? (
              <ul className="nav header-navbar-rht">
              {/* Notifications */}
              <li className="nav-item logged-item noti-nav noti-wrapper">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
              <span className="bell-icon">
              <ImageWithBasePath src="assets/img/icons/bell-icon.svg" alt="Bell" />
              </span>
              <span className="badge badge-pill" />
              </Link>
              <div className="dropdown-menu dropdown-menu-end noti-blk">
              <div className="topnav-dropdown-header">
              <div>
              <p className="notification-title">
              Notifications{" "}
              <Link to="#" className="clear-notification">
              Clear All
              </Link>
              </p>
              </div>
              <Link to="#" className="mark-all-noti">
              {" "}
              Mark all as read <i className="feather icon-check-square" />
              </Link>
              </div>
              <ul>
              <li className="notification-message">
              <div className="media noti-img d-flex">
              <Link to={routes.userNotification} className="active-noti">
              <span className="avatar avatar-sm flex-shrink-0">
              <ImageWithBasePath
              className="avatar-img rounded-circle img-fluid"
              alt="User Image"
              src="assets/img/user/user-01.jpg"
              />
              </span>
              </Link>
              <div className="media-body flex-grow-1">
              <Link to={routes.userNotification}>
              <h6 className="noti-details">
              Lex Murphy <span>requested access to </span> UNIX directory
              tree hierarchy
              </h6>
              </Link>
              <div className="notify-btns">
              <button className="btn btn-sm btn-primary">Accept</button>
              <button className="btn btn-sm  btn-secondary">Decline</button>
              </div>
              <p className="noti-time">
              <span className="notification-time">Today at 9:42 AM</span>
              </p>
              </div>
              </div>
              </li>
              <li className="notification-message">
              <div className="media noti-img d-flex">
              <Link to={routes.userNotification} className="active-noti">
              <span className="avatar avatar-sm flex-shrink-0">
              <ImageWithBasePath
              className="avatar-img rounded-circle img-fluid"
              alt="User Image"
              src="assets/img/user/user-02.jpg"
              />
              </span>
              </Link>
              <div className="media-body flex-grow-1">
              <Link to={routes.userNotification}>
              <h6 className="noti-details">
              Ray Arnold <span> left 6 comments on </span> Isla Nublar SOC2
              compliance report
              </h6>
              </Link>
              <p className="noti-time notitime">
              <span className="notification-time">Yesterday at 11:42 PM</span>
              </p>
              </div>
              </div>
              </li>
              <li className="notification-message">
              <div className="media noti-img d-flex">
              <Link to={routes.userNotification}>
              <span className="avatar avatar-sm flex-shrink-0">
              <ImageWithBasePath
              className="avatar-img rounded-circle img-fluid"
              alt="User Image"
              src="assets/img/user/user-03.jpg"
              />
              </span>
              </Link>
              <div className="media-body flex-grow-1">
              <Link to={routes.userNotification}>
              <h6 className="noti-details">
              Dennis Nedry <span> commented on </span> Isla Nublar SOC2
              compliance report{" "}
              </h6>
              </Link>
              <p className="noti-reply-msg">
              "Oh, I finished de-bugging the phones, but the system's
              compiling for eighteen minutes, or twenty."
              </p>
              <p className="noti-time notitime">
              <span className="notification-time">Yesterday at 5:42 PM</span>
              </p>
              </div>
              </div>
              </li>
              <li className="notification-message">
              <div className="media noti-img d-flex">
              <Link to={routes.userNotification}>
              <span className="avatar avatar-sm flex-shrink-0">
              <ImageWithBasePath
              className="avatar-img rounded-circle img-fluid"
              alt="User Image"
              src="assets/img/user/user-04.jpg"
              />
              </span>
              </Link>
              <div className="media-body flex-grow-1">
              <Link to={routes.userNotification}>
              <h6 className="noti-details">
              John Hammond <span> created </span> Isla Nublar SOC2
              compliance report
              </h6>
              </Link>
              <p className="noti-time notitime">
              <span className="notification-time">
              Last Wednesday at 11:15 AM
              </span>
              </p>
              </div>
              </div>
              </li>
              </ul>
              <div className="clear-all-noti">
              <Link className="clear-notification" to={routes.userNotification}>
              {" "}
              View all{" "}
              </Link>
              </div>
              </div>
              </li>
              {/* /Notifications */}
              {/* User Menu */}
              <li className={`nav-item dropdowns has-arrow logged-item ${isActive ? 'is-active' : ''}`}>
              <Link to="#" className="nav-link toggle" onClick={handleToggle}>
              <span className="log-user dropdown-toggle">
              <span className="users-img">
              <ImageWithBasePath
              className="rounded-circle"
              src="assets/img/user/user-05.jpg"
              alt="Profile"
              />
              </span>
              <span className="user-text ms-1">Harry Brooks</span>
              </span>
              </Link>
              <div className="dropdown-menu list-group">
              <div className="user-item">
              <ImageWithBasePath src="assets/img/user/user-05.jpg" alt="Profile" />
              <div className="user-name">
              <h6>Harry Brooks</h6>
              <p>Joined On : 14 Jan 2024</p>
              </div>
              </div>
              <div className="search-filter-selected select-icon">
              <div className="form-group">
              <span className="sort-text">
              <ImageWithBasePath
              src="assets/img/icons/user-cog.svg"
              className="img-fluid"
              alt="img"
              />
              </span>
             
              <CommonSelect
                        className="select"
                        options={notification}
                        defaultValue={notification[0]}
                      />
              </div>
              </div>
              <Link className="dropdown-item drop-line" to={routes.dashboard}>
              <ImageWithBasePath
              src="assets/img/icons/dashboard-icon-01.svg"
              className="img-fluid"
              alt="img"
              />
              Dashboard
              </Link>
              <Link className="dropdown-item" to={routes.userPurchase}>
              <ImageWithBasePath
              src="assets/img/icons/dashboard-icon-03.svg"
              className="img-fluid"
              alt="img"
              />
              My Purchase
              </Link>
              <Link className="dropdown-item" to={routes.userSales}>
              <ImageWithBasePath
              src="assets/img/icons/dashboard-icon-04.svg"
              className="img-fluid"
              alt="img"
              />
              My Sales
              </Link>
              <Link className="dropdown-item" to={routes.userWallet}>
              <ImageWithBasePath
              src="assets/img/icons/dashboard-icon-09.svg"
              className="img-fluid"
              alt="img"
              />
              My Wallet
              </Link>
              <hr />
              <Link className="dropdown-item" to={routes.userSetting}>
              <ImageWithBasePath
              src="assets/img/icons/settings-cog.svg"
              className="img-fluid"
              alt="img"
              />
              Settings
              </Link>
              <Link className="dropdown-item" to={routes.userProfile}>
              <ImageWithBasePath
              src="assets/img/icons/user-cog.svg"
              className="img-fluid"
              alt="img"
              />
              My Profile
              </Link>
              <hr />
              <Link className="dropdown-item log-out" to={routes.home}>
              <ImageWithBasePath
              src="assets/img/icons/logout.svg"
              className="img-fluid"
              alt="img"
              />
              Logout
              </Link>
              </div>
              </li>
              {/* /User Menu */}
              </ul>
              
             ):(
              <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link className="btn btn-secondary" to={routes.signIn}>
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to={routes.signUp}>
                  Get Started
                </Link>
              </li>
            </ul>
             )
            }

            </nav>
          </div>
        </header>
        {/* /Header */}
      </>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import Scrollbars from "react-custom-scrollbars-2";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageWithBasePath from "../../../core/img";
const UserMessage = () => {
  const routes = all_routes;
  const [open1, setOpen1] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearch2, setIsSearch2] = useState(false);
  const [ischat, setIsChat] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const profile = {
    loop: true,
    margin: 15,
    items: 5,
    nav: false,
    dots: false,
    autoplay: false,
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 5,
        },
      },
    ],
  };
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const openChat = (res:string) => {
    if (isMobile) {
      setIsChat(true);
    }
    if(res === 'back') {
      setIsChat(false);
    }
  }
  return (
    <>
      {/* Content */}
      <div className="chat-page-wrapper">
        <div className="container">
          <div className="page-back-btn mb-4">
            <Link to={routes.dashboard}>
              <i className="feather icon-arrow-left me-2" />
              Back to Dashboard
            </Link>
          </div>
          <div className="content ">
            {/* sidebar group */}
            <div className={`sidebar-group left-sidebar chat_sidebar ${ischat? 'hide-left-sidebar':''}`}>
              {/* Chats sidebar */}
              <div
                id="chats"
                className="left-sidebar-wrap sidebar active slimscroll"
              >
                {/* <Scrollbars> */}
                  <div className="slimscroll chat-scroll">
                    {/* Left Chat Title */}
                    <div className="left-chat-title all-chats d-flex justify-content-between align-items-center">
                      <div className="select-group-chat">
                        <div className="dropdown">
                          <Link to="#">All Chats</Link>
                        </div>
                      </div>
                      <div className="add-section">
                        <ul>
                          <li>
                            <Link to="#" className="user-chat-search-btn" onClick={()=>setIsSearch(true)}>
                              <i className="feather icon-search" />
                            </Link>
                          </li>
                        </ul>
                        {/* Chat Search */}
                        <div className={`user-chat-search ${isSearch ? ' visible-chat':''}`}>
                          <form>
                            <span className="form-control-feedback">
                              <i className="feather icon-search" />
                            </span>
                            <input
                              type="text"
                              name="chat-search"
                              placeholder="Search"
                              className="form-control"
                            />
                            <div className="user-close-btn-chat">
                              <i className="feather icon-x" onClick={()=>setIsSearch(false)} />
                            </div>
                          </form>
                        </div>
                        {/* /Chat Search */}
                      </div>
                    </div>
                    {/* /Left Chat Title */}
                    {/* Top Online Contacts */}
                    <div className="top-online-contacts">
                      <div className="fav-title">
                        <h6>Online Now</h6>
                        <Link to="" className="view-all-chat-profiles">
                          View All
                        </Link>
                      </div>
                      <Slider {...profile}>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-01.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-02.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-03.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-04.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-05.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="top-contacts-box">
                            <div className="profile-img online">
                              <Link to="#">
                                <ImageWithBasePath
                                  src="assets/img/user/user-06.jpg"
                                  alt="Image"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                    {/* /Top Online Contacts */}
                    <div className="sidebar-body chat-body" id="chatsidebar">
                      {/* Left Chat Title */}
                      <div className="d-flex justify-content-between align-items-center ps-0 pe-0">
                        <div className="fav-title pin-chat">
                          <h6>
                            <i className="bx bx-pin me-1" />
                            Pinned Chat
                          </h6>
                        </div>
                      </div>
                      {/* /Left Chat Title */}
                      <ul className="user-list space-chat">
                        <li className="user-list-item chat-user-list">
                          <Link to="#" className="status-active" onClick={()=>openChat('')}>
                            <div className="avatar avatar-online">
                              <ImageWithBasePath
                                src="assets/img/user/user-01.jpg"
                                className="rounded-circle"
                                alt="image"
                              />
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Mark Villiams</h5>
                                <p>Have you called them?</p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">10:20 PM</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-thumbtack me-2" />
                                  <i className="fa-solid fa-check-double" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-log-out" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Unpin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#" onClick={()=>openChat('')}>
                            <div>
                              <div className="avatar ">
                                <ImageWithBasePath
                                  src="assets/img/user/user-10.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Elizabeth Sosa</h5>
                                <p>
                                  <span className="animate-typing-col">
                                    Typing
                                    <span className="dot mx-1" />
                                    <span className="dot me-1" />
                                    <span className="dot" />
                                  </span>
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">Yesterday</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-thumbtack" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-log-out" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Unpin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#" onClick={()=>openChat('')}>
                            <div className="avatar avatar-online">
                              <ImageWithBasePath
                                src="assets/img/user/user-04.jpg"
                                className="rounded-circle"
                                alt="image"
                              />
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Michael Howard</h5>
                                <p>Thank you</p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">10:20 PM</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-thumbtack me-2" />
                                  <i className="fa-solid fa-check-double check" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-log-out" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Unpin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      {/* Left Chat Title */}
                      <div className="d-flex justify-content-between align-items-center ps-0 pe-0">
                        <div className="fav-title pin-chat">
                          <h6>
                            <i className="bx bx-message-square-dots me-1" />
                            Recent Chat
                          </h6>
                        </div>
                      </div>
                      {/* /Left Chat Title */}
                      <ul className="user-list">
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div className="avatar avatar-online">
                              <ImageWithBasePath
                                src="assets/img/user/user-03.jpg"
                                className="rounded-circle"
                                alt="image"
                              />
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Horace Keene</h5>
                                <p>Have you called them?</p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">Just Now</small>
                                <div className="chat-pin">
                                  <span className="count-message">5</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Read
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div>
                              <div className="avatar avatar-online">
                                <ImageWithBasePath
                                  src="assets/img/user/user-19.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Hollis Tran</h5>
                                <p>
                                  <i className="bx bx-video me-1" />
                                  Video
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">Yesterday</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-check" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div className="avatar">
                              <ImageWithBasePath
                                src="assets/img/user/user-06.jpg"
                                className="rounded-circle"
                                alt="image"
                              />
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>James Albert</h5>
                                <p>
                                  <i className="bx bx-file me-1" />
                                  Project Tools.doc
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">10:20 PM</small>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div>
                              <div className="avatar avatar-online">
                                <ImageWithBasePath
                                  src="assets/img/user/user-17.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Debra Jones</h5>
                                <p>
                                  <i className="bx bx-microphone me-1" />
                                  Audio
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">12:30 PM</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-check-double check" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div>
                              <div className="avatar ">
                                <ImageWithBasePath
                                  src="assets/img/user/user-13.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Dina Brown</h5>
                                <p>Have you called them?</p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">Yesterday</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-microphone-slash" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div>
                              <div className="avatar avatar-online">
                                <ImageWithBasePath
                                  src="assets/img/user/user-15.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Judy Mercer</h5>
                                <p className="missed-call-col">
                                  <i className="bx bx-phone-incoming me-1" />
                                  Missed Call
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">25/July/23</small>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="user-list-item chat-user-list">
                          <Link to="#">
                            <div>
                              <div className="avatar">
                                <ImageWithBasePath
                                  src="assets/img/user/user-10.jpg"
                                  className="rounded-circle"
                                  alt="image"
                                />
                              </div>
                            </div>
                            <div className="users-list-body">
                              <div>
                                <h5>Richard Ohare</h5>
                                <p>
                                  <i className="bx bx-image-alt me-1" />
                                  Photo
                                </p>
                              </div>
                              <div className="last-chat-time">
                                <small className="text-muted">27/July/23</small>
                                <div className="chat-pin">
                                  <i className="fa-solid fa-check-double" />
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="chat-hover ms-1">
                            <div className="chat-action-col">
                              <span
                                className="d-flex"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis-vertical" />
                              </span>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <span className="dropdown-item ">
                                  <span>
                                    <i className="bx bx-archive-in" />
                                  </span>
                                  Archive Chat{" "}
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#mute-notification"
                                >
                                  <span>
                                    <i className="bx bx-volume-mute" />
                                  </span>
                                  Mute Notification
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#change-chat"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-pin" />
                                  </span>
                                  Pin Chat
                                </span>
                                <span className="dropdown-item">
                                  <span>
                                    <i className="bx bx-check-square" />
                                  </span>
                                  Mark as Unread
                                </span>
                                <span
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#block-user"
                                >
                                  <span>
                                    <i className="bx bx-block" />
                                  </span>
                                  Block
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                {/* </Scrollbars> */}
              </div>
              {/* / Chats sidebar */}
            </div>
            {/* /Sidebar group */}
            {/* Chat */}
            <div className={`chat chat-messages ${ischat ? 'show-chatbar':''}`} id="middle">
              <div className="h-100">
                <div className="chat-header">
                  <div className="user-details mb-0">
                    <div className="d-lg-none">
                      <ul className="list-inline mt-2 me-2">
                        <li className="list-inline-item">
                          <Link
                            className="text-muted px-0 left_sides"
                            to="#"
                            data-chat="open"
                            onClick={()=>openChat('back')}
                          >
                            <i className="fas fa-arrow-left" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <figure className="avatar mb-0">
                      <ImageWithBasePath
                        src="assets/img/user/user-01.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                    </figure>
                    <div className="mt-1">
                      <h5>Mark Villiams</h5>
                      <small className="last-seen">Last Seen at 07:15 PM</small>
                    </div>
                  </div>
                  <div className="chat-options ">
                    <ul className="list-inline">
                      <li className="list-inline-item">
                      <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip className="react-tooltip " id="tooltip-top">Search</Tooltip>}
                        >
                        <Link
                          to="#"
                          className="btn btn-outline-light chat-search-btn"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Search"
                        >
                          <i className="feather icon-search" onClick={()=>setIsSearch2(true)} />
                        </Link>
                        </OverlayTrigger>
                      </li>
                      <li className="list-inline-item">
                        <Link
                          className="btn btn-outline-light no-bg"
                          to="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to={routes.home} className="dropdown-item ">
                            <span>
                              <i className="bx bx-x" />
                            </span>
                            Close Chat{" "}
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#mute-notification"
                          >
                            <span>
                              <i className="bx bx-volume-mute" />
                            </span>
                            Mute Notification
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#disappearing-messages"
                          >
                            <span>
                              <i className="bx bx-time-five" />
                            </span>
                            Disappearing Message
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#clear-chat"
                          >
                            <span>
                              <i className="bx bx-brush-alt" />
                            </span>
                            Clear Message
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#change-chat"
                          >
                            <span>
                              <i className="bx bx-trash" />
                            </span>
                            Delete Chat
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#report-user"
                          >
                            <span>
                              <i className="bx bx-dislike" />
                            </span>
                            Report
                          </Link>
                          <Link
                            to="#"
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#block-user"
                          >
                            <span>
                              <i className="bx bx-block" />
                            </span>
                            Block
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* Chat Search */}
                  <div className={`chat-search ${isSearch2 ? ' visible-chat':''}`}>
                    <form>
                      <span className="form-control-feedback">
                        <i className="bx bx-search" />
                      </span>
                      <input
                        type="text"
                        name="chat-search"
                        placeholder="Search Chats"
                        className="form-control"
                      />
                      <div className="close-btn-chat">
                        <i className="feather icon-x" onClick={()=>setIsSearch2(false)}/>
                      </div>
                    </form>
                  </div>
                  {/* /Chat Search */}
                </div>
                <div className="chat-body chat-page-group slimscroll">
                  <div className="messages">
                    <div className="chats">
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-01.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-profile-name">
                          <h6>
                            Mark Villiams<span>8:16 PM</span>
                            <span className="check-star msg-star d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg">Star Message</span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#report-user"
                                >
                                  <span>
                                    <i className="bx bx-dislike" />
                                  </span>
                                  Report
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content">
                          Hello <Link to="#">@Alex</Link> Thank you for the
                          beautiful web design ahead schedule.
                          <div className="emoj-group">
                            <ul>
                              <li className="emoj-action">
                                <Link to="#">
                                  <i className="bx bx-smile" />
                                </Link>
                                <div className="emoj-group-list">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-04.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-05.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li className="add-emoj">
                                      <Link to="#">
                                        <i className="feather icon-plus" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <i className="bx bx-share" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chat-line">
                      <span className="chat-date">Today, July 24</span>
                    </div>
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-profile-name text-end">
                          <h6>
                            Alex Smith<span>8:16 PM</span>
                            <span className="check-star msg-star-one d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star-one"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg-one">
                                    Star Message
                                  </span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-message"
                                >
                                  <span>
                                    <i className="bx bx-edit-alt" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content ">
                          <div className="emoj-group rig-emoji-group">
                            <ul>
                              <li className="emoj-action">
                                <Link to="#">
                                  <i className="bx bx-smile" />
                                </Link>
                                <div className="emoj-group-list">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-04.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-05.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li className="add-emoj">
                                      <Link to="#">
                                        <i className="feather icon-plus" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <i className="bx bx-share" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="chat-voice-group">
                            <ul>
                              <li>
                                <Link to="#">
                                  <span>
                                    <ImageWithBasePath
                                      src="assets/img/icons/play-01.svg"
                                      alt="image"
                                    />
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <ImageWithBasePath
                                  src="assets/img/voice.svg"
                                  alt="image"
                                />
                              </li>
                              <li>0:05</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-02.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-01.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-profile-name">
                          <h6>
                            Mark Villiams<span>8:16 PM</span>
                            <span className="check-star msg-star-three d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star-three"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg-three">
                                    Star Message
                                  </span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#report-user"
                                >
                                  <span>
                                    <i className="bx bx-dislike" />
                                  </span>
                                  Report
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content award-link chat-award-link">
                          <Link to="#">
                            https://www.youtube.com/watch?v=GCmL3mS0Psk
                          </Link>
                          <ImageWithBasePath
                            src="assets/img/chat-img-01.jpg"
                            className="img-fluid"
                            alt="img"
                          />
                          <div className="emoj-group">
                            <ul>
                              <li className="emoj-action">
                                <Link to="#">
                                  <i className="bx bx-smile" />
                                </Link>
                                <div className="emoj-group-list">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-04.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-05.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li className="add-emoj">
                                      <Link to="#">
                                        <i className="feather icon-plus" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <i className="bx bx-share" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chats chats-right">
                      <div className="chat-content">
                        <div className="chat-profile-name justify-content-end">
                          <h6>
                            Alex Smith<span>8:16 PM</span>
                            <span className="check-star msg-star-four d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star-four"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg-four">
                                    Star Message
                                  </span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#edit-message"
                                >
                                  <span>
                                    <i className="bx bx-edit-alt" />
                                  </span>
                                  Edit
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content fancy-msg-box">
                          <div className="emoj-group wrap-emoji-group ">
                            <ul>
                              <li className="emoj-action">
                                <Link to="#">
                                  <i className="bx bx-smile" />
                                </Link>
                                <div className="emoj-group-list">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-04.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-05.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li className="add-emoj">
                                      <Link to="#">
                                        <i className="feather icon-plus" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <i className="bx bx-share" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="download-col">
                            <ul className="nav mb-0">
                              <Lightbox
                                open={open1}
                                close={() => setOpen1(false)}
                                slides={[
                                  {
                                    src: "/assets/img/media/media-big-02.jpg",
                                  },
                                  {
                                    src: "/assets/img/media/media-big-03.jpg",
                                  },
                                  {
                                    src: "/assets/img/media/media-big-01.jpg",
                                  },
                                ]}
                              />
                              <li>
                                <div className="image-download-col">
                                  <Link
                                    onClick={() => setOpen1(true)}
                                    to="#"
                                    data-fancybox="gallery"
                                    className="fancybox"
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/media/media-01.jpg"
                                      alt="Img"
                                    />
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div className="image-download-col ">
                                  <Link
                                    to="#"
                                    data-fancybox="gallery"
                                    onClick={() => setOpen1(true)}
                                    className="fancybox"
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/media/media-02.jpg"
                                      alt="Img"
                                    />
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <div className="image-download-col image-not-download">
                                  <Link
                                    to="#"
                                    data-fancybox="gallery"
                                    onClick={() => setOpen1(true)}
                                    className="fancybox"
                                  >
                                    <ImageWithBasePath
                                      src="assets/img/media/media-03.jpg"
                                      alt="Img"
                                    />
                                    <span>10+</span>
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-02.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-01.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-profile-name">
                          <h6>
                            Mark Villiams<span>8:16 PM</span>
                            <span className="check-star msg-star-five d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star-five"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg-five">
                                    Star Message
                                  </span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#report-user"
                                >
                                  <span>
                                    <i className="bx bx-dislike" />
                                  </span>
                                  Report
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content">
                          <div className="location-sharing">
                            <div className="sharing-location-icon">
                              <i className="fa-solid fa-location-dot" />
                            </div>
                            <h6>
                              My Location <Link to="#">Download</Link>
                            </h6>
                          </div>
                        </div>
                        <div className="like-chat-grp">
                          <ul>
                            <li className="like-chat">
                              <Link to="#">
                                2
                                <ImageWithBasePath
                                  src="assets/img/icons/like.svg"
                                  alt="Icon"
                                />
                              </Link>
                            </li>
                            <li className="comment-chat">
                              <Link to="#">
                                2
                                <ImageWithBasePath
                                  src="assets/img/icons/heart.svg"
                                  alt="Icon"
                                />
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-01.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-profile-name">
                          <h6>
                            Mark Villiams<span>8:16 PM</span>
                            <span className="check-star msg-star d-none">
                              <i className="bx bxs-star" />
                            </span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item click-star"
                                >
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  <span className="star-msg">Star Message</span>
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#report-user"
                                >
                                  <span>
                                    <i className="bx bx-edit-alt" />
                                  </span>
                                  Report
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content reply-getcontent">
                          Thank you for your support
                          <div className="emoj-group">
                            <ul>
                              <li className="emoj-action">
                                <Link to="#">
                                  <i className="bx bx-smile" />
                                </Link>
                                <div className="emoj-group-list">
                                  <ul>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-01.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-02.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-03.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-04.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="#">
                                        <ImageWithBasePath
                                          src="assets/img/icons/emoj-icon-05.svg"
                                          alt="Icon"
                                        />
                                      </Link>
                                    </li>
                                    <li className="add-emoj">
                                      <Link to="#">
                                        <i className="feather icon-plus" />
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li>
                                <Link
                                  to="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <i className="bx bx-share" />
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chats">
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-02.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content chat-cont-type">
                        <div className="chat-profile-name chat-type-wrapper">
                          <p>Mark Villiams Typing...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-footer">
                <form>
                  <div className="smile-foot">
                    <div className="chat-action-btns">
                      <div className="chat-action-col">
                        <Link
                          className="action-circle"
                          to="#"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                          <Link to="#" className="dropdown-item ">
                            <span>
                              <i className="bx bx-file" />
                            </span>
                            Document
                          </Link>
                          <Link to="#" className="dropdown-item">
                            <span>
                              <i className="bx bx-camera" />
                            </span>
                            Camera
                          </Link>
                          <Link to="#" className="dropdown-item">
                            <span>
                              <i className="bx bx-image" />
                            </span>
                            Gallery
                          </Link>
                          <Link to="#" className="dropdown-item">
                            <span>
                              <i className="bx bx-volume-full" />
                            </span>
                            Audio
                          </Link>
                          <Link to="#" className="dropdown-item">
                            <span>
                              <i className="bx bx-map" />
                            </span>
                            Location
                          </Link>
                          <Link to="#" className="dropdown-item">
                            <span>
                              <i className="bx bx-user-pin" />
                            </span>
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="smile-foot emoj-action-foot">
                    <Link to="#" className="action-circle">
                      <i className="bx bx-smile" />
                    </Link>
                    <div className="emoj-group-list-foot down-emoji-circle">
                      <ul>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/emoj-icon-01.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/emoj-icon-02.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/emoj-icon-03.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/emoj-icon-04.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            <ImageWithBasePath
                              src="assets/img/icons/emoj-icon-05.svg"
                              alt="Icon"
                            />
                          </Link>
                        </li>
                        <li className="add-emoj">
                          <Link to="#">
                            <i className="feather icon-plus" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="smile-foot">
                    <Link to="#" className="action-circle">
                      <i className="bx bx-microphone-off" />
                    </Link>
                  </div>
                  <div className="replay-forms">
                    <div className="chats forward-chat-msg reply-div d-none">
                      <div className="contact-close_call text-end">
                        <Link to="#" className="close-replay">
                          <i className="bx bx-x" />
                        </Link>
                      </div>
                      <div className="chat-avatar">
                        <ImageWithBasePath
                          src="assets/img/user/user-04.jpg"
                          className="rounded-circle dreams_chat"
                          alt="image"
                        />
                      </div>
                      <div className="chat-content">
                        <div className="chat-profile-name">
                          <h6>
                            Mark Villiams<span>8:16 PM</span>
                          </h6>
                          <div className="chat-action-btns ms-2">
                            <div className="chat-action-col">
                              <Link
                                className="#"
                                to="#"
                                data-bs-toggle="dropdown"
                              >
                                <i className="fa-solid fa-ellipsis" />
                              </Link>
                              <div className="dropdown-menu chat-drop-menu dropdown-menu-end">
                                <Link
                                  to="#"
                                  className="dropdown-item message-info-left"
                                >
                                  <span>
                                    <i className="bx bx-info-circle" />
                                  </span>
                                  Message Info{" "}
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item reply-button"
                                >
                                  <span>
                                    <i className="bx bx-share" />
                                  </span>
                                  Reply
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-smile" />
                                  </span>
                                  React
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#forward-message"
                                >
                                  <span>
                                    <i className="bx bx-reply" />
                                  </span>
                                  Forward
                                </Link>
                                <Link to="#" className="dropdown-item">
                                  <span>
                                    <i className="bx bx-star" />
                                  </span>
                                  Star Message
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#report-user"
                                >
                                  <span>
                                    <i className="bx bx-dislike" />
                                  </span>
                                  Report
                                </Link>
                                <Link
                                  to="#"
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#delete-message"
                                >
                                  <span>
                                    <i className="bx bx-trash" />
                                  </span>
                                  Delete
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="message-content reply-content"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control chat_form"
                      placeholder="Type your message here..."
                    />
                  </div>
                  <div className="form-buttons">
                    <button className="btn send-btn" type="submit">
                      <i className="bx bx-paper-plane" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* /Chat */}
          </div>
        </div>
      </div>
      {/* /Content */}
    </>
  );
};

export default UserMessage;

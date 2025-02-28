import React from 'react'
import { Link } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import ImageWithBasePath from '../../../core/img'
import { date } from '../../../core/common/selectOption'
import CommonSelect from '../../../core/common/common-select/commonSelect'
const UserNotification = () => {
  const routes = all_routes
  return (
    <>
  {/* Breadcrumb */}
  <div className="breadcrumb-bar breadcrumb-bar-info">
    <div className="breadcrumb-img">
      <div className="breadcrumb-left">
        <ImageWithBasePath src="assets/img/bg/banner-bg-03.png" alt="img" />
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
                Notifications
              </li>
            </ol>
          </nav>
          <h2 className="breadcrumb-title mb-0">Notifications</h2>
        </div>
      </div>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Page Content */}
  <div className="page-content">
    <div className="container">
      <div className="row">
        {/* Notifications */}
        <div className="col-xl-12">
          <div className="notification-header">
            <div className="form-sort form-wrap table-filter ">
              <span className="form-icon">
                <ImageWithBasePath src="assets/img/icons/calendar-icon.svg" alt="icon" />
              </span>
              <CommonSelect
                        className="select"
                        options={date}
                        defaultValue={date[0]}
                      />
            </div>
            <ul>
              <li>
                <Link to="#" className="btn">
                  <i className="feather icon-check" /> Mark all as read
                </Link>
              </li>
              <li>
                <Link to="#" className="btn btn-delete">
                  <i className="feather icon-trash-2" /> Delete all
                </Link>
              </li>
            </ul>
          </div>
          <div className="notication-list">
            <div className="notication-item">
              <div className="row">
                <div className="col-md-9">
                  <div className="notication-content">
                    <span>
                      <ImageWithBasePath
                        src="assets/img/user/user-02.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <div className="notication-info">
                      <p>
                        Paul Cronk requested a new service on Digital Marketing{" "}
                        <i className="fa-solid fa-circle" />
                      </p>
                      <p className="notify-time">2 mins ago</p>
                      <div className="noti-btn">
                        <Link
                          to="#"
                          className="btn btn-secondary"
                        >
                          Decline
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-primary"
                        >
                          Accept
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="notification-btn text-end">
                    <Link to="#" className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="notication-item">
              <div className="row">
                <div className="col-md-9">
                  <div className="notication-content">
                    <span>
                      <ImageWithBasePath
                        src="assets/img/user/user-05.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <div className="notication-info">
                      <p>
                        Added “The Psychology of Design: Influencing Emotions
                        through Visuals” <i className="fa-solid fa-circle" />
                      </p>
                      <p className="notify-time">2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="notification-btn text-end">
                    <Link to="#" className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="notication-item">
              <div className="row">
                <div className="col-md-9">
                  <div className="notication-content">
                    <span>
                      <ImageWithBasePath
                        src="assets/img/user/user-07.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <div className="notication-info">
                      <p>
                        Paul Cronk requested a new service on Digital Marketing{" "}
                        <i className="fa-solid fa-circle" />
                      </p>
                      <p className="notify-time">2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="notification-btn text-end">
                    <Link to="#" className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="notication-item">
              <div className="row">
                <div className="col-md-9">
                  <div className="notication-content">
                    <span>
                      <ImageWithBasePath
                        src="assets/img/user/user-11.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <div className="notication-info">
                      <p>
                        Paul Cronk requested a new service on Digital Marketing{" "}
                        <i className="fa-solid fa-circle" />
                      </p>
                      <p className="notify-time">2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="notification-btn text-end">
                    <Link to="#" className="btn btn-danger">
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Notifications */}
      </div>
    </div>
  </div>
  {/* /Page Content */}
</>

  )
}

export default UserNotification
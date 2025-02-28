import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import Breadcrumb from "../breadcrumb";
import UserSidebar from "../user-sidebar";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { date } from "../../../core/common/selectOption";
import ReactApexChart from "react-apexcharts";
import { all_routes } from "../../router/all_routes";
const Dashboard = () => {
  const routes = all_routes
  const [amount] = useState<any>({
    series: [
      {
        name: "Sales",
        colors: ["#FF6900"],
        data: [
          {
            x: "jan",
            y: 7.0,
          },
          {
            x: "Feb",
            y: 7.0,
          },
          {
            x: "Mar",
            y: 3.0,
          },
          {
            x: "Apr",
            y: 8.7,
          },
          {
            x: "May",
            y: 7.0,
          },
          {
            x: "Jun",
            y: 2.0,
          },
          {
            x: "Jul",
            y: 7.5,
          },
          {
            x: "Aug",
            y: 2.0,
          },
          {
            x: "Sep",
            y: 3.0,
          },
          {
            x: "Oct",
            y: 2.0,
          },
          {
            x: "Nov",
            y: 5.0,
          },
          {
            x: "Dec",
            y: 7.0,
          },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
        borderRadius:6,
        borderRadiusApplication: 'end',
      },
    },
    colors: ["#FF6900"],
  });
  const [gigs] = useState<any>({
    series: [
      {
        name: "Purchase",
        colors: ["#FF6900"],
        data: [{
          x: 'jan',
          y: 7.0,              
            }, {
              x: 'Feb',
              y: 4.0
            }, {
              x: 'Mar',
              y: 3.0
            }, {
              x: 'Apr',
              y: 3.7
            }, {
              x: 'May',
              y: 6.0
            },{
              x: 'Jun',
              y: 2.0
            },{
              x: 'Jul',
              y: 6.5
            },{
              x: 'Aug',
              y: 2.0
            },{
              x: 'Sep',
              y: 3.0
            },{
              x: 'Oct',
              y: 2.0
            },{
              x: 'Nov',
              y: 5.0
            },{
              x: 'Dec',
              y: 7.0
            }]
          
      },
    ],
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
        borderRadius:6,
        borderRadiusApplication: 'end',
      },
    },
    colors: ["#FF6900"],
  });
  return (
    <>
      <Breadcrumb page="User Dashboard" />
      {/* Page Content */}
      <div className="page-content content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
              <UserSidebar />
            </div>
            {/* /Sidebar */}
            <div className="col-xl-9 col-lg-8">
              <div className="dashboard-header">
                <div className="main-title">
                  <h3>Overview</h3>
                </div>
                <div className="search-filter-selected select-icon">
                  <div className="form-group">
                    <span className="sort-text">
                      <i className="feather icon-calendar" />
                    </span>

                    <CommonSelect
                      className="select"
                      options={date}
                      defaultValue={date[0]}
                    />
                  </div>
                </div>
              </div>
              {/* Overview */}
              <div className="row">
                <div className="col-md-3 d-flex">
                  <div className="dash-widget flex-fill">
                    <span className="dash-icon bg-warning">
                      <ImageWithBasePath
                        src="assets/img/icons/check-icon.svg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <p>Completed Gigs</p>
                    <h3>08</h3>
                  </div>
                </div>
                <div className="col-md-3 d-flex">
                  <div className="dash-widget flex-fill">
                    <span className="dash-icon bg-success">
                      <ImageWithBasePath
                        src="assets/img/icons/section-icon.svg"
                        className="img-fluid"
                        alt="img"
                      />
                    </span>
                    <p>Recent Gigs</p>
                    <h3>15</h3>
                  </div>
                </div>
                <div className="col-md-6 d-flex">
                  <div className="dash-earning flex-fill">
                    <div className="earning-info">
                      <p>Your Earning This month</p>
                      <h3>$1,57,815</h3>
                      <h6>
                        Update your <span>setting</span>
                      </h6>
                    </div>
                    <div className="earning-btn">
                      <Link to={routes.userWallet} className="btn btn-primary">
                        Wallet
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 d-flex">
                  <div className="dash-widget flex-fill">
                    <span className="dash-icon bg-pending">
                      <i className="feather icon-heart" />
                    </span>
                    <p>My Wishlist</p>
                    <h3>45</h3>
                  </div>
                </div>
                <div className="col-md-3 d-flex">
                  <div className="dash-widget flex-fill">
                    <span className="dash-icon bg-danger">
                      <i className="feather icon-star" />
                    </span>
                    <p>Total Reviews</p>
                    <h3>24</h3>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="dash-widget dash-credit flex-fill">
                    <div className="dash-cont">
                      <span className="dash-icon">
                        <i className="feather icon-credit-card" />
                      </span>
                      <div className="dash-cash-info">
                        <p>Total Credit</p>
                        <h3>$1,292</h3>
                      </div>
                    </div>
                    <div className="dash-grade">
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/vector-icon.svg"
                          className="img-fluid"
                          alt="img"
                        />
                        <span className="text-success">+10% </span> last week
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 d-flex">
                  <div className="dash-widget dash-credit bg-pink-light flex-fill">
                    <div className="dash-cont">
                      <span className="dash-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/steam-icon.svg"
                          className="img-fluid"
                          alt="img"
                        />
                      </span>
                      <div className="dash-cash-info">
                        <p>Total Debit</p>
                        <h3>$100</h3>
                      </div>
                    </div>
                    <div className="dash-grade">
                      <p>
                        <ImageWithBasePath
                          src="assets/img/icons/vector-icon-01.svg"
                          className="img-fluid"
                          alt="img"
                        />
                        <span className="text-danger">-1% </span> last week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Overview */}
              <div className="row">
                {/* Sales Statistics */}
                <div className="col-lg-12">
                  <div className="card dashboard-card">
                    <div className="card-header">
                      <div className="gig-card-head">
                        <h4 className="card-title">Sales Statistics</h4>
                        <ul className="gigs-list nav">
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="tab"
                              data-bs-target="#amount"
                            >
                              Amount
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="active"
                              data-bs-toggle="tab"
                              data-bs-target="#gig"
                            >
                              Gigs
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link to={routes.userSales} className="view-link">
                        View All
                        <i className="feather icon-arrow-right" />
                      </Link>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="tab-pane fade" id="amount">
                          <ReactApexChart
                            id="amount-chart"
                            options={amount}
                            series={amount.series}
                            type="bar"
                            height={250}
                          />
                        </div>
                        <div className="tab-pane show active" id="gig">
                          <ReactApexChart
                            id="purchase-chart"
                            options={gigs}
                            series={gigs.series}
                            type="bar"
                            height={250}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Sales Statistics */}
              </div>
              <div className="row">
                {/* Recent Payments */}
                <div className="col-lg-12 d-flex">
                  <div className="card dashboard-card card-gig flex-fill">
                    <div className="card-header">
                      <div className="gig-card-head">
                        <h4 className="card-title">Gigs</h4>
                        <ul className="gigs-list nav">
                          <li>
                            <Link
                              to="#"
                              className="active"
                              data-bs-toggle="tab"
                              data-bs-target="#purchase"
                            >
                              Purchase
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="tab"
                              data-bs-target="#sales"
                            >
                              Sales
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link to={routes.userPurchase} className="view-link">
                        View All
                        <i className="feather icon-arrow-right" />
                      </Link>
                    </div>
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div className="tab-pane show active" id="purchase">
                          <div className="table-responsive card-table">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-07.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            Managing and optimizing paid
                                            advertising...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Delivery Date: 11/01/2024</li>
                                          <li>
                                            Seller :{" "}
                                            <span className="text-dark">
                                              Jones
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-08.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do collaborating with
                                            influencers...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Delivery Date: 10/01/2024</li>
                                          <li>
                                            Seller :{" "}
                                            <span className="text-dark">
                                              James
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-09.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do designing and executing
                                            targeted...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Delivery Date: 09/01/2024</li>
                                          <li>
                                            Seller :{" "}
                                            <span className="text-dark">
                                              Linda
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-04.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            Embedded Android &amp; AOSP
                                            customizations...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Delivery Date: 08/01/2024</li>
                                          <li>
                                            Seller :{" "}
                                            <span className="text-dark">
                                              Jeffrey
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-06.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do integrating AR elements
                                            into...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Delivery Date: 07/01/2024</li>
                                          <li>
                                            Seller :{" "}
                                            <span className="text-dark">
                                              Robert
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-success">
                                      Completed
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="sales">
                          <div className="table-responsive card-table">
                            <table className="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-01.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do integrating AR elements
                                            into...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Date: 07/01/2024</li>
                                          <li>
                                            Buyer :{" "}
                                            <span className="text-dark">
                                              Robert
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-success">
                                      Completed
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-08.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do collaborating with
                                            influencers...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Date: 10/01/2024</li>
                                          <li>
                                            Buyer :{" "}
                                            <span className="text-dark">
                                              James
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-09.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            Managing and optimizing paid
                                            advertising...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Date: 11/01/2024</li>
                                          <li>
                                            Buyer :{" "}
                                            <span className="text-dark">
                                              Jones
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1000</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-09.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            I will do designing and executing
                                            targeted...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Date: 09/01/2024</li>
                                          <li>
                                            Buyer :{" "}
                                            <span className="text-dark">
                                              Linda
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="table-img">
                                        <Link to="#">
                                          <ImageWithBasePath
                                            src="assets/img/gigs/gigs-04.jpg"
                                            className="img-fluid"
                                            alt="img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="recent-payment">
                                        <h6>
                                          <Link to="#">
                                            Embedded Android &amp; AOSP
                                            customizations...
                                          </Link>
                                        </h6>
                                        <ul>
                                          <li>Date: 08/01/2024</li>
                                          <li>
                                            Buyer :{" "}
                                            <span className="text-dark">
                                              Jeffrey
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-end">
                                    <span className="badge badge-receive bg-info">
                                      New
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    <h6 className="mb-0">$1400</h6>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Recent Payments */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default Dashboard;

import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { DatePicker, Table } from "antd";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import {  reason, type } from "../../../core/common/selectOption";
import UserSidebar from "../user-sidebar";
import Breadcrumb from "../breadcrumb";
import { userWalletData } from "../../../core/json/userWalletData";
const UserWallet = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredDataSource, setFilteredDataSource] = useState(userWalletData);
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = userWalletData.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredDataSource(filteredData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ids",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      render: (res: any, record: any) => (
        <>
          <h2 className="table-avatar d-flex align-items-center">
            <Link to="#" className="avatar">
              <ImageWithBasePath
                src={record.img}
                className="rounded"
                alt="User Image"
              />
            </Link>
            <Link to="#" className="text-dark">
              {record.reason}
            </Link>
          </h2>
        </>
      ),
    },
    {
      title: "Date & time",
      dataIndex: "dateTime",
    },



    {
      title: "Type",
      dataIndex: "type",
      render: (res: string) => (
        <>
          <span
            className={`badge ${
              res === "Credit" ? "bg-success" : "bg-danger"
            } new-badge`}
          >
            <i
              className={`fa-solid  ${
                res === "Credit" ? "fa-arrow-up" : "fa-arrow-down"
              }`}
            ></i>{" "}
            {res}
          </span>
        </>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
    },

   
  ];



  return (
    <>
      <Breadcrumb page="Wallet" />
      {/* Page Content */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
              <UserSidebar />
            </div>
            {/* /Sidebar */}
            {/*User Sales */}
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="dashboard-header">
                    <div className="main-title">
                      <h3>Wallet</h3>
                    </div>
                    
                  </div>
                  <div className="wallet-wrap">
                      <div className="wallet-list">
                        <div className="wallet-item">
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/wallet-01.svg"
                              alt="icon"
                            />
                          </span>
                          <div className="wallet-info">
                            <p>Total Amount</p>
                            <h3>$1,302.50</h3>
                          </div>
                        </div>
                        <div className="wallet-item">
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/wallet-03.svg"
                              alt="icon"
                            />
                          </span>
                          <div className="wallet-info">
                            <p>Total Credit</p>
                            <h3>$1,292.50</h3>
                          </div>
                        </div>
                        <div className="wallet-item">
                          <span>
                            <ImageWithBasePath
                              src="assets/img/icons/wallet-02.svg"
                              alt="icon"
                            />
                          </span>
                          <div className="wallet-info">
                            <p>Total Debit</p>
                            <h3>$10.00</h3>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#add_wallet"
                        className="btn btn-primary"
                      >
                        Add Wallet
                      </Link>
                    </div>
                  <div className="table-filter">
                    <ul className="filter-item">
                      <li>
                        <p>Filter</p>
                      </li>
                      <li>
                        <div className="form-sort form-wrap">
                          <span className="form-icon">
                            <ImageWithBasePath
                              src="assets/img/icons/calendar-icon.svg"
                              alt="icon"
                            />
                          </span>

                          <DatePicker
                            format={{
                              format: "DD-MM-YYYY",
                              type: "mask",
                            }}
                            className="form-control datetimepicker"
                            placeholder="Transcation"
                          />
                        </div>
                      </li>
                      <li>
                        <div className="form-sort form-wrap">
                          <span className="form-icon">
                            <ImageWithBasePath
                              src="assets/img/icons/wallet-icon.svg"
                              alt="icon"
                            />
                          </span>
                          <CommonSelect
                            className="select"
                            options={reason}
                            defaultValue={reason[0]}
                          />
                        </div>
                      </li>

                      <li>
                        <div className="form-sort form-wrap">
                          <span className="form-icon">
                            <ImageWithBasePath
                              src="assets/img/icons/user-heart.svg"
                              alt="icon"
                            />
                          </span>
                          <CommonSelect
                            className="select"
                            options={type}
                            defaultValue={type[0]}
                          />
                        </div>
                      </li>
                    </ul>
                    <div id="tablefilter">
                      <div
                        id="DataTables_Table_0_filter"
                        className="dataTables_filter"
                      >
                        <label>
                          {" "}
                          <input
                            type="search"
                            className="form-control form-control-sm"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
                            aria-controls="DataTables_Table_0"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <Table
                    className="table table-stripe datatable"
                    columns={columns}
                    rowHoverable={false}
                    dataSource={filteredDataSource}
                    pagination={{
                      locale: { items_per_page: "" },
                      nextIcon: <i className="fa-solid fa-chevron-right"></i>,
                      prevIcon: <i className="fa-solid fa-chevron-left"></i>,
                      defaultPageSize: 10,
                      showSizeChanger: false,
                      pageSizeOptions: ["10", "20", "30"],
                    }}
                  />
                </div>
              </div>
            </div>
            {/* /User Sales */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <>
  {/* Add Wallet */}
  <div
    className="modal new-modal fade"
    id="add_wallet"
    data-keyboard="false"
    data-backdrop="static"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Wallet</h5>
          <button type="button" className="close-btn" data-bs-dismiss="modal">
            <span>×</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <div className="amt-wrap">
                <div className="form-wrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the Amount"
                  />
                </div>
                <ul className="amt-list">
                  <li>Or</li>
                  <li>
                    <Link to="#" className="vary-amt">
                      $50
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="vary-amt">
                      $100
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="vary-amt">
                      $150
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="buyer-method">
                <h6>How are you planning to work with the Buyer? *</h6>
                <label className="custom_radio">
                  <input type="radio" name="payment" />
                  <span className="checkmark" />
                  Stripe
                </label>
                <label className="custom_radio">
                  <input type="radio" name="payment" defaultChecked />
                  <span className="checkmark" />
                  Card
                </label>
              </div>
              <div className="form-wrap form-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name on the Card"
                />
              </div>
              <div className="form-wrap form-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Card Number"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap form-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expiry Date"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-wrap form-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Security Number"
                />
              </div>
            </div>
            <div className="col-md-12">
              <Link
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#success_credit"
                data-bs-dismiss="modal"
                className="btn btn-primary w-100"
              >
                Add to Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Add Wallet */}
  {/* Gigs Publish */}
  <div className="modal custom-modal fade" id="success_credit" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="success-message text-center">
            <div className="success-popup-icon">
              <ImageWithBasePath src="assets/img/icons/happy-icon.svg" alt="icon" />
            </div>
            <div className="success-content">
              <h4>Credit Successfully</h4>
              <p>
                Amount of <span>“$200”</span> has been successfully Credited to
                your account with transaction ID of{" "}
                <span>“#124454487878874”</span>
              </p>
            </div>
            <div className="col-lg-12 text-center">
              <Link to="#" className="btn btn-primary" data-bs-dismiss="modal">
                Back to Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Gigs Publish */}
</>

    </>
  );
};

export default UserWallet;

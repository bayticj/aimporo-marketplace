import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { all_routes } from "../../router/all_routes";
import { salseOrders } from "../../../core/json/user_sales";
import { DatePicker, Table } from "antd";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import {  seller, status } from "../../../core/common/selectOption";
import { Order } from "../../../core/interface";
import SalesModal from "../sales-modal";
import UserSidebar from "../user-sidebar";
import Breadcrumb from "../breadcrumb";
// import Table from "../../../core/common/dataTable/index";
const UserPurchase = () => {
  const routes = all_routes;
  const [searchText, setSearchText] = useState<string>("");
  const [filteredDataSource, setFilteredDataSource] = useState(salseOrders);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = salseOrders.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredDataSource(filteredData);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Delivery On",
      dataIndex: "deliveryOn",
    },
    {
      title: "Seller",
      render: (res: any, record: Order) => (
        <>
          <h2 className="table-avatar d-flex align-items-center">
            <Link to={routes.userProfile} className="avatar">
              <ImageWithBasePath
                src={record.seller.avatarUrl}
                alt="User Image"
              />
            </Link>
            <Link to={routes.userProfile}>{record.seller.name}</Link>
          </h2>
        </>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      render: (res: string, record: any) => (
        <>
          {record.status === "Completed" ? (
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_review">
              {res}
            </Link>
          ) : record.status === "New" ? (
            <Link to="#" data-bs-toggle="modal" data-bs-target="#add_review1">
              {res}
            </Link>
          ) : (
            <>{ res }</>
          )}
        </>
      ),
    },
    {
      title: "Cancel",
      dataIndex: "cancel",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Payment",
      dataIndex: "payment",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#order_status">
            <span
              className={`badge  new-badge ${
                status === "New"
                  ? "bg-info"
                  : status === "Processing"
                  ? "bg-warning"
                  : status === "Completed"
                  ? "bg-success"
                  : "bg-black"
              }`}
            >
              {status}
            </span>
          </Link>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <>
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FeatherIcon icon="more-vertical" />
            </Link>
            <div className="dropdown-menu dropdown-menu-right">
              <Link
                className="dropdown-item"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#order_details"
              >
                <FeatherIcon icon="eye" /> View
              </Link>
            </div>
          </div>
        </>
      ),
    },
  ];
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredDataSource.length);
  const total = filteredDataSource.length;
  return (
    <>
      <Breadcrumb page="My Purchases"/>
      {/* Page Content */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4 col-xl-3 theiaStickySidebar">
            <UserSidebar/>
            </div>
            {/* /Sidebar */}
            {/*User Sales */}
            <div className="col-xl-9 col-lg-8">
              <div className="row">
                <div className="col-md-12">
                <div className="dashboard-header">
                <div className="main-title">
                  <h3>My Purchases</h3>
                  <div id="tableinfo" >
                  <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
            {`Showing ${start} to ${end} of ${total} entries`}
          </div>
                  </div>
                </div>
                <div className="head-info">
                  <p>
                    Total Purchases <span className="text-primary">({total})</span>
                  </p>
                </div>
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
                        placeholder="From Date"
                      />
                    </div>
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
                        placeholder="To Date"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="form-sort form-wrap">
                      <span className="form-icon">
                        <ImageWithBasePath
                          src="assets/img/icons/status-icon.svg"
                          alt="icon"
                        />
                      </span>

                      <CommonSelect
                        className="select"
                        options={status}
                        defaultValue={status[0]}
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
                        options={seller}
                        defaultValue={seller[0]}
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
                  onChange: handleTableChange,
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
      <SalesModal />
    </>
  );
};

export default UserPurchase;

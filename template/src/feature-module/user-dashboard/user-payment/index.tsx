import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { DatePicker, Table } from "antd";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { buyer } from "../../../core/common/selectOption";
import UserSidebar from "../user-sidebar";
import Breadcrumb from "../breadcrumb";
import { userPayments } from "../../../core/json/userPayment";
// import Table from "../../../core/common/dataTable/index";
const UserPayment = () => {
  const routes = all_routes;
  const [searchText, setSearchText] = useState<string>("");
  const [filteredDataSource, setFilteredDataSource] = useState(userPayments);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = userPayments.filter((record) =>
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
      title: "Buyer",
      dataIndex: "buyer",
      render: (res: any, record: any) => (
        <>
          <h2 className="table-avatar d-flex align-items-center">
            <Link to={routes.userProfile} className="avatar">
              <ImageWithBasePath src={record.img2} alt="User Image" />
            </Link>
            <Link to={routes.userProfile}>{record.buyer}</Link>
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
              res === "Recieved" ? "bg-success" : "bg-danger"
            } new-badge`}
          >
            <i
              className={`fa-solid  ${
                res === "Recieved" ? "fa-arrow-up" : "fa-arrow-down"
              }`}
            ></i>{" "}
            {res}
          </span>
        </>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount2",
    },

    {
      title: "Action",
      render: () => (
        <>
          <div className="table-action">
            <Link to="#">
              <i className="feather icon-eye"></i>
            </Link>
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
      <Breadcrumb page="Payments" />
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
                      <h3>My Payments</h3>
                      <div id="tableinfo">
                        <div
                          className="dataTables_info"
                          id="DataTables_Table_0_info"
                          role="status"
                          aria-live="polite"
                        >
                          {`Showing ${start} to ${end} of ${total} entries`}
                        </div>
                      </div>
                    </div>
                    <div className="head-info">
                      <p>
                        Total Payments{" "}
                        <span className="text-primary">({total})</span>
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
                              src="assets/img/icons/user-heart.svg"
                              alt="icon"
                            />
                          </span>
                          <CommonSelect
                            className="select"
                            options={buyer}
                            defaultValue={buyer[0]}
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
    </>
  );
};

export default UserPayment;

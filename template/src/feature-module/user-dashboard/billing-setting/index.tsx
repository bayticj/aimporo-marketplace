import React, { useState } from "react";
import ImageWithBasePath from "../../../core/img";
import { Link } from "react-router-dom";
import { DatePicker, Table } from "antd";
import CommonSelect from "../../../core/common/common-select/commonSelect";
import { plan } from "../../../core/common/selectOption";
import SalesModal from "../sales-modal";
import Breadcrumb from "../breadcrumb";
import SettingsTab from "../settingsTab";
import { billingData } from "../../../core/json/billingData";
const BillingSetting = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredDataSource, setFilteredDataSource] = useState(billingData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleSearch = (value: string) => {
    setSearchText(value);
    const filteredData = billingData.filter((record) =>
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
      title: "Invoice No",
      dataIndex: "invoiceNo",
    },
    {
      title: "Billing Date",
      dataIndex: "billingDate",
    },
    {
      title: "Plan",
      dataIndex: "plan",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (res: string) => (
        <>
          <span className={`badge badge-receive d-inline-flex align-items-center ${res === 'Paid'?'bg-success ':'bg-danger'}`}><i className="feather icon-check me-2"></i>{res}</span>
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: () => (
        <>
          <div className="table-action justify-content-end">
											<Link to="#"><i className="feather icon-download"></i></Link>
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
      <Breadcrumb page="Settings" />
      {/* Page Content */}
      <div className="page-content content">
        <div className="container">
          <SettingsTab />

          <div className="row">
            <div className="col-md-12">
              <div className="billing-type">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="settings-card">
                      <div className="settings-card-head">
                        <h5>Current Plan: Basic</h5>
                        <span>Renew On: 01 Feb 2024</span>
                      </div>
                      <div className="settings-card-body">
                        <div className="btn-item">
                          <Link to="#" className="btn btn-primary">
                            Manage
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="settings-card">
                      <div className="settings-card-head d-flex justify-content-between align-items-start">
                        <div className="payment-method-add">
                          <h5>Payment Method</h5>
                          <span>Expires On: 04 Mar 2024</span>
                        </div>
                        <Link to="#" className="add-payment payment-btn">
                          Add
                        </Link>
                      </div>
                      <div className="settings-card-body">
                        <div className="payment-method-edit">
                          <div className="card-type">
                            <span className="payment-card-img">
                              <ImageWithBasePath
                                src="assets/img/icons/visa.svg"
                                alt=""
                              />
                            </span>
                            <div className="card-no">
                              <span>Visa *****4023</span>
                            </div>
                          </div>
                          <Link to="#" className="edit-payment payment-btn">
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="plan-bill-table">
            <div className="dashboard-header">
              <div className="main-title">
                <h3>Invoices</h3>
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
                  Total Purchases{" "}
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
                      options={plan}
                      defaultValue={plan[0]}
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

            {/* /User Sales */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
      <SalesModal />
    </>
  );
};

export default BillingSetting;

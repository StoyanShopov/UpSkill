import React, { useState, useEffect } from "react";

import { getSliced,  getCompaniesEmails} from "../../../../services/adminDashboardService";
import {
  removeClientHandler,
  getClientsTotalCountSuperAdmin,
} from "../../../../services/adminDashboardService";
import { disableBodyScroll } from "../../../../utils/utils";

import "../../../MyProfile/CompanyOwnerViews/Employees/EmployeeEmailInfo/EmployeeEmailInfo.css";

const ClientEmailInfo = ({ onAddClient }) => {
  let [allClients, setAllClients] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [clientCount, setClientCount] = useState(0);
  
  useEffect(() => {
    getSliced(currentPage).then((clients) => {
      setAllClients(clients);
    });
    console.log(currentPage);
  }, [currentPage]);

  function showMoreClients() {
    let next = currentPage + 1;
    setCurrentPage(next);
    getSliced(currentPage).then((clients) => {
      setAllClients([]);
      setAllClients((arr) => [...arr, ...clients]);
      console.log(currentPage);
    });
  }

  function onAddClientsInternal(clicked) {
    disableBodyScroll();
    onAddClient(clicked);
  }

  useEffect(() => {
    getClientsTotalCountSuperAdmin().then((count) => setClientCount(count));
  });

  return (
    <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
      <div className="ourTable">
        <div className="table-row header-EmployeeCourse">
          <div className="cell cell-Employees-Courses">
            Company Name ({clientCount})
          </div>
          <div className="cell cell-Employees-Courses">Email</div>

          <div
            className="cell cell-Employees-Courses add-client-btn"
            onClick={(e) => onAddClientsInternal(true)}
          >
            <i className="fas fa-plus-circle"></i>
          </div>
        </div>
        <div className="table-content d-flex ">
          <div className="table-content-names w-50">
            {allClients.map((client) => {
              return (
                <div
                  className="table-row px-3"
                  key={client.name + client.email + client.id}
                >
                  <div
                    className="cell cell-data-clients-Courses name-cell-data"
                    style={{ fontFamily: "Montserrat" }}
                    data-title="client"
                    href={client.email}
                  >
                    {client.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="table-content-emails w-50">
            {allClients.map((client) => {
              return (
                <div className="table-row px-3" key={client.id}>
                  <div
                    className="cell cell-data-clients-Courses email-cell-data"
                    data-title="clientEmail"
                  >
                    <div> {client.email}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="table-row">
          <div className="table-viewMoreLink" data-mdb-ripple-color="dark">
            <span
              className="btn btn-link cell-data-clients-Courses"
              onClick={showMoreClients}
            >
              View More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientEmailInfo;

import React, { useState, useEffect } from 'react';

import { getEmployeeWithEmail } from '../../../../../services/employeeService';
import { removeEmployeeHandler, ownerEmployeesMock } from '../../../../../services/employeeService';
import { disableBodyScroll } from '../../../../../utils/utils';

import './EmployeeEmailInfo.css';

const EmployeeEmailInfo = ({ onAddEmployee }) => {
  let [allEmployees, setallEmployees] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);
  let [popupInner, setPopupInner] = useState(0);

  useEffect(() => {
    getEmployeeWithEmail(currentPage).then((employees) => {
      setallEmployees(employees);
    });
  }, [currentPage]);

  function showMoreEmployees() {
    let next = currentPage + 1;
    setCurrentPage(next);
    getEmployeeWithEmail(currentPage).then((employees) => {
      setallEmployees([]);
      setallEmployees((arr) => [...arr, ...employees]);
    });
  }
  const deleteEmployee = (id) => {
    removeEmployeeHandler(id);
  };

  function onAddEmployeesInternal(clicked) {
    disableBodyScroll();
    onAddEmployee(clicked);
  }

  return (
    <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
      <div className="ourTable">
        <div className="table-row header-EmployeeCourse">
          <div className="cell cell-Employees-Courses">
            Employees ({ allEmployees.length })
          </div>
          <div className="cell cell-Employees-Courses">Email</div>

          <div
            className="cell cell-Employees-Courses add-employee-btn"
            onClick={(e) => onAddEmployeesInternal(true)}
          >
            <i className="fas fa-plus-circle"></i>
          </div>
        </div>
        <div className="table-content d-flex ">
          <div className="table-content-names w-50">
            {allEmployees.map((employee) => {
              return (
                <div
                  className="table-row px-3"
                  key={ employee.firstName + employee.email + employee.id }
                >
                  <div
                    className="cell cell-data-Employees-Courses name-cell-data"
                    data-title="Employee"
                    href={ employee.email }
                  >
                    { employee.firstName + ' ' + employee.lastName }

                    <div>
                      <button
                        className="Delete"
                        style={{
                          color: 'red',
                          marginTop: '20px',
                          marginLeft: '10px',
                        }}
                        onClick={() => {
                          const confirm = window.confirm(
                            'Are you sure you wish to remove this employee?'
                          );
                          if (confirm) {
                            deleteEmployee(employee.id);
                          }
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="table-content-emails w-50">
            {allEmployees.map((employee) => {
              return (
                <div className="table-row px-3" key={employee.email}>
                  <div
                    className="cell cell-data-Employees-Courses email-cell-data"
                    data-title="EmployeeEmail"
                  >
                    <div
                      style={{
                        color: 'blue',
                        marginTop: '45px',
                        marginLeft: '10px',
                      }}
                    >
                      {' '}
                      {employee.email}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="table-row">
          <div className="table-viewMoreLink" data-mdb-ripple-color="dark">
            <span
              className="btn btn-link cell-data-Employees-Courses"
              onClick={showMoreEmployees}
            >
              View More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEmailInfo;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useEffect } from 'react';

import { getEmployeeWithEmail } from '../../../../../services/employeeService';
import { removeEmployeeHandler } from '../../../../../services/employeeService';
import { disableBodyScroll } from '../../../../../utils/utils';

import './EmployeeEmailInfo.css';

var EmployeeEmailInfo = function EmployeeEmailInfo(_ref) {
  var onAddEmployee = _ref.onAddEmployee;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      allEmployees = _useState2[0],
      setallEmployees = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      currentPage = _useState4[0],
      setCurrentPage = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      popupInner = _useState6[0],
      setPopupInner = _useState6[1];

  useEffect(function () {
    getEmployeeWithEmail(currentPage).then(function (employees) {
      setallEmployees(employees);
    });
  }, [currentPage]);

  function showMoreEmployees() {
    var next = currentPage + 1;
    setCurrentPage(next);
    getEmployeeWithEmail(currentPage).then(function (employees) {
      setallEmployees([]);
      setallEmployees(function (arr) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(employees));
      });
    });
  }
  var deleteEmployee = function deleteEmployee(id) {
    removeEmployeeHandler(id);
  };

  function onAddEmployeesInternal(clicked) {
    disableBodyScroll();
    onAddEmployee(clicked);
  }

  return React.createElement(
    'div',
    { className: 'wrap-table100 mt-5 shadow mb-5 bg-body rounded' },
    React.createElement(
      'div',
      { className: 'ourTable' },
      React.createElement(
        'div',
        { className: 'table-row header-EmployeeCourse' },
        React.createElement(
          'div',
          { className: 'cell cell-Employees-Courses' },
          'Employees'
        ),
        React.createElement(
          'div',
          { className: 'cell cell-Employees-Courses' },
          'Email'
        ),
        React.createElement(
          'div',
          {
            className: 'cell cell-Employees-Courses add-employee-btn',
            onClick: function onClick(e) {
              return onAddEmployeesInternal(true);
            }
          },
          React.createElement('i', { className: 'fas fa-plus-circle' })
        )
      ),
      React.createElement(
        'div',
        { className: 'table-content d-flex ' },
        React.createElement(
          'div',
          { className: 'table-content-names w-50' },
          allEmployees.map(function (employee) {
            return React.createElement(
              'div',
              {
                className: 'table-row px-3',
                key: employee.firstName + employee.email + employee.id
              },
              React.createElement(
                'div',
                {
                  className: 'cell cell-data-Employees-Courses name-cell-data',
                  'data-title': 'Employee',
                  href: employee.email
                },
                employee.firstName + ' ' + employee.lastName,
                React.createElement(
                  'div',
                  null,
                  React.createElement(
                    'button',
                    {
                      className: 'Delete',
                      style: {
                        color: 'red',
                        marginTop: '20px',
                        marginLeft: '10px'
                      },
                      onClick: function onClick() {
                        var confirm = window.confirm('Are you sure you wish to remove this employee?');
                        if (confirm) {
                          deleteEmployee(employee.id);
                        }
                      }
                    },
                    'Remove'
                  )
                )
              )
            );
          })
        ),
        React.createElement(
          'div',
          { className: 'table-content-emails w-50' },
          allEmployees.map(function (employee) {
            return React.createElement(
              'div',
              { className: 'table-row px-3', key: employee.email },
              React.createElement(
                'div',
                {
                  className: 'cell cell-data-Employees-Courses email-cell-data',
                  'data-title': 'EmployeeEmail'
                },
                React.createElement(
                  'div',
                  {
                    style: {
                      color: 'blue',
                      marginTop: '45px',
                      marginLeft: '10px'
                    }
                  },
                  ' ',
                  employee.email
                )
              )
            );
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'table-row' },
        React.createElement(
          'div',
          { className: 'table-viewMoreLink', 'data-mdb-ripple-color': 'dark' },
          React.createElement(
            'span',
            {
              className: 'btn btn-link cell-data-Employees-Courses',
              onClick: showMoreEmployees
            },
            'View More'
          )
        )
      )
    )
  );
};

export default EmployeeEmailInfo;
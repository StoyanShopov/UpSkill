var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';

import './EmployeesOverview.css';

import { getEmployeesTotalCountCompanyOwner } from '../../../../../services/employeeService';
import { getActiveCoachesCompanyOwner } from '../../../../../services/coachService';
import { getActiveCoursesCompanyOwner } from '../../../../../services/courseSevice';

function EmployeesOverview() {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      activeCoaches = _useState4[0],
      setActiveCoaches = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      activeCourses = _useState6[0],
      setActiveCourses = _useState6[1];

  useEffect(function () {
    getEmployeesTotalCountCompanyOwner('').then(function (emplCount) {
      setCount(emplCount);
    });
    getActiveCoachesCompanyOwner('').then(function (coaches) {
      setActiveCoaches(coaches);
    });

    getActiveCoursesCompanyOwner('').then(function (courses) {
      setActiveCourses(courses);
    });
  }, []);

  return React.createElement(
    'div',
    { className: 'table' },
    React.createElement(
      'div',
      { className: 'Overview d-flex mt-5 mb-4 shadow px-5 py-4' },
      React.createElement(
        'div',
        { className: 'Overview-count Overview-cell' },
        React.createElement(
          'h4',
          null,
          'Employees'
        ),
        React.createElement(
          'h1',
          { className: 'Overview-heading' },
          count
        )
      ),
      React.createElement(
        'div',
        { className: 'Overview-activeCourses Overview-cell' },
        React.createElement(
          'h4',
          null,
          'Active Courses'
        ),
        React.createElement(
          'h1',
          { className: 'Overview-heading' },
          activeCourses
        )
      ),
      React.createElement(
        'div',
        { className: 'Overview-activeCoaches Overview-cell' },
        React.createElement(
          'h4',
          null,
          'Active Coaches'
        ),
        React.createElement(
          'h1',
          { className: 'Overview-heading' },
          activeCoaches
        )
      )
    )
  );
}

export default EmployeesOverview;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';

import CoursesCatalog from '../Courses/CoursesCatalog/CoursesCatalog';
import { getCourses } from '../../../../services/employeeService';

import './Courses.css';

export default function Courses() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      courses = _useState2[0],
      setCourses = _useState2[1];

  useEffect(function () {
    getCourses().then(function (courses) {
      setCourses(courses);
    });
  }, []);

  return React.createElement(
    'div',
    { className: 'content' },
    React.createElement(
      'div',
      { className: 'wrapper row' },
      React.createElement(CoursesCatalog, { courses: courses })
    )
  );
}
import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

var OWN_API_URL = Base_URL + 'Owner/Courses/';

var token = localStorage.getItem('token');

var numberCoursesToShow = 3;

var coursesCompanyOwnerMock = [{
  id: '8',
  name: 'August',
  courses: [{ name: 'Python', enrolled: 6 }, { name: 'Ruby', enrolled: 5 }, { name: 'C++', enrolled: 18 }, { name: 'C#', enrolled: 5 }, { name: 'Java', enrolled: 3 }]
}, {
  id: '9',
  name: 'September',
  courses: [{ name: 'HTML', enrolled: 4 }, { name: 'CSS', enrolled: 7 }, { name: 'JS', enrolled: 13 }, { name: 'C#', enrolled: 8 }]
}, {
  id: '10',
  name: 'October',
  courses: [{ name: 'TypeScript', enrolled: 9 }, { name: 'Java', enrolled: 1 }, { name: 'JS', enrolled: 3 }]
}];

var courses = [];

export var getAllCourses = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(course) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', axios.get(OWN_API_URL + 'getAll', { headers: { Authorization: 'Bearer ' + token } }, { course: course }).then(function (response) {
              courses = [];
              response.data.map(function (x) {
                return courses.push(x);
              });
              return courses;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getAllCourses(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var getActiveCoursesCompanyOwner = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(uId) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            getAllCourses();
            return _context2.abrupt('return', courses.length);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function getActiveCoursesCompanyOwner(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

export var getCoursesForCompanyOwner = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(uId, currentPage, currentMonth) {
    var month, arr;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            month = coursesCompanyOwnerMock.filter(function (m) {
              return m.id == currentMonth;
            })[0];
            arr = month.courses.slice(0, currentPage * numberCoursesToShow + numberCoursesToShow);
            return _context3.abrupt('return', [month.name, arr]);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function getCoursesForCompanyOwner(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
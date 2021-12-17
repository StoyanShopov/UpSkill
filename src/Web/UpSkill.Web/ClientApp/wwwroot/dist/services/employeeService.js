import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

var EMP_API_URL = Base_URL + 'Employee/Courses/';
var OWN_API_URL = Base_URL + 'Owner/Employees/';

var token = localStorage.getItem('token');

var data = [];

export var getCourses = function getCourses(courseId, courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath) {
  return axios.get(EMP_API_URL + 'getAll', { headers: { Authorization: 'Bearer ' + token } }, {
    courseId: courseId,
    courseTitle: courseTitle,
    courseCoachFirstName: courseCoachFirstName,
    courseCoachLastName: courseCoachLastName,
    courseFileFilePath: courseFileFilePath
  }).then(function (response) {
    data = response.data;
    return data;
  });
};

var numberEmployeesToShow = 3;
var employees = [];

export var getEmployeeWithEmail = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(currentPage) {
    var arr;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getAllEmployees();

            arr = [];

            arr.push.apply(arr, _toConsumableArray(employees.slice(0, currentPage * numberEmployeesToShow + numberEmployeesToShow)));

            return _context.abrupt('return', arr);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getEmployeeWithEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var getEmployeesTotalCountCompanyOwner = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(uId) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', employees.length);

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function getEmployeesTotalCountCompanyOwner(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

export var getAllEmployees = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(employee) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', axios.get(OWN_API_URL + 'getAll', { headers: { Authorization: 'Bearer ' + token } }, { employee: employee }).then(function (response) {
              employees = [];
              response.data.map(function (x) {
                return employees.push(x);
              });
              return employees;
            }));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function getAllEmployees(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

export var removeEmployeeHandler = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(id) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(id);
            _context4.next = 3;
            return axios.delete(Base_URL + ('Owner/Employee?id=' + id));

          case 3:
            return _context4.abrupt('return', _context4.sent);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function removeEmployeeHandler(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
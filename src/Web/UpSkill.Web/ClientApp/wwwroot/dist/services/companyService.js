import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

//GetCompanies
export var getCompanies = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get(Base_URL + "Admin/Companies/getAll");

          case 2:
            response = _context.sent;
            return _context.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getCompanies() {
    return _ref.apply(this, arguments);
  };
}();

//Create
export var addCompanyHandler = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(company) {
    var request;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            request = {
              name: company.name
            };
            _context2.next = 3;
            return axios.post(Base_URL + "Admin/Companies/create", request).then(function (response) {
              return response.data;
            });

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function addCompanyHandler(_x) {
    return _ref2.apply(this, arguments);
  };
}();
//Update
export var updateCompanyHandler = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(company) {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return axios.put(Base_URL + ('Admin/Companies/edit?id=' + company.id), company).then(function (response) {
              return response.data;
            });

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function updateCompanyHandler(_x2) {
    return _ref3.apply(this, arguments);
  };
}();
//Delete
export var removeCompanyHandler = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(id) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return axios.delete(Base_URL + ('Admin/Companies/delete?id=' + id));

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function removeCompanyHandler(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

var initialCompanies = [{
  id: 1,
  companyName: 'Motion Software'
}, {
  id: 2,
  companyName: 'Scale Focus'
}, {
  id: 3,
  companyName: 'SoftUni'
}, {
  id: 4,
  companyName: 'Test'
}, {
  id: 5,
  companyName: 'Metro'
}, {
  id: 6,
  companyName: 'Fantastiko'
}];
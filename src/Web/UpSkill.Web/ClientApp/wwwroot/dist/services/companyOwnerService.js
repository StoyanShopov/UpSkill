import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { Base_URL } from '../utils/baseUrlConstant';
import axios from "axios";

var token = localStorage.getItem("token");
var invoiceStatus = "Pending";
var dueDate = "30.09.21";

var coursesCompanyOwnerMock = [{ id: '8', name: 'August', courses: [{ name: 'Illustrator Advanced', date: '10.08.2021', price: 90 }, { name: 'Life Balance Coach', date: '02.08.2021', price: 70 }, { name: 'Photoshop Advanced', date: '22.08.2021', price: 40 }, { name: 'C# Advanced', date: '14.08.2021', price: 80 }, { name: 'Java Basic', date: '03.08.2021', price: 120 }], totalForMonth: 400 }, { id: '9', name: 'September', courses: [{ name: 'Photoshop Advanced', date: '10.09.2022', price: 100 }, { name: 'Illustrator Advanced', date: '15.09.2021', price: 50 }, { name: 'Life Balance Coach', date: '22.09.2021', price: 80 }], totalForMonth: 230 }, { id: '10', name: 'October', courses: [{ name: 'TypeScript', date: '02.10.2021', price: 170 }, { name: 'Java Advanced', date: '02.10.2021', price: 60 }, { name: 'JS Advanced', date: '02.10.2021', price: 140 }], totalForMonth: 370 }];

export var getInvoiceStatus = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(uId) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt("return", invoiceStatus);

                    case 1:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function getInvoiceStatus(_x) {
        return _ref.apply(this, arguments);
    };
}();

export var getDueDate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(uId) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt("return", dueDate);

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function getDueDate(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

export var getSubscriptionsForCompanyOwner = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(uId, currentMonth) {
        var month;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        month = coursesCompanyOwnerMock.filter(function (m) {
                            return m.id == currentMonth;
                        })[0];
                        return _context3.abrupt("return", [month.name, month.courses, month.totalForMonth]);

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    return function getSubscriptionsForCompanyOwner(_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}();

export var addEmployee = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(fullName, email, position) {
        var employee;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        employee = {
                            fullName: fullName,
                            email: email,
                            position: position
                        };

                        axios.post(Base_URL + "Owner/Employee", employee, { headers: { "Authorization": "Bearer " + token } }).then(function (res) {
                            return res.data.id;
                        }).catch(function (error) {
                            console.log(error);
                        });

                    case 2:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, _this);
    }));

    return function addEmployee(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();
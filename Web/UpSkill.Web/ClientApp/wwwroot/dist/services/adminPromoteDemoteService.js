import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from "axios";

var getUserAsync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(email) {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return axios.get("https://localhost:44319/Admin/Admin?email=" + email);

                    case 2:
                        return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    return function getUserAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

var promoteAsync = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(email) {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return axios.put("https://localhost:44319/Admin/Admin/promote?email=" + email);

                    case 2:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    return function promoteAsync(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var demoteAsync = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(email) {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return axios.put("https://localhost:44319/Admin/Admin/demote?email=" + email);

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, _this);
    }));

    return function demoteAsync(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var serviceActions = {
    getUserAsync: getUserAsync,
    promoteAsync: promoteAsync,
    demoteAsync: demoteAsync
};

export default serviceActions;
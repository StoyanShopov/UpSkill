import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var numberCoursesToShow = 5;
var API_URL = "https://ourupskill.azurewebsites.net/Admin/Courses";
var axios = require("axios");

var initialCourses = [{
  id: 1,
  courseName: 'Marketing',
  coachName: 'Jim Wilber',
  imageName: 'Marketing.png',
  price: 50
}, {
  id: 2,
  courseName: 'Design',
  coachName: 'Tom Smith',
  imageName: 'Design.png',
  price: 40
}, {
  id: 3,
  courseName: 'Management',
  coachName: 'Sarah Coleman',
  imageName: 'Management.png',
  price: 60
}, {
  id: 4,
  courseName: 'HTML&CSS',
  coachName: 'David Can',
  imageName: 'HTML&CSS.png',
  price: 100
}, {
  id: 5,
  courseName: 'Java',
  coachName: 'Emily Hill',
  imageName: 'Java.png',
  price: 70
}];

export var getCourses = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(currentPage) {
    var arr;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //      let res = await request(``, 'Get');
            arr = [];

            arr.push.apply(arr, _toConsumableArray(initialCourses.slice(0, currentPage * numberCoursesToShow + numberCoursesToShow)));

            return _context.abrupt("return", arr);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getCourses(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var getCourseDetails = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(id) {
    var resp;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.get(API_URL + "/details?id=" + id);

          case 3:
            resp = _context2.sent;

            console.log(resp);
            _context2.next = 9;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[0, 7]]);
  }));

  return function getCourseDetails(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { getCoachesNames } from "./coachService";
import { getCategoriesForCourses } from "./categoryService";

import { Base_URL } from '../utils/baseUrlConstant';

var numberCoursesToShow = 6;

var axios = require("axios");

var API_URL = Base_URL + "Admin/Courses";

var initialCourses = [{
  id: "21312asdsa123",
  title: "Marketing",
  coachName: "Jim Wilber",
  description: "First steps into Marketing",
  price: 50.0,
  categoryId: 1,
  coachId: 2,
  categoryName: "Marketing",
  imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png"
}, {
  id: "321313adasd",
  title: "Design",
  coachName: "Tom Smith",
  description: "You wil learn basic Design principles...",
  price: 60,
  categoryId: 1,
  coachId: 1,
  categoryName: "Marketing",
  imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png"
}, {
  id: "3242432324",
  title: "Management",
  coachName: "Sarah Coleman",
  description: "You will aquire basic management knowledge...",
  price: 80,
  categoryId: 1,
  coachId: 2,
  categoryName: "Marketing",
  imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png"
}, {
  id: "32424324",
  title: "Management",
  coachName: "Sarah Coleman",
  description: "You will aquire basic management knowledge...",
  price: 80,
  categoryId: 1,
  coachId: 2,
  imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  categoryName: "Design"
}, {
  id: "324324",
  title: "Management",
  coachId: 2,
  coachName: "Sarah Coleman",
  description: "You will aquire basic management knowledge...",
  price: 80,
  categoryId: 1,
  categoryName: "Art",
  imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png"
}];

export var getCourses = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(currentPage) {
    var arr;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arr = [];

            arr.push.apply(arr, _toConsumableArray(initialCourses.slice(0, currentPage * numberCoursesToShow + numberCoursesToShow)));

            return _context.abrupt("return", initialCourses);

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

//Get the real data from Db

// export const getCoursesDb = async () => {
//   let returnCourses = [];
//   try {
//     let returnCoaches = [];
//     let returnCourse = {};

//     let returnCategories = [];

//     getCategoriesForCourses().then((categories) => {
//       categories.forEach((ca) => returnCategories.push(ca));
//     });

//     getCoachesNames().then((coaches) =>
//       coaches.forEach((c) => returnCoaches.push(c))
//     );

//     console.log(returnCategories);
//     console.log(returnCoaches);

//     const resp = await axios.get(API_URL+"/getAll");
//     let respData = resp.data;
//     console.log(respData);

//     respData.map((c) => {
//       returnCourse = c;
//       console.log(returnCourse);
//       let currentCoach = returnCoaches.find(
//         (c) => c.value == returnCourse.coachId
//       );

//       if (currentCoach) {
//         returnCourse["coachName"] = currentCoach.label;
//       }

//       let currentCategory = returnCategories.find(
//         (ca) => ca.value == returnCourse.categoryId
//       );

//       if (currentCategory) {
//         returnCourse["categoryName"] = currentCategory.label;
//       }
//       returnCourses.push(returnCourse);
//     });

//     return returnCourses;
//   } catch (error) {}
// };

export var addCourses = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(course) {
    var resp;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.post(API_URL, course);

          case 3:
            resp = _context2.sent;
            return _context2.abrupt("return", resp);

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

  return function addCourses(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

export var updateCourses = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(course) {
    var resp;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return axios.put(API_URL + "?id=" + course.id, course);

          case 3:
            resp = _context3.sent;
            _context3.next = 8;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[0, 6]]);
  }));

  return function updateCourses(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

export var deleteCourses = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(id) {
    var resp;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return axios.delete(API_URL + "?id=" + id);

          case 3:
            resp = _context4.sent;
            _context4.next = 8;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, _this, [[0, 6]]);
  }));

  return function deleteCourses(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
import _regeneratorRuntime from "babel-runtime/regenerator";

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var categoriesMock = ["Art", "Design", "Marketing", "Leadership", "Data Science", "Personal Development", "Computer Science"];

var categoriesMockForCourse = [{ label: "Art", value: "1" }, { label: "Design", value: "2" }, { label: "Marketing", value: "3" }, { label: "Leadership", value: "4" }, { label: "Data Science", value: "5" }, { label: "Personal Development", value: "6" }, { label: "Computer Science", value: "7" }];

export var getCategories = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", categoriesMock);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getCategories() {
    return _ref.apply(this, arguments);
  };
}();

export var getCategoriesForCourses = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var arr;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //      let res = await request(``, 'Get');
            arr = [];

            categoriesMockForCourse.map(function (c) {
              return arr.push(c);
            });

            return _context2.abrupt("return", arr);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function getCategoriesForCourses() {
    return _ref2.apply(this, arguments);
  };
}();
import _regeneratorRuntime from 'babel-runtime/regenerator';

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import axios from 'axios';

import { Base_URL } from '../utils/baseUrlConstant';

var OWN_API_URL = Base_URL + 'Owner/Coaches/';

var token = localStorage.getItem('token');

var numberCoachesToShow = 6;
var numberCoachesSessionsToShow = 3;

var initialCoachesMock = [{
  id: '1',
  fullName: 'Anne Foster',
  coachField: 'Leadership ',
  company: 'Google',
  price: 50,
  imageUrl: 'https://i.guim.co.uk/img/uploads/2017/10/09/Sonia_Sodha,_L.png?width=300&quality=85&auto=format&fit=max&s=045793b916f0ff6e7228468ca6aa61c5'
}, {
  id: '2',
  fullName: 'Philipa Key',
  coachField: 'Nutrition',
  company: 'Amazon',
  price: 60,
  imageUrl: 'https://static.independent.co.uk/s3fs-public/Rachel_Hosie.png'
}, {
  id: '3',
  fullName: 'Jenna Jameson',
  coachField: 'Management',
  company: 'Google',
  price: 80,
  imageUrl: 'https://i.guim.co.uk/img/uploads/2017/10/06/Laura-Bates,-L.png?width=300&quality=85&auto=format&fit=max&s=0349fb29cd3cef227473ea2c4dd11b2f'
}, {
  id: '4',
  fullName: 'Brent Foster',
  coachField: 'Leadership',
  company: 'Google',
  price: 50,
  imageUrl: 'https://secure.gravatar.com/avatar/03fd0c159222fdf134fe37e9a8b74f0e?s=400&d=mm&r=g'
}, {
  id: '5',
  fullName: 'Jimmy Hanks',
  coachField: 'Art',
  company: 'Google',
  price: 100,
  imageUrl: 'http://www.lukasman.cz/wp-content/uploads/2020/09/foto-homepage-1-1024x549.png'
}, {
  id: '6',
  fullName: 'Ben Levis',
  coachField: 'Management',
  company: 'Google',
  price: 60,
  imageUrl: 'https://www.freepnglogos.com/uploads/man-png/man-your-company-formations-formation-registrations-10.png'
}, {
  id: '7',
  fullName: 'Emma Milton',
  coachField: 'Nutrition',
  company: 'Google',
  price: 40,
  imageUrl: 'https://www.g20.org/wp-content/uploads/2021/01/people.jpg'
}];

var coachesCompanyOwnerMock = [{
  id: '8',
  name: 'August',
  coaches: [{ name: 'Brent Foster', enrolled: 3 }, { name: 'Phillip Pena', enrolled: 15 }, { name: 'Veronica Casey', enrolled: 2 }, { name: 'Sara Dean', enrolled: 5 }, { name: 'John Brown', enrolled: 1 }]
}, {
  id: '9',
  name: 'September',
  coaches: [{ name: 'Veronica Casey', enrolled: 8 }, { name: 'Phillip Pena', enrolled: 4 }, { name: 'John Brown', enrolled: 3 }, { name: 'Sara Dean', enrolled: 9 }]
}, {
  id: '10',
  name: 'October',
  coaches: [{ name: 'Sara Dean', enrolled: 9 }, { name: 'Brent Foster', enrolled: 1 }, { name: 'John Brown', enrolled: 3 }]
}];

var coaches = [];

export var getAllCoaches = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(coach) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', axios.get(OWN_API_URL + 'getAll', { headers: { Authorization: 'Bearer ' + token } }, { coach: coach }).then(function (response) {
              coaches = [];
              response.data.map(function (x) {
                return coaches.push(x);
              });
              return coaches;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getAllCoaches(_x) {
    return _ref.apply(this, arguments);
  };
}();

export var getCoaches = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(currentPage) {
    var arr;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arr = [];

            arr.push.apply(arr, initialCoachesMock);
            // .slice(0, currentPage * numberCoachesToShow + numberCoachesToShow));
            return _context2.abrupt('return', arr);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function getCoaches(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

export var getCoachesNames = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(currentPage) {
    var arr;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            arr = [];

            initialCoachesMock.map(function (c) {
              var objectReturn = { label: c.fullName, value: c.id };
              arr.push(objectReturn);
            });
            // .slice(0, currentPage * numberCoachesToShow + numberCoachesToShow));
            return _context3.abrupt('return', arr);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function getCoachesNames(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

export var getActiveCoachesCompanyOwner = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(uId) {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            getAllCoaches();
            return _context4.abrupt('return', coaches.length);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function getActiveCoachesCompanyOwner(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

export var getCoachesSessionsForCompanyOwner = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(uId, currentPage, currentMount) {
    var mount, arr;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mount = coachesCompanyOwnerMock.filter(function (m) {
              return m.id == currentMount;
            })[0];
            arr = mount.coaches.slice(0, currentPage * numberCoachesSessionsToShow + numberCoachesSessionsToShow);
            return _context5.abrupt('return', [mount.name, arr]);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  return function getCoachesSessionsForCompanyOwner(_x5, _x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';
import EmployeeEmailInfo from './EmployeeEmailInfo/EmployeeEmailInfo';
import AddEmployeePopup from './AddEmployee/AddEmployee';

import './Employees.css';

export default function Employees() {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      addEmployeePopup = _useState2[0],
      setAddEmployeePopup = _useState2[1];

  return React.createElement(
    'div',
    { className: 'content w-100 main-content' },
    React.createElement(EmployeeEmailInfo, { onAddEmployee: setAddEmployeePopup }),
    React.createElement(AddEmployeePopup, { trigger: addEmployeePopup, onAddEmployee: setAddEmployeePopup })
  );
}
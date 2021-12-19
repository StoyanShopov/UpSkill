var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoachesCatalog from '../Coaches/CoachesCatalog/CoachesCatalog';

import './Coaches.css';

import { getCoaches } from '../../services/coachService';

export default function Coaches() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      coaches = _useState2[0],
      setCoaches = _useState2[1];

  useEffect(function () {
    getCoaches(0).then(function (coaches) {
      setCoaches(coaches);
    });
  }, []);

  return React.createElement(
    'div',
    { className: 'content' },
    React.createElement(CategoriesAndLanguageMenu, { atPage: 'Coaches' }),
    React.createElement(
      'div',
      { className: 'wrapper row' },
      React.createElement(CoachesCatalog, { coaches: coaches })
    )
  );
}
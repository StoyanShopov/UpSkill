var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import CoachesCard from '../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card';
import RemovePopup from '../../../Shared/RemovePopup/RemovePopup';

import './CompanyCoaches.css';

import { getCoaches } from "../../../../services/coachService";
import { disableBodyScroll } from '../../../../utils/utils';

export default function CoachList() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      coaches = _useState2[0],
      setCoaches = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      onRemove = _useState4[0],
      setOnRemove = _useState4[1];

  var initialPageCoaches = 0;

  useEffect(function () {
    getCoaches(initialPageCoaches).then(function (coaches) {
      setCoaches(coaches);
    });
  }, []);

  function setOnRemoveInternal() {
    setOnRemove(true);
    var buttonElements = document.getElementsByClassName('companyOwner-cardBtn');
    var imageElements = document.getElementsByClassName('coaches-image');
    imageElements[0].style.position = "inherit";
    imageElements[1].style.position = "inherit";
    imageElements[2].style.position = "inherit";
    buttonElements[0].style.position = "inherit";
    disableBodyScroll();
  }

  return React.createElement(
    'div',
    { className: 'content main-content' },
    React.createElement(RemovePopup, { trigger: onRemove, onRemove: setOnRemove, atPage: 'coaches' }),
    React.createElement(
      'div',
      { className: 'buttonContainer' },
      ' ',
      React.createElement('input', { type: 'button', className: 'btn btn-outline-primary px-4 m-4', value: 'Add' })
    ),
    React.createElement(
      'div',
      { className: 'coachesContainer' },
      coaches.map(function (coach) {
        return React.createElement(
          CoachesCard,
          {
            key: coach.id,
            coachDetails: coach,
            displaySession: false,
            displayPrice: true
          },
          React.createElement(
            Button,
            { className: 'cardButton companyOwner-cardBtn', onClick: function onClick(e) {
                return setOnRemoveInternal();
              } },
            'Remove'
          )
        );
      })
    )
  );
}
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Image } from 'react-bootstrap';

import './CompanyOwnerSidebar.css';

import companyOwnerBadgePic from '../../../../assets/companyOwnerBadge-Pic.png';

var SCREEN_HEIGHT = window.innerHeight;

export default function CompanyOwnerSidebar(_ref) {
  var menuItems = _ref.menuItems;

  var history = useHistory();
  var location = useLocation();
  var pathname = location.pathname;

  var splitLocation = pathname.split("/");
  var selectedMenuName = history.location.pathname.substring(1, history.location.pathname.length);

  return React.createElement(
    'div',
    { className: 'sidebar-content companyOwner' },
    React.createElement(
      'div',
      { className: 'companyOwner-Badge' },
      React.createElement(Image, { src: companyOwnerBadgePic })
    ),
    React.createElement(
      'div',
      { className: 'companyOwner-photo' },
      React.createElement(Image, {
        style: { width: '4.5rem', height: '4.5rem', display: 'inline-flex' },
        roundedCircle: true,
        src: 'https://us.123rf.com/450wm/pressmaster/pressmaster1601/pressmaster160100574/51254490-serious-businessman-with-laptop-working-in-office.jpg?ver=6'
      }),
      React.createElement(
        'div',
        { style: { display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' } },
        React.createElement(
          'span',
          { style: { display: 'block', verticalAlign: 'middle' } },
          'Company Owner'
        ),
        React.createElement(
          'span',
          { style: { display: 'block' } },
          'Motion Software'
        )
      )
    ),
    React.createElement(
      'div',
      { style: { textAlign: 'start' } },
      menuItems.map(function (menuItem) {
        return React.createElement(
          NavLink,
          {
            to: menuItem.path,
            key: menuItem.path,
            style: { textDecoration: 'none' },
            className: splitLocation[2] === '' + menuItem.name ? 'active' : '',
            exact: menuItem.exact
          },
          React.createElement(
            'span',
            { className: 'nonSelectedMenuStyle' },
            menuItem.name
          )
        );
      }),
      React.createElement(
        NavLink,
        { to: '/Logout', className: 'nav-link logOut' },
        'Log Out'
      )
    )
  );
}
import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Image } from 'react-bootstrap';

import './EmployeeSidebar.css';

import UserProfilePic from '../../../../assets/userProfilePic.png';;

export default function EmployeeSidebar(_ref) {
  var menuItems = _ref.menuItems;

  var history = useHistory();
  var location = useLocation();
  var pathname = location.pathname;

  var splitLocation = pathname.split("/");
  var selectedMenuName = history.location.pathname.substring(1, history.location.pathname.length);

  return React.createElement(
    'div',
    { className: 'sidebar-content employee pt-5' },
    React.createElement(
      'div',
      { className: 'employee-photo mt-3' },
      React.createElement(Image, {
        style: { width: '4.5rem', height: '4.5rem', display: 'inline-flex' },
        roundedCircle: true,
        src: UserProfilePic
      }),
      React.createElement(
        'div',
        { style: { display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' } },
        React.createElement(
          'span',
          { style: { display: 'block', verticalAlign: 'middle' } },
          'Employee'
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
            { className: menuItem.name === 'Log Out' ? 'logOut' : 'nonSelectedMenuStyle' },
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
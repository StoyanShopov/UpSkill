import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Image } from 'react-bootstrap';

import './EmployeeSidebar.css';

import companyOwnerBadgePic from '../../../assets/companyOwnerBadge-Pic.png'; 
import UserProfilePic from '../../../assets/userProfilePic.png';;

export default function EmployeeSidebar({ menuItems }) {
  let history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const selectedMenuName = history.location.pathname.substring(
    1,
    history.location.pathname.length
  );

  return (
      <div className="sidebar-content employee"  >
        <div className="employee-Badge">
          <Image src={companyOwnerBadgePic}/>
          </div>
        <div className="employee-photo">
          <Image
            style={{ width: '4.5rem', height: '4.5rem', display: 'inline-flex' }}
            roundedCircle={true}
            src={UserProfilePic}
          />
          <div style={{ display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' }}>
            <span style={{ display: 'block', verticalAlign: 'middle' }}>Employee</span> 
            <span style={{ display: 'block' }}>Motion Software</span>
          </div>
        </div>
        <div style={{ textAlign: 'start' }}>
          {menuItems.map((menuItem) => (
            <NavLink
              to={menuItem.path}
              key={menuItem.path}
              style={{ textDecoration: 'none' }}
              className={splitLocation[2] === `${menuItem.name}` ? `active` : ''}
              exact={menuItem.exact}
            >
              <span className={menuItem.name==='Log Out'? 'logOut' : 'nonSelectedMenuStyle'}>
                {menuItem.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
  );
}

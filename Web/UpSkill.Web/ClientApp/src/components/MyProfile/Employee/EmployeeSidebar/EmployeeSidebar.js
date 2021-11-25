import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';

import { getEmployee } from '../../../../services/employeeService';

import './EmployeeSidebar.css';

import UserProfilePic from '../../../../assets/userProfilePic.png';

export default function EmployeeSidebar({ menuItems }) {
  const [user, setUser] = useState({});
  let history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const selectedMenuName = history.location.pathname.substring(
    1,
    history.location.pathname.length
  );

  useEffect(() => { 
    getEmployee()
    .then((u) => {
      setUser(u);  
    });
  }, []);

  const onClickHandler = () => {
    console.log('Clicked');
  };

  return (
    <div className="sidebar-content employee pt-5">
      <div className="employee-photo mt-3">
        <Image
          style={{ width: '4.5rem', height: '4.5rem', display: 'inline-flex' }}
          roundedCircle={true}
          src={UserProfilePic}
          onClick={onClickHandler}
        />
        <div
          style={{
            display: 'inline-block',
            marginLeft: '15px',
            marginTop: '.5rem',
          }}
        >
          <span
            style={{ display: 'block', verticalAlign: 'middle' }}
            onClick={onClickHandler}
          >
            {`${user.firstName} ${user.lastName}`}
          </span>
          <span style={{ display: 'block' }} onClick={onClickHandler}>
            {user.companyName}
          </span>
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
            <span
              className={
                menuItem.name === 'Log Out' ? 'logOut' : 'nonSelectedMenuStyle'
              }
            >
              {menuItem.name}
            </span>
          </NavLink>
        ))}
        <NavLink to="/Logout" className="nav-link logOut">
          Log Out
        </NavLink>
      </div>
    </div>
  );
}

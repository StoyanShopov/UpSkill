import { useHistory } from 'react-router';
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Image } from 'react-bootstrap';

import './AdminCompanyOwnerSidebar.css';

import companyOwnerBadgePic from '../../../assets/companyOwnerBadge-Pic.png';

const SCREEN_HEIGHT = window.innerHeight;

export default function CompanyOwnerSidebar({ menuItems }) {
  let history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const selectedMenuName = history.location.pathname.substring(
    1,
    history.location.pathname.length
  );

  return (
      <div className="sidebar-content companyOwner"  >
        <div className="companyOwner-Badge">
          <Image src={companyOwnerBadgePic}/>
          </div>
        <div className="companyOwner-photo">
          <Image
            style={{ width: '4.5rem', height: '4.5rem', display: 'inline-flex' }}
            roundedCircle={true}
            src="https://us.123rf.com/450wm/pressmaster/pressmaster1601/pressmaster160100574/51254490-serious-businessman-with-laptop-working-in-office.jpg?ver=6"
          />
          <div style={{ display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' }}>
            <span style={{ display: 'block', verticalAlign: 'middle' }}>Company Owner</span>
            <span style={{ display: 'block', color: 'blue' }}>Motion Software</span>
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
              <span className='nonSelectedMenuStyle'>
                {menuItem.name}
              </span>
            </NavLink>
          ))}
          <NavLink to="/Logout" className="nav-link logOut">Log Out</NavLink>
        </div>
      </div>
  );
}

import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react';
import { Image } from 'react-bootstrap';

import './CompanyOwnerSidebar.css';

import companyOwnerBadgePic from '../../../assets/companyOwnerBadge-Pic.png';

const SCREEN_HEIGHT = window.innerHeight;

// eslint-disable-next-line import/no-anonymous-default-export
export default function CompanyOwnerSidebar({ menuItems }) {
  let history = useHistory();
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
            <span style={{ display: 'block' }}>Motion Software</span>
          </div>
        </div>
        <div style={{ textAlign: 'start' }}>
          {menuItems.map((menuItem) => (
            <Link
              to={menuItem.path}
              key={menuItem.path}
              style={{ textDecoration: 'none' }}
            >
              <span className="nonSelectedMenuStyle">
                {menuItem.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
  );
}

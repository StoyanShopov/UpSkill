import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import React from 'react';

import './Rescources.css';

export default function Resources({ items }) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
      <div className="sidebar-content employee pt-5">        
          <div style={{ display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' }}>
            <span style={{ display: 'block', verticalAlign: 'middle' }}>Lectures</span> 
            <span style={{ display: 'block' }}>Motion Software</span>
          </div>
        <div style={{ textAlign: 'start' }}>
          {items.map((recources) => (
            <NavLink
              to={recources.path}
              key={recources.path}
              style={{ textDecoration: 'none' }}
              className={splitLocation[2] === `${recources.name}` ? `active` : ''}
              exact={recources.exact}
            >
            </NavLink>
          ))}
          <span className="btn-view-more">View More</span>
        </div>
      </div>
  );
}

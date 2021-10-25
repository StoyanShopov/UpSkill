import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import EmployeeSidebar from './EmployeeSidebar/EmployeeSidebar';  
import Courses from './Courses/Courses'; 
import CompanyCoaches from '../CompanyOwnerViews/CompanyCoaches/CompanyCoaches'; 

import './Employee.css';

const menuItems = [
  { name: 'Dashboard', path: '/MyProfile', exact: true, component: Courses }, 
  { name: 'Courses', path: '/MyProfile/Courses', exact: true, component: Courses },
  { name: 'Coaches', path: '/MyProfile/Coaches', exact: true, component: CompanyCoaches }, 
  { name: 'Grades', path: '/MyProfile/Grades', exact: true, component: Courses },
  { name: 'Log Out', path: '/LogOut', exact: true, component: Courses },
];

export default function Employee() { 

  return (
    <>
      <div className="full-width myProfileFullWidth">        
      <div className="myProfileBottomBg">
        <div className="myProfileBottomBg-content container myProfile-content d-flex">
          <div className="sidebarBg"></div>
          <div className="employeeRoot"></div>
        </div>
      </div>
        <div className="d-flex container myProfile-content">
          <Router>
            <EmployeeSidebar menuItems={menuItems} />
            <div id="employeeRoot"> 
              {
                menuItems.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                    class={route.class}                    
                  />                 
                ))
              }
            </div>
          </Router>
        </div>        
      </div>
    </>
  );
}

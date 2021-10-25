import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import CompanyOwnerSidebar from "../Shared/AdminCompanyOwnerSidebar/AdminCompanyOwnerSidebar";
import CompanyCoaches from "./CompanyCoaches/CompanyCoaches";
import Employees from "./Employees/Employees";
import Invoice from "./Invoice/Invoice";
import Dashboard from "./Dashboard/Dashboard";

import './CompanyOwner.css';

const menuItems = [
  { name: 'Dashboard', path: '/MyProfile', exact: true, component: Dashboard },
  { name: 'Courses', path: '/MyProfile/Courses', exact: true, component: CompanyCoaches },
  { name: 'Coaches', path: '/MyProfile/Coaches', exact: true, component: CompanyCoaches },
  { name: 'Employees', path: '/MyProfile/Employees', exact: true, component: Employees },
  { name: 'Invoice', path: '/MyProfile/Invoice', exact: true, component: Invoice },
  { name: 'Log Out', path: '/LogOut', exact: true, component: CompanyCoaches },
];


export default function CompanyOwner() {


  return (
    <>
      <div className="full-width myProfileFullWidth">        
      <div className="myProfileBottomBg">
        <div className="myProfileBottomBg-content container myProfile-content d-flex">
          <div className="sidebarBg"></div>
          <div className="companyOwnerRoot"></div>
        </div>
      </div>
        <div className="d-flex container myProfile-content">
          <Router>
            <CompanyOwnerSidebar menuItems={menuItems} />
            <div id="companyOwnerRoot">
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

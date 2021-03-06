import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import CompanyOwnerSidebar from "../../Shared/AdminCompanyOwnerSidebar/AdminCompanyOwnerSidebar";
import CompanyCoaches from "./CompanyCoaches/CompanyCoaches";
import CompanyOwnerCourses from "./Courses/CompanyCourses";
import Employees from "./Employees/Employees";
import Invoice from "./Invoice/Invoice";
import Dashboard from "./Dashboard/Dashboard";

import "./CompanyOwner.css";

const menuItems = [
  { name: "Dashboard", path: "/MyProfile", exact: true, component: Dashboard },
  {
    name: "Active Courses",
    path: "/MyProfile/Courses",
    exact: true,
    component: CompanyOwnerCourses,
  },
  {
    name: " Active Coaches",
    path: "/MyProfile/Coaches",
    exact: true,
    component: CompanyCoaches,
  },
  {
    name: "Employees",
    path: "/MyProfile/Employees",
    exact: true,
    component: Employees,
  },
  {
    name: "Invoice",
    path: "/MyProfile/Invoice",
    exact: true,
    component: Invoice,
  },
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
              {menuItems.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                />
              ))}
            </div>
          </Router>
        </div>
      </div>
    </>
  );
}

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Clients from "./Clients/Clients";
import Revenue from "./Revenue/Revenue";
import CompanyCoaches from "../MyProfile/CompanyOwnerViews/CompanyCoaches/CompanyCoaches"; 
import CompanyOwnerSidebar from "../Shared/AdminCompanyOwnerSidebar/AdminCompanyOwnerSidebar";
import AdminCourses from "./Courses/AdminCourses/AdminCourses";

const menuItems = [
  { name: 'Courses', path: '/Admin/Courses', exact: true, component: AdminCourses },
  { name: 'Dashboard', path: '/Admin', exact: true, component: Dashboard },
  { name: 'Clients', path: '/Admin/Clients', exact: true, component: Clients },
  { name: 'Revenue', path: '/Admin/Revenue', exact: true, component: Revenue },
];

export default function Admin() {

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

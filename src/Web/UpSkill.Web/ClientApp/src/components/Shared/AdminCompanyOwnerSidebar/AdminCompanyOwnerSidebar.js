import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { Image } from "react-bootstrap";

import "./AdminCompanyOwnerSidebar.css";

import { CHECK_CURRENT_STATE } from "../../../actions/types";

import companyOwnerBadgePic from "../../../assets/companyOwnerBadge-Pic.png";

const SCREEN_HEIGHT = window.innerHeight;

export default function CompanyOwnerSidebar({ menuItems }) {
  let history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { store } = useContext(ReactReduxContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const selectedMenuName = history.location.pathname.substring(
    1,
    history.location.pathname.length
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CHECK_CURRENT_STATE,
    });

    var {
      isLoggedIn,
      isCompanyOwner,
      isEmployee,
      isAdmin,
    } = store.getState().auth;

    setIsLoggedIn(isLoggedIn);
    setIsCompanyOwner(isCompanyOwner);
    setIsEmployee(isEmployee);
    setIsAdmin(isAdmin);
  }, []);

  function loggedUserName() {
    if (isAdmin) {
      return "Ivan Dimitrov";
    }
    return "Company Owner";
  }

  function loggedUserDashboardImage() {
    if (isAdmin) {
      return (
        <div className="admin-image-name">
          <span className="name-letter">I</span>
        </div>
      );
    }
    return (
      <Image
        style={{ width: "4.5rem", height: "4.5rem", display: "inline-flex" }}
        roundedCircle={true}
        src="https://us.123rf.com/450wm/pressmaster/pressmaster1601/pressmaster160100574/51254490-serious-businessman-with-laptop-working-in-office.jpg?ver=6"
      />
    );
  }
  return (
    <div className="sidebar-content companyOwner">
      <div className="companyOwner-Badge">
        <Image src={companyOwnerBadgePic} />
      </div>
      <div className="companyOwner-photo">
        {loggedUserDashboardImage()}
        <div
          style={{
            display: "inline-block",
            marginLeft: "15px",
            marginTop: ".5rem",
          }}
        >
          <span style={{ display: "block", verticalAlign: "middle" }}>
            {loggedUserName()}
          </span>
          <span style={{ display: "block", color: "blue" }}>
            Motion Software
          </span>
        </div>
      </div>
      <div style={{ textAlign: "start" }}>
        {menuItems.map((menuItem) => (
          <NavLink
            to={menuItem.path}
            key={menuItem.path}
            style={{ textDecoration: "none" }}
            className={splitLocation[2] === `${menuItem.name}` ? `active` : ""}
            exact={menuItem.exact}
          >
            <span className="nonSelectedMenuStyle">{menuItem.name}</span>
          </NavLink>
        ))}
        <NavLink to="/Logout" className="nav-link logOut">
          Log Out
        </NavLink>
      </div>
    </div>
  );
}

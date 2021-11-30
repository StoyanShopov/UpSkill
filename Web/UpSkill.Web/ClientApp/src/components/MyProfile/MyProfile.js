import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactReduxContext } from "react-redux";

import { useDispatch } from 'react-redux'

import CompanyOwner from "./CompanyOwnerViews/CompanyOwner";
import Employee from "./Employee/Employee";
import Admin from "../Admin/Admin";

import { REFRESH_TOKEN } from "../../actions/types";

function MyProfile() {
  const { store } = useContext(ReactReduxContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: REFRESH_TOKEN
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

    console.log(isLoggedIn);
    console.log("isCompanyOwner: "+isCompanyOwner);
    console.log("isAdmin: "+isAdmin);
  }, []);

  if (isCompanyOwner) {
    return <CompanyOwner />;
  } else if (isEmployee) return <Employee />;
  //Probably the admin will acces his area from here too
  else if (isAdmin)
    return  <Admin />;
       
  else
    return (
      <div className="container p-5 text-center vh-70">
        <h2 className="py-5">
          Please <Link to="/Login">Login</Link> or{" "}
          <Link to="/Register">Sign Up</Link> first
        </h2>
      </div>
    );
}

export default MyProfile;

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactReduxContext } from "react-redux";

import { history } from "../../helpers/history";

import CompanyOwner from "./CompanyOwnerViews/CompanyOwner";
import Employee from "./Employee/Employee";

function MyProfile() {
  const { store } = useContext(ReactReduxContext);
  var {
    isLoggedIn,
    isCompanyOwner,
    isEmployee,
    isAdmin,
  } = store.getState().auth;

  useEffect(() => {
    if (!isLoggedIn) history.push("/");
  }, []);

  if (isCompanyOwner) {
    return <CompanyOwner />;
  } else if (isEmployee) return <Employee />;
  //Probably the admin will access his area from here too
  else if (isAdmin)
    return (
      <div className="container p-5 text-center">
        <h2>Admin Dashboard here?</h2>
      </div>
    );
  //     return <Admin />;
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

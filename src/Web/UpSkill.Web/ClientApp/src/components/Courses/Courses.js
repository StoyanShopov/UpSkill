import React, { useEffect, useContext, useState } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import CategoriesAndLanguageMenu from "../CategoriesAndLanguageMenu/categoryAndLanguageMenu";
import CoursesCatalog from "./CoursesCatalog/CoursesCatalog";
import AdminCourses from "../Admin/Courses/AdminCourses/AdminCourses";
import OwnerCoursesCatalog from "./OwnerCoursesCatalog/OwnerCoursesCatalog";
import { CHECK_CURRENT_STATE } from "../../actions/types";
import CoursesIntroBar from "../Admin/Courses/AdminCourses/CoursesIntroBar/CoursesIntroBar";

import "./Courses.css";

export default function Courses() {
  const { store } = useContext(ReactReduxContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

    console.log(isLoggedIn);
    console.log("isCompanyOwner: " + isCompanyOwner);
    console.log("isAdmin: " + isAdmin);
  }, []);

  const returnCatalog = () => {
    if (isCompanyOwner) {
      return <OwnerCoursesCatalog />;
    }
    return <CoursesCatalog />;
  };
  if (isAdmin) {
    return (
      <div className="content">
        <CoursesIntroBar />
        <div className="wrapper row">
          <AdminCourses />
        </div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <CategoriesAndLanguageMenu atPage="Courses" />
        <div className="wrapper1 row">{returnCatalog()}</div>
      </div>
    );
  }
}

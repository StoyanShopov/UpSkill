import React, { useEffect, useContext, useState } from 'react';
import { ReactReduxContext, useDispatch } from 'react-redux';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCatalog from './CoursesCatalog/CoursesCatalog';
import AdminCourses from '../Admin/Courses/AdminCourses/AdminCourses';
import OwnerCoursesCatalog from './OwnerCoursesCatalog/OwnerCoursesCatalog';
import { CHECK_CURRENT_STATE } from '../../actions/types';
import CoursesIntroBar from '../Admin/Courses/AdminCourses/CoursesIntroBar/CoursesIntroBar';
import { getFilteredCourses } from '../../services/courseService';

import './Courses.css';

export default function Courses() {
  const { store } = useContext(ReactReduxContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [languagesChosen, setLanguages] = useState([]);
  const [categoriesChosen, setCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CHECK_CURRENT_STATE,
    });

    var { isLoggedIn, isCompanyOwner, isEmployee, isAdmin } =
      store.getState().auth;

    setIsLoggedIn(isLoggedIn);
    setIsCompanyOwner(isCompanyOwner);
    setIsEmployee(isEmployee);
    setIsAdmin(isAdmin);

    console.log(isLoggedIn);
    console.log('isCompanyOwner: ' + isCompanyOwner);
    console.log('isAdmin: ' + isAdmin);
  }, []);

  useEffect(() => {
    getFilteredCourses(filterArr).then((courses) => {
      setCourses(courses);
    });
  }, [filterArr]);

  function handleChange(e, atForm) {
    let currentValues =
      e.target.parentElement.parentElement.parentElement.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

    let arr = [];
    currentValues.forEach((el) => {
      arr.push(el.value);
    });

    setFilterArr(arr);

    atForm === 'categories'
      ? setCategories(currentValues)
      : setLanguages(currentValues);
  }

  const returnCatalog = () => {
    if (isCompanyOwner) {
      return <OwnerCoursesCatalog />;
    }
    return <CoursesCatalog courses={courses} />;
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
        <CategoriesAndLanguageMenu
          atPage="Courses"
          handleChange={handleChange}
        />
        <div className="wrapper row">{returnCatalog()}</div>
      </div>
    );
  }
}

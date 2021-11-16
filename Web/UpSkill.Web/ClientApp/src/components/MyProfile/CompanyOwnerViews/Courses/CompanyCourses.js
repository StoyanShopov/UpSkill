import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AvailableCourses from './AvailableCourses'

import CoursesCatalog from './CoursesCatalog/CoursesCatalog';
import serviceActions from '../../../../services/ownerCoursesService'

import './CompanyCourses.css';

export default function CompanyOwnerCourses() {
  const [courses, setCourses] = useState([]);

  useEffect((courses) => {
    serviceActions.getCourses()
      .then((courses) => {
        setCourses(courses);
      });
  }, [courses]);

  return (
    <>
      <div>
        <div id='btn'>
          <Link to='/AvailableCourses'>Manage</Link>
        </div>
        <div className="wrapper">
          <CoursesCatalog courses={courses} />
        </div>
      </div>
    </>
  );
}

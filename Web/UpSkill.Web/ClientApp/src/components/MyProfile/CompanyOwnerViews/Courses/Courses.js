import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import CoursesCatalog from './CoursesCatalog/CoursesCatalog';
import serviceActions from '../../../../services/ownerCoursesService'

import './Courses.css';

export default function CompanyOwnerCourses() {
  const [courses, setCourses] = useState([]);

  const getAvailableCourses = () => {
    serviceActions.getAvailableCourses();
  }

  const enableCourse = () => {
    serviceActions.enableCourse();
  }

  useEffect(() => {
    serviceActions.getCourses()
      .then((courses) => {
        setCourses(courses);
        console.log(courses);
      });
  }, []);

  return (
    <>
      <div >
        <div id='btn'>
          <Button onClick={getAvailableCourses()}>Manage</Button>
        </div>
        <div className="wrapper">
          <CoursesCatalog courses={courses} />
        </div>
      </div>
    </>
  );
}

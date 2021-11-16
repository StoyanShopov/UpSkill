import React, { useState, useEffect } from 'react';

import CoursesCatalog from './CoursesCatalog/CoursesCatalog';
import serviceActions from '../../../../services/ownerCoursesService'

import './CompanyCourses.css';

export default function AvailableCourses() {
  const [courses, setCourses] = useState([]);

  useEffect((courses) => {
    serviceActions.getAvailableCourses()
      .then((courses) => {
        setCourses(courses);
      });
  }, [courses]);

  return (
    <>
      <div>
        <div className="wrapper">
          <CoursesCatalog courses={courses} />
        </div>
      </div>
    </>
  );
}

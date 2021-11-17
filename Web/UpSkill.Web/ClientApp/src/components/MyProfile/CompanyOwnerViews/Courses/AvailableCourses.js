import React, { useState, useEffect } from 'react';

import CoursesCatalog from './CoursesCatalog/CoursesCatalog';
import serviceActions from '../../../../services/ownerCoursesService'

import './OwnerCompanyCourses.css';

export default function AvailableCourses() {
  const [courses, setCourses] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect((courses) => {
    serviceActions.getAvailableCourses()
      .then((courses) => {
        setCourses(courses);
        setFlag(true);
      });
  }, [courses]);

  return (
    <>
      <div>
        <div className="wrapper">
          <CoursesCatalog courses={courses} flag={flag} />
        </div>
      </div>
    </>
  );
}

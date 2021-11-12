import React, { useState, useEffect } from 'react'; 

import CoursesCatalog from './CoursesCatalog/CoursesCatalog'; 
import serviceActions from '../../../../services/ownerCoursesService'

import './Courses.css';

export default function CompanyOwnerCourses() {  
  const[courses, setCourses] = useState([]); 

  useEffect(() => { 
    serviceActions.getActiveCourses()
    .then((courses) => {
      setCourses(courses);  
    });
  }, []); 
  
  return (
    <div className="content">
      <div className="wrapper row">
        <CoursesCatalog courses={courses} />  
      </div>
    </div>
  );
}

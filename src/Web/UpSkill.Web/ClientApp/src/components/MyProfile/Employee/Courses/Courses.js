import React, { useState, useEffect } from 'react'; 

import CoursesCatalog from './CoursesCatalog'; 
import { getCourses } from '../../../../services/employeeService'; 

import './Courses.css';

export default function Courses() {  
  const[courses, setCourses] = useState([]); 

  useEffect(() => { 
    getCourses()
    .then((courses) => {
      setCourses(courses);  
    });
  }, []); 
  
  return (
    <div className="content">
      <div className="employee-profile-wrapper-courseCatalog">
        <CoursesCatalog />  
      </div>
    </div>
  );
}

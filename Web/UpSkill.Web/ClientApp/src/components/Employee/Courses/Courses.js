import React, { useState, useEffect } from 'react'; 

import CoursesCatalog from '../Courses/CoursesCatalog/CoursesCatalog'; 
import { getCourses } from '../../../services/employeeService'; 

import './Courses.css';

export default function Courses() {  
  const[courses, setCourses] = useState([]); 

  useEffect(() => { 
    getCourses().then((courses) => {
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

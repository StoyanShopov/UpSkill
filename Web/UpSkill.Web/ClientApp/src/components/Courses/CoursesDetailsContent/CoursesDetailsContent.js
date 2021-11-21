import React, { createContext ,useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';

import Details from './Content/Details/Details';
import SidebarResources from './Content/SidebarResources/SidebarResources';

export const CourseContentContext = createContext();

const CoursesDetailsContent = (id) => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    courseDetailsContent(id)
    .then((course) => {
      setCourse(course);
    });
  }, []);

  console.log(course);

    return (
      <CourseContentContext.Provider value={
        {course}
      }>
        <div className="container">
          <Details />
          <SidebarResources />
        </div>
      </CourseContentContext.Provider>      
    );
}

export default CoursesDetailsContent;

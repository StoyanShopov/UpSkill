import React, { createContext ,useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';
import Content from './Content/Content';

import './CoursesDetailsContent.css';

export const CourseContextDetailsContent = createContext();

const CoursesDetailsContent = () => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    courseDetailsContent()
    .then((course) => {
      setCourse(course);
    });
  }, []);

    return (
      <CourseContextDetailsContent.Provider value={
        {course, setCourse}
      }>
        <div className="content">
          <div className="wrapper row">
            <Content />                
          </div>
      </div>  
      </CourseContextDetailsContent.Provider>
    );
}

export default CoursesDetailsContent;

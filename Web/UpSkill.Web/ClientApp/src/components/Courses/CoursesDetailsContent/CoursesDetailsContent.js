import React, { useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';
import Content from './Content/Content';

import './CoursesDetailsContent.css';

const CoursesDetailsContent = () => {
  const [course, setCourse] = useState("");

  useEffect(() => {
    courseDetailsContent()
    .then((course) => {
      setCourse(course);
    });
  }, []);

    return (
      <div className="content">
        <div className="wrapper row">
          <Content course={course}/>                
        </div>
      </div>
    );
}

export default CoursesDetailsContent;

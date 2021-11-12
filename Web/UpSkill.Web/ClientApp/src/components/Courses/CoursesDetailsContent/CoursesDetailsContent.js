import React, { useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';
import Content from './Content/Content';

import './CoursesDetailsContent.css';

const CoursesDetailsContent = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    courseDetailsContent()
    .then((course) => {
      setCourse(course);
    });
  }, []);

    return (
      <>
        <Content course={course} />             
      </>      
    );
}

export default CoursesDetailsContent;

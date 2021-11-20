import React, { useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';

import Content from './Content/Content';

const CoursesDetailsContent = () => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    courseDetailsContent()
    .then((course) => {
      setCourse(course);
    });
  }, []);

    return (
      <div className="container">
      <Content course={course} />   
      </div>              
    );
}

export default CoursesDetailsContent;

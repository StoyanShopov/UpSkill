import React, { createContext ,useState, useEffect } from 'react';

import { courseDetailsContent } from '../../../services/courseService';
import Content from './Content/Content';

export const CourseContentContext = createContext();

const CoursesDetailsContent = (props) => {
  const [course, setCourse] = useState([]);
  const courseId = props.match.params.id

  useEffect(() => {
    courseDetailsContent(courseId)
    .then((course) => {
      setCourse(course);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [courseId]);

    return (
        <div className="container">
          <Content course={course}/>
        </div>  
    );
}

export default CoursesDetailsContent;

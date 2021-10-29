import { useState, useEffect } from 'react';
import CourseCard from './CourseCard/CourseCard';

import './CoursesCatalog.css';

import { getCourses } from '../../../services/courseService';

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(0).then((courses) => {
      setCourses(courses);
    });
  }, []);

  const defineCoursesCount = () => {
      let coursesCount = courses.length % 3;

      if (coursesCount !== 0) {
        return true;
      }
      
      return false;
  }

  return (
    <>
      <div className="container courseCatalogContainer">
        <div className="row courses-list">
          {courses.map((course) => (
            <div className="col-md-3 text-align-center" style={{ marginLeft: 1}}
               key={course.id}>
              <CourseCard 
                key={course.id}
                courseName={course.courseName}
                coachName={course.coachName}
                imageName={course.imageName}
                price={course.price}
              ></CourseCard>
            </div>
          ))}
          { defineCoursesCount() && (<div className="alignContentBox"></div>) }
        </div>
      </div>
    </>
  );
}

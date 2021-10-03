import { useState, useEffect } from 'react';
import CoursesCard from './CoursesCard/CoursesCard';

import './CoursesCatalog.css';

import { getCourses } from '../../../services/courseService';

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(0).then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row list-unstyled coaches-list">
          {courses.map((course) => (
            <div className="col-sm-4 text-align-center" key={course.id}>
              <CoursesCard
                key={course.id}
                courseName={course.courseName}
                coachName={course.coachName}
              ></CoursesCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

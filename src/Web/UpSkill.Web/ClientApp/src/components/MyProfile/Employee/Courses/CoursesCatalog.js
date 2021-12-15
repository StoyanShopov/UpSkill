import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {getCourses} from "../../../../services/employeeService";
import CoursesCard from "../../CompanyOwnerViews/Courses/CoursesCatalog/CoursesCard/CoursesCard";


export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);

  // const disableCourse = (courseId, e) => {
  //   e.preventDefault();
  //   serviceActions.disableCourse(courseId).then(() =>
  //     serviceActions.getCourses().then((courses) => {
  //       setCourses(courses);
  //     })
  //   );
  // };
  useEffect(() => {
    getCourses().then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <div className="container">
      <div className="row list-unstyled myProfile-courses-list">
        {courses.map((course) => (
          <div className="col-sm-5 text-align-center" key={course.id}>
            <CoursesCard key={course.id} coursesDetails={course}>
              <Button
                className="button"
                
              >
                <p className="cardButtonText">Remove</p>
              </Button>
            </CoursesCard>
          </div>
        ))}
      </div>
    </div>
  );
}

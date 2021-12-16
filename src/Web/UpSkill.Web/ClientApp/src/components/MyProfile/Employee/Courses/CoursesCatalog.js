import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  getCourses,
  getEnrolledCourses,
  enrollToCourse,
} from "../../../../services/employeeService";
import CoursesCard from "../../CompanyOwnerViews/Courses/CoursesCatalog/CoursesCard/CoursesCard";

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // const disableCourse = (courseId, e) => {
  //   e.preventDefault();
  //   serviceActions.disableCourse(courseId).then(() =>
  //     serviceActions.getCourses().then((courses) => {
  //       setCourses(courses);
  //     })
  //   );
  // };
function enroll(courseId,e){
  e.preventDefault();
  console.log(courseId)
  enrollToCourse(courseId).then(() => {
    getEnrolledCourses().then((courses) => {
      setEnrolledCourses(courses)
    })
  })
}

  function isEnrolled(courseId,) {    
    if (enrolledCourses) {
      let contains = false;
      enrolledCourses.map((c) => {
        if (c.id === courseId) {
          contains = true;
        }
      }); 
      return contains;
    } else {
      return false;
    }
  }

  function buttonToshow(courseId) {
    if (isEnrolled(courseId)) {
      return (
        <a href={`/Course/${courseId}`}>
          <Button className="button">
            <p className="cardButtonText">Continue</p>
          </Button>
        </a>
      );
    } else {
      return (
        <Button className="button">
          <p className="cardButtonText" onClick={(e) => enroll(courseId, e)}>Enroll</p>
        </Button>
      );
    }
  }

  useEffect(() => {
    getCourses().then((courses) => {
      setCourses(courses);
    });

    getEnrolledCourses().then((enrolledCourses) => {
      setEnrolledCourses(enrolledCourses);
    });
  }, []);

  return (
    <div className="container">
      <div className="row list-unstyled myProfile-courses-list">        
        {courses.map((course) => (
          <div className="col-sm-5 text-align-center" key={course.id}>
            <CoursesCard key={course.id} coursesDetails={course} isActive={isEnrolled(course.id)}>
              {buttonToshow(course.id)}
            </CoursesCard>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import serviceActions from "../../../../../services/ownerCoursesService";
import CoursesCard from "./CoursesCard/CoursesCard";
import {
  enableBodyScroll,
  disableBodyScroll,
} from "../../../../../utils/utils";
import DetailsModal from "../../../../Shared/CourseDetails/DetailsModal";
import "./OwnerCoursesCatalog.css";

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const setData = (data) => {
    let { id, fullName, courseTitle, courseDescription } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", fullName);
    localStorage.setItem("Title", courseTitle);
    localStorage.setItem("Description", courseDescription);
  };

  const checkPopUp = () => {
    if (isDetailsOpen) {
      disableBodyScroll();
    } else {
      localStorage.removeItem("ID");
      localStorage.removeItem("FullName");
      localStorage.removeItem("Title");
      localStorage.removeItem("Description");
      enableBodyScroll();
    }
  };

  const getValue = (course) => {
    setData(course);
  };

  const disableCourse = (courseId, e) => {
    e.preventDefault();
    serviceActions.disableCourse(courseId).then(() =>
      serviceActions.getCourses().then((courses) => {
        setCourses(courses);
      })
    );
  };
  useEffect(() => {
    serviceActions.getCourses().then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <div className="container">
      <div className="row list-unstyled myProfile-courses-list">
        {courses.map((course) => (
          <div className="col-sm-5 text-align-center" key={course.id}>
            <CoursesCard
              key={course.id}
              coursesDetails={course}
              closeMoadal={setIsDetailsOpen}
              getDetails={getValue}
            >
              <Button
                className="button"
                onClick={(e) => disableCourse(course.id, e)}
              >
                <p className="cardButtonText">Remove</p>
              </Button>
            </CoursesCard>
          </div>
        ))}
      </div>
      {checkPopUp()}
      {isDetailsOpen && (
        <DetailsModal closeModal={setIsDetailsOpen} inProfile={true}>
          <button className="btn btn-primary">Enroll</button>
        </DetailsModal>
      )}
    </div>
  );
}

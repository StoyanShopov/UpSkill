import { useState, useEffect } from "react";
import CoursesCard from "./CoursesCard/CoursesCard";
import { getCourseDetails } from "../../../services/courseService";
import DetailsModal from "../../Shared/CourseDetails/DetailsModal";
import "./CoursesCatalog.css";
import { getCourses } from "../../../services/courseService";
import { enableBodyScroll, disableBodyScroll } from "../../../utils/utils";

const descriptionMock =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. ";

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  // const [courseId, setCourseId] = useState("");

  const setData = (data) => {
    let { id, coachName, courseName } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", coachName);
    // localStorage.setItem("CategoryName", categoryName);
    localStorage.setItem("Title", courseName);
    // localStorage.setItem("CategoryId", categoryId);
    // localStorage.setItem("CoachId", coachId);
    // localStorage.setItem("Price", price);
    localStorage.setItem("Description", descriptionMock);
  };

  const checkPopUp = () => {
    if (isDetailsOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  };

  const getValue = (course) => {
    setData(course);
  };

  useEffect(() => {
    getCourses(1).then((courses) => {
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
                id={course.id}
                courseName={course.courseName}
                coachName={course.coachName}
                imageName={course.imageName}
                isDetailsOpen={setIsDetailsOpen}
                getDetails={getValue}
              ></CoursesCard>
            </div>
          ))}
        </div>
      </div>
      {checkPopUp()}
      {isDetailsOpen && (
        <DetailsModal closeModal={setIsDetailsOpen}>
          <button className="btn btn-primary">Enroll</button>
        </DetailsModal>
      )}
    </>
  );
}

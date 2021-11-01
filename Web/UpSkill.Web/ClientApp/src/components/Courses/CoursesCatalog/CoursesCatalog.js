import { useState, useEffect } from "react";
import DetailsModal from "../../Shared/CourseDetails/DetailsModal";
import "./CoursesCatalog.css";
import { getCourses } from "../../../services/courseService";
import { enableBodyScroll, disableBodyScroll } from "../../../utils/utils";
import CourseCard from './CourseCard/CourseCard';


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

  const defineCoursesCount = () => {
      let coursesCount = courses.length % 3;

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
                id={course.id}
                courseName={course.courseName}
                coachName={course.coachName}
                imageName={course.imageName}
                isDetailsOpen={setIsDetailsOpen}
                getDetails={getValue}
                price={course.price}
              ></CourseCard>

            </div>
          ))}
          { defineCoursesCount() && (<div className="alignContentBox"></div>) }
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

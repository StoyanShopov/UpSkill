import { useState, useEffect } from "react";
import DetailsModal from "../../Shared/CourseDetails/DetailsModal";
import { getCourses } from "../../../services/courseService";
import { enableBodyScroll, disableBodyScroll } from "../../../utils/utils";
import CourseCard from '../CoursesCatalog/CourseCard/CourseCard';
import serviceActions from '../../../services/ownerCoursesService';


const descriptionMock =
  " Ilee Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. ";

export default function OwnerCoursesCatalog() {
  const [courses, setCourses] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); 

  const setData = (data) => {
    let { id, fullName, courseTitle, description } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", fullName);
    localStorage.setItem("Title", courseTitle);   
    localStorage.setItem("Description", description);
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
    serviceActions.getCourses().then((courses) => {
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
                id={course.id}
                courseTitle={course.courseTitle}
                coachFirstName={course.courseCoachFirstName}
                coachLastName={course.courseCoachLastName}
                filePath={course.courseFileFilePath}
                description={course.courseDescription}
                isDetailsOpen={setIsDetailsOpen}
                getDetails={getValue}
                price={course.coursePrice}
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

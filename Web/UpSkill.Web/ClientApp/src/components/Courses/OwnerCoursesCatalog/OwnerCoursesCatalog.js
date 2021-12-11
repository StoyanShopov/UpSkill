import { useState, useEffect } from "react";
import DetailsModal from "../../Shared/CourseDetails/DetailsModal";
import { getCourses } from "../../../services/courseService";
import { enableBodyScroll, disableBodyScroll } from "../../../utils/utils";
import CourseCard from "../CoursesCatalog/CourseCard/CourseCard";
import serviceActions from "../../../services/ownerCoursesService";
import { Button } from "react-bootstrap";
import ConfirmDelete from "../../Shared/ConfirmDelete/ConfirmDelete";
import "./OwnerCoursesCatalog.css";

const descriptionMock =
  " Ilee Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. ";

export default function OwnerCoursesCatalog() {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onDelete = (id) => {
    serviceActions
      .disableCourse(id)
      .then(() =>
        serviceActions.getCourses().then((courses) => setCourses(courses))
      );
    setOpenDelete(false);
  };
  const setData = (data) => {
    let { id, fullName, courseTitle, description } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", fullName);
    localStorage.setItem("Title", courseTitle);
    localStorage.setItem("Description", description);
  };

  const checkCompanyHasCourse = (course) => {
    if (courses) {
      let contains = false;
      courses.map((c) => {
        if (c.id == course.id) {
          contains = true;
        }
      });
      return contains;
    } else {
      return false;
    }
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

  useEffect(() => {
    getCourses(currentPage).then((courses) => {
      setAllCourses(courses);
    });
  }, [courses, currentPage]);

  const defineCoursesCount = () => {
    let coursesCount = allCourses.length % 3;

    if (coursesCount !== 0) {
      return true;
    }

    return false;
  };

  function setOnRemoveInternal(id) {
    setCourseId(id);
    setOpenDelete(true);
    disableBodyScroll();
  }

  function addCourseToCompany(courseId) {
    serviceActions.enableCourse(courseId).then(() => {
      serviceActions.getCourses().then((courses) => setCourses(courses));
    });
  }

  function viewMoreCourses() {
    setCurrentPage(currentPage + 1);
  }

  const buttonToShow = (checkCompanyHasCourse, courseId) => {
    if (checkCompanyHasCourse) {
      return (
        <Button
          className="button row col-md-4"
          onClick={() => setOnRemoveInternal(courseId)}
        >
          <p className="cardButtonText">Remove</p>
        </Button>
      );
    } else {
      return (
        <Button
          className="button row col-md-4"
          onClick={(e) => addCourseToCompany(courseId)}
        >
          <p className="cardButtonText">Add</p>
        </Button>
      );
    }
  };

  return (
    <>
      <div className="container courseCatalogContainer">
        <div className="row courses-list">
          {allCourses.map((course) => (
            <div
              className="col-md-3 text-align-center"
              style={{ marginLeft: 1 }}
              key={course.id}
            >
              <CourseCard
                key={course.id}
                id={course.id}
                courseTitle={course.title}
                coachFirstName={course.coachFirstName}
                coachLastName={course.coachLastName}
                filePath={course.fileFilePath}
                description={course.description}
                isDetailsOpen={setIsDetailsOpen}
                categoryName={course.categoryName}
                getDetails={getValue}
                price={course.price}
                isInCompany={checkCompanyHasCourse(course)}
              >
                {buttonToShow(checkCompanyHasCourse(course), course.id)}
              </CourseCard>
              {openDelete && (
                <ConfirmDelete
                  deleteItem={onDelete}
                  closeModal={setOpenDelete}
                  itemName="course"
                  id={courseId}
                ></ConfirmDelete>
              )}
            </div>
          ))}
          {defineCoursesCount() && <div className="alignContentBox"></div>}
        </div>
        <div className="viewmore-wrapper">
          <div
            className="btn btn-outline-primary viewmore-button"
            onClick={() => viewMoreCourses()}
          >
            <p className="cardButtonText">View More</p>
          </div>
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

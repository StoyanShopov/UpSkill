import { useState, useEffect } from 'react';
import DetailsModal from '../../Shared/CourseDetails/DetailsModal';
import './CoursesCatalog.css';
import { getCourses } from '../../../services/courseService';
import { enableBodyScroll, disableBodyScroll } from '../../../utils/utils';
import CourseCard from './CourseCard/CourseCard';
import { Button } from 'react-bootstrap';
import ViewMoreButton from '../../Shared/ViewMoreCoursesCoachesButton/ViewMoreButton';

export default function CoursesCatalog({ courses }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const setData = (data) => {
    let { id, fullName, courseTitle, description } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('FullName', fullName);
    localStorage.setItem('Title', courseTitle);
    localStorage.setItem('Description', description);
  };

  const checkPopUp = () => {
    if (isDetailsOpen) {
      disableBodyScroll();
    } else {
      localStorage.removeItem('ID');
      localStorage.removeItem('FullName');
      localStorage.removeItem('Title');
      localStorage.removeItem('Description');
      enableBodyScroll();
    }
  };

  const getValue = (course) => {
    setData(course);
  };

  const defineCoursesCount = () => {
    let coursesCount = courses.length % 3;

    if (coursesCount !== 0) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="container courseCatalogContainer">
        <div className="row courses-list">
          {courses.map((course) => (
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
              >
                <Button
                  className="button row col-md-4"
                  // onClick={(e) => addCoachToCompany(coachId)}
                >
                  <p className="cardButtonText">Add</p>
                </Button>
              </CourseCard>
            </div>
          ))}
          {defineCoursesCount() && <div className="alignContentBox"></div>}
        </div>
        <ViewMoreButton
          thisPage={currentPage}
          setThisPage={setCurrentPage}
        ></ViewMoreButton>
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

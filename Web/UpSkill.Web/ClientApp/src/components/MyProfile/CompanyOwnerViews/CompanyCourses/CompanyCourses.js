import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


import RemovePopup from '../../../Shared/RemovePopup/RemovePopup';

import '../CompanyCoaches/CompanyCoaches.css';

import  serviceActions  from '../../../../services/ownerCoursesService';
import { disableBodyScroll } from '../../../../utils/utils';


export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const [onRemove, setOnRemove] = useState(false);
  const initialPageCourses = 0;

  useEffect(() => {
    serviceActions.getActiveCourses(initialPageCourses)
      .then(courses => {
        setCourses(courses);
      });
  }, []);

  function setOnRemoveInternal() {
    setOnRemove(true);
    let buttonElements = document.getElementsByClassName('companyOwner-cardBtn');
    let imageElements = document.getElementsByClassName('coaches-image');
    imageElements[0].style.position = "inherit";
    imageElements[1].style.position = "inherit";
    imageElements[2].style.position = "inherit";
    buttonElements[0].style.position = "inherit";    
    disableBodyScroll();
  }

  return (
    <div className="content main-content">
      <RemovePopup trigger={onRemove} onRemove={setOnRemove} atPage="coaches"/>
      <div className={'buttonContainer'}>
        {' '}
        <input type="button" className="btn btn-outline-primary px-4 m-4" value="Add" />
      </div>
      <div className="coachesContainer">
        {/* {courses.map((coach) => (
          <CoursesCard
            key={course.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
          >
            <Button className="cardButton companyOwner-cardBtn" onClick={e => setOnRemoveInternal()}>Remove</Button>
          </CoursesCard>
        ))} */}
      </div>
    </div>
  );
}

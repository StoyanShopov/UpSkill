import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import AdminCoursesCard from '../../../Admin/Courses/AdminCourseCard/AdminCourseCard';
import { getCourses } from '../../../../services/adminCourseService';


import '../CompanyCoaches/CompanyCoaches.css';

import serviceActions from '../../../../services/ownerCoursesService';
import { disableBodyScroll } from '../../../../utils/utils';


export default function CoursesList() {
  const [courses, setCourses] = useState([]);

  const getData = () => {
    serviceActions.getActiveCourses('ownerMotionSoftware@test.test')
    .then((courses) => {
      console.log(courses);
      setCourses(courses);
    });
  };

  useEffect(() => {
    serviceActions.getActiveCourses('ownerMotionSoftware@test.test')
    .then((courses) => {
      console.log(courses);

      setCourses(courses);
    });
  }, []);

  return (
    <div className="content main-content" >
      <Button onClick={getData()}>Manage</Button>
      <div className="row">
        {/* {courses.map((course) => (
          <div className="col-6 text-align-center ">
            <AdminCoursesCard
              key={course.id}
              id={course.id}
              courseDetails={course}
              displayPrice={true}
            >
              <button
                className="btn btn-primary ml-2"
              >
                Delete
              </button>
            </AdminCoursesCard>
          </div>
        ))} */}
      </div>
    </div>
  );
}

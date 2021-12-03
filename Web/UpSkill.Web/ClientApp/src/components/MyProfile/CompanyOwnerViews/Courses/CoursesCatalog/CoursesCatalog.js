import React from 'react';
import { Button } from 'react-bootstrap';
import serviceActions from '../../../../../services/ownerCoursesService';
import CoursesCard from './CoursesCard/CoursesCard';
import './OwnerCoursesCatalog.css';

export default function CoursesCatalog({ courses }) {

    const disableCourse = (courseId, e) => {
        e.preventDefault();
        serviceActions.disableCourse(courseId);
    }
    return (
        <div className="container">
            <div className="row list-unstyled myProfile-courses-list">
                {courses.map((course) => (
                    <div className="col-sm-5 text-align-center" key={course.id}>
                        <CoursesCard
                            key={course.id}
                            coursesDetails={course}
                        >
                            <Button className="courses-cardButton" onClick={(e) => disableCourse(course.id,e)}>Remove</Button>
                        </CoursesCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React from 'react';

import './OwnerCoursesCard.css';
import googleImg from '../../../../../../assets/img/courses/google.png';

export default function CoursesCard(props) {
    const {
        coursesDetails: { courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath, coursePrice },
    } = props;

    const fullName = courseCoachFirstName + ' ' + courseCoachLastName;

    return (
        <div className="coursesCard">
            <div className="courses-file-wrapper">
                <img src={courseFileFilePath} className="courses-file" alt=""></img>
                <h2 className="title-position-on-file">{courseTitle}</h2>
            </div>
            <div className="courses-content w-75">
                <div className="coursesInfo d-flex justify-content-between mt-3">
                    <span className="courses-courseField">{courseTitle}</span>
                    <span className="price">{coursePrice}$ per person</span>
                    <div>
                        <img src={googleImg} alt="Google" className="bage-position" />
                    </div>
                    <span className="courses-fullName">{fullName}</span>
                </div>
            </div>
            <div className="btn-wrapper">
                {props.children}
            </div>
        </div>
    );
}

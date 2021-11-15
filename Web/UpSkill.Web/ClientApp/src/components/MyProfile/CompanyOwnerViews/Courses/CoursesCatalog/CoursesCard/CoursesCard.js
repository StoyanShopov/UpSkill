import React from 'react';

import googleImg from '../../../../../../assets/img/courses/google.png';

export default function CoursesCard(props) {
    const {
        coursesDetails: { courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath },   
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
                    <span className="courses-fullName">{fullName}</span> 
                    <h6> 
                        <img src={googleImg} alt="Google" className="bage-position"/>  
                    </h6>
                </div>
            </div>
            <div className="btn-wrapper">
                {props.children}
            </div>
        </div>
    );
} 

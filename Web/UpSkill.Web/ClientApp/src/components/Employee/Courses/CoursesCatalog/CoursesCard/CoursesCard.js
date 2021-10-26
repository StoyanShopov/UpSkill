import React from 'react';

import './CoursesCard.css';
import googleImg from '../../../../../assets/img/courses/google.png';

export default function CoursesCard(props) {
    const {
        coursesDetails: { title, coachFirstName, coachLastName , imageUrl },   
    } = props;     

    const fullName = coachFirstName + ' ' + coachLastName;

    return ( 
        <div className="coursesCard"> 
            <div className="courses-image-wrapper"> 
                <img src={imageUrl} className="courses-image" alt=""></img>    
                <h2 className="title-position-on-image">{title}</h2>
            </div>
            <div className="courses-content w-75">
                <div className="coursesInfo d-flex justify-content-between mt-3"> 
                    <span className="courses-courseField">{title}</span>  
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

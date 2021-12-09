import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "./OwnerCoursesCard.css";
import GoogleLogo from "../../../../../../assets/img/courses/Image 2.png";

function CourseCard(props) {
    const { id, courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath, coursePrice, companyLogo, isDetailsOpen, getDetails  } = 
    props.coursesDetails;
  
        return (
            <div className="ownerCardContainer">
                <div className="coursesImageWrapper1">
                    <div className="coursesImage" 
                    /* onClick = {() => {
                         isDetailsOpen(true);
                         getDetails({ id, courseTitle });
                        }} 
                    */ 
                    >
                        <img src={ courseFileFilePath } alt="courses" style={{ width: 450, height: 248 }} />
                    </div>
                        <span className="courseImageTitle">{ courseTitle }</span>
                </div>
                <div className="ownerCardBody row">
                    <div className="cardText col-md-5">
                        <p id="course">{ courseTitle }</p>
                    </div>
                    
                    <div className="col-md-5">
                        <p id="name">{ courseCoachFirstName } { courseCoachLastName }</p>
                    </div>
            
                    <div className="row">
                        <div className="cardText col-md-6">
                            <p id="price">{ coursePrice }€ per person</p>
                        </div>
                
                        <div className="logo col-md-6">
                            <img src={ GoogleLogo } alt="logo" />
                        </div>
                    </div>
                </div>
                <Button className="button row col-md-4">
                    <p className="cardButtonText">Enroll</p>
                </Button>
            </div>
        );
    }

export default CourseCard;

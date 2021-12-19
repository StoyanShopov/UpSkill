import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "./OwnerCoursesCard.css";
import GoogleLogo from "../../../../../../assets/img/courses/Image 2.png";

function CourseCard(props) {
  const {
    id,
    courseTitle,
    courseCoachFirstName,
    courseCoachLastName,
    courseFileFilePath,
    coursePrice,
    courseDescription,
    companyLogo,
  } = props.coursesDetails;

  const fullName = courseCoachFirstName + " " + courseCoachLastName;

  const setCourseCardBackGround = () => {
    if (props.isActive) {
      return "ownerCardContainer blueCard";
    }
    return "ownerCardContainer";
  };

  return (
    <div className={setCourseCardBackGround()}>
      {console.log(props.coursesDetails)}
      <div
        className="coursesImageWrapper"
        onClick={() => {
          props.closeMoadal(true);
          props.getDetails({ id, fullName, courseTitle, courseDescription });
        }}
      >
        <div className="coursesImage">
          <img
            src={courseFileFilePath}
            alt="courses"
            style={{ width: 450, height: 248 }}
          />
        </div>
        <span className="courseImageTitle">{courseTitle.split(" ")[0]}</span>
      </div>
      <div className="ownerCardBody row">
        <div className="myprofile-course-cardText col-md-5">
          <p id="myprofile-course">{courseTitle}</p>
        </div>

        <div className="col-md-5">
          <p id="myprofile-name">
            {courseCoachFirstName} {courseCoachLastName}
          </p>
        </div>

        <div className="row">
          <div className="myprofile-course-cardText col-md-6">
            <p id="myprofile-price">{coursePrice}€ per person</p>
          </div>

          <div className="logo col-md-6">
            <img src={GoogleLogo} alt="logo" />
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default CourseCard;

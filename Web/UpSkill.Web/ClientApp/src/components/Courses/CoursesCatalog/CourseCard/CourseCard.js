import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "./CourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

function CourseCard(props) {
  const {
    id,
    courseTitle,
    coachFirstName,
    coachLastName,
    filePath,
    price,
    isDetailsOpen,
    getDetails,
    description,
    categoryName,
    isInCompany,
  } = props;

  const fullName = coachFirstName + " " + coachLastName;

  const setCourseCardBackGround = () => {
    if (isInCompany) {
      return "cardContainer blueCard";
    }
    return "cardContainer";
  };

  const sliceCourseTitle = (title) => {
    if (title.length > 20) {
      var titleShort = title.slice(0, 20) + "...";
      return titleShort;
    }

    return title;
  };

  return (
    <div className={setCourseCardBackGround()}>
      <div
        className="image"
        onClick={() => {
          isDetailsOpen(true);
          getDetails({ id, courseTitle, fullName, description });
        }}
      >
        <img src={filePath} alt="courses" style={{ width: 450, height: 248 }} />
        <span className="coursescatalog-image-title">{categoryName}</span>
      </div>
      <div className="cardBody row">
        <div className="coursecatalog-title cardText col-md-5">
          <p id="course" alt={courseTitle}>
            {sliceCourseTitle(courseTitle)}
          </p>
        </div>

        <div className="col-md-5">
          <p id="name">{fullName}</p>
        </div>

        <div className="row">
          <div className="cardText col-md-6">
            <p className="course-price" id="price">
              {price}€ per person
            </p>
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

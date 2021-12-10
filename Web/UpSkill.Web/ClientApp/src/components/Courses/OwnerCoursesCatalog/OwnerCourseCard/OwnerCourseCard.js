import React from "react";

import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

export default function AdminCoursesCard(props) {
  const { id,courseTitle, coachFirstName, coachLastName,filePath, price, isDetailsOpen, getDetails, description, categoryName } = props;


  return (
    <div className="courses-Card">
      <div className="courses-image-wrapper">
        <img src={filePath} className="courses-image" alt="text"></img>
        <span className="courses-image-title">
          <b>{categoryName}</b>
        </span>
      </div>
      <div className="courses-content">
        <div className="courseInfo">
          <span
            className="courses-Field" 
            onClick={() => {
              props.isDetailsOpen(true);
            }}
          >
            {courseTitle}
          </span>
          <span className="courses-coachPrice">{price}€ per person</span>
        </div>
        <div className="companyAndPriceInfo" style={{marginRight: "20px"}}>
          <span className="coursesfullName">
            {coachFirstName} {coachLastName}
          </span>
          <h6 className="course-logo">
            <img src={GoogleLogo} alt="logo"></img>
          </h6>
        </div>
      </div>
      <div className="admin-course-btn-wrapper">{props.children}</div>
    </div>
  );
}





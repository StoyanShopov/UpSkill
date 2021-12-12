import React from "react";
import "./AdminCourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

export default function AdminCoursesCard(props) {
  const {
    courseDetails: {
      id,
      title,
      coachFirstName,
      coachLastName,
      price,
      categoryName,
      fileFilePath,
    },
  } = props;

  return (
    <div className="courses-Card">
      <div className="courses-image-wrapper">
        <img src={fileFilePath} className="courses-image" alt="text"></img>
        <span className="courses-image-title">
          <b>{categoryName}</b>
        </span>
        <div className="edit-course-img-wrp mt-0">
          <div
            className="edit-course-img"
            onClick={(e) => props.openEdit(props.courseDetails)}
          ></div>
        </div>
      </div>
      <div className="courses-content">
        <div className="courseInfo">
          <span
            className="courses-Field"
            onClick={() => {
              props.getClickedValue(props.courseDetails);
            }}
          >
            {title}
          </span>
          <span className="courses-coachPrice">{price}€ per person</span>
        </div>
        <div className="companyAndPriceInfo">
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

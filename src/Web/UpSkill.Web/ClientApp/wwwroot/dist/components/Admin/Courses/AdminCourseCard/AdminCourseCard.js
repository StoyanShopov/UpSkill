import React from "react";
import "./AdminCourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

export default function AdminCoursesCard(props) {
  var _props$courseDetails = props.courseDetails,
      id = _props$courseDetails.id,
      title = _props$courseDetails.title,
      coachName = _props$courseDetails.coachName,
      price = _props$courseDetails.price,
      categoryName = _props$courseDetails.categoryName;


  return React.createElement(
    "div",
    { className: "courses-Card" },
    React.createElement(
      "div",
      {
        className: "courses-image-wrapper",
        onClick: function onClick() {
          props.getClickedValue(props.courseDetails);
        }
      },
      React.createElement(
        "span",
        { className: "courses-image-title" },
        React.createElement(
          "b",
          null,
          categoryName
        )
      )
    ),
    React.createElement(
      "div",
      { className: "courses-content d-flex justify-content-between w-75 pt-3" },
      React.createElement(
        "div",
        { className: "courseInfo" },
        React.createElement(
          "span",
          { className: "courses-Field" },
          title
        ),
        React.createElement(
          "span",
          { className: "courses-coachPrice" },
          price,
          "\u20AC per person"
        )
      ),
      React.createElement(
        "div",
        { className: "companyAndPriceInfo" },
        React.createElement(
          "span",
          { className: "coursesfullName" },
          coachName
        ),
        React.createElement(
          "h6",
          { className: "course-logo" },
          React.createElement("img", { src: GoogleLogo, alt: "logo" })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "btn-wrapper" },
      props.children
    )
  );
}
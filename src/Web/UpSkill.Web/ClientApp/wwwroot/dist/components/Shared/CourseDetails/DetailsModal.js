var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
import UserProfilePic from "../../../assets/userProfilePic.png";
import GoogleLogo from "../../../assets/img/courses/Image 39.png";
import "./DetailsModal.css";

function DetailsModal(props) {
  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      coachName = _useState4[0],
      setCoachName = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      description = _useState6[0],
      setDescription = _useState6[1];

  var closeModal = props.closeModal;


  useEffect(function () {
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Title"));
    setCoachName(localStorage.getItem("FullName"));
  }, []);

  return React.createElement(
    "div",
    { className: "detailsModal-background" },
    React.createElement(
      "div",
      { className: "detailsModal-courses-container" },
      React.createElement(
        "div",
        { className: "detailsModal-courses-header" },
        React.createElement(
          "div",
          { className: "titleCloseBtn" },
          React.createElement(
            "button",
            { className: "the-x-btn", onClick: function onClick() {
                return closeModal(false);
              } },
            "X"
          )
        ),
        React.createElement(
          "div",
          { className: "header-courses-els-container" },
          React.createElement(
            "div",
            { className: "detailsModal-courses-title" },
            React.createElement(
              "h3",
              null,
              title
            )
          ),
          React.createElement(
            "div",
            { className: "row detailsModal-coach-info" },
            React.createElement(
              "div",
              { className: "col-2 detailsModal-courses-img-coach-wrapper" },
              React.createElement("img", {
                src: UserProfilePic,
                alt: "User",
                className: "img-fluid rounded detailsModal-courses-img-coach"
              })
            ),
            React.createElement(
              "div",
              { className: "col-2 detailsModal-courses-coach-name-wrapper" },
              React.createElement(
                "span",
                null,
                "Created by"
              ),
              React.createElement(
                "h3",
                null,
                coachName
              ),
              React.createElement(
                "h6",
                null,
                React.createElement("img", { src: GoogleLogo, alt: "Google logo" })
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "detailsModal-courses-body" },
        React.createElement(
          "h3",
          { className: "course-description-header" },
          "Course Description"
        ),
        React.createElement(
          "div",
          { className: "row detailsModal-courses-description" },
          React.createElement(
            "p",
            null,
            description
          )
        ),
        React.createElement(
          "div",
          { className: "row detailsModal-rating" },
          React.createElement(
            "p",
            { className: "courses-rating-header" },
            React.createElement(
              "b",
              null,
              "Course rating"
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { "class": "d-flex justify-content-between align-items-center" },
              React.createElement(
                "span",
                null,
                " 4.5"
              ),
              React.createElement(
                "div",
                { "class": "ratings" },
                React.createElement("i", { "class": "fa fa-star rating-color" }),
                React.createElement("i", { "class": "fa fa-star rating-color" }),
                React.createElement("i", { "class": "fa fa-star rating-color" }),
                React.createElement("i", { "class": "fa fa-star rating-color" }),
                React.createElement("i", { "class": "fa fa-star" })
              ),
              React.createElement(
                "span",
                { "class": "review-count" },
                "12 Reviews"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "detailsModal-courses-image-course-wrapper" },
          React.createElement("div", { className: "detailsModel-courses-image-course" }),
          React.createElement(
            "div",
            { className: "detailsModel-courses-img-course-body" },
            React.createElement(
              "h4",
              { className: "courses-more-information-header" },
              "What you'll learn"
            ),
            React.createElement(
              "p",
              { className: "courses-more-information" },
              "- Learn more information about Digital Marketing - Improve your time management - Solve problems"
            )
          ),
          React.createElement(
            "div",
            { className: "modal-enroll-btn" },
            props.children
          )
        )
      )
    )
  );
}
export default DetailsModal;
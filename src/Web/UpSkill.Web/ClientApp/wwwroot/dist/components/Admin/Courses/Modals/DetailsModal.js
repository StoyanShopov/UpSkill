var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
import UserProfilePic from "../../../../assets/userProfilePic.png";
import GoogleLogo from "../../../../assets/img/courses/Image 39.png";
import "./DetailsModal.css";

function DetailsModal(_ref) {
  var closeModal = _ref.closeModal;

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

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      price = _useState8[0],
      setPrice = _useState8[1];

  var _useState9 = useState(""),
      _useState10 = _slicedToArray(_useState9, 2),
      category = _useState10[0],
      setCategory = _useState10[1];

  useEffect(function () {
    setPrice(localStorage.getItem("Price"));
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Title"));
    setCategory(localStorage.getItem("CategoryId"));
    setCoachName(localStorage.getItem("FullName"));
  }, []);

  return React.createElement(
    "div",
    { className: "detailsModal-background" },
    React.createElement(
      "div",
      { className: "detailsModal-container" },
      React.createElement(
        "div",
        { className: "detailsModal-header" },
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
          { className: "header-els-container" },
          React.createElement(
            "div",
            { className: "detailsModal-title" },
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
              { className: "col-2 detailsModal-img-coach-wrapper" },
              React.createElement("img", {
                src: UserProfilePic,
                alt: "User",
                className: "img-fluid rounded detailsModal-img-coach"
              })
            ),
            React.createElement(
              "div",
              { className: "col-2 detailsModal-coach-name-wrapper" },
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
          null,
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
            null,
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
          { className: "detailsModal-image-course-wrapper" },
          React.createElement("div", { className: "detailsModel-image-course" }),
          React.createElement(
            "div",
            { className: "detailsModel-img-course-body" },
            React.createElement(
              "h4",
              null,
              "What you'll learn"
            ),
            React.createElement(
              "p",
              null,
              "- Learn more information about Digital Marketing - Improve your time management - Solve problems"
            )
          )
        )
      )
    )
  );
}
export default DetailsModal;
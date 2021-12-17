var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "./CourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

function CourseCard(props) {
  var id = props.id,
      courseName = props.courseName,
      coachName = props.coachName,
      imageName = props.imageName,
      price = props.price,
      companyLogo = props.companyLogo,
      isDetailsOpen = props.isDetailsOpen,
      getDetails = props.getDetails;

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      image = _useState2[0],
      setImage = _useState2[1];

  function loadImage(imgName) {
    import("../../../../assets/img/courses/" + imageName).then(function (img) {
      return setImage(img.default);
    });
  }

  useEffect(function () {
    loadImage(imageName);
  }, []);

  return React.createElement(
    "div",
    { className: "cardContainer" },
    React.createElement(
      "div",
      { className: "image", onClick: function onClick() {
          isDetailsOpen(true);
          getDetails({ id: id, courseName: courseName, coachName: coachName });
        } },
      React.createElement("img", { src: image, alt: "courses", style: { width: 450, height: 248 } })
    ),
    React.createElement(
      "div",
      { className: "cardBody row" },
      React.createElement(
        "div",
        { className: "cardText col-md-5" },
        React.createElement(
          "p",
          { id: "course" },
          courseName
        )
      ),
      React.createElement(
        "div",
        { className: "col-md-5" },
        React.createElement(
          "p",
          { id: "name" },
          coachName
        )
      ),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "cardText col-md-6" },
          React.createElement(
            "p",
            { id: "price" },
            price,
            "\u20AC per person"
          )
        ),
        React.createElement(
          "div",
          { className: "logo col-md-6" },
          React.createElement("img", { src: GoogleLogo, alt: "logo" })
        )
      )
    ),
    React.createElement(
      Button,
      { className: "button row col-md-4" },
      React.createElement(
        "p",
        { className: "cardButtonText" },
        "Enroll"
      )
    )
  );
}

export default CourseCard;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../CreateCourse/CreateCourse.css";
import "./UpdateCourse.css";
import { updateCourses } from "../../../../services/adminCourseService";
import { getCoachesNames } from "../../../../services/coachService";
import { getCategoriesForCourses } from "../../../../services/categoryService";
import Select from "react-select";

var required = function required(value) {
  if (!value) {
    return React.createElement(
      "div",
      { className: "alert alert-danger", role: "alert" },
      "This field is required!"
    );
  }
};

var vPrice = function vPrice(value) {
  if (value < 0) {
    return React.createElement(
      "div",
      { className: "alert alert-danger", role: "alert" },
      "The price can't be a negative number;"
    );
  }
};
var customStyles = {
  control: function control(provided, state) {
    return Object.assign({}, provided, {
      width: "30rem",
      height: "50px",
      border: "2px solid #296cfb",
      opacity: "1",
      marginLeft: "0.5rem",
      marginBottom: "1rem",
      marginTop: "-1.5rem",

      borderRadius: "5px"
    });
  },
  menu: function menu(provided, state) {
    return Object.assign({}, provided, {
      marginLeft: "10px",
      marginTop: "0px"
    });
  }
};
export default function UpdateCourse(_ref) {
  var closeModal = _ref.closeModal;

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      id = _useState2[0],
      setId = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      title = _useState4[0],
      setTitle = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      coachName = _useState6[0],
      setCoachName = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      categoryName = _useState8[0],
      setCategoryName = _useState8[1];

  var _useState9 = useState(""),
      _useState10 = _slicedToArray(_useState9, 2),
      description = _useState10[0],
      setDescription = _useState10[1];

  var _useState11 = useState(0),
      _useState12 = _slicedToArray(_useState11, 2),
      price = _useState12[0],
      setPrice = _useState12[1];

  var _useState13 = useState(""),
      _useState14 = _slicedToArray(_useState13, 2),
      categoryId = _useState14[0],
      setCategoryId = _useState14[1];

  var _useState15 = useState({}),
      _useState16 = _slicedToArray(_useState15, 2),
      errors = _useState16[0],
      setErrors = _useState16[1];

  var _useState17 = useState(0),
      _useState18 = _slicedToArray(_useState17, 2),
      coachId = _useState18[0],
      setCoachId = _useState18[1];

  var _useState19 = useState([]),
      _useState20 = _slicedToArray(_useState19, 2),
      categories = _useState20[0],
      setCategories = _useState20[1];

  var _useState21 = useState({}),
      _useState22 = _slicedToArray(_useState21, 2),
      coaches = _useState22[0],
      setCoaches = _useState22[1];

  var _useState23 = useState(false),
      _useState24 = _slicedToArray(_useState23, 2),
      isSuccess = _useState24[0],
      setIsSuccess = _useState24[1];

  var _useState25 = useState(""),
      _useState26 = _slicedToArray(_useState25, 2),
      success = _useState26[0],
      setSuccess = _useState26[1];

  var handleValidation = function handleValidation() {
    var fields = {
      title: title,
      coachName: coachName,
      description: description,
      price: price,
      categoryName: categoryName
    };
    var errorsValidation = {};
    var formIsValid = true;

    //Title
    if (!fields["title"]) {
      formIsValid = false;
      errorsValidation["title"] = "Cannot be empty";
    }

    //Coach
    if (!fields["coachName"]) {
      formIsValid = false;
      errorsValidation["coachName"] = "Cannot be empty";
    }

    if (!fields["description"] || fields["description"].length < 5) {
      formIsValid = false;
      errorsValidation["description"] = "Cannot be empty or less than 5 characters";
    }

    if (!fields["categoryName"]) {
      formIsValid = false;
      errorsValidation["categoryName"] = "Cannot be empty";
    }

    if (fields["price"] < 0) {
      formIsValid = false;
      errorsValidation["price"] = "Cannot be negative number";
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

  useEffect(function () {
    setId(localStorage.getItem("ID"));
    setCoachId(localStorage.getItem("coachId"));
    setPrice(localStorage.getItem("Price"));
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Title"));
    setCategoryId(localStorage.getItem("CategoryId"));
    setCategoryName(localStorage.getItem("CategoryName"));
    setCoachName(localStorage.getItem("FullName"));
  }, []);

  var onchangeTitle = function onchangeTitle(el) {
    var title = el.target.value;
    setTitle(title);
  };

  var onchangeDescription = function onchangeDescription(el) {
    setDescription(el.target.value);
  };

  var onchangePrice = function onchangePrice(el) {
    setPrice(el.target.value);
  };

  var onchangeCategory = function onchangeCategory(el) {
    setCategoryName(el.label);
    setCategoryId(el.value);
  };

  var onChangeNameSelect = function onChangeNameSelect(el) {
    setCoachId(el.value);
    setCoachName(el.label);
  };

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();

    if (handleValidation()) {
      setIsSuccess(true);
      setSuccess("Submitted successfully");
      var courseReturn = {
        id: id,
        title: title,
        description: description,
        price: price,
        coachId: coachId,
        categoryId: categoryId
        // imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
      };
      console.log(courseReturn);
      updateCourses(courseReturn);
    } else {
      setSuccess("Form has errors.");
    }
  };

  useEffect(function () {
    getCoachesNames().then(function (arr) {
      setCoaches(arr);
    });
  }, []);

  useEffect(function () {
    getCategoriesForCourses().then(function (arr) {
      setCategories(arr);
    });
  }, []);

  return React.createElement(
    "div",
    { className: "update-course-container" },
    React.createElement(
      "div",
      { className: "UpdateCloseBtn" },
      React.createElement(
        "button",
        { className: "update-x-btn", onClick: function onClick() {
            return closeModal(false);
          } },
        "X"
      )
    ),
    React.createElement(
      "div",
      { className: "update-course-header" },
      React.createElement(
        "h1",
        null,
        "Update ",
        title
      )
    ),
    React.createElement(
      "div",
      { className: "update-form-container" },
      isSuccess ? React.createElement(
        "span",
        { style: { color: "green", marginBottom: "1rem" } },
        success
      ) : React.createElement(
        "span",
        { style: { color: "red", marginBottom: "1rem" } },
        success
      ),
      React.createElement(
        Form,
        { onSubmit: handleSubmit },
        React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "title" }),
            React.createElement("input", {
              className: "update-input-style",
              type: "text",
              name: "title",
              placeholder: "Title",
              value: title,
              onChange: onchangeTitle,
              validations: [required]
            }),
            React.createElement(
              "p",
              { style: { color: "red", marginLeft: "15px" } },
              errors["title"]
            )
          ),
          React.createElement(
            "div",
            { className: "form-group", style: { marginBottom: "2rem" } },
            React.createElement("label", { htmlFor: "coachName" }),
            React.createElement(Select, {
              styles: customStyles,
              options: coaches,
              defaultValue: {
                label: "coachName",
                value: ""
              },
              value: { label: coachName, value: coachId },
              onChange: onChangeNameSelect
            }),
            React.createElement(
              "p",
              {
                style: {
                  color: "red",
                  marginLeft: "15px",
                  marginBottom: "-1rem",
                  marginTop: "-1rem"
                }
              },
              errors["coachName"]
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "description" }),
            React.createElement("input", {
              className: "update-input-style",
              type: "text",
              name: "description",
              placeholder: "Description",
              value: description,
              onChange: onchangeDescription,
              validations: [required]
            }),
            React.createElement(
              "p",
              { style: { color: "red", marginLeft: "15px" } },
              errors["description"]
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "price" }),
            React.createElement("input", {
              className: "update-input-style",
              type: "number",
              name: "price",
              placeholder: "Price",
              value: price,
              onChange: onchangePrice,
              validations: [required, vPrice]
            }),
            React.createElement(
              "p",
              { style: { color: "red", marginLeft: "15px" } },
              errors["price"]
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("label", { htmlFor: "category" }),
            React.createElement(Select, {
              maxMenuHeight: 180,
              styles: customStyles,
              options: categories,
              defaultValue: {
                label: "Category",
                value: ""
              },
              value: { label: categoryName, value: categoryId },
              onChange: onchangeCategory
            }),
            React.createElement(
              "span",
              { style: { color: "red", marginLeft: "15px" } },
              errors["category"]
            )
          ),
          React.createElement(
            "div",
            { className: "btn-update-course-container" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                {
                  className: "btn btn-outline-primary cancel-button",
                  onClick: function onClick() {
                    return closeModal(false);
                  }
                },
                "Cancel"
              ),
              React.createElement("input", {
                className: "btn btn-primary submit-button",
                type: "submit"
              })
            )
          )
        )
      )
    )
  );
}
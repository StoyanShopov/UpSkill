var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import "./CreateCourse.css";
import { addCourses } from "../../../../services/adminCourseService";
import { getCoachesNames } from "../../../../services/coachService";
import { getCategoriesForCourses } from "../../../../services/categoryService";
import Select from "react-select";

var customStyles = {
  control: function control(provided, state) {
    return Object.assign({}, provided, {
      width: "30rem",
      height: "3rem",
      border: "2px solid #296cfb",
      opacity: "1",
      margin: "0.5rem",
      borderRadius: "5px"
    });
  },
  menu: function menu(provided, state) {
    return Object.assign({}, provided, {
      // marginLeft: "1rem",
      marginTop: "0px"
    });
  }
};

export default function CreateCourse(_ref) {
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
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");


  var _useState11 = useState(""),
      _useState12 = _slicedToArray(_useState11, 2),
      success = _useState12[0],
      setSuccess = _useState12[1];

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      isSuccess = _useState14[0],
      setIsSuccess = _useState14[1];

  var _useState15 = useState({}),
      _useState16 = _slicedToArray(_useState15, 2),
      coaches = _useState16[0],
      setCoaches = _useState16[1];

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
      errors = _useState22[0],
      setErrors = _useState22[1];

  var handleValidation = function handleValidation() {
    var fields = {
      title: title,
      coachName: coachName,
      description: description,
      price: price,
      category: category
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

    if (!fields["category"]) {
      formIsValid = false;
      errorsValidation["category"] = "Cannot be empty";
    }

    if (fields["price"] < 0) {
      formIsValid = false;
      errorsValidation["price"] = "Cannot be negative number";
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

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
    console.log(el.value);
    setCategory(el.value);
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
        title: title,
        description: description,
        price: price,
        coachId: coachId,
        categoryId: category
        // imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
      };
      addCourses(courseReturn).then(function () {
        setTitle("");
        setCoachName("");
        setDescription("");
        setPrice(0);
        setCategory("");
      });
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
    { className: "create-course-container" },
    React.createElement(
      "div",
      { className: "CreateCloseBtn" },
      React.createElement(
        "button",
        { className: "the-xbtn", onClick: function onClick() {
            return closeModal(false);
          } },
        "X"
      )
    ),
    React.createElement(
      "div",
      { className: "form-container" },
      React.createElement(
        "h1",
        { style: { marginBottom: "2rem" } },
        "Add Course"
      ),
      isSuccess ? React.createElement(
        "span",
        { style: { color: "green", marginBottom: "0px" } },
        success
      ) : React.createElement(
        "span",
        { style: { color: "red", marginBottom: "0px" } },
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
              className: "input-style",
              type: "text",
              name: "title",
              placeholder: "Title",
              value: title,
              onChange: onchangeTitle
            })
          ),
          React.createElement(
            "p",
            { style: { color: "red", marginLeft: "15px" } },
            errors["title"]
          ),
          React.createElement(
            "div",
            { className: "form-group", style: { marginBottom: "-0.5rem" } },
            React.createElement("label", { htmlFor: "coachName" }),
            React.createElement(
              "div",
              { style: { marginBottom: "1rem", marginTop: "-40px" } },
              React.createElement(Select, {
                styles: customStyles,
                options: coaches,
                defaultValue: {
                  label: "Coach Name",
                  value: String(coachName)
                }
                // Value={{ label: String(coachName), value: String(coachName) }}
                , placeholder: "CoachName",
                onChange: onChangeNameSelect
              }),
              React.createElement(
                "p",
                { style: { color: "red", marginLeft: "15px" } },
                errors["coachName"]
              )
            )
          ),
          React.createElement(
            "div",
            { className: "form-group", style: { marginBottom: "-1rem" } },
            React.createElement("label", { htmlFor: "description" }),
            React.createElement("input", {
              className: "input-style",
              type: "text",
              name: "description",
              placeholder: "Description",
              value: description,
              onChange: onchangeDescription
            }),
            React.createElement(
              "p",
              { style: { color: "red", marginLeft: "15px" } },
              errors["description"]
            )
          ),
          React.createElement(
            "div",
            { className: "form-group", style: { marginBottom: "-1rem" } },
            React.createElement("label", { htmlFor: "price" }),
            React.createElement("input", {
              className: "input-style",
              type: "number",
              name: "price",
              placeholder: "Price",
              value: price,
              onChange: onchangePrice
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
            React.createElement(
              "div",
              { style: { marginBottom: "1rem", marginTop: "-20px" } },
              React.createElement(Select, {
                maxMenuHeight: 180,
                styles: customStyles,
                options: categories,
                defaultValue: {
                  label: "Category",
                  value: ""
                }
                // Value={{ label: String(coachName), value: String(coachName) }}
                , placeholder: "Category",
                onChange: onchangeCategory
              }),
              React.createElement(
                "p",
                { style: { color: "red", marginLeft: "15px" } },
                errors["category"]
              )
            )
          ),
          React.createElement(
            "div",
            { className: "btn-createcourse-container" },
            React.createElement("input", {
              className: "btn-custom",
              onClick: handleSubmit,
              type: "submit"
            })
          )
        )
      )
    )
  );
}
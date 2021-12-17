var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState, useEffect } from "react";
import AdminCoursesCard from "../AdminCourseCard/AdminCourseCard";
import { getCourses, getCoursesDb, deleteCourses } from "../../../../services/adminCourseService";
import "./AdminCourses.css";
import DetailsModal from "../Modals/DetailsModal";
import CreateCourseModal from "../Modals/CreateCourseModal/CreateCourseModal";
import UpdateCourseModal from "../Modals/UpdateCourseModal/UpdateCourseModal";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import { enableBodyScroll, disableBodyScroll } from "../../../../utils/utils";

export default function AdminCourses() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      courses = _useState2[0],
      setCourses = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      openModal = _useState4[0],
      setOpenModal = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      openCreateCourse = _useState6[0],
      setOpenCreateCourse = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      openUpdateCourse = _useState8[0],
      setOpenUpdateCourse = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      openDelete = _useState10[0],
      setOpenDelete = _useState10[1];

  var setData = function setData(data) {
    var id = data.id,
        title = data.title,
        coachName = data.coachName,
        coachId = data.coachId,
        categoryName = data.categoryName,
        description = data.description,
        categoryId = data.categoryId,
        price = data.price;

    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", coachName);
    localStorage.setItem("CategoryName", categoryName);
    localStorage.setItem("Title", title);
    localStorage.setItem("CategoryId", categoryId);
    localStorage.setItem("CoachId", coachId);
    localStorage.setItem("Price", price);
    localStorage.setItem("Description", description);
  };

  var checkPopUp = function checkPopUp() {
    if (openCreateCourse || openDelete || openUpdateCourse || openModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  };

  var getData = function getData() {
    getCourses().then(function (courses) {
      setCourses(courses);
    });
  };

  var getValue = function getValue(course) {
    setData(course);
    setOpenModal(true);
  };

  var getUpdateData = function getUpdateData(course) {
    setData(course);
    setOpenUpdateCourse(true);
  };

  var onDelete = function onDelete(id) {
    deleteCourses(id).then(function () {
      return getData();
    });
    setOpenDelete(false);
  };

  useEffect(function () {
    getCourses().then(function (courses) {
      console.log(courses);
      setCourses(courses);
    });
  }, []);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "create-button-wrapper" },
        React.createElement(
          "button",
          {
            className: "btn btn-primary",
            type: "button",
            onClick: function onClick() {
              setOpenCreateCourse(true);
            }
          },
          "Add"
        )
      ),
      React.createElement(
        "div",
        { className: "row list-unstyled admin-courses-list" },
        courses.map(function (course) {
          return React.createElement(
            "div",
            { className: "col-6 text-align-center " },
            React.createElement(
              AdminCoursesCard,
              {
                key: course.id,
                id: course.id,
                getClickedValue: getValue,
                courseDetails: course,
                displayPrice: true
              },
              React.createElement(
                "button",
                {
                  className: "btn btn-secondary m-2",
                  exact: true,
                  onClick: function onClick() {
                    return getUpdateData(course);
                  }
                },
                "Edit"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-primary ml-2",
                  onClick: function onClick() {
                    return setOpenDelete(true);
                  }
                },
                "Delete"
              )
            ),
            openDelete && React.createElement(ConfirmDelete, {
              deleteItem: onDelete,
              closeModal: setOpenDelete,
              itemName: "course",
              id: course.id
            })
          );
        })
      )
    ),
    checkPopUp(),
    openModal && React.createElement(DetailsModal, { closeModal: setOpenModal }),
    openCreateCourse && React.createElement(CreateCourseModal, {
      closeCreateCourseModal: setOpenCreateCourse
    }),
    openUpdateCourse && React.createElement(UpdateCourseModal, {
      closeUpdateCourseModal: setOpenUpdateCourse
    })
  );
}
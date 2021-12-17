import UpdateCourse from "../../UpdateCourse/UpdateCourse";

function UpdateCourseModal(_ref) {
  var closeUpdateCourseModal = _ref.closeUpdateCourseModal;

  return React.createElement(
    "div",
    { className: "detailsModal-background" },
    React.createElement(
      "div",
      { className: "update-course-wrapper" },
      React.createElement(UpdateCourse, { closeModal: closeUpdateCourseModal }),
      " "
    )
  );
}
export default UpdateCourseModal;
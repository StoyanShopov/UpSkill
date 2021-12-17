import CreateCourse from "../../CreateCourse/CreateCourse";

function CreateCourseModal(_ref) {
  var closeCreateCourseModal = _ref.closeCreateCourseModal;

  return React.createElement(
    "div",
    { className: "detailsModal-background" },
    React.createElement(
      "div",
      { className: "create-course-wrapper" },
      React.createElement(CreateCourse, { closeModal: closeCreateCourseModal }),
      " "
    )
  );
}
export default CreateCourseModal;
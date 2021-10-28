import CreateCourse from "../../CreateCourse/CreateCourse";

function CreateCourseModal({ closeCreateCourseModal }) {
  return (
    <div className="detailsModal-background">
      <div className="create-course-wrapper">
        <CreateCourse closeModal={closeCreateCourseModal}></CreateCourse>{" "}
      </div>
    </div>
  );
}
export default CreateCourseModal;

import { useState, useEffect } from "react";
import AdminCoursesCard from "../AdminCourseCard/AdminCourseCard";
import {
  getCourses,
  deleteCourses,
} from "../../../../services/adminCourseService";
import "./AdminCourses.css";
import DetailsModal from "../../../Shared/CourseDetails/DetailsModal";
import CreateCourseModal from "../Modals/CreateCourseModal/CreateCourseModal";
import UpdateCourseModal from "../Modals/UpdateCourseModal/UpdateCourseModal";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import { enableBodyScroll, disableBodyScroll } from "../../../../utils/utils";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateCourse, setOpenCreateCourse] = useState(false);
  const [openUpdateCourse, setOpenUpdateCourse] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const setData = (data) => {
    let {
      id,
      title,
      coachName,
      coachId,
      categoryName,
      description,
      categoryId,
      price,
    } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", coachName);
    localStorage.setItem("CategoryName", categoryName);
    localStorage.setItem("Title", title);
    localStorage.setItem("CategoryId", categoryId);
    localStorage.setItem("CoachId", coachId);
    localStorage.setItem("Price", price);
    localStorage.setItem("Description", description);
  };

  const checkPopUp = () => {
    if (openCreateCourse || openDelete || openUpdateCourse || openModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  };

  const getData = () => {
    getCourses().then((courses) => {
      setCourses(courses);
    });
  };

  const getValue = (course) => {
    setData(course);
    setOpenModal(true);
  };

  const getUpdateData = (course) => {
    setData(course);
    setOpenUpdateCourse(true);
  };

  const onDelete = (id) => {
    deleteCourses(id).then(() => getData());
    setOpenDelete(false);
  };

  const onCloseCreateCourse = (close) => {
    setOpenCreateCourse(close);
    getCourses().then(() => getData());
  };

  const onCloseUpdateCourse = (close) => {
    setOpenUpdateCourse(close);
    localStorage.removeItem("ID");
    localStorage.removeItem("FullName");
    localStorage.removeItem("CategoryName");
    localStorage.removeItem("Title");
    localStorage.removeItem("CategoryId");
    localStorage.removeItem("CoachId");
    localStorage.removeItem("Price");
    localStorage.removeItem("Description");
    getCourses().then(() => getData());
  };

  useEffect(() => {
    getCourses().then((courses) => {      
      setCourses(courses);
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row list-unstyled admin-courses-list">
          {courses.map((course) => (
            <div className="col-md-4 text-align-center ">
              <AdminCoursesCard
                key={course.id}
                id={course.id}
                getClickedValue={getValue}
                courseDetails={course}
                displayPrice={true}
                openEdit={getUpdateData}
              >
                <button
                  className="btn admin-course-delete-button btn-primary"
                  onClick={() => setOpenDelete(true)}
                >
                  Delete
                </button>
              </AdminCoursesCard>
              {openDelete && (
                <ConfirmDelete
                  deleteItem={onDelete}
                  closeModal={setOpenDelete}
                  itemName="course"
                  id={course.id}
                ></ConfirmDelete>
              )}
            </div>
          ))}
          <div className="add-course-wrapper">
            <div
              className="addImage"
              onClick={(e) => setOpenCreateCourse(true)}
            ></div>
          </div>
        </div>
      </div>
      {checkPopUp()}
      {openModal && <DetailsModal closeModal={setOpenModal} />}
      {openCreateCourse && (
        <CreateCourseModal
          closeCreateCourseModal={onCloseCreateCourse}
        ></CreateCourseModal>
      )}
      {openUpdateCourse && (
        <UpdateCourseModal
          closeUpdateCourseModal={onCloseUpdateCourse}
        ></UpdateCourseModal>
      )}
    </div>
  );
}

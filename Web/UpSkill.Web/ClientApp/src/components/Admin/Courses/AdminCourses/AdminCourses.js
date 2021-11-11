import { useState, useEffect } from "react";
import AdminCoursesCard from "../AdminCourseCard/AdminCourseCard";
import {
  getCourses,
  getCoursesDb,
  deleteCourses,
} from "../../../../services/adminCourseService";
import "./AdminCourses.css";
import DetailsModal from "../Modals/DetailsModal";
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

  useEffect(() => {
    getCourses().then((courses) => {
      console.log(courses);
      setCourses(courses);
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="create-button-wrapper">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              setOpenCreateCourse(true);
            }}
          >
            Add
          </button>
        </div>
        <div className="row list-unstyled courses-list">
          {courses.map((course) => (
            <div className="col-6 text-align-center ">
              <AdminCoursesCard
                key={course.id}
                id={course.id}
                getClickedValue={getValue}
                courseDetails={course}
                displayPrice={true}
              >
                <button
                  className="btn btn-secondary m-2"
                  exact={true}
                  onClick={() => getUpdateData(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary ml-2"
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
        </div>
      </div>
      {checkPopUp()}
      {openModal && <DetailsModal closeModal={setOpenModal} />}
      {openCreateCourse && (
        <CreateCourseModal
          closeCreateCourseModal={setOpenCreateCourse}
        ></CreateCourseModal>
      )}
      {openUpdateCourse && (
        <UpdateCourseModal
          closeUpdateCourseModal={setOpenUpdateCourse}
        ></UpdateCourseModal>
      )}
    </div>
  );
}

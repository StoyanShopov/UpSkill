import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../CreateCourse/CreateCourse.css";
import "./UpdateCourse.css";
import {
  updateCourses,
  getCourseDetails,
} from "../../../../services/adminCourseService";
import { getCoachesNames } from "../../../../services/coachService";
import { getCategoriesForCourses } from "../../../../services/categoryService";
import Select from "react-select";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const vPrice = (value) => {
  if (value < 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The price can't be a negative number;
      </div>
    );
  }
};
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "30rem",
    height: "50px",
    border: "2px solid #296cfb",
    opacity: "1",
    marginLeft: "0.5rem",
    marginBottom: "1rem",
    marginTop: "-1.5rem",

    borderRadius: "5px",
  }),
  menu: (provided, state) => ({
    ...provided,
    marginLeft: "10px",
    marginTop: "0px",
  }),
};
export default function UpdateCourse({ closeModal }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [errors, setErrors] = useState({});
  const [coachId, setCoachId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [coaches, setCoaches] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState({});

  let handleValidation = () => {
    let fields = {
      title,
      coachName,
      description,
      price,
      categoryName,
      file,
    };
    let errorsValidation = {};
    let formIsValid = true;

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
      errorsValidation["description"] =
        "Cannot be empty or less than 5 characters";
    }

    if (!fields["categoryName"]) {
      formIsValid = false;
      errorsValidation["categoryName"] = "Cannot be empty";
    }

    if (fields["price"] < 0) {
      formIsValid = false;
      errorsValidation["price"] = "Cannot be negative number";
    }

    if (!fields["file"]) {
      formIsValid = false;
      errorsValidation["file"] = "Cannot be empty";
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setId(localStorage.getItem("ID"));
    // setCoachId(localStorage.getItem("coachId"));
    // setPrice(localStorage.getItem("Price"));
    // setDescription(localStorage.getItem("Description"));
    // setTitle(localStorage.getItem("Title"));
    // setCategoryId(localStorage.getItem("CategoryId"));
    // setCategoryName(localStorage.getItem("CategoryName"));
    // setCoachName(localStorage.getItem("FullName"));
    getCourseDetails(localStorage.getItem("ID")).then((course) => {     
      setCoachId(course.coachId);
      setPrice(course.price);
      setDescription(course.description);
      setTitle(course.title);
      setCategoryId(course.categoryId);
      setCategoryName(course.categoryName);
      setCoachName(course.coachFirstName + " " + course.coachLastName);
    });
  }, []);

  let onchangeTitle = (el) => {
    let title = el.target.value;
    setTitle(title);
  };

  let onchangeDescription = (el) => {
    setDescription(el.target.value);
  };

  let onchangePrice = (el) => {
    setPrice(el.target.value);
  };

  let onchangeCategory = (el) => {
    setCategoryName(el.label);
    setCategoryId(el.value);
  };

  let onChangeNameSelect = (el) => {
    setCoachId(el.value);
    setCoachName(el.label);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (handleValidation()) {
      let courseReturn = {
        id,
        title,
        description,
        price,
        coachId,
        categoryId,
        file,
      };
      updateCourses(courseReturn).then((resp) => {        
        if (resp.data === "Successfully edited.") {
          setIsSuccess(true);
          setSuccess("Submitted successfully");
          closeModal(false);
        }
      });
    } else {
      setSuccess("Form has errors.");
    }
  };

  useEffect(() => {
    getCoachesNames().then((arr) => {
      setCoaches(arr);
    });
  }, []);

  useEffect(() => {
    getCategoriesForCourses().then((arr) => {
      setCategories(arr);
    });
  }, []);

  return (
    <div className="update-course-container">
      <div className="update-form-container">
        <div className="create-form-header">
          <div className="UpdateCloseBtn">
            <button className="update-x-btn" onClick={() => closeModal(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <h1
            className="create-form-header-title"
            style={{ marginBottom: "1rem" }}
          >
            Update Course
          </h1>
        </div>
        {isSuccess ? (
          <span style={{ color: "green", marginBottom: "0.5rem" }}>
            {success}
          </span>
        ) : (
          <span style={{ color: "red", marginBottom: "0.5rem" }}>
            {success}
          </span>
        )}
        <Form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label htmlFor="title"></label>
              <input
                className="update-input-style"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={onchangeTitle}
                validations={[required]}
              />
              <p style={{ color: "red", marginLeft: "15px" }}>
                {errors["title"]}
              </p>
            </div>
            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <label htmlFor="coachName"></label>
              <Select
                styles={customStyles}
                options={coaches}
                defaultValue={{
                  label: "coachName",
                  value: "",
                }}
                value={{ label: coachName, value: coachId }}
                onChange={onChangeNameSelect}
              ></Select>
              <p
                style={{
                  color: "red",
                  marginLeft: "15px",
                  marginBottom: "-1rem",
                  marginTop: "-1rem",
                }}
              >
                {errors["coachName"]}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="description"></label>
              <input
                className="update-input-style"
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={onchangeDescription}
                validations={[required]}
              />
              <p style={{ color: "red", marginLeft: "15px" }}>
                {errors["description"]}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="price"></label>
              <input
                className="update-input-style"
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={onchangePrice}
                validations={[required, vPrice]}
              />
              <p style={{ color: "red", marginLeft: "15px" }}>
                {errors["price"]}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="category"></label>
              <Select
                maxMenuHeight={180}
                styles={customStyles}
                options={categories}
                defaultValue={{
                  label: "Category",
                  value: "",
                }}
                value={{ label: categoryName, value: categoryId }}
                onChange={onchangeCategory}
              ></Select>
              <span style={{ color: "red", marginLeft: "15px" }}>
                {errors["category"]}
              </span>
            </div>
            <div className="form-group" style={{ marginTop: "-30px" }}>
              <label htmlFor="File"></label>
              <input
                type="file"
                placeholder="File*"
                className="w-100 p-2"
                onChange={onChangeFile}
              />
              <p
                style={{
                  color: "red",
                  marginLeft: "15px",
                  marginTop: "-0.5rem",
                }}
              >
                {errors["file"]}
              </p>
            </div>
            <div className="btn-update-course-container">
              <div>
                <button
                  className="btn btn-outline-primary cancel-button"
                  onClick={() => closeModal(false)}
                >
                  Cancel
                </button>
                <input
                  className="btn btn-primary submit-button"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

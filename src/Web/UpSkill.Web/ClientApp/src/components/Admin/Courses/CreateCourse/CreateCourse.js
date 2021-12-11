import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import "./CreateCourse.css";
import { addCourses } from "../../../../services/adminCourseService";
import { getCoachesNames } from "../../../../services/coachService";
import { getCategoriesForCourses } from "../../../../services/categoryService";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "30rem",
    height: "3rem",
    border: "2px solid #296cfb",
    opacity: "1",
    margin: "0.5rem",
    borderRadius: "5px",
    font: "blue",
  }),
  menu: (provided, state) => ({
    ...provided,
    // marginLeft: "1rem",
    marginTop: "0px",
  }),
};

export default function CreateCourse({ closeModal }) {
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [coaches, setCoaches] = useState({});
  const [coachId, setCoachId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState({});

  let handleValidation = () => {
    let fields = {
      title,
      coachName,
      description,
      price,
      category,
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

    if (!fields["category"]) {
      formIsValid = false;
      errorsValidation["category"] = "Cannot be empty";
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
    console.log(e.target.files[0]);
    // let inputFile={

    // }
    setFile(e.target.files[0]);
  };

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
    console.log(el.value);
    setCategory(el.value);
  };

  let onChangeNameSelect = (el) => {
    setCoachId(el.value);
    setCoachName(el.label);
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    if (handleValidation()) {
      let courseReturn = {
        title,
        description,
        price,
        coachId,
        categoryId: category,
        file,
      };
      addCourses(courseReturn).then((resp) => {
        if (resp.data === "Successfully created.") {
          setIsSuccess(true);
          setSuccess("Submitted successfully");
          setTitle("");
          setCoachName("");
          setDescription("");
          setPrice(0);
          setCategory("");
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
    <div className="create-course-container">
      <div className="form-container">
        <div className="create-form-header">
          <div className="CreateCloseBtn">
            <button
              className="create-course-the-xbtn"
              onClick={() => closeModal(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <h1
            className="create-form-header-title"
            style={{ marginBottom: "1rem" }}
          >
            Create Course
          </h1>
        </div>
        {isSuccess ? (
          <span style={{ color: "green", marginBottom: "0px" }}>{success}</span>
        ) : (
          <span style={{ color: "red", marginBottom: "0px" }}>{success}</span>
        )}
        <Form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label htmlFor="title"></label>
              <input
                className="input-style"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={onchangeTitle}
              />
            </div>
            <p
              style={{ color: "red", marginLeft: "15px", marginTop: "-0.5rem" }}
            >
              {errors["title"]}
            </p>
            <div className="form-group" style={{ marginBottom: "-0.5rem" }}>
              <label htmlFor="coachName"></label>
              <div style={{ marginBottom: "1rem", marginTop: "-40px" }}>
                <Select
                  styles={customStyles}
                  options={coaches}
                  defaultValue={{
                    label: "Coach Name",
                    value: String(coachName),
                  }}
                  // Value={{ label: String(coachName), value: String(coachName) }}
                  placeholder="CoachName"
                  onChange={onChangeNameSelect}
                />
                <p
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "-0.5rem",
                  }}
                >
                  {errors["coachName"]}
                </p>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "-1rem" }}>
              <label htmlFor="description"></label>
              <input
                className="input-style"
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={onchangeDescription}
              />
              <p
                style={{
                  color: "red",
                  marginLeft: "15px",
                  marginTop: "-0.5rem",
                }}
              >
                {errors["description"]}
              </p>
            </div>

            <div className="form-group" style={{ marginBottom: "-1rem" }}>
              <label htmlFor="price"></label>
              <input
                className="input-style"
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={onchangePrice}
              />
              <p
                style={{
                  color: "red",
                  marginLeft: "15px",
                  marginTop: "-0.5rem",
                }}
              >
                {errors["price"]}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="category"></label>
              <div style={{ marginBottom: "1rem", marginTop: "-20px" }}>
                <Select
                  maxMenuHeight={180}
                  styles={customStyles}
                  options={categories}
                  defaultValue={{
                    label: "Category",
                    value: "",
                  }}
                  // Value={{ label: String(coachName), value: String(coachName) }}
                  placeholder="Category"
                  onChange={onchangeCategory}
                />
                <p
                  style={{
                    color: "red",
                    marginLeft: "15px",
                    marginTop: "-0.5rem",
                    marginBottom: "-1rem",
                  }}
                >
                  {errors["category"]}
                </p>
              </div>
            </div>
            <div className="form-group">
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
            <div className="btn-createcourse-container">
              <input
                className="btn-custom"
                onClick={handleSubmit}
                type="submit"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

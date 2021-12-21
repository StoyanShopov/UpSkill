import React, { useState, useEffect } from "react";
import "./CreateCoach.css";
import { createCoach } from "../../../../../services/adminCoachesService";
import { enableBodyScroll } from "../../../../../utils/utils";

export default function CreateCoach({ closeModal, trigger }) {
  const [coachField, setCoachField] = useState("");
  const [coachPrice, setCoachPrice] = useState(0);
  const [coachFirstName, setCoachFirstName] = useState("");
  const [coachLastName, setCoachLastName] = useState("");
  const [file, setFile] = useState("");
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  let handleValidation = () => {
    let fields = {
      coachField,
      coachPrice,
      coachFirstName,
      coachLastName,
      calendlyUrl,
      file,
    };
    let errorsValidation = {};
    let formIsValid = true;

    if (!fields["coachField"]) {
      formIsValid = false;
      errorsValidation["coachField"] = "Cannot be empty";
    }

    if (!fields["file"]) {
      formIsValid = false;
      errorsValidation["file"] = "Cannot be empty";
    }

    if (!fields["coachFirstName"]) {
      formIsValid = false;
      errorsValidation["coachFirstName"] = "Cannot be empty";
    }

    if (!fields["coachLastName"]) {
      formIsValid = false;
      errorsValidation["coachLastName"] = "Cannot be empty";
    }

    if (!fields["calendlyUrl"]) {
      formIsValid = false;
      errorsValidation["calendlyUrl"] = "Cannot be empty";
    }

    if (fields["coachPrice"] < 0) {
      formIsValid = false;
      errorsValidation["coachPrice"] = "Cannot be negative number";
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

  const onChangeCalendlyUrl = (e) => {
    setCalendlyUrl(e.target.value);
  };

  const onChangeCoachPrice = (e) => {
    setCoachPrice(e.target.value);
  };

  const onChangeField = (e) => {
    setCoachField(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setCoachFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setCoachLastName(e.target.value);
  };

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    // let inputFile={

    // }
    setFile(e.target.files[0]);
  };

  function submitCreateCoach(e) {
    e.preventDefault();
    if (handleValidation()) {
      createCoach(
        coachFirstName,
        coachLastName,
        coachField,
        coachPrice,
        file,
        calendlyUrl
      )
        .then((resp) => {
          if (resp.data === "Successfully created.") {
            setSuccess(true);
            setCoachFirstName("");
            setCoachLastName("");
            setCoachField("");
            setCoachPrice(0);
            setCalendlyUrl("");
          }
        })
        .catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }

  function closePopup() {
    enableBodyScroll();
    closeModal(false);
    setSuccess(false);
    setErrors({});
  }

  return trigger ? (
    <div className="deleteModal-background">
      <div className="createCoach-popup">
        <div className="createCoach-popup-createCoach-inner">
          <div className="createCoach-popup-Header">
            <div className="closebtn d-flex justify-content-end pt-2 pe-2">
              <button onClick={(e) => closePopup()} className="closebtn btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="createCoach-popup-Title pb-2">
              <h4>Create Coach</h4>
            </div>
          </div>
          <form onSubmit={(e) => submitCreateCoach(e)}>
            <div className="createCoach-Content px-5 m-5">
              <div className="createCoach-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: "green", marginBottom: "0px" }}>
                    Successfully created
                  </span>
                )}
                <input
                  type="text"
                  placeholder="First Name*"
                  className="createCoach-Content-input w-100 p-2"
                  value={coachFirstName}
                  onChange={onChangeFirstName}
                />
                <p style={{ color: "red" }}>{errors["coachFirstName"]}</p>
              </div>

              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="createCoach-Content-input w-100 p-2"
                  value={coachLastName}
                  onChange={onChangeLastName}
                />
                <p style={{ color: "red" }}>{errors["coachLastName"]}</p>
              </div>

              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Field*"
                  className="createCoach-Content-input w-100 p-2"
                  value={coachField}
                  onChange={onChangeField}
                />
                <p style={{ color: "red" }}>{errors["coachField"]}</p>
              </div>
              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Price"
                  className="createCoach-Content-input w-100 p-2"
                  value={coachPrice}
                  onChange={onChangeCoachPrice}
                />
                <p style={{ color: "red" }}>{errors["coachPrice"]}</p>
              </div>
              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Calendly url*"
                  className="createCoach-Content-input w-100 p-2"
                  value={calendlyUrl}
                  onChange={onChangeCalendlyUrl}
                />
                <p style={{ color: "red" }}>{errors["calendlyUrl"]}</p>
              </div>
              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="file"
                  placeholder="File*"
                  className="w-100 p-2"
                  onChange={onChangeFile}
                />
                <p style={{ color: "red" }}>{errors["file"]}</p>
              </div>
              <div className="createCoach-Content-anotherEmployee ps-5">
                <div className="createCoach-Content-anotherEmployee-btn btn">
                  + Create another coach
                </div>
              </div>
            </div>
            <div className="createCoach-actions d-flex px-1 d-flex justify-content-center">
              <div className="createCoach-actions-cancel-wrapper px-1">
                <button
                  onClick={(e) => closePopup()}
                  className=" btn createCoach-actions-cancel btn-outline-primary px-3 fw-bold"
                >
                  Cancel
                </button>
              </div>
              <div className="createCoach-actions-save-wrapper px-3">
                <input
                  type="submit"
                  className="btn createCoach-actions-cancel btn-primary px-3 fw-bold"
                  value="Create"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

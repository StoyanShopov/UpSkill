import React, { useState, useEffect } from "react";
import "./CreateCoach.css";
import { createCoach } from "../../../../../services/adminCoachesService";
import { enableBodyScroll } from "../../../../../utils/utils";

export default function CreateCoach({ closeModal, trigger }) {
  const [coachField, setCoachField] = useState("");
  const [coachPrice, setCoachPrice] = useState(0);
  const [coachFirstName, setCoachFirstName] = useState("");
  const [coachLastName, setCoachLastName] = useState("");
  const [file, setFile] = useState({});

  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

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
    if (coachFirstName && coachLastName && coachField) {
      createCoach(coachFirstName, coachLastName, coachField, coachPrice ,file)
        .then((resp) => {
          if (resp.data === "Successfully created.") {
            setSuccess(true);
            setCoachFirstName("");
            setCoachLastName("");
            setCoachField("");
            setCoachPrice(0);
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
  }

  return trigger ? (
    <div className="deleteModal-background">
      <div className="popup">
        <div className="popup-createCoach-inner">
          <div className="popup-Header">
            <div className="closebtn d-flex justify-content-end p-2">
              <button onClick={(e) => closePopup()} className="closebtn btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="popup-Title p-2">
              <h4>Create Coach</h4>
            </div>
          </div>
          <form onSubmit={(e) => submitCreateCoach(e)}>
            <div className="addEmployee-Content px-5 m-5">
              <div className="addEmployee-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: "green", marginBottom: "0px" }}>
                    Successfully created
                  </span>
                )}
                <input
                  type="text"
                  placeholder="First Name*"
                  className="addEmployee-Content-input w-100 p-2"
                  value={coachFirstName}
                  onChange={onChangeFirstName}
                />
              </div>

              <div className="addEmployee-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="addEmployee-Content-input w-100 p-2"
                  value={coachLastName}
                  onChange={onChangeLastName}
                />
              </div>
              <div className="addEmployee-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Field*"
                  className="addEmployee-Content-input w-100 p-2"
                  value={coachField}
                  onChange={onChangeField}
                />
              </div>
              <div className="addEmployee-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Price"
                  className="addEmployee-Content-input w-100 p-2"
                  value={coachPrice}
                  onChange={onChangeCoachPrice}
                />
              </div>
              <div className="addEmployee-Content-fullname px-5 m-3">
                <input
                  type="file"
                  placeholder="File*"
                  className="w-100 p-2"
                  onChange={onChangeFile}
                />
              </div>
              <div className="addEmployee-Content-anotherEmployee px-5">
                <div className="addEmployee-Content-anotherEmployee-btn btn">
                  + Create another coach
                </div>
              </div>
            </div>

            <div className="addEmployee-actions d-flex px-5 d-flex justify-content-center">
              <div className="addEmployee-actions-cancel-wrapper px-3">
                <button
                  onClick={(e) => closePopup()}
                  className=" btn addEmployee-actions-cancel btn-outline-primary px-3 fw-bold"
                >
                  Cancel
                </button>
              </div>

              <div className="addEmployee-actions-save-wrapper px-3">
                <input
                  type="submit"
                  className="btn addEmployee-actions-cancel btn-primary px-3 fw-bold"
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

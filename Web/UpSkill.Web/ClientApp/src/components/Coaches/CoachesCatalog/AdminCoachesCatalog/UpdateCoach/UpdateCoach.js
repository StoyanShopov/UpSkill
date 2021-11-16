import React, { useState, useEffect } from "react";

import { updateCoach } from "../../../../../services/adminCoachesService";
import { enableBodyScroll } from "../../../../../utils/utils";

export default function UpdateCoach({ closeModal, trigger, coachDetails }) {
  const [coachField, setCoachField] = useState("");
  const [coachDescription, setDescription] = useState("");
  const [coachFirstName, setCoachFirstName] = useState("");
  const [coachLastName, setCoachLastName] = useState("");
  const [coachId, setCoachId] = useState("");
  const [file, setFile] = useState({});
  const [success, setSuccess] = useState(false);

  const test = localStorage.getItem("ID");

  //   const onChangeDescription = (e) => {
  //     setDescription(e.target.value);
  //   };

  //   const onChangeField = (e) => {
  //     setCoachField(e.target.value);
  //   };

  const onChangeFirstName = (e) => {
    setCoachFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setCoachLastName(e.target.value);
  };

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setCoachId(localStorage.getItem("ID"));
    setCoachFirstName(localStorage.getItem("FirstName"));
    setCoachLastName(localStorage.getItem("LastName"));
  }, [test]);

  function submitEditCoach(e) {
    e.preventDefault();
    if (coachFirstName && coachLastName) {
      updateCoach(coachDetails.id, coachFirstName, coachLastName, file)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setSuccess(true);
            setCoachFirstName("");
            setCoachLastName("");
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
              <h4>Update Coach</h4>
            </div>
          </div>
          <form onSubmit={(e) => submitEditCoach(e)}>
            <div className="addEmployee-Content px-5 m-5">
              <div className="addEmployee-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: "green", marginBottom: "0px" }}>
                    Successfully updated
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
                  type="file"
                  placeholder="File*"
                  className="w-100 p-2"
                  onChange={onChangeFile}
                />
              </div>

              {/* <div className="addEmployee-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: "green", marginBottom: "0px" }}>
                    Successfully requested
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Field*"
                  className="addEmployee-Content-input w-100 p-2"
                  value={coachField}
                  onChange={onChangeField}
                />
              </div> */}

              {/* <div className="addEmployee-Content-email px-5 m-3">
                <textarea
                  type="text"
                  placeholder="Description*"
                  value={coachDescription}
                  className="addEmployee-Content-input w-100 p-2"
                  onChange={onChangeDescription}
                />
              </div> */}

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
                  value="Update"
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

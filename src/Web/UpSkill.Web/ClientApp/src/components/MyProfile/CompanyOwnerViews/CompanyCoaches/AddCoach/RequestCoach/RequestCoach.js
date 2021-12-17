import React, { useState, useEffect } from "react";
import { requestCoach } from "../../../../../../services/companyOwnerCoachesService";
import { enableBodyScroll } from "../../../../../../utils/utils";
import "./RequestCoach.css";

export default function RequestCoach({ closeModal, trigger }) {
  const [coachField, setCoachField] = useState("");
  const [coachDescription, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const onChangeDescription = (e) => {
    setSuccess(false);
    setDescription(e.target.value);
  };

  const onChangeField = (e) => {
    setSuccess(false);
    setCoachField(e.target.value);
  };

  function RequestCoach(e) {
    e.preventDefault();
    if (coachField && coachDescription) {
      requestCoach(user.email, user.unique_name, coachDescription, coachField)
        .then(() => {
          setSuccess(true);
          setCoachField("");
          setDescription("");
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
        <div className="popup-inner">
          <div className="popup-Header">
            <div className="closebtn d-flex justify-content-end p-2">
              <button onClick={(e) => closePopup()} className="closebtn btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="popup-Title p-2">
              <h4>Request Coach</h4>
            </div>
          </div>
          <form onSubmit={(e) => RequestCoach(e)}>
            <div className="requestCoach-Content px-5 m-5">
              <div className="requestCoach-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: "green", marginBottom: "0px" }}>
                    Successfully requested
                  </span>
                )}
                <input
                  type="text"
                  placeholder="Field*"
                  className="requestCoach-Content-input w-100 p-2"
                  value={coachField}
                  onChange={onChangeField}
                />
              </div>

              <div className="requestCoach-Content-email px-5 m-3">
                <textarea
                  type="text"
                  placeholder="Description*"
                  value={coachDescription}
                  className="requestCoach-Content-input w-100 p-2"
                  onChange={onChangeDescription}
                />
              </div>

              <div className="requestCoach-Content-anotherEmployee px-5">
                <div className="requestCoach-Content-anotherEmployee-btn btn">
                  + Request another coach
                </div>
              </div>
            </div>

            <div className="requestCoach-actions d-flex px-5 d-flex justify-content-center">
              <div className="requestCoach-actions-cancel-wrapper px-3">
                <button
                  onClick={(e) => closePopup()}
                  className=" btn requestCoach-actions-cancel btn-outline-primary px-3 fw-bold"
                >
                  Cancel
                </button>
              </div>
              <div className="requestCoach-actions-save-wrapper px-3">
                <input
                  type="submit"
                  className="btn requestCoach-actions-cancel btn-primary px-3 fw-bold"
                  value="Request"
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

import React, { useState, useEffect } from "react";

import { requestCoach } from "../../../../../../services/coachService";
import { enableBodyScroll } from "../../../../../../utils/utils";



export default function RequestCoach({closeModal, trigger}) {
  const [coachField, setCoachField] = useState("");
  const [coachDescription, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeField = (e) => {
    setCoachField(e.target.value);
  };

  function RequestCoach(e) {
    e.preventDefault();
    if (coachField && coachDescription) {
      console.log(
        `submitted: ${user.email}, ${user.unique_name} , ${coachDescription}, ${coachField}`
      );
      requestCoach(user.email, user.unique_name, coachDescription, coachField);
    }
  }

  function closePopup() {
    enableBodyScroll();
    closeModal(false);
  }

  return trigger ? (
      <div className= "deleteModal-background">
    <div className="popup">
        {console.log("otvoreno sum")}
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
          <div className="addEmployee-Content px-5 m-5">
            <div className="addEmployee-Content-fullname px-5 m-3">
              <input
                type="text"
                placeholder="Field*"
                className="addEmployee-Content-input w-100 p-2"
                onChange={onChangeField}
              />
            </div>

            <div className="addEmployee-Content-email px-5 m-3">
              <textarea
                type="text"
                placeholder="Description*"
                className="addEmployee-Content-input w-100 p-2"
                onChange={onChangeDescription}
              />
            </div>

            <div className="addEmployee-Content-anotherEmployee px-5">
              <div className="addEmployee-Content-anotherEmployee-btn btn">
                + Request another coach
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
                value="Request"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  ) : "";
}

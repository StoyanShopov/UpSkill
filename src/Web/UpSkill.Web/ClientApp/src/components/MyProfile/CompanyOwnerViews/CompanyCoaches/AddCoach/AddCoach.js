import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { disableBodyScroll } from "../../../../../utils/utils";

function AddCoachModal({ closeModal, setOpenRequest }) {
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  const requestCoach = () => {
    setOpenRequest(true);
    closeModal(false);
    disableBodyScroll();
  };

  return (
    <div className="deleteModal-background">
      <div className="deleteModal-container">
        <div className="deleteModal-header">
          <div className="titleCloseBtn">
            <button className="delete-x-btn" onClick={() => closeModal(false)}>
              X
            </button>
          </div>
          <div className="deleteHeader-els-container">
            <div className="deleteModal-title">
              <p>
                Choose a coach from our list
                <br />
                or request one
              </p>
            </div>
          </div>
        </div>
        <div className="deleteModal-body">
          <div className="btn-update-course-container">
            <div>
              <button
                className="btn btn-outline-primary cdelete-button square-button"
                onClick={() => requestCoach()}
              >
                Request
              </button>
              <button
                className="btn btn-primary cdelete-button square-button"
                // Untill we find how to fix redirect problem
                onClick={() => (window.location.href = "/Coaches")}
                //When is fixed we should use this instead
                // onClick={() => routeChange("/Coaches")}
              >
                Coaches
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddCoachModal;

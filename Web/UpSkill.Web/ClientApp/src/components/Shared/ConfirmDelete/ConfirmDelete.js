import React from "react";
import "./ConfirmDelete.css";

function DetailsModal({ deleteItem,closeModal, itemName, id }) {
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
              <p>Are you sure you want to <br/>delete this {itemName}</p>
            </div>
          </div>
        </div>
        <div className="deleteModal-body">
          <div className="btn-update-course-container">
            <div>
              <button
                className="btn btn-outline-primary cancel-button"
                onClick={() => closeModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary submit-button"
                onClick={() => deleteItem(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsModal;

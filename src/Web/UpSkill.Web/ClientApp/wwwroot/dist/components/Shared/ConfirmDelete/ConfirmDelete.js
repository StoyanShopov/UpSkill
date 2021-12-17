import React from "react";
import "./ConfirmDelete.css";

function DetailsModal(_ref) {
  var deleteItem = _ref.deleteItem,
      closeModal = _ref.closeModal,
      itemName = _ref.itemName,
      id = _ref.id;

  return React.createElement(
    "div",
    { className: "deleteModal-background" },
    React.createElement(
      "div",
      { className: "deleteModal-container" },
      React.createElement(
        "div",
        { className: "deleteModal-header" },
        React.createElement(
          "div",
          { className: "titleCloseBtn" },
          React.createElement(
            "button",
            { className: "delete-x-btn", onClick: function onClick() {
                return closeModal(false);
              } },
            "X"
          )
        ),
        React.createElement(
          "div",
          { className: "deleteHeader-els-container" },
          React.createElement(
            "div",
            { className: "deleteModal-title" },
            React.createElement(
              "p",
              null,
              "Are you sure you want to ",
              React.createElement("br", null),
              "delete this ",
              itemName
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "deleteModal-body" },
        React.createElement(
          "div",
          { className: "btn-update-course-container" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              {
                className: "btn btn-outline-primary cancel-button",
                onClick: function onClick() {
                  return closeModal(false);
                }
              },
              "Cancel"
            ),
            React.createElement(
              "button",
              {
                className: "btn btn-primary submit-button",
                onClick: function onClick() {
                  return deleteItem(id);
                }
              },
              "Delete"
            )
          )
        )
      )
    )
  );
}
export default DetailsModal;
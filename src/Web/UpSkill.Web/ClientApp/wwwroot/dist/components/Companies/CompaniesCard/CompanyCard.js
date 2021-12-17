import React from "react";
import { Link } from "react-router-dom";
import user from "../Images/user.png";

var CompanyCard = function CompanyCard(props) {
   var _props$company = props.company,
       id = _props$company.id,
       name = _props$company.name;

   return React.createElement(
      "div",
      { className: "item" },
      React.createElement(
         "div",
         { className: "content" },
         React.createElement(
            Link,
            { to: { pathname: "/Admin/Company/" + id, state: { company: props.company } } },
            React.createElement("img", { className: "ui avatar imag", src: user, alt: "user" }),
            React.createElement(
               "div",
               { className: "header" },
               name
            )
         )
      ),
      React.createElement(
         "div",
         null,
         React.createElement(
            "button",
            { className: "Delete",
               style: { color: "red", marginTop: "7px", marginLeft: "10px" },
               onClick: function onClick() {
                  var confirm = window.confirm('Are you sure you wish to delete this company?');
                  if (confirm) {
                     props.clickHandler(id);
                  }
               } },
            "Delete"
         )
      ),
      React.createElement(
         Link,
         { to: { pathname: "/Admin/Companies/edit", state: { company: props.company } } },
         React.createElement(
            "button",
            { className: "outline-primary",
               style: { color: "blue", marginTop: "7px", marginLeft: "10px" }
            },
            "Edit"
         )
      )
   );
};
export default CompanyCard;
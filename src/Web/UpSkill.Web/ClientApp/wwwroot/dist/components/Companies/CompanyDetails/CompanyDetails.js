import React from "react";
import { Link } from "react-router-dom";
import user from "../Images/user.jpg";

var CompanyDetails = function CompanyDetails(props) {
    var _props$location$state = props.location.state.company,
        name = _props$location$state.name,
        email = _props$location$state.email;

    return React.createElement(
        "div",
        { className: "main" },
        React.createElement(
            "div",
            { className: "ui card centered" },
            React.createElement(
                "div",
                { className: "image" },
                React.createElement("img", { src: user, alt: "user" })
            ),
            React.createElement(
                "div",
                { className: "content" },
                React.createElement(
                    "div",
                    { className: "header" },
                    name
                )
            )
        ),
        React.createElement(
            "div",
            { className: "center-div" },
            React.createElement(
                Link,
                { to: "/CompanyList" },
                React.createElement(
                    "button",
                    { className: "ui button blue center" },
                    "Back"
                )
            )
        )
    );
};

export default CompanyDetails;
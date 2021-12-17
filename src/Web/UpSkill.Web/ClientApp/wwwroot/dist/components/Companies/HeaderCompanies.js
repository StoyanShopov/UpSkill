import React from "react";

var HeaderCompanies = function HeaderCompanies() {
    return React.createElement(
        "div",
        { className: "ui fixed menu" },
        React.createElement(
            "div",
            { className: "ui container center" },
            React.createElement(
                "h2",
                null,
                "Companies CRUD Manager"
            )
        )
    );
};

export default HeaderCompanies;
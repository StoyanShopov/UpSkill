var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { updateCompanyHandler, getCompanies } from "../../../services/companyService";

function EditCompany(props) {
    var _useState = useState(props.location.state.company.name),
        _useState2 = _slicedToArray(_useState, 2),
        name = _useState2[0],
        setName = _useState2[1];

    var _useState3 = useState(props.location.state.company.id),
        _useState4 = _slicedToArray(_useState3, 2),
        id = _useState4[0],
        setId = _useState4[1];

    var update = function update(e) {
        e.preventDefault();

        if (name === "") {
            alert("All the fields are mandatory!");
            return;
        }
        var company = {
            id: id,
            name: name

        };
        updateCompanyHandler(company);

        props.history.push("/CompanyList");
    };

    return React.createElement(
        "div",
        { className: "ui main" },
        React.createElement("br", null),
        React.createElement(
            "h2",
            null,
            "Edit Company"
        ),
        React.createElement(
            "form",
            { className: "ui form", onSubmit: update },
            React.createElement(
                "div",
                { className: "field" },
                React.createElement(
                    "label",
                    null,
                    "Name"
                ),
                React.createElement("input", { type: "text",
                    name: "name", placeholder: "Name",
                    value: name,
                    onChange: function onChange(e) {
                        return setName(function (name) {
                            return e.target.value;
                        });
                    } })
            ),
            React.createElement(
                "button",
                { className: "ui button blue", onClick: "edit" },
                "Update"
            ),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "center-div" },
                React.createElement(
                    Link,
                    { to: "/" },
                    React.createElement(
                        "button",
                        { className: "ui button blue center" },
                        "Back"
                    )
                )
            )
        )
    );
}

export default EditCompany;
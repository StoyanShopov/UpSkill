var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "../CompaniesCard/CompanyCard";
import { getCompanies } from "../../../services/companyService";

var CompanyList = function CompanyList(props) {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        companies = _useState2[0],
        setCompanies = _useState2[1];

    useEffect(function (companies) {

        getCompanies().then(function (data) {

            setCompanies(data);
        });
    }, [companies]);

    var deleteCompanyHandler = function deleteCompanyHandler(id) {
        props.getCompanyId(id);
    };

    return React.createElement(
        "div",
        { "class": "main" },
        React.createElement("br", null),
        React.createElement(
            "h2",
            null,
            " Companies "
        ),
        React.createElement(
            "div",
            { className: "ui celled list" },
            companies.map(function (company) {
                return React.createElement(CompanyCard, { company: company, clickHandler: deleteCompanyHandler, key: company.id });
            }),
            ";"
        ),
        React.createElement(
            Link,
            { to: "/AddCompany" },
            React.createElement(
                "button",
                { className: "ui button blue left" },
                "   Add Company"
            )
        ),
        React.createElement("br", null),
        React.createElement(
            Link,
            { to: "/" },
            React.createElement(
                "button",
                { className: "ui button blue center" },
                "Back"
            )
        )
    );
};

export default CompanyList;
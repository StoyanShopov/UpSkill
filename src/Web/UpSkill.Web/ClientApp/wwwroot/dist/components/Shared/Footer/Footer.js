import { NavLink } from "react-router-dom";
import React from 'react';

import FooterLOGO from "../../../assets/footerLOGO-NoBg.png";
import './Footer.css';

function FooterMenu() {
    return React.createElement(
        "footer",
        null,
        React.createElement("div", { className: "slants" }),
        React.createElement(
            "div",
            { className: "content-wrapper container-fluid" },
            React.createElement(
                "div",
                { className: "content container contentFooter" },
                React.createElement(
                    "div",
                    { className: "row justify-content-between" },
                    React.createElement(
                        "div",
                        { className: "col-md-4 footer-content" },
                        React.createElement(
                            "h2",
                            null,
                            React.createElement("img", { src: FooterLOGO, alt: "Footer Logo", className: "w-25" }),
                            " upskill"
                        ),
                        React.createElement(
                            "p",
                            { className: "pr-5 pt-3 pb-3" },
                            "Upskill gives everyone the opportunity to grow professionally and develop into specialist in every field."
                        ),
                        React.createElement(
                            "div",
                            { className: "footer-getStartedWrapper" },
                            React.createElement(
                                NavLink,
                                {
                                    to: "",
                                    className: "btn btn-outline-light rounded-0 getStarted font-weight-bold pl-3 pr-3 pb-2 pt-2 fw-bolder"
                                },
                                "Get Started"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-3 mt-5 ml-auto footer-companyList" },
                        React.createElement(
                            "ul",
                            { className: "nav flex-column" },
                            React.createElement(
                                "h5",
                                { className: "nav-brand px-3 m-1" },
                                "Company"
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "About us"
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "Contact us"
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "Privacy Policy"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-3 mt-5 footer-serviceList" },
                        React.createElement(
                            "ul",
                            { className: "nav flex-column" },
                            React.createElement(
                                "h5",
                                { className: "nav-brand px-3 m-1" },
                                "Services"
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "Courses"
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "Coaches"
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white" },
                                    "Requests"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-1 mt-5 footer-socials" },
                        React.createElement(
                            "ul",
                            { className: "nav flex-column mt-4 footer-socials-list" },
                            React.createElement(
                                "li",
                                { className: "nav-item m-1 footer-socials-item" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white p-0" },
                                    React.createElement("i", { className: "fab fa-facebook-square h3" })
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1 footer-socials-item" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white p-0" },
                                    React.createElement("i", { className: "fab fa-instagram h3" })
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "nav-item m-1 footer-socials-item" },
                                React.createElement(
                                    NavLink,
                                    { to: "", className: "nav-link text-white p-0" },
                                    React.createElement("i", { className: "fab fa-linkedin h3" })
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { id: "CopyRigthFooter", className: "mt-4 border-top-2 border-white content-wrapper container-fluid" },
            React.createElement(
                "div",
                { className: "content container" },
                React.createElement(
                    "div",
                    { className: "row d-flex justify-content-center" },
                    React.createElement(
                        "span",
                        { className: "col-md-4 text-center footer-copyRLogo" },
                        "\xA9 UpSkill ",
                        new Date().getFullYear()
                    )
                )
            )
        )
    );
}

export default FooterMenu;
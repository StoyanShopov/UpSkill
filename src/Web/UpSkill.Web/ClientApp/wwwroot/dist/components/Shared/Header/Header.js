var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { ReactReduxContext } from 'react-redux';

import { clearMessage } from "../../../actions/message";

import { history } from "../../../helpers/history";

import Logo from '../../../assets/logo-NoBg.png';
import UserProfilePic from '../../../assets/userProfilePic.png';
import './Header.css';

function Header() {
	var _useState = useState(false),
	    _useState2 = _slicedToArray(_useState, 2),
	    isActive = _useState2[0],
	    setisActive = _useState2[1];

	var _useContext = useContext(ReactReduxContext),
	    store = _useContext.store;

	var _store$getState$auth = store.getState().auth,
	    isLoggedIn = _store$getState$auth.isLoggedIn,
	    user = _store$getState$auth.user;


	var dispatch = useDispatch();

	useEffect(function () {
		history.listen(function (location) {
			dispatch(clearMessage()); // clear message when changing location
		});
	}, []);

	return React.createElement(
		"header",
		{ className: "Header site-header" },
		React.createElement(
			"div",
			{ className: "header-wrapper navbar navbar-default ml-5" },
			React.createElement(
				"div",
				{ className: "navbar header-inner navbar-light shadow bg-light fixed-top" },
				React.createElement(
					"nav",
					{ className: "nav container navbar-center navbar-expand-lg" },
					React.createElement(
						"section",
						{ className: "logoArt mr-auto pl-lg-1" },
						React.createElement(
							NavLink,
							{ to: "/", className: "logoArt-href" },
							React.createElement("img", { src: Logo, alt: "LOGO" })
						)
					),
					React.createElement(
						"section",
						{ className: "collapse navbar-collapse ml-auto", id: "navbar4" },
						React.createElement(
							"ul",
							{ className: "navbar-nav ml-auto pl-lg-4 d-flex justify-content-end ms-auto w-50" },
							React.createElement(
								"article",
								{ className: "container justify-content-around d-flex" },
								React.createElement(
									"li",
									{ className: "nav-item px-lg-2  text-decoration-none" },
									React.createElement(
										NavLink,
										{ to: "/Courses", className: "nav-link font-weight-bold", exact: true },
										React.createElement(
											"b",
											null,
											"Courses"
										)
									)
								),
								React.createElement(
									"li",
									{ className: "nav-item px-lg-2 text-decoration-none" },
									React.createElement(
										NavLink,
										{ to: "/Coaches", className: "nav-link font-weight-bold", exact: true },
										React.createElement(
											"b",
											null,
											"Coaches"
										)
									)
								),
								React.createElement(
									"li",
									{ className: "nav-item px-lg-3 text-decoration-none d-flex my-auto" },
									React.createElement(
										NavLink,
										{ to: "/LangBg", className: "nav-link font-weight-bold border-right p-0 pr-2 langBg", exact: true },
										"BG"
									),
									React.createElement(
										NavLink,
										{ to: "/LangEn", className: "nav-link font-weight-bold p-0 pl-2 me-2", exact: true },
										React.createElement(
											"b",
											null,
											"EN"
										)
									)
								)
							),
							React.createElement(
								"article",
								{ className: "d-flex justify-content-end", style: { width: 10 + 'em' }, id: "userProfile" },
								React.createElement(
									"li",
									{ className: "nav-item px-lg-2  text-decoration-none d-flex justify-content-end" },
									React.createElement(
										NavLink,
										{ to: "/MyProfile", className: "nav-link col-xl-5 p-0" },
										React.createElement("img", { src: UserProfilePic, alt: "User", className: "img-fluid rounded" })
									)
								)
							),
							isLoggedIn ? React.createElement(
								"div",
								{ className: "navbar-nav ml-auto" },
								React.createElement(
									"li",
									{ className: "nav-item" },
									React.createElement(
										NavLink,
										{ to: "/MyProfile", className: "nav-link" },
										user.email
									)
								),
								React.createElement(
									"li",
									{ className: "nav-item" },
									React.createElement(
										NavLink,
										{ to: "/Logout", className: "nav-link btn btn-secondary" },
										"LogOut"
									)
								)
							) : React.createElement(
								"div",
								{ className: "navbar-nav ml-auto" },
								React.createElement(
									"li",
									{ className: "nav-item" },
									React.createElement(
										NavLink,
										{ to: "/Login", className: "btn btn-outline-info font-weight-bold", exact: true },
										React.createElement(
											"b",
											null,
											"Login"
										)
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						null,
						React.createElement(
							"article",
							{ className: "nav-item container" },
							React.createElement(
								"div",
								{
									onClick: function onClick() {
										setisActive(!isActive);
									},
									role: "button",
									className: "navbar-burger burger " + (isActive ? "is-active" : "") + " navbar-toggler navbar-toggler-right border-0",
									"aria-label": "menu",
									"aria-expanded": "false" },
								React.createElement("span", { className: "navbar-toggler-icon" })
							)
						)
					),
					React.createElement(
						"div",
						{ className: "collapse nav-bar navbar-burger burger " + (isActive ? "show container" : ""), id: "navbar4" },
						React.createElement(
							"ul",
							{ className: "navbar-nav mr-auto pl-lg-4 justify-content-center w-100" },
							React.createElement(
								"li",
								{ className: "nav-item px-lg-2" },
								React.createElement(
									NavLink,
									{ to: "/Language", className: "nav-link text-center", exact: true },
									React.createElement(
										"span",
										{ className: "d-inline-block d-lg-none icon-width" },
										React.createElement("i", { className: "fas fa-globe-europe" })
									),
									"BG|EN"
								)
							),
							React.createElement(
								"li",
								{ className: "nav-item px-lg-2" },
								React.createElement(
									NavLink,
									{ className: "nav-link text-center", to: "/Courses" },
									React.createElement(
										"span",
										{ className: "d-inline-block d-lg-none icon-width" },
										React.createElement("i", { className: "fas fa-spa" })
									),
									"Courses"
								)
							),
							React.createElement(
								"li",
								{ className: "nav-item px-lg-2" },
								React.createElement(
									NavLink,
									{ className: "nav-link text-center", to: "/Coaches" },
									React.createElement(
										"span",
										{ className: "d-inline-block d-lg-none icon-width" },
										React.createElement("i", { className: "fas fa-chalkboard-teacher" })
									),
									"Coaches"
								)
							),
							React.createElement(
								"li",
								{ className: "nav-item px-lg-2" },
								React.createElement(
									NavLink,
									{ className: "nav-link text-center", to: "/MyProfile" },
									React.createElement(
										"span",
										{ className: "d-inline-block d-lg-none icon-width" },
										React.createElement("i", { className: "far fa-user" })
									),
									"My Profile"
								)
							)
						)
					)
				)
			)
		)
	);
}

export default Header;
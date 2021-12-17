var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import logo from "../../../assets/logo-NoBg.png";
import manKey from "../../../assets/manKey.png";

import notificationContext from "../../../Context/NotificationContext";

import { login } from "../../../actions/auth";

var Login = function Login(props) {
  var form = useRef();
  var checkBtn = useRef();

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      email = _useState2[0],
      setEmail = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  var _useSelector = useSelector(function (state) {
    return state.auth;
  }),
      isLoggedIn = _useSelector.isLoggedIn;

  var _useSelector2 = useSelector(function (state) {
    return state.message;
  }),
      message = _useSelector2.message;

  var _useContext = useContext(notificationContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      notification = _useContext2[0],
      setNotification = _useContext2[1];

  var dispatch = useDispatch();

  var onChangeEmail = function onChangeEmail(e) {
    var email = e.target.value;
    setEmail(email);
  };

  var onChangePassword = function onChangePassword(e) {
    var password = e.target.value;
    setPassword(password);
  };

  var handleLogin = function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password)).then(function () {
        props.history.push("/MyProfile");
        setNotification({ type: 'LOGIN_SUCCESS', payload: "Welcome " + email + "!" });
      }).catch(function () {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return React.createElement(Redirect, { to: "/MyProfile" });
  }

  return React.createElement(
    "div",
    { className: "row" },
    React.createElement(
      "div",
      { className: "container col-md-6" },
      React.createElement("img", { src: manKey, alt: "IMG" })
    ),
    React.createElement(
      "div",
      { className: "base-container col-md-6" },
      React.createElement(
        "div",
        { className: "image" },
        React.createElement("img", { src: logo, alt: "" })
      ),
      React.createElement(
        "div",
        { className: "header text-dark" },
        React.createElement("br", null),
        " ",
        React.createElement("br", null),
        React.createElement(
          "p",
          null,
          "Welcome back! ",
          React.createElement("br", null),
          "Please login to your account!"
        )
      ),
      React.createElement(
        Form,
        { onSubmit: handleLogin, ref: form },
        React.createElement(
          "div",
          { className: "content" },
          React.createElement(
            "div",
            { className: "form " },
            React.createElement(
              "div",
              { className: "form-group " },
              React.createElement("label", { htmlFor: "email" }),
              React.createElement(Input, {
                type: "text",
                className: "form-control",
                name: "email",
                placeholder: "Email Address",
                value: email,
                onChange: onChangeEmail,
                validations: [required] })
            ),
            React.createElement(
              "div",
              { className: "form-group " },
              React.createElement("label", { htmlFor: "password" }),
              React.createElement(Input, {
                type: "password",
                className: "form-control",
                name: "password",
                placeholder: "Password",
                value: password,
                onChange: onChangePassword,
                validations: [required] })
            ),
            React.createElement(
              "div",
              { className: "form-check text-primary" },
              React.createElement("input", { type: "checkbox", className: "form-check-input", id: "exampleCheck1" }),
              React.createElement(
                "label",
                { className: "form-check-label" },
                "Remember me"
              )
            ),
            React.createElement(
              "div",
              { className: "link-info" },
              React.createElement(
                "a",
                { href: "url" },
                "Forgot Password?"
              )
            ),
            React.createElement("br", null),
            React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "button",
                { className: "btn btn-primary btn-block", disabled: loading },
                loading && React.createElement("span", { className: "spinner-border spinner-border-sm" }),
                React.createElement(
                  "span",
                  null,
                  "Login"
                )
              ),
              React.createElement(
                Link,
                { to: "/Register", className: "btn btn-outline-primary col-xs-2 mx-3", type: "button" },
                " Sign Up"
              )
            ),
            message && React.createElement(
              "div",
              { className: "form-group" },
              React.createElement(
                "div",
                { className: "alert alert-danger", role: "alert" },
                message
              )
            )
          )
        ),
        React.createElement(CheckButton, { style: { display: "none" }, ref: checkBtn })
      )
    )
  );
};

var required = function required(value) {
  if (!value) {
    return React.createElement(
      "div",
      { className: "alert alert-danger", role: "alert" },
      "This field is required!"
    );
  }
};

export default Login;
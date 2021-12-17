import React, { useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import logo from "../../../assets/UpSkillLogo.png";
import manKey from "../../../assets/manKey.png";

import notificationContext from "../../../Context/NotificationContext";
import zoomContext from "../../../Context/ZoomContext";

import { login } from "../../../actions/auth";

import "./Login.css";

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [joinCourses, sendJoinMessage, startRoom, sendInviteMessage, receiveMessage, closeConnection, connection] = useContext(zoomContext);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  let [notification, setNotification] = useContext(notificationContext);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      await dispatch(login(email, password))
        .then(async () => {
          closeConnection();
          joinCourses();
          props.history.push("/MyProfile");
          setNotification({ type: 'LOGIN_SUCCESS', payload: `Welcome ${email}!` });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/MyProfile" />;
  }

  return (
    <div className="AuthWrapper">
      <div className="row p-5">
        <div className="container col-md-6 login-photos">
          <div id="log-triangle"></div>
          <img src={manKey} alt="IMG" className="login-Image" />
        </div>
        <div className="base-container col-md-6 mt-4 text-center">
          <a href="/home" className="image text-center">
            <img src={logo} alt="UpSkill" className="Auth-logo" />
          </a>
          <div className="header text-dark text-center m-3">
            <h1 className="fw-bolder">Welcome back!</h1>
            <h5>Please login to your account!</h5>
          </div>
          <Form onSubmit={handleLogin} ref={form}>
            <div className="content auth-form mt-3">
              <div className="form auth-form-wrapper">
                <div className="form-group auth-form-internal">
                  <label htmlFor="email"></label>
                  <Input
                    type="text"
                    className="form-control p-3 auth-form-Input"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required]} />
                </div>
                <div className="form-group auth-form-internal">
                  <label htmlFor="password"></label>
                  <Input
                    type="password"
                    className="form-control p-3 auth-form-Input"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]} />
                </div>
                <div className="login-form-btns-wrapper">
                  <div className="d-flex justify-content-between">
                    <div className="form-check text-primary">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label">Remember me</label>
                    </div>
                    <div className="link-info">
                      <a href="url">Forgot Password?</a>
                    </div>
                  </div>
                  <br />
                  <div className="form-group d-flex justify-content-between flex-wrap">
                    <button className="btn btn-primary btn-block px-5 m-auto mt-2" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <h4 className="auth-btn-internal">LogIn<span className="login-dots">...</span></h4>
                    </button>
                    <Link to="/Register" className="btn btn-outline-primary col-xs-2 px-5 m-auto mt-2" type="button"><h4 className="auth-btn-internal">SignUp</h4></Link>
                  </div>
                  {message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
}

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default Login;

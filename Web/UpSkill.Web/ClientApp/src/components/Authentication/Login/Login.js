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

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/");
          setNotification({type:'LOGIN_SUCCESS', payload: `Welcome ${email}!`});
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      <div className="container col-md-6">
        <img src={manKey} alt="IMG" />
      </div>
      <div className="base-container col-md-6">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <div className="header text-dark">
          <br /> <br />
          <p>Welcome back! <br />Please login to your account!</p>
        </div>
        <Form onSubmit={handleLogin} ref={form}>
          <div className="content">
            <div className="form ">
              <div className="form-group ">
                <label htmlFor="email"></label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]} />
              </div>

              <div className="form-group ">
                <label htmlFor="password"></label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]} />
              </div>

              <div className="form-check text-primary">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label">Remember me</label>
              </div>
              <div className="link-info">
                <a href="url">Forgot Password?</a>
              </div> 
              <br/> 
              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button> 
                <Link to="/Register" className="btn btn-outline-primary col-xs-2 mx-3" type="button"> Sign Up</Link>
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
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
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

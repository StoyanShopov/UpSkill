import React, { useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import logo from '../../../assets/UpSkillLogo.png';
import manCase from '../../../assets/manCase.png';

import notificationContext from '../../../Context/NotificationContext';

import { register } from '../../../actions/auth';

import './Register.css';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vconfirmPassword = (value) => {
  if (value.confirmPassword !== value.password) {
    return (
      <div className="alert alert-danger" role="alert">
        Confirm Password does not match.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  let [notification, setNotification] = useContext(notificationContext);

  const dispatch = useDispatch();

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const onChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        register(
          firstName,
          lastName,
          companyName,
          email,
          password,
          confirmPassword
        )
      )
        .then(() => {
          setSuccessful(true);
          setNotification({
            type: 'REGISTER_SUCCESS',
            payload: `Welcome ${email}!`,
          });
        })
        .catch(() => {
          setSuccessful(false);
          setNotification({ type: 'REGISTER_FAIL', payload: `` });
        });
    }
  };

  return (
    <div className="AuthWrapper">
      <div className="row">
        <div className="container col-md-6 login-photos">
          <div id="reg-triangle"></div>
          <img src={manCase} alt="Man with a case." className="register-Image" />
        </div>
        <div className="base-container col-md-6 mt-5 text-center p-5">
          <div className="image">
            <Link to="/" className="image text-center">
              <img src={logo} alt="UpSkill" className="Auth-logo" />
            </Link>
          </div>
          <Form onSubmit={handleRegister} ref={form} className="mt-3 auth-form">
            <div className="auth-form-internal">
              {!successful && (
                <div className="">
                  <div className="form-group">
                    <label htmlFor="firstName"></label>
                    <Input
                      type="text"
                      className="form-control auth-form-Input"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={onChangeFirstName}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="lastName"></label>
                    <Input
                      type="text"
                      className="form-control auth-form-Input"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={onChangeLastName}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="companyName"></label>
                    <Input
                      type="text"
                      className="form-control auth-form-Input"
                      name="companyName"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={onChangeCompanyName}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="email"></label>
                    <Input
                      type="text"
                      className="form-control auth-form-Input"
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="password"></label>
                    <Input
                      type="password"
                      className="form-control auth-form-Input"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group ">
                    <label htmlFor="confirmPassword"></label>
                    <Input
                      type="password"
                      className="form-control auth-form-Input"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={onChangeConfirmPassword}
                      validations={[required, vconfirmPassword]}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <button className="btn btn-primary btn-block px-5 m-auto mt-2">                      
                      <h4 className="auth-btn-internal">SignUp</h4>
                    </button>
                    <br />
                    <br />
                    <div className="link-info">
                      <a href="/Login">
                        <p>Already have an account?</p>
                        <b>Login here</b>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? 'alert alert-success' : 'alert alert-danger'
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;

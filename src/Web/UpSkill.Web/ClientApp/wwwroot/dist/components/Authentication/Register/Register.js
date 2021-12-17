var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import logo from '../../../assets/logo-NoBg.png';
import manCase from '../../../assets/manCase.png';

import notificationContext from '../../../Context/NotificationContext';

import { register } from '../../../actions/auth';

var required = function required(value) {
  if (!value) {
    return React.createElement(
      'div',
      { className: 'alert alert-danger', role: 'alert' },
      'This field is required!'
    );
  }
};

var validEmail = function validEmail(value) {
  if (!isEmail(value)) {
    return React.createElement(
      'div',
      { className: 'alert alert-danger', role: 'alert' },
      'This is not a valid email.'
    );
  }
};

var vpassword = function vpassword(value) {
  if (value.length < 6 || value.length > 40) {
    return React.createElement(
      'div',
      { className: 'alert alert-danger', role: 'alert' },
      'The password must be between 6 and 40 characters.'
    );
  }
};

var vconfirmPassword = function vconfirmPassword(value) {
  if (value.confirmPassword !== value.password) {
    return React.createElement(
      'div',
      { className: 'alert alert-danger', role: 'alert' },
      'Confirm Password does not match.'
    );
  }
};

var Register = function Register() {
  var form = useRef();
  var checkBtn = useRef();

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      firstName = _useState2[0],
      setFirstName = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      lastName = _useState4[0],
      setLastName = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      companyName = _useState6[0],
      setCompanyName = _useState6[1];

  var _useState7 = useState(''),
      _useState8 = _slicedToArray(_useState7, 2),
      email = _useState8[0],
      setEmail = _useState8[1];

  var _useState9 = useState(''),
      _useState10 = _slicedToArray(_useState9, 2),
      password = _useState10[0],
      setPassword = _useState10[1];

  var _useState11 = useState(''),
      _useState12 = _slicedToArray(_useState11, 2),
      confirmPassword = _useState12[0],
      setConfirmPassword = _useState12[1];

  var _useState13 = useState(false),
      _useState14 = _slicedToArray(_useState13, 2),
      successful = _useState14[0],
      setSuccessful = _useState14[1];

  var _useSelector = useSelector(function (state) {
    return state.message;
  }),
      message = _useSelector.message;

  var _useContext = useContext(notificationContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      notification = _useContext2[0],
      setNotification = _useContext2[1];

  var dispatch = useDispatch();

  var onChangeFirstName = function onChangeFirstName(e) {
    var firstName = e.target.value;
    setFirstName(firstName);
  };

  var onChangeLastName = function onChangeLastName(e) {
    var lastName = e.target.value;
    setLastName(lastName);
  };

  var onChangeCompanyName = function onChangeCompanyName(e) {
    var companyName = e.target.value;
    setCompanyName(companyName);
  };

  var onChangeEmail = function onChangeEmail(e) {
    var email = e.target.value;
    setEmail(email);
  };

  var onChangePassword = function onChangePassword(e) {
    var password = e.target.value;
    setPassword(password);
  };

  var onChangeConfirmPassword = function onChangeConfirmPassword(e) {
    var confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  var handleRegister = function handleRegister(e) {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, companyName, email, password, confirmPassword)).then(function () {
        setSuccessful(true);
        setNotification({
          type: 'REGISTER_SUCCESS',
          payload: 'Welcome ' + email + '!'
        });
      }).catch(function () {
        setSuccessful(false);
        setNotification({ type: 'REGISTER_FAIL', payload: '' });
      });
    }
  };

  return React.createElement(
    'div',
    { className: 'row' },
    React.createElement(
      'div',
      { className: 'container col-md-6' },
      React.createElement('img', { src: manCase, alt: 'IMG' })
    ),
    React.createElement(
      'div',
      { className: 'base-container col-md-6' },
      React.createElement(
        'div',
        { className: 'image' },
        React.createElement('img', { src: logo, alt: '' })
      ),
      React.createElement(
        Form,
        { onSubmit: handleRegister, ref: form },
        !successful && React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'firstName' }),
            React.createElement(Input, {
              type: 'text',
              className: 'form-control',
              name: 'firstName',
              placeholder: 'First Name',
              value: firstName,
              onChange: onChangeFirstName,
              validations: [required]
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'lastName' }),
            React.createElement(Input, {
              type: 'text',
              className: 'form-control',
              name: 'lastName',
              placeholder: 'Last Name',
              value: lastName,
              onChange: onChangeLastName,
              validations: [required]
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'companyName' }),
            React.createElement(Input, {
              type: 'text',
              className: 'form-control',
              name: 'companyName',
              placeholder: 'Company Name',
              value: companyName,
              onChange: onChangeCompanyName,
              validations: [required]
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'email' }),
            React.createElement(Input, {
              type: 'text',
              className: 'form-control',
              name: 'email',
              placeholder: 'Email Address',
              value: email,
              onChange: onChangeEmail,
              validations: [required, validEmail]
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'password' }),
            React.createElement(Input, {
              type: 'password',
              className: 'form-control',
              name: 'password',
              placeholder: 'Password',
              value: password,
              onChange: onChangePassword,
              validations: [required, vpassword]
            })
          ),
          React.createElement(
            'div',
            { className: 'form-group ' },
            React.createElement('label', { htmlFor: 'confirmPassword' }),
            React.createElement(Input, {
              type: 'password',
              className: 'form-control',
              name: 'confirmPassword',
              placeholder: 'Confirm Password',
              value: confirmPassword,
              onChange: onChangeConfirmPassword,
              validations: [required, vconfirmPassword]
            })
          ),
          React.createElement('br', null),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'button',
              { className: 'btn btn-primary btn-block' },
              'Sign Up'
            ),
            React.createElement('br', null),
            React.createElement('br', null),
            React.createElement(
              'div',
              { className: 'link-info' },
              React.createElement(
                'p',
                null,
                'Already have an account?'
              ),
              ' ',
              React.createElement(
                'a',
                { href: '/Login' },
                React.createElement(
                  'b',
                  null,
                  'Login here'
                )
              )
            )
          )
        ),
        message && React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement(
            'div',
            {
              className: successful ? 'alert alert-success' : 'alert alert-danger',
              role: 'alert'
            },
            message
          )
        ),
        React.createElement(CheckButton, { style: { display: 'none' }, ref: checkBtn })
      )
    )
  );
};

export default Register;
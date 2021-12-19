var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';

import { addEmployee } from '../../../../../services/companyOwnerService';
import { enableBodyScroll } from '../../../../../utils/utils';

import './AddEmployee.css';

export default function AddEmployee(props) {
    var _useState = useState(""),
        _useState2 = _slicedToArray(_useState, 2),
        email = _useState2[0],
        setEmail = _useState2[1];

    var _useState3 = useState(""),
        _useState4 = _slicedToArray(_useState3, 2),
        fullName = _useState4[0],
        setFullName = _useState4[1];

    var _useState5 = useState(""),
        _useState6 = _slicedToArray(_useState5, 2),
        position = _useState6[0],
        setPosition = _useState6[1];

    var saveEmployee = function saveEmployee(e) {
        e.preventDefault();

        addEmployee(fullName, email, position);
    };

    var onChangeEmail = function onChangeEmail(e) {
        var email = e.target.value;
        setEmail(email);
    };

    var onChangefullName = function onChangefullName(e) {
        var fullName = e.target.value;
        setFullName(fullName);
    };

    var onChangePosition = function onChangePosition(e) {
        var position = e.target.value;
        setPosition(position);
    };
    function closePopup() {
        enableBodyScroll();
        props.onAddEmployee(false);
    }

    return props.trigger ? React.createElement(
        'div',
        { className: 'popup' },
        React.createElement(
            'div',
            { className: 'popup-inner' },
            React.createElement(
                'div',
                { className: 'popup-Header' },
                React.createElement(
                    'div',
                    { className: 'closebtn d-flex justify-content-end p-2' },
                    React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return closePopup();
                            }, className: 'closebtn btn' },
                        React.createElement('i', { className: 'fas fa-times' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'uploadCSV d-flex justify-content-end px-3' },
                    React.createElement(
                        'button',
                        { className: 'closebtn btn btn-outline-light' },
                        'Upload CSV file'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'popup-Title p-2' },
                    React.createElement(
                        'h4',
                        null,
                        'Add Employee'
                    )
                )
            ),
            React.createElement(
                'form',
                { onSubmit: saveEmployee },
                React.createElement(
                    'div',
                    { className: 'addEmployee-Content px-5 m-5' },
                    React.createElement(
                        'div',
                        { className: 'addEmployee-Content-fullname px-5 m-3' },
                        React.createElement('input', { type: 'text', name: 'fullName', placeholder: 'Full Name*', value: fullName, onChange: onChangefullName, className: 'addEmployee-Content-input w-100 p-2' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'addEmployee-Content-email px-5 m-3' },
                        React.createElement('input', { type: 'text', name: 'email', placeholder: 'Email Address*', value: email, onChange: onChangeEmail, className: 'addEmployee-Content-input w-100 p-2' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'addEmployee-Content-email px-5 m-3' },
                        React.createElement('input', { type: 'text', name: 'position', placeholder: 'Position*', value: position, onChange: onChangePosition, className: 'addEmployee-Content-input w-100 p-2' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'addEmployee-actions d-flex px-5 d-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { className: 'addEmployee-actions-cancel-wrapper px-3' },
                        React.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return closePopup();
                                }, className: 'addEmployee-actions-cancel btn-outline-primary px-3 fw-bold' },
                            'Cancel'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'addEmployee-actions-save-wrapper px-3' },
                        React.createElement('input', { type: 'submit', className: 'addEmployee-actions-save btn-primary px-4 fw-bold', value: 'Save' })
                    )
                )
            )
        )
    ) : '';
}
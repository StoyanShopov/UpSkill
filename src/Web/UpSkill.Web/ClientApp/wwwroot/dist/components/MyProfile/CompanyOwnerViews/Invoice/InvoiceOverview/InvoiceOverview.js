var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';

import './InvoiceOverview.css';

import { getInvoiceStatus } from "../../../../../services/companyOwnerService";
import { getDueDate } from "../../../../../services/companyOwnerService";

function InvoiceOverview() {
    var _useState = useState(),
        _useState2 = _slicedToArray(_useState, 2),
        status = _useState2[0],
        setStatus = _useState2[1];

    var _useState3 = useState(),
        _useState4 = _slicedToArray(_useState3, 2),
        dueDate = _useState4[0],
        setDueDate = _useState4[1];

    useEffect(function () {
        getInvoiceStatus('').then(function (status) {
            setStatus(status);
        });
        getDueDate('').then(function (date) {
            setDueDate(date);
        });
    }, []);

    return React.createElement(
        'div',
        { className: 'table' },
        React.createElement(
            'div',
            { className: 'Overview d-flex mt-5 mb-4 shadow px-5 py-4' },
            React.createElement(
                'div',
                { className: 'Overview-count Overview-cell' },
                React.createElement(
                    'h4',
                    null,
                    'Invoice Status'
                ),
                React.createElement(
                    'h3',
                    { className: 'invoice-status' },
                    status
                )
            ),
            React.createElement(
                'div',
                { className: 'Overview-activeCourses invoice-date-wrapper Overview-cell' },
                React.createElement(
                    'h4',
                    null,
                    'Due Date'
                ),
                React.createElement(
                    'h4',
                    { className: 'invoice-date' },
                    dueDate
                )
            ),
            React.createElement(
                'div',
                { className: 'Overview-activeCoaches Overview-cell' },
                React.createElement(
                    'h4',
                    { className: 'btn btn-outline-primary btn-download' },
                    'Download'
                )
            )
        )
    );
}

export default InvoiceOverview;
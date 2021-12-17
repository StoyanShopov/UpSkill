var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';

import './InvoicePriceTable.css';

import { getSubscriptionsForCompanyOwner } from "../../../../../services/companyOwnerService";

function InvoicePriceTable() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        subscriptions = _useState2[0],
        setSubscriptions = _useState2[1];

    var _useState3 = useState('9'),
        _useState4 = _slicedToArray(_useState3, 2),
        currentMount = _useState4[0],
        setCurrentMount = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        currentMountName = _useState6[0],
        setCurrentMountName = _useState6[1];

    var _useState7 = useState(''),
        _useState8 = _slicedToArray(_useState7, 2),
        totalForMonth = _useState8[0],
        setTotalForMonth = _useState8[1];

    useEffect(function () {
        getSubscriptionsForCompanyOwner('', currentMount).then(function (mount) {
            var _mount = _slicedToArray(mount, 3),
                name = _mount[0],
                subscriptions = _mount[1],
                totalForMonth = _mount[2];

            setSubscriptions(subscriptions);
            setTotalForMonth(totalForMonth);
            setCurrentMountName(name);
        });
    }, [currentMount]);

    function changeMount(toMount) {
        var nextOrPrev = parseInt(currentMount) + toMount;
        setCurrentMount(nextOrPrev.toString());
    }

    return React.createElement(
        'div',
        { className: 'wrap-table100 mt-5 shadow mb-5 bg-body rounded' },
        React.createElement(
            'div',
            { className: 'ourTable' },
            React.createElement(
                'div',
                { className: 'table-row table-monthHeading-wrapper header-EmployeeCourse align-content-center' },
                React.createElement(
                    'div',
                    { className: 'cell px-2 table-monthHeading' },
                    React.createElement(
                        'button',
                        { className: 'fw-bolder', onClick: function onClick(e) {
                                return changeMount(-1);
                            } },
                        '<'
                    ),
                    React.createElement(
                        'span',
                        null,
                        currentMountName
                    ),
                    React.createElement(
                        'button',
                        { className: 'fw-bolder', onClick: function onClick(e) {
                                return changeMount(1);
                            } },
                        '>'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'table-row header-CoursesEnrolled header-invoice' },
                React.createElement(
                    'div',
                    { className: 'cell cell-header-subscription' },
                    'Course/Coach'
                ),
                React.createElement(
                    'div',
                    { className: 'cell cell-header-date' },
                    'Date'
                ),
                React.createElement(
                    'div',
                    { className: 'cell cell-header-price' },
                    'Price'
                )
            ),
            React.createElement(
                'div',
                { className: 'table-content d-flex ' },
                React.createElement(
                    'div',
                    { className: 'table-content-names w-50' },
                    subscriptions.map(function (subscription) {
                        return React.createElement(
                            'div',
                            { className: 'table-row px-3', key: subscription.name },
                            React.createElement(
                                'div',
                                { className: 'cell name-cell-data', 'data-title': 'Course / Coach', href: subscription.price, date: subscription.date },
                                subscription.name
                            )
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'table-content-emails w-25' },
                    subscriptions.map(function (subscription) {
                        return React.createElement(
                            'div',
                            { className: 'table-row px-3', key: subscription.name },
                            React.createElement(
                                'div',
                                { className: 'cell courses-cell-data', 'data-title': 'SubscriptionDate' },
                                subscription.date
                            )
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'table-content-emails w-25' },
                    subscriptions.map(function (subscription) {
                        return React.createElement(
                            'div',
                            { className: 'table-row px-3', key: subscription.name },
                            React.createElement(
                                'div',
                                { className: 'cell courses-cell-price', 'data-title': 'SubscriptionPrice' },
                                subscription.price
                            )
                        );
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'table-row px-3' },
                React.createElement(
                    'div',
                    { className: 'table-totalForMonth d-flex', 'data-mdb-ripple-color': 'dark' },
                    React.createElement(
                        'div',
                        { className: 'totalForMonth-heading w-50 cell border-0' },
                        React.createElement(
                            'h5',
                            { className: 'fw-bold' },
                            'Total'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'totalForMonth-content w-50 text-align-end cell border-0' },
                        React.createElement(
                            'h5',
                            { className: 'fw-bold text-right' },
                            totalForMonth
                        )
                    )
                )
            )
        )
    );
}

export default InvoicePriceTable;
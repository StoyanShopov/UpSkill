var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';

import { getCoachesSessionsForCompanyOwner } from '../../../../../services/coachService';

import './CoachesSessionsTable.css';

function CoachesSessionsTable() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        courses = _useState2[0],
        setCourses = _useState2[1];

    var _useState3 = useState(0),
        _useState4 = _slicedToArray(_useState3, 2),
        currentPage = _useState4[0],
        setCurrentPage = _useState4[1];

    var _useState5 = useState('9'),
        _useState6 = _slicedToArray(_useState5, 2),
        currentMount = _useState6[0],
        setCurrentMount = _useState6[1];

    var _useState7 = useState(''),
        _useState8 = _slicedToArray(_useState7, 2),
        currentMountName = _useState8[0],
        setCurrentMountName = _useState8[1];

    useEffect(function () {
        getCoachesSessionsForCompanyOwner('', currentPage, currentMount).then(function (mount) {
            var _mount = _slicedToArray(mount, 2),
                name = _mount[0],
                courses = _mount[1];

            setCourses(courses);
            setCurrentMountName(name);
        });
    }, [currentPage, currentMount]);

    function showMoreCourses() {
        var next = currentPage + 1;
        setCurrentPage(next);
        getCoachesSessionsForCompanyOwner('', next, currentMount).then(function (mount) {
            var _mount2 = _slicedToArray(mount, 2),
                name = _mount2[0],
                courses = _mount2[1];

            setCourses(courses);
            setCurrentMountName(name);
        });
    }

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
                { className: 'table-row table-monthHeading-wrapper header-CoachesSessions align-content-center' },
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
                { className: 'table-row header-CoachesSessions' },
                React.createElement(
                    'div',
                    { className: 'cell cell-header' },
                    'Coach Name'
                ),
                React.createElement(
                    'div',
                    { className: 'cell cell-header' },
                    'Sessions'
                )
            ),
            React.createElement(
                'div',
                { className: 'table-content d-flex ' },
                React.createElement(
                    'div',
                    { className: 'table-content-names w-50' },
                    courses.map(function (course) {
                        return React.createElement(
                            'div',
                            { className: 'table-row px-3', key: course.name },
                            React.createElement(
                                'div',
                                { className: 'cell cell-data-Employees-Coaches name-cell-data', 'data-title': 'Coach', href: course.enrolled },
                                course.name
                            )
                        );
                    })
                ),
                React.createElement(
                    'div',
                    { className: 'table-content-emails w-50' },
                    courses.map(function (course) {
                        return React.createElement(
                            'div',
                            { className: 'table-row px-3', key: course.name },
                            React.createElement(
                                'div',
                                { className: 'cell cell-data-Employees-Courses table-cell-data', 'data-title': 'EmployeesEnrolled' },
                                course.enrolled
                            )
                        );
                    })
                )
            ),
            React.createElement(
                'div',
                { className: 'table-row' },
                React.createElement(
                    'div',
                    { className: 'table-viewMoreLink', 'data-mdb-ripple-color': 'dark' },
                    React.createElement(
                        'span',
                        { className: 'btn btn-link cell-data-Employees-Courses button-CoachesSessions', onClick: showMoreCourses },
                        'View More'
                    )
                )
            )
        )
    );
}

export default CoachesSessionsTable;
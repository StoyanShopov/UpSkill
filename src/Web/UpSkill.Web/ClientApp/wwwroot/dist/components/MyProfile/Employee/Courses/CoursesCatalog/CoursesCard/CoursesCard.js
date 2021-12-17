import React from 'react';

import './CoursesCard.css';
import googleImg from '../../../../../../assets/img/courses/google.png';

export default function CoursesCard(props) {
    var _props$coursesDetails = props.coursesDetails,
        courseTitle = _props$coursesDetails.courseTitle,
        courseCoachFirstName = _props$coursesDetails.courseCoachFirstName,
        courseCoachLastName = _props$coursesDetails.courseCoachLastName,
        courseFileFilePath = _props$coursesDetails.courseFileFilePath;


    var fullName = courseCoachFirstName + ' ' + courseCoachLastName;

    return React.createElement(
        'div',
        { className: 'coursesCard' },
        React.createElement(
            'div',
            { className: 'courses-file-wrapper' },
            React.createElement('img', { src: courseFileFilePath, className: 'courses-file', alt: '' }),
            React.createElement(
                'h2',
                { className: 'title-position-on-file' },
                courseTitle
            )
        ),
        React.createElement(
            'div',
            { className: 'courses-content w-75' },
            React.createElement(
                'div',
                { className: 'coursesInfo d-flex justify-content-between mt-3' },
                React.createElement(
                    'span',
                    { className: 'courses-courseField' },
                    courseTitle
                ),
                React.createElement(
                    'span',
                    { className: 'courses-fullName' },
                    fullName
                ),
                React.createElement(
                    'h6',
                    null,
                    React.createElement('img', { src: googleImg, alt: 'Google', className: 'bage-position' })
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'btn-wrapper' },
            props.children
        )
    );
}
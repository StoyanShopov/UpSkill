import React from 'react';
import { Button } from 'react-bootstrap';

import CoursesCard from './CoursesCard/CoursesCard';

import './CoursesCatalog.css';

export default function CoursesCatalog(_ref) {
    var courses = _ref.courses;

    return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
            'div',
            { className: 'row list-unstyled myProfile-courses-list' },
            courses.map(function (course) {
                return React.createElement(
                    'div',
                    { className: 'col-sm-5 text-align-center', key: course.id },
                    React.createElement(
                        CoursesCard,
                        {
                            key: course.id,
                            coursesDetails: course
                        },
                        React.createElement(
                            Button,
                            { className: 'courses-cardButton' },
                            'Compete'
                        )
                    )
                );
            })
        )
    );
}
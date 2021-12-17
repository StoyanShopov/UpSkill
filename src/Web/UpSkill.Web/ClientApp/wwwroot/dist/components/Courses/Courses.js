import React from 'react';

import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCatalog from './CoursesCatalog/CoursesCatalog';

import './Courses.css';

export default function Courses() {
  return React.createElement(
    'div',
    { className: 'content' },
    React.createElement(CategoriesAndLanguageMenu, { atPage: 'Courses' }),
    React.createElement(
      'div',
      { className: 'wrapper row' },
      React.createElement(CoursesCatalog, null)
    )
  );
}
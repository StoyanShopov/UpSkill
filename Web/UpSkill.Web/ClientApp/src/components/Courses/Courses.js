import React from 'react';

import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCatalog from './CoursesCatalog/CoursesCatalog';

import './Courses.css';

export default function Courses() {
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Courses" />
      <div className="wrapper row">
        <CoursesCatalog />
      </div>
    </div>
  );
}

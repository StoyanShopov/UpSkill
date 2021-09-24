import React from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCard from '../CoursesCard/CoursesCard';


import './Courses.css';


export default function Courses() {
    return (
      <div className="content">
            <CategoriesAndLanguageMenu atPage="Courses"/>

          <CoursesCard></CoursesCard>
      </div>
    );
  }
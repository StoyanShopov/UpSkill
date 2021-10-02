import React from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCard from '../CoursesCard/CoursesCard';
import EmployeesPositionCard from '../EmployeesPositionCard/EmployeesPositionCard';

import Coaches from '../Coaches/Coaches';

import './Courses.css';

export default function Courses() {
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Courses" />

      <CoursesCard />
      
    </div>
  );
}

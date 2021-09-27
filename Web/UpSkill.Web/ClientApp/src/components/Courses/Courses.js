import React from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoursesCard from '../CoursesCard/CoursesCard';
import EmployeesPositionCard from '../EmployeesPositionCard/EmployeesPositionCard';

import './Courses.css';

export default function Courses() {
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Courses" />

      <EmployeesPositionCard />
    </div>
  );
}

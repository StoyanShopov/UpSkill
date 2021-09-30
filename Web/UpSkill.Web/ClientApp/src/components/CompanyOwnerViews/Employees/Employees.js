import React from 'react';
import EmployeeCourseInfo from './EmployeeCourseInfo/EmployeeCourseInfo';
import EmployeeCoachInfo from './EmployeeCoachInfo/EmployeeCoachInfo';

import './Employees.css';


export default function Employees() {
    return (
      <div className="content w-100 px-5 main-content">
          <EmployeeCourseInfo />
           
          <EmployeeCoachInfo />
      </div>
    );
  }

  
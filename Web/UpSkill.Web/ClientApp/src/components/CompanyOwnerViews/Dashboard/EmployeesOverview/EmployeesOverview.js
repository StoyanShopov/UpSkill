import React, { useEffect, useState } from 'react';

import './EmployeesOverview.css';

import { getEmployeesTotalCountCompanyOwner } from "../../../../services/employeeService";
import { getActiveCoachesCompanyOwner } from "../../../../services/coachService";
import { getActiveCoursesCompanyOwner } from "../../../../services/courseSevice";

function EmployeesOverview() {
    const [count, setCount ] = useState();
    const [activeCoaches, setActiveCoaches] = useState();    
    const [activeCourses, setActiveCourses] = useState();  

    useEffect(() => {
        getEmployeesTotalCountCompanyOwner('').then((emplCount) => {
          setCount(emplCount);
        });
        getActiveCoachesCompanyOwner('').then((coaches) => {
            setActiveCoaches(coaches);
          });
        
          getActiveCoursesCompanyOwner('').then((courses) => {
            setActiveCourses(courses);
          });
          console.log('render')
      }, [activeCourses]);        
         
    return (
            <div className="table">
                <div className="Overview d-flex mt-5 mb-4 shadow px-5 py-4">
                    <div className="Overview-count Overview-cell">
                        <h4>Employees</h4>
                        <h1 className="Overview-heading">{count}</h1>
                    </div>
                    <div className="Overview-activeCourses Overview-cell">
                        <h4>Active Courses</h4>
                        <h1 className="Overview-heading">{activeCoaches}</h1>
                    </div>
                    <div className="Overview-activeCoaches Overview-cell">
                        <h4>Active Coaches</h4>
                        <h1 className="Overview-heading">{activeCourses}</h1>
                    </div>
                </div>
            </div>
    );
}

export default EmployeesOverview;

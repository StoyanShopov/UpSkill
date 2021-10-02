import React, {useState, useEffect} from 'react';

import { getEmployeesCourseGrade } from '../../../../services/employeeService';


import './EmployeeCourseInfo.css';

export default function EmployeeCourseInfo() {
    let [allEmployees, setallEmployees] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getEmployeesCourseGrade(currentPage)
            .then(employees => {
                setallEmployees(employees);
            });
    }, [currentPage]);

    function showMoreEmployees() {
        let next = currentPage+1;
        setCurrentPage(next);
        getEmployeesCourseGrade(currentPage)
            .then(employees => {         
                setallEmployees([]);
                setallEmployees(arr=> [...arr,...employees]);
                
            });
    }

    return (
        <div className="">
                <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
                    <div className="table">
                        <div className="table-row header-EmployeeCourse">
                            <div className="cell cell-Employees-Courses">
                                Employee
                            </div>
                            <div className="cell cell-Employees-Courses">
                                Course Name
                            </div>
                            <div className="cell cell-Employees-Courses">
                                Grade
                            </div>
                        </div>
                        {allEmployees.map(employee=>{
                            return (
                                <div className="table-row" key={employee.name+employee.hours+employee.id}>
                                    <div className="cell cell-data-Employees-Courses" data-title="Employee">
                                        {employee.name}
                                    </div>                            
                                    <div className="cell" data-title="Coach">
                                        {employee.coach}
                                    </div>
                                    <div className="cell" data-title="Hours">
                                        {employee.hours}h
                                    </div>
                                </div>);
                        })}
                        <div className="table-row">
                                    <div className="table-viewMoreLink"  data-mdb-ripple-color="dark">
                                        <span className="btn btn-link cell-data-Employees-Courses" onClick={showMoreEmployees}>View More</span>
                                    </div>    
                                </div>
                    </div>
                </div>
        </div>
    );
}

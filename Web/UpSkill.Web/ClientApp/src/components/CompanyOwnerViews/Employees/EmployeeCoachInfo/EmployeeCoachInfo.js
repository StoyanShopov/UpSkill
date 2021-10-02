import React, {useState, useEffect} from 'react';

import { getEmployeesCoachHours } from '../../../../services/employeeService';

import './EmployeeCoachInfo.css';

export default function EmployeeCoachInfo() {
    let [allEmployees, setallEmployees] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getEmployeesCoachHours(currentPage)
            .then(employees => {
                setallEmployees(employees);
            });
    }, [currentPage]);

    function showMoreEmployees() {
        let next = currentPage+1;
        setCurrentPage(next);
        getEmployeesCoachHours(currentPage)
            .then(employees => {         
                setallEmployees([]);
                setallEmployees(arr=> [...arr,...employees]);
                
            });
    }

    return (
        <div className="">
                <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
                    <div className="table">
                        <div className="table-row header">
                            <div className="cell">
                                Employee
                            </div>
                            <div className="cell">
                                Coach
                            </div>
                            <div className="cell">
                                Hours
                            </div>
                        </div>
                        {allEmployees.map(employee=>{
                            return (
                                <div className="table-row" key={employee.name+employee.hours+employee.id}>
                                    <div className="cell cell-data-Employees-Coaches" data-title="Employee">
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
                                        <span className="btn btn-link cell-data-Employees-Coaches" onClick={showMoreEmployees}>View More</span>
                                    </div>    
                                </div>
                    </div>
                </div>
        </div>
    );
}

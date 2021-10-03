import React from 'react';

import "./Dashboard.css";

function Dashboard() {
    return (
        <div className="content-wrapper">
            <div className="main-content table">
                <div className="employeesOverview d-flex mt-5 shadow px-5 py-4">
                    <div className="employeesOverview-count employeesOverview-cell">
                        <h4>Employees</h4>
                        <h1 className="employeesOverview-heading">64</h1>
                    </div>
                    <div className="employeesOverview-activeCourses employeesOverview-cell">
                        <h4>Active Courses</h4>
                        <h1 className="employeesOverview-heading">8</h1>
                    </div>
                    <div className="employeesOverview-activeCoaches employeesOverview-cell">
                        <h4>Active Coaches</h4>
                        <h1 className="employeesOverview-heading">3</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
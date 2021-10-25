import React from 'react';

import EmployeesOverview from "./EmployeesOverview/EmployeesOverview";
import CoursesEnrolledTable from "./CoursesEnrolledTable/CoursesEnrolledTable";
import CoachesSessionsTable from "./CoachesSessionsTable/CoachesSessionsTable";

function Dashboard() {
    return (
        <>
            <div className="content-wrapper">
                <div className="main-content">
                    <EmployeesOverview />

                    <CoursesEnrolledTable />
                    
                    <CoachesSessionsTable />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
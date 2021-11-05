import React, { useEffect, useState } from 'react';

import '../../../CompanyOwnerViews/Dashboard/EmployeesOverview/EmployeesOverview';
import './DashboardOverview.css';

function DashboardOverview(props) {
      
    return (
            <div className="table">
                <div className="Overview d-flex mt-5 mb-4 shadow px-5 py-4">
                    <div className="Overview-count Overview-cell">
                        <h4>Clients</h4>
                        <h1 className="Overview-heading">{props.clientsCount}</h1>
                    </div>
                    <div className="Overview-revenue Overview-cell">
                        <h4>Revenue</h4>
                        <h1 className="Overview-heading">{props.revenue}</h1>
                    </div>
                    <div className="Overview-activeCourses Overview-cell">
                        <h4>Courses</h4>
                        <h1 className="Overview-heading">{props.coursesCount}</h1>
                    </div>
                    <div className="Overview-activeCoaches Overview-cell">
                        <h4>Coaches</h4>
                        <h1 className="Overview-heading">{props.coachesCount}</h1>
                    </div>
                </div>
            </div>
    );
}

export default DashboardOverview;

import React from 'react';

import Details from './Details/Details';
import SidebarResources from './SidebarResources/SidebarResources';
import CourseDetailsResourcesContext from '../../../../Context/CourseDetailsResourcesContext';

function Content ({course}) {
    return(
        <div className="container">
            {course.map((courseDetails) => (
                <div className="col-sm-5 text-align-center" key={courseDetails.id}>
                    <CourseDetailsResourcesContext.Provider
                    value={[courseDetails]}>
                    <Details />
                    <SidebarResources />
                    </CourseDetailsResourcesContext.Provider>
                </div>
            ))}
        </div>
    );
}

export default Content;               
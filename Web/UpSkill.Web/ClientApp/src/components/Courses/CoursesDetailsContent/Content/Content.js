import React from 'react';

import SidebarResources from './SidebarResources/SidebarResources';
import CourseDetailsResourcesContext from '../../../../Context/CourseDetailsResourcesContext';

function Content ({course}) {
    return(
        <div className="container">
            {course.map((courseDetails) => (
                <div className="col-sm-5 text-align-center" key={courseDetails.id}>
                    <SidebarResources
                       courseResources={courseDetails}
                    />
                </div>
            ))}
        </div>
    );
}

export default Content;               
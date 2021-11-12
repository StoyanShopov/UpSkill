import React from 'react';

import Details from './Details/Details';
import SidebarResources from './SidebarResources/SidebarResources';

import './Content.css'
 
function Content ({course}) {
    return(
        <>
            {course.map((courseDetails) => (
                <div key={courseDetails.id}>
                    <Details
                       key={courseDetails.id}
                       courseDetails={courseDetails}                     
                    />
                    <SidebarResources
                    key={courseDetails.id}
                    courseResources={courseDetails}
                    />
                </div>
            ))}
        </>
    );
}

export default Content;

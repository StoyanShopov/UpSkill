import React from 'react';

import Details from './Details/Details';

import './Content.css'

function Content ({course}) {
    return(
        <div className="container">
            {course.map((courseDetails) => (
                <div className="col-sm-5 text-align-center" key={courseDetails.id}>
                    <Details
                       key={courseDetails.id}
                       courseDetails={courseDetails}                     
                    />
                </div>
            ))}
        </div>
    );
}

export default Content;

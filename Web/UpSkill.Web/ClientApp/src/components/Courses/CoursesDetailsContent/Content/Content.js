import React, { useContext } from 'react';
import { ReactVideo } from 'reactjs-media';

import { CourseContextDetailsContent } from '../CoursesDetailsContent';

import Details from './Details/Details';
import SidebarResources from '../SidebarResources/SidebarResources';

import './Content.css'

const Content = ( ) => {
    const { course } = useContext(CourseContextDetailsContent);

    return(
        <div className="container">
            {course.map((courseDetails) => (
                <div className="col-sm-5 text-align-center" key={courseDetails.id}>
                    <ReactVideo
                    src={courseDetails.video}
                    primaryColor="read"
                    />
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
        </div>
    );
}

export default Content;

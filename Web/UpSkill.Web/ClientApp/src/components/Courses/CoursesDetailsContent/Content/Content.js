import React from 'react';
import { ReactVideo } from 'reactjs-media';

import Details from './Details/Details';
import SidebarResources from '../SidebarResources/SidebarResources';

import './Content.css'

const Content = ( {course} ) => {
    return(
        <div className="container">
            {course.map((details) => (
                <div className="col-sm-5 text-align-center" key={details.id}>
                    <ReactVideo
                    src={details.video}
                    primaryColor="read"
                    />
                    <Details
                       key={details.id}
                       courseDetails={details}                     
                    />
                    <SidebarResources
                    key={details.id}
                    courseResources={details}
                    />
                </div>
            ))}
        </div>
    );
}

export default Content;

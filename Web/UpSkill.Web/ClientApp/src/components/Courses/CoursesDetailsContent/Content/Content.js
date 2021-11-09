import React, { useContext } from 'react';
import { ReactVideo } from 'reactjs-media';

import { CourseContextDetailsContent } from '../CoursesDetailsContent';

import Details from './Details/Details';

import './Content.css'

const Content = ( ) => {
    const { course } = useContext(CourseContextDetailsContent);

    return(
        <div className="container">
            {course.map((courseDetails) => (
                <div className="col-sm-5 text-align-center" key={courseDetails.id}>
                    <div className="courseVideoPosition"> 
                       <div className="courseVideoContent">
                         <ReactVideo
                         key={courseDetails.id}
                         src={courseDetails.video}
                         primaryColor="read"
                         />
                        </div> 
                    </div>
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

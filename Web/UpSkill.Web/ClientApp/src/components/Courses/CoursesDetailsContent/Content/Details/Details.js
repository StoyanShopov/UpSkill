import React from "react";
import { ReactVideo, YoutubePlayer } from 'reactjs-media';

import martketingImg from '../../../../../assets/img/courses/Marketing.png';

const Details = (props) => {
    const { 
        courseDetails: { courseTitle, courseVideo, courseLecturer, courseDescription },
    } = props;

    return(
        <div className="container">
            <h2>{courseTitle}</h2>
                <div className="courseVideoPosition"> 
                    <div className="courseVideoContent">
                         <YoutubePlayer
                         src={courseVideo}
                         />
                    </div> 
                    <div>
                        <h4>Lecture Description</h4>
                        <p>{courseDescription}</p>
                    </div>
                    <div>
                        <h4>Instructor</h4>
                        <p>{courseLecturer}</p>
                    </div>
                </div>
        </div>    
    )
}

export default Details;

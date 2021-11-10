import React from "react";
import { ReactVideo, YoutubePlayer } from 'reactjs-media';

const Details = (props) => {
    const { 
        courseDetails: { courseTitle, courseVideo, courseLecture, courseDescription },
    } = props;

    return(
        <div className="container">
            <h2>{courseTitle}</h2>
                <div className="courseVideoPosition"> 
                    <div className="courseVideoContent">
                         <ReactVideo
                         src={courseVideo}
                         primaryColor="read"
                         />
                    </div> 
                    <div>
                        <h4>Lecture Description</h4>
                        <p>{courseDescription}</p>
                    </div>
                    <div>
                        <h4>Instructor</h4>
                        <p>{courseLecture}</p>
                    </div>
                </div>
        </div>    
    )
}

export default Details;

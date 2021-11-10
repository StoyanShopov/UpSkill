import React from "react";
import { ReactVideo } from 'reactjs-media';

import './Details.css';

import marketingImg from '../../../../../assets/img/courses/Marketing.png';

const Details = (props) => {
    const {  
        courseDetails: { courseTitle, courseVideo, courseLecturer, courseDescription },
    } = props;

    return(
        <div className="container">
                <h2 className="courseTitleContent">{courseTitle}</h2>
                <ReactVideo
                className="courseVideoContent"
                src={courseVideo}
                poster={marketingImg}
                primaryColor="red"
                /><br/>
                <h4 className="lectureDescriptionContent">Lecture Description</h4>
                <p className="descriptionContent">{courseDescription}</p>
                <h4 className="instructorContent">Instructor</h4>
                <p>{courseLecturer}</p>            
        </div>    
    )
}

export default Details;

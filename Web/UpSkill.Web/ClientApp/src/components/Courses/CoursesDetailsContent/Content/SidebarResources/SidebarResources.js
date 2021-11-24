import React, { useState } from "react";

import Details from "../Details/Details";

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: { courseFileFilePath, courseCoachFirstName, courseCoachLastName ,courseLectures}
    }=props

    const [currentLecture, setCurrentLecture] = useState([]);
    const OnClickResources = (e) => {
        e.preventDefault();
        const lecture = e.target.value;
        setCurrentLecture(lecture);
    }

return(
        <div className="container">
         <Details
            key={currentLecture.id}
            lecture={currentLecture}
            courseImage={courseFileFilePath}
            coachFirstName={courseCoachFirstName}
            coachLastName={courseCoachLastName}
            />
         <div className="courseResourcesSidebar"></div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                    {courseLectures.map((lecture) =>(
                        <li>
                        <hr/>
                        <select
                        key={lecture.id}>
                            <option
                            value={lecture}
                            onClick={OnClickResources}>
                                 {lecture.lectureName}
                            </option>
                            {lecture.lectureLessons.map((lesson) => (                           
                            <option
                            value={lesson.lessonUrl}>
                                {lesson.lessonMediaType}
                            </option>
                            ))}
                        </select>
                        </li>
                    ))}
                    </li>
                </ul>
            </section>
            <div className="courseButtonViewMore">
               <span className="courseButtonViewMoreSpan">View More</span>
            </div>
      </div>
   )
}

export default SidebarResources;

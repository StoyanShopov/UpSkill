import React, { useState } from "react";

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: {courseLectures}
    } = props;

    const [currentResources, setCurrentResources] = useState("");

    const handleResources = (e) => { 
        const currentResources = e.target.value;
        setCurrentResources(currentResources)
    };

    return(
        <div className="container">
         <div className="courseResourcesSidebar">
         </div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                    {courseLectures.map((lecture) => (
                        <li>
                            <hr/>
                            <select
                            key={lecture.id}
                            onChange={handleResources}>
                                <option 
                                value={lecture.lectureName}>
                                    {lecture.lectureName}
                                </option>
                                {lecture.lectureLessons.map((lesson) => (
                                    <>
                                    <option
                                    value={lesson.lessonUrl}>
                                        {lesson.lessonMediaType}
                                    </option>
                                    </>
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

import React, { useState } from "react";

import CourseDetailsResourcesContext from '../../../../../Context/CourseDetailsResourcesContext';

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: {courseLectures}
    }=props;

    const [currentLecture, setCurrentLecture] = useState([]);

    const OnClickResources = (e) => {
        e.preventDefault();
        const currentLecture = e.target.value;
        setCurrentLecture(currentLecture);
    }

    console.log(currentLecture);

    return(
        <CourseDetailsResourcesContext.Provider
        value={[currentLecture, setCurrentLecture]}>
        {props.children}
        <div className="container">
         <div className="courseResourcesSidebar">
         </div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                    {courseLectures.map((lecture) => (
                        <>
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
                        </>
                    ))}
                    </li>
                </ul>
            </section>
            <div className="courseButtonViewMore">
               <span className="courseButtonViewMoreSpan">View More</span>
            </div>
      </div>
    </CourseDetailsResourcesContext.Provider>
   )
}

export default SidebarResources;

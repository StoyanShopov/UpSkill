import React, { useState } from "react";

import Details from "../Details/Details";

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: { courseFileFilePath, courseCoachFirstName, courseCoachLastName ,courseLectures}
    }=props

    const [currentLecture, setCurrentLecture] = useState({});
    const OnClickResources = (e) => {
        e.preventDefault();
        const lecture = e.target.value;
        setCurrentLecture(lecture);
    }

return(
        <CourseDetailsResourcesContext.Provider
        value={[currentLecture, setCurrentLecture]}>
        {props.children}
        <div className="container">
        {courseLectures.map((lecture) =>(
          <>
            {lecture.lectureLessons.map((lesson) => (
            <>
                <Details
                key={lecture.id}
                lectureName={lecture.lectureName}
                lectureDescription={lecture.lectureDescription}
                lessonVideo={lesson.lessonUrl}
                courseImage={courseFileFilePath}
                coachFirstName={courseCoachFirstName}
                coachLastName={courseCoachLastName}
                />
         <div className="courseResourcesSidebar"></div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                        <li>
                        <hr/>
                        <select
                        key={lecture.id}>
                            <option
                            value={lecture}
                            onClick={OnClickResources}>
                                 {lecture.lectureName}
                            </option>                           
                            <option
                            value={lesson.lessonUrl}>
                                {lesson.lessonMediaType}
                            </option>
                        </select>
                        </li>
                    </li>
                </ul>
            </section>
            <div className="courseButtonViewMore">
               <span className="courseButtonViewMoreSpan">View More</span>
            </div>
            </>
            ))}
          </>
        ))}
      </div>
    </CourseDetailsResourcesContext.Provider>
   )
}

export default SidebarResources;

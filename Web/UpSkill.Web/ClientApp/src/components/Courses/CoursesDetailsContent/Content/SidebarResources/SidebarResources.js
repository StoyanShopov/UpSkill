import React, { useState } from "react";

import CourseDetailsResourcesContext from '../../../../../Context/CourseDetailsResourcesContext';
import Details from "../Details/Details";

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: { courseFileFilePath, courseCoachFirstName, courseCoachLastName, courseLectures }
    }=props

    const [currentLecture, setCurrentLecture] = useState({});

    console.log(currentLecture);

return(
    <CourseDetailsResourcesContext.Provider
    value={[currentLecture, courseFileFilePath, courseCoachFirstName, courseCoachLastName]}>
        <Details/>
        <div className="container">
         <div className="courseResourcesSidebar"></div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                    {courseLectures.map((lecture) =>(
                        <div key={lecture.id}>
                          <hr/>
                          <div value={lecture} onClick={() => setCurrentLecture({lecture})}>{lecture.lectureName}</div>
                        </div>
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

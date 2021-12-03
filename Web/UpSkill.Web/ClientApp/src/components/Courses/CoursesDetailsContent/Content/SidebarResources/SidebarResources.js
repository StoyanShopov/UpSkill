import React, { useState } from "react";

import CourseDetailsResourcesContext from '../../../../../Context/CourseDetailsResourcesContext';
import Details from "./Details/Details";

import './SidebarResources.css';

const SidebarResources = (props) => {
    const {
        courseResources: { courseFileFilePath, courseCoachFirstName, courseCoachLastName, courseLectures }
    }=props
    
    const [initialLecture, setInitialLecture] = useState(courseLectures[0])
    const [currentLecture, setCurrentLecture] = useState({});

return(
    <CourseDetailsResourcesContext.Provider
    value={[initialLecture, currentLecture, courseFileFilePath, courseCoachFirstName, courseCoachLastName]}>
        <Details />
        <div className="courseResoursesSidebar">
         <span style={{ display: 'block', verticalAlign: 'middle' }}>Lectures</span>
            <section>
                <ul>
                    <li style={{ textAlign: 'start' }}>
                    {courseLectures.map((lecture) =>(
                        <div key={lecture.id}>
                        <div 
                          value={lecture} 
                          onClick={() => setCurrentLecture({lecture})}>
                            <span className='courseNonSelectedMenuStyle'>
                            {lecture.lectureName}
                            </span>
                        </div>
                        </div>
                    ))}
                    </li>
                </ul>
            </section>
               <span className="nav-link viewMore">View More</span>
      </div>
    </CourseDetailsResourcesContext.Provider>
   )
}

export default SidebarResources;

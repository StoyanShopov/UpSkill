import React, { useContext } from "react";

import CourseDetailsResourcesContext from '../../../../../Context/CourseDetailsResourcesContext';

import './SidebarResources.css';

const SidebarResources = ({courseLectures}) => {
    const [lecture, setLecture] = useContext(CourseDetailsResourcesContext);

    const OnClickResources = (e) => {
        e.preventDefault();
        const lecture = e.target.value;
        setLecture(lecture);
    }

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

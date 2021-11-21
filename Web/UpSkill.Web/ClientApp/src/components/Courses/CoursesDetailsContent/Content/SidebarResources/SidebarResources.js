import React, { useContext, useState } from "react";

import { CourseContentContext } from "../../CoursesDetailsContent";

import './SidebarResources.css';

const SidebarResources = ( ) => {
    const { course } = useContext(CourseContentContext);
    const [currentResources, setCurrentResources] = useState("");

    const handleResources = (e) => {
        const currentResources = e.target.value;
        setCurrentResources(currentResources)
    };

    console.log(course);

    return(
        <div className="container">
         <div className="courseResourcesSidebar">
         </div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                    {course.map((lecture) => (
                        <li>
                            <hr/>
                            <select
                            key={lecture.courseLectures.id}
                            onChange={handleResources}>
                                <option 
                                value={lecture.courseLectures.lectureName}>
                                    {lecture.courseLectures.lectureName}
                                </option>
                                <option value={lecture.courseLectures.lectureLessons.lessonUrl}>
                                   Lecture Video
                                </option>
                                <option value={lecture.courseLectures.lectureLessons.lessonMediaType}>
                                    Resources
                                </option>
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

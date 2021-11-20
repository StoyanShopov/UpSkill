import React, { useState } from "react";

import './SidebarResources.css';

const SidebarResources = ( props ) => {
    const {
        courseResources: { lectures }
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
                    {lectures.map((lecture) => (
                        <li>
                            <hr/>
                            <select
                            key={lecture.id}
                            onChange={handleResources}>
                                <option 
                                value={lecture.courseSubject}>
                                    {lecture.courseSubject}
                                </option>
                                <option value={lecture.courseVideo}>
                                   Lecture Video
                                </option>
                                <option value={lecture.resource}>
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

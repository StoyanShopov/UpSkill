import React, { useState } from "react";

import './SidebarResources.css';

const SidebarResources = ( props) => {
    const {
        courseResources: { lectures }
    } = props;

    const [currentResources, setCurrentResources] = useState("");

    const handleResources = (e) => {
        const resources = e.target.value;
        setCurrentResources(resources)
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
                        {lecture.courseSubject}
                        {lecture.courseVideo}
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

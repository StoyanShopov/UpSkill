import React, { useState } from "react";

import './SidebarResources.css';

const SidebarResources = ( props) => {
    const {
        courseResources: { courseItems }
    } = props;

    const [currentResources, setCurrentResources] = useState(courseItems.courseSubject);

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
                <select className="lecturesContentSpan" value={currentResources} onChange={handleResources}>
                    {courseItems.map((items) => (
                        <option value={items.courseSubject}>1.{items.courseSubject}</option>
                    ))}
                </select>
            </section>
            <div className="courseButtonViewMore">
               <span className="courseButtonViewMoreSpan">View More</span>
            </div>
      </div>
   )
}

export default SidebarResources;

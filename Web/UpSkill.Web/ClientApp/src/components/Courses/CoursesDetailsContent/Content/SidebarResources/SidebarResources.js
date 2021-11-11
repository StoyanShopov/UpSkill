import React, { useState } from "react";

import './SidebarResources.css';

const SidebarResources = ( props) => {
    const {
        courseResources: { courseItems }
    } = props;

    const [currentResorces, setCurrentResources] = useState("");

    const handleResources = (e) => {
        const currentResorces = e.target.value;
        setCurrentResources(currentResorces);
    }

    return(
        <div className="container">
         <div className="courseResourcesSidebar">
         </div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                        <span >{courseItems.courseSubject}Introduction</span>
                        <select value={currentResorces} onChange={handleResources}>
                            <option></option>
                        </select>
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

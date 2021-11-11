import React from "react";

import './SidebarResources.css';

const SidebarResources = ( props) => {
    const {
        courseResources: { courseItems }

    } = props;

    return(
        <div className="container">
         <div className="courseResourcesSidebar">
         </div>
         <span className="lecturesContent">Lectures</span>
            <section>
                <ul>
                    <li className="lecturesContentSpan">
                        <span >{courseItems.courseSubject}Introduction</span>
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

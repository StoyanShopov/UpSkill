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
            <section className="container">
                <ul>
                    <li>
                        <span className="lecturesContentSpan">{courseItems}</span>
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

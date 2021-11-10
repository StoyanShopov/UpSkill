import React from "react";

import './SidebarResources.css';

const SidebarResources = ( props) => {
    const {
        courseResources: { courseItems }

    } = props;

    return(
        <div className="courseResourcesSidebar">
           <div style={{ display: 'inline-block', marginLeft: '15px', marginTop: '.5rem' }}>
              <span style={{ display: 'block' }}>Lecture</span>
            </div>
            <section>
                <ul>
                    <li>
                        <span>{courseItems}</span>
                    </li>       
                </ul>
            </section>
            <div className="sidebarResources-viewMoreButton">
               <span className="btn btn-link sidebarResources-viewMoreButton-span">View More</span>
            </div> 
        </div>    
   )
}

export default SidebarResources;

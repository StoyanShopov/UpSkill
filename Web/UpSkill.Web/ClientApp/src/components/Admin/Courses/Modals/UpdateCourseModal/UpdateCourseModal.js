import React, { useState, useEffect } from "react";
import UpdateCourse from "../../UpdateCourse/UpdateCourse"

function UpdateCourseModal({closeUpdateCourseModal}) {
  
  

  return (
    <div className="detailsModal-background">      
          
          <div className="update-course-wrapper"><UpdateCourse closeModal={closeUpdateCourseModal}></UpdateCourse>  </div>                  
    
      
    </div>
  );
}
export default UpdateCourseModal;

import React from "react";
import "./AdminCourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";



export default function AdminCoursesCard(props) {
  const {
    courseDetails: { id,title, coachFirstName, coachLastName, price, description },
  } = props;

  return (
    <div className="courses-Card">
      <div className="courses-image-wrapper"  onClick={()=> {props.getClickedValue(props.courseDetails)}} >  
       
      </div>
      <div className="courses-content w-75">
        <div className="courseInfo d-flex justify-content-between my-3">
          <span className="courses-Field">{title}</span>
          <span className="coursesfullName">
            {coachFirstName} {coachLastName}
          </span>
        </div>

        <div className="companyAndPriceInfo d-flex justify-content-between">
            <span className="courses-coachPrice">{price}€ per person</span>  
          <h6>
            <img src={GoogleLogo} alt="logo"></img>
          </h6>
        </div>
      </div>
      <div className="btn-wrapper"> 
        {props.children}
      </div>
    </div>
  );
}

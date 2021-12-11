import "./CoursesIntroBar.css";
import Path from "../../../../../assets/img/Path 3449.png";
import Group from "../../../../../assets/img/Group 23.png";

export default function CoursesIntroBar() {
  return (
    <div className="row introBar-container">
      <div className="col courses-short-intro-wrapper">
        <div className="courses-intro-header-wrapper">
          <span>Courses</span>
        </div>
        <div className="courses-intro-body-wrapper">
          <p>
            Upskill’s goal is to inspire you to master your technical and
            personal skills and give you the opportunity to gain knowledge from
            top specialists in various fields.
          </p>
        </div>
      </div>
      <div className="col courses-intro-image-wrapper">
        <div className="image-path-wrapper">
          <img className="path-image" src={Path} alt="Path"></img>
          <div className="image-group-wrapper">
            <img className="group-image" src={Group} alt="Group"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

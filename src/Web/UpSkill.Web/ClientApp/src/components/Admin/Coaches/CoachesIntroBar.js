import "./CoachesIntroBar.css";
import Path from "../../../assets/img/Path 3447.png";
import Group from "../../..//assets/img/Group 47.png";

export default function CoachesIntroBar() {
  return (
    <div className="row introBar-container">
      <div className="col courses-short-intro-wrapper">
        <div className="courses-intro-header-wrapper">
          <span>Coaches</span>
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
          <div className="image-group-wrapper-coach">
            <img className="group-image-coach" src={Group} alt="Group"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

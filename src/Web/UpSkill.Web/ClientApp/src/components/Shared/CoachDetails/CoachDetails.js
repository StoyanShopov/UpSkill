import React, { useState, useEffect } from "react";
import GoogleLogo from "../../../assets/img/courses/Image 39.png";
import "./CoachDetails.css";

function CoachDetails(props) {
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [description, setDescription] = useState("");
  const [filePath, setFilePath]= useState("")
  let { closeModal } = props;

  function isInProfile(){
    if (props.inProfile) {
      return "coach-detailsModal-background-inProfile";
    }
    return "coach-detailsModal-background";
  }

  useEffect(() => {
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Field"));
    setCoachName(
      localStorage.getItem("FirstName") + " " + localStorage.getItem("LastName")
    );
    setFilePath(localStorage.getItem("FilePath"))
  }, []);

  return (
    <div className={isInProfile()}>
      <div className="detailsModal-courses-container">
        <div
          className="detailsModal-courses-header"
          style={{ background: "#16D696" }}
        >
          <div className="titleCloseBtn">
            <button className="the-x-btn" onClick={() => closeModal(false)}>
              X
            </button>
          </div>
          <div className="header-courses-els-container">
            <div className="detailsModal-courses-title">
              <h3>{title}</h3>
            </div>
            <div className="row detailsModal-coach-info">
              <div className="col-2 detailsModal-coach-img-coach-wrapper">
                <img
                  src={filePath}
                  alt="User"
                  className="detailsModal-coach-img-coach"
                ></img>
              </div>
              <div className="col-2 detailsModal-courses-coach-name-wrapper">
                <span>Created by</span>
                <h3>{coachName}</h3>
                <h6>
                  <img src={GoogleLogo} alt="Google logo"></img>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="detailsModal-courses-body">
          <h3 className="course-description-header">Session Description</h3>
          <div className="row detailsModal-courses-description">
            <p>
              In this session, you will learn the fundamental language skills of
              reading, writing, speaking, listening, thinking, viewing and
              presenting.
            </p>
          </div>
          <div className="row detailsModal-rating">
            <div className="detailsModel-courses-willlearn-course-body">
              <h3 className="courses-more-information-header">
                What you'll learn
              </h3>
              <p className="courses-more-information">
                <ul className="willlearn-list-coach">
                  <li>Learn more information about Digital Marketing</li>
                  <li>Improve your time management</li>
                  <li>Solve problems</li>
                </ul>
              </p>
            </div>
            {/* <p className="courses-rating-header" >
              <b >Course rating</b>
            </p>
            <div>
              <div class="d-flex justify-content-between align-items-center">
                <span> 4.5</span>
                <div class="ratings">
                  <i class="fa fa-star rating-color"></i>
                  <i class="fa fa-star rating-color"></i>
                  <i class="fa fa-star rating-color"></i>
                  <i class="fa fa-star rating-color"></i>
                  <i class="fa fa-star"></i>
                </div>
                <span className="review-count">12 Reviews</span>
              </div>
            </div> */}
          </div>
          <div className="detailsModal-courses-image-course-wrapper">
            <div className="detailsModel-courses-image-course"></div>
            <div className="detailsModel-courses-img-course-body">
              <h4 className="courses-more-information-header">
                This session includes
              </h4>
              <p className="courses-more-information">
                <ul className="short-includes-info">
                  <li className="min-discussion">20 minutes discussion</li>
                  <li className="lectures-count">23 downloadable resources</li>
                  <li className="lifetime-access">Full lifetime access</li>
                  <li className="access-mobile">Access on mobile</li>
                </ul>
              </p>
            </div>
            <div className="modal-enroll-btn">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoachDetails;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfilePic from "../../../assets/userProfilePic.png";
import GoogleLogo from "../../../assets/img/courses/Image 39.png";
import "./DetailsModal.css";

function DetailsModal(props) {
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [description, setDescription] = useState("");
  let { closeModal } = props;

  useEffect(() => {
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Title"));
    setCoachName(localStorage.getItem("FullName"));
  }, []);

  return (
    <div className="detailsModal-background">
      <div className="detailsModal-courses-container">
        <div className="detailsModal-courses-header">
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
              <div className="col-2 detailsModal-courses-img-coach-wrapper">
                <img
                  src={UserProfilePic}
                  alt="User"
                  className="img-fluid rounded detailsModal-courses-img-coach"
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
          <h3 className="course-description-header">Course Description</h3>
          <div className="row detailsModal-courses-description">
            <p>{description}</p>
          </div>
          <div className="row detailsModal-rating">
            <div className="detailsModel-courses-willlearn-course-body">
              <h3 className="courses-more-information-header">
                What you'll learn
              </h3>
              <p className="courses-more-information">
                <ul className="willlearn-list">
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
                This course includes
              </h4>
              <p className="courses-more-information">
              <ul className="short-includes-info">
                  <li className="hours-video">23 hours on-demand video</li>
                  <li className="lectures-count">36 lectures</li>
                  <li className="lifetime-access">Full lifetime access</li>
                  <li className="certification">Certificate of completion</li>
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
export default DetailsModal;

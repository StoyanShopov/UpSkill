import React, { useState, useEffect } from "react";
import UserProfilePic from "../../../../assets/userProfilePic.png";
import GoogleLogo from "../../../../assets/img/courses/Image 39.png";
import "./DetailsModal.css";

function DetailsModal({ closeModal }) {
  const [title, setTitle] = useState("");
  const [coachName, setCoachName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    setPrice(localStorage.getItem("Price"));
    setDescription(localStorage.getItem("Description"));
    setTitle(localStorage.getItem("Title"));
    setCategory(localStorage.getItem("CategoryId"));
    setCoachName(localStorage.getItem("FullName"));
  }, []);

  return (
    <div className="detailsModal-background">
      <div className="detailsModal-container">
        <div className="detailsModal-header">
          <div className="titleCloseBtn">
            <button className="the-x-btn" onClick={() => closeModal(false)}>
              X
            </button>
          </div>
          <div className="header-els-container">
            <div className="detailsModal-title">
              <h3>{title}</h3>
            </div>
            <div className="row detailsModal-coach-info">
              <div className="col-2 detailsModal-img-coach-wrapper">
                <img
                  src={UserProfilePic}
                  alt="User"
                  className="img-fluid rounded detailsModal-img-coach"
                ></img>
              </div>
              <div className="col-2 detailsModal-coach-name-wrapper">
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
          <h3>Course Description</h3>
          <div className="row detailsModal-courses-description">
            <p>{description}</p>
          </div>
          <div className="row detailsModal-rating">
            <p>
              <b>Course rating</b>
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
                <span class="review-count">12 Reviews</span>
              </div>
            </div>
          </div>
          <div className="detailsModal-image-course-wrapper">
            <div className="detailsModel-image-course"></div>
            <div className="detailsModel-img-course-body">
              <h4>What you'll learn</h4>
              <p>
                - Learn more information about Digital Marketing - Improve your
                time management - Solve problems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsModal;

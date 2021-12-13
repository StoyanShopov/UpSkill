import { useState, useEffect } from "react";
import "./ViewMoreButton.css";

export default function ViewMoreButton({ thisPage, setThisPage }) {
  function viewMoreCourses() {
    setThisPage(thisPage + 1);
  }
  return (
    <div className="viewmore-wrapper">
      <div
        className="btn btn-outline-primary viewmore-button"
        onClick={() => viewMoreCourses()}
      >
        <p className="cardButtonText">View More</p>
      </div>
    </div>
  );
}

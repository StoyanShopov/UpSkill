import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import "./CourseCard.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";

function CourseCard(props) {
  const { courseName, coachName, imageName, price, companyLogo } = props;

  const [image, setImage] = useState("");

  function loadImage(imgName) {
    import(`../../../../assets/img/courses/${imageName}`).then((img) =>
      setImage(img.default)
    );
  }

  useEffect(() => {
    loadImage(imageName);
  }, []);

  return (
    <div className="cardContainer">
      <div className="image">
        <img src={image} alt="courses" style={{ width: 450, height: 248 }} />
      </div>
      <div className="cardBody row">
        <div className="cardText col-md-5">
          <p id="course">{courseName}</p>
        </div>
        
        <div className="col-md-5">
          <p id="name">{coachName}</p>
        </div>

        <div className="row">
          <div className="cardText col-md-6">
            <p id="price">{price}€ per person</p>
          </div>

          <div className="logo col-md-6">
            <img src={GoogleLogo} alt="logo" />
          </div>
        </div>
      </div>
      <Button className="button row col-md-4">
        <p className="cardButtonText">Enroll</p>
      </Button>
    </div>
  );
}

export default CourseCard;

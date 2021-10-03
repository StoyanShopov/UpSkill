import React from 'react';
import { Button } from 'react-bootstrap';

import './CoursesCard.css';

function CoursesCard(props) {
  const { courseName, coachName, imageUrl } = props;

  return (
    <div className="cardContainer">
      <div className="background backgroundImg">
        
      </div>
      <div className="cardText">
        <span id="course">{courseName}</span> <span id="name">{coachName}</span>
      </div>
      <div></div>
      <Button className="cardColors">Enroll</Button>
    </div>
  );
}

export default CoursesCard;

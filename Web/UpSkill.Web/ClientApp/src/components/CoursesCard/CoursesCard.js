import React from 'react';
import { Button } from 'react-bootstrap';
import './CoursesCard.css';

function CoursesCard() {
  return (
    <div className="cardContainer">
      <div className="background"></div>
      <div className="cardText">
        <span id='course'>Marketing</span> <span id='name'>Jim Wilber</span>
      </div>
      <div></div>
      <Button className="cardColors">Enroll</Button>
    </div>
  );
}

export default CoursesCard;

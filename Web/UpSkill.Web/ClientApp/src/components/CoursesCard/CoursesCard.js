import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './CoursesCard.css';

function CoursesCard() {
  return (
    <Card className="cardContainer">
      <Card.Header className="cardColors">HTML & CSS</Card.Header>
      <Card.Body>
        <Card.Title className="cardText">What you’ll learn:</Card.Title>
        <Card.Text className="cardText">
          This course includes studies of various literary genres: short story,
          poetry, novel, drama, fiction and non-fiction.
        </Card.Text>
        <Button className="cardColors">Compete</Button>
      </Card.Body>
    </Card>
  );
}

export default CoursesCard;

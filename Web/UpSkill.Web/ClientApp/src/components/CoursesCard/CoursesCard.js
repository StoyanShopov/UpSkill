import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CoursesCard() {
  return (
    <Card style={{ width: '18rem' }} className="text-center">
      <Card.Header style={{ backgroundColor: '#296CFB', color: '#FFFFFF' }}>
        HTML & CSS
      </Card.Header>
      <Card.Body>
        <Card.Title style={{ 'text-align': 'left', font: 'Montserrat' }}>
          What you’ll learn:
        </Card.Title>
        <Card.Text style={{ 'text-align': 'left', font: 'Montserrat' }}>
          This course includes studies of various literary genres: short story,
          poetry, novel, drama, fiction and non-fiction.
        </Card.Text>
        <Button style={{ backgroundColor: '#296CFB' }}>Compete</Button>
      </Card.Body>
    </Card>
  );
}

export default CoursesCard;

import React from 'react';
import { Card, Button } from 'react-bootstrap';

function EmployeesPositionCard() {
  return (
    <Card style={{ width: '38rem' }}>
      <Card.Header style={{ backgroundColor: '#296CFB', color: '#FFFFFF' }}>
        <p>Employees(65) Position</p>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Text style={{ 'text-align': 'left', font: 'Montserrat' }}>
          {Row()}
          {Row()}
          {Row()}
        </Card.Text>
        <Button variant="link">View More</Button>
      </Card.Body>
    </Card>
  );
}

function Row() {
  return (
    <div>
      <strong style={{ color: '#296CFB' }}>Lora Petrova</strong>{' '}
      <span>Graphic Designer</span>
      <hr />
    </div>
  );
}

export default EmployeesPositionCard;

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EmployeeRow from './EmployeeRow';
import './EmployeesPositionCard.css';

function EmployeesPositionCard() {
  return (
    <Card className="card">
      <Card.Header className="cardHeader">
        <span id='employee'>Employees(65)</span> <span id='position'>Position</span>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Text>
          <EmployeeRow />
          <EmployeeRow />
        </Card.Text>
        <Button variant="link">View More</Button>
      </Card.Body>
    </Card>
  );
}

export default EmployeesPositionCard;

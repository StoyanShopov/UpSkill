import React from 'react';
import './CoachCard.css';
import { Badge } from 'react-bootstrap';

export default function CoachCard(props) {
  const {
    displaySession,
    displayPrice,
    coachDetails: { fullName, company, coachField, imageUrl, price, session },
  } = props;

  return (
    <div className="card">
      <div>
        <img src={imageUrl} className="image"></img>
      </div>
      <span className="fullName">{fullName}</span>
      <span className="coachField">{coachField} Coach</span>
      {displaySession && <span className="session">{session}</span>}
      <h6>
        <Badge bg="secondary">{company}</Badge>
      </h6>
      {props.children}
      {displayPrice && <span className="coachPrice">{price}€ per session</span>}
    </div>
  );
}

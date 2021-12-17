import React from 'react';
import './CoachCard.css';
import { Badge } from 'react-bootstrap';

export default function CoachCard(props) {
  var displaySession = props.displaySession,
      displayPrice = props.displayPrice,
      _props$coachDetails = props.coachDetails,
      fullName = _props$coachDetails.fullName,
      company = _props$coachDetails.company,
      coachField = _props$coachDetails.coachField,
      imageUrl = _props$coachDetails.imageUrl,
      price = _props$coachDetails.price,
      session = _props$coachDetails.session;


  return React.createElement(
    'div',
    { className: 'card' },
    React.createElement(
      'div',
      null,
      React.createElement('img', { src: imageUrl, className: 'image', alt: '' })
    ),
    React.createElement(
      'span',
      { className: 'fullName' },
      fullName
    ),
    React.createElement(
      'span',
      { className: 'coachField' },
      coachField,
      ' Coach'
    ),
    displaySession && React.createElement(
      'span',
      { className: 'session' },
      session
    ),
    React.createElement(
      'h6',
      null,
      React.createElement(
        Badge,
        { bg: 'secondary' },
        company
      )
    ),
    props.children,
    displayPrice && React.createElement(
      'span',
      { className: 'coachPrice' },
      price,
      '\u20AC per session'
    )
  );
}
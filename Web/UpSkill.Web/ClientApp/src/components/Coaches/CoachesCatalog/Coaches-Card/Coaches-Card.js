import React from 'react';
import './Coaches-Card.css';
import { Badge } from 'react-bootstrap';

export default function CoachesCard(props) {
    const {
        displaySession,
        displayPrice,
        coachDetails: { fullName, company, coachField, imageUrl, price, session },
    } = props;

    return (
        <div className="coaches-Card">
            <div className="coaches-image-wrapper">
                <div className="coaches-image-wrapper-bg">
                    <img src={imageUrl} className="coaches-image"></img>
                </div>
            </div>
            <div className="coaches-content w-75">
                <div className="coachInfo d-flex justify-content-between mt-3">
                    <span className="coaches-coachField">{coachField}</span>
                    <span className="coaches-fullName">{fullName}</span>
                </div>

                <div className="companyAndPriceInfo d-flex justify-content-between">
                    {displaySession && <span className="coaches-session">{session}</span>}
                    {displayPrice && <span className="coaches-coachPrice">{price}€ per session</span>}
        
                    <h6>
                        <Badge bg="secondary">{company}</Badge>
                    </h6>
                </div>

            </div>
            <div className="btn-wrapper">
                {props.children}
            </div>
        </div>
    );
}

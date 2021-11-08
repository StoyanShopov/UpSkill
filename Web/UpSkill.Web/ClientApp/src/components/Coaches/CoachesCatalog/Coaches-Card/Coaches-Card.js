import React, { useEffect, useState } from "react";
import "./Coaches-Card.css";
import { Badge } from "react-bootstrap";

export default function CoachesCard(props) {
  const {
    displaySession,
    displayPrice,
    coachDetails: {
      coachFirstName,
      coachLastName,
      coachField,
      coachFileFilePath,
      coachPrice,
      session,
    },
  } = props;

  // const [Image, setImage] = useState();

  // function loadImage (imageName) {
  //         import(`${imageMock}`)
  //             .then(img=> setImage(img.default));
  //     };

  // useEffect(() => {
  //     loadImage(imageMock);
  // }, []);

  return (
    <div className="coaches-Card">
      <div className="coaches-image-wrapper">
        <div className="coaches-image-wrapper-bg">
          <img
            src={coachFileFilePath}
            className="coaches-image"
            alt="text"
          ></img>
        </div>
      </div>
      <div className="coaches-content w-75">
        <div className="coachInfo d-flex justify-content-between mt-3">
          <span className="coaches-coachField">Marketing</span>
          <span className="coaches-fullName">
            {coachFirstName}{` ${coachLastName}`}
          </span>
        </div>

        <div className="companyAndPriceInfo d-flex justify-content-between">
          {displaySession && <span className="coaches-session">{session}</span>}
          {displayPrice && (
            <span className="coaches-coachPrice">
              {coachPrice}€ per session
            </span>
          )}

          <h6>
            <Badge bg="secondary">google</Badge>
          </h6>
        </div>
      </div>
      <div className="btn-wrapper">{props.children}</div>
    </div>
  );
}

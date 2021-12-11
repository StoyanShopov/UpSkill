import React, { useEffect, useContext } from "react";
import "./Coaches-Card.css";
import GoogleLogo from "../../../../assets/img/courses/Image 2.png";
import { ReactReduxContext } from "react-redux";

export default function CoachesCard(props) {
  const { store } = useContext(ReactReduxContext);
  var {
    isLoggedIn,
    isCompanyOwner,
    isEmployee,
    isAdmin,
  } = store.getState().auth;

  const {
    displaySession,
    displayPrice,
    isInCompany,
    coachDetails: {
      coachFirstName,
      coachLastName,
      coachField,
      coachFileFilePath,
      coachPrice,
      session,
      calendlyUrl,
    },
  } = props;

  const decideCardBackgroundColor = () => {
    if (isInCompany) {
      return "coaches-Card white-background";
    }

    return "coaches-Card";
  };

  function isImageNull() {
    if (!coachFileFilePath) {
      return (
        <div className="coaches-image-wrapper-bg">
          {isAdmin && (
            <div className="edit-coach-img-wrp mt-0">
              <div
                className="edit-coach-img"
                onClick={(e) => props.openEdit(props.coachDetails)}
              ></div>
            </div>
          )}
          <img
            src={coachFileFilePath}
            className="coaches-image"
            alt="text"
          ></img>
        </div>
      );
    }

    return (
      <div className={"coaches-image-wrapper-bg"}>
        <img src={coachFileFilePath} className="coaches-image" alt="text"></img>
        {isAdmin && (
          <div className="edit-coach-img-wrp">
            <div
              className="edit-coach-img"
              onClick={(e) => props.openEdit(props.coachDetails)}
            ></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={decideCardBackgroundColor()}>
      <div className="coaches-image-wrapper">{isImageNull()}</div>
      <div className="coaches-content w-75">
        <div className="coachInfo d-flex justify-content-between mt-3">
          <span className="coaches-coachField">{coachField}</span>
          <span className="coaches-fullName">
            {coachFirstName}
            {` ${coachLastName}`}
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
            <img src={GoogleLogo} alt="logo"></img>
          </h6>
        </div>
      </div>
      <div className="btn-wrapper">{props.children}</div>
    </div>
  );
}

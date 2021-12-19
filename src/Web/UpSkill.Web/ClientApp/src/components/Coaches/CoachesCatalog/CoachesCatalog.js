import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CalendlyButton from "../../Shared/Calendly/CalendlyButton";
import CoachesCard from "./Coaches-Card/Coaches-Card";
import { PopupButton } from "react-calendly";
import { disableBodyScroll, enableBodyScroll } from "../../../utils/utils";
import CoachDetails from "../../Shared/CoachDetails/CoachDetails";

import "./CoachesCatalog.css";

export default function CoachesCatalog({ coaches }) {
  const [isOpenCoachDetails, setIsOpenCoachDetails] = useState(false);

  const setData = (coach) => {
    let {
      id,
      coachFirstName,
      coachLastName,
      coachField,
      coachPrice,
      coachFileFilePath,
      calendlyUrl,
    } = coach;
    localStorage.setItem("ID", id);
    localStorage.setItem("FirstName", coachFirstName);
    localStorage.setItem("LastName", coachLastName);
    localStorage.setItem("Field", coachField);
    localStorage.setItem("Price", coachPrice);
    localStorage.setItem("FilePath", coachFileFilePath);
    localStorage.setItem("CalendlyUrl", calendlyUrl);
  };

  function onOpenDetails(coach) {
    setData(coach);
    setIsOpenCoachDetails(true);
    disableBodyScroll();
  }

  function onCloseDetails(isOpen) {
    setIsOpenCoachDetails(isOpen);
    enableBodyScroll();
    localStorage.removeItem("ID");
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("Field");
    localStorage.removeItem("Price");
    localStorage.removeItem("FilePath");
    localStorage.removeItem("CalendlyUrl");
  }

  return (
    <>
      <div className="container">
        <div className="row list-unstyled coaches-list">
          {coaches.map((coach) => (
            <div className="col-sm-4 text-align-center" key={coach.id}>
              <CoachesCard
                key={coach.id}
                coachDetails={coach}
                displaySession={false}
                displayPrice={true}
                openDetails={onOpenDetails}
              >
                {/* <Button className="coaches-cardButton"> Add </Button>
                 <Button className="coaches-cardButton"> Remove </Button>*/}
                <PopupButton
                  className="btn btn-primary"
                  url={coach.calendlyUrl}
                  text="Book session"
                  pageSettings={{
                    backgroundColor: "ffffff",
                    hideEventTypeDetails: true,
                    hideGdprBanner: true,
                    hideLandingPageDetails: true,
                    primaryColor: "00a2ff",
                    textColor: "4d5055",
                  }}
                  prefill={{
                    email: "",
                    firstName: "",
                    lastName: "",
                    name: "",
                  }}
                ></PopupButton>
              </CoachesCard>
            </div>
          ))}
        </div>
        {isOpenCoachDetails && (
          <CoachDetails closeModal={onCloseDetails}></CoachDetails>
        )}
      </div>
    </>
  );
}

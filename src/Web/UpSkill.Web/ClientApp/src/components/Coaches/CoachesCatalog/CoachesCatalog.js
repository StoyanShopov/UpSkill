import { Button } from "react-bootstrap";
import CalendlyButton from "../../Shared/Calendly/CalendlyButton";
import CoachesCard from "./Coaches-Card/Coaches-Card";
import { PopupButton } from "react-calendly";

import "./CoachesCatalog.css";

export default function CoachesCatalog({ coaches }) {
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
      </div>
    </>
  );
}

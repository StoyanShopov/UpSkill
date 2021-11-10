import { Button } from "react-bootstrap";
import CoachesCard from "./Coaches-Card/Coaches-Card";

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
                <Button className="coaches-cardButton"> Add </Button>;
              </CoachesCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

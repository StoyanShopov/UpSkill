import { Button } from "react-bootstrap";
import CoachesCard from "../Coaches-Card/Coaches-Card";

export default function OwnerCoachesCatalog({ coaches, companyCoaches = null }) {
  const checkCompanyHasCoach = (coach) => {
    if (companyCoaches) {
      let contains=false;
      companyCoaches.map(c => {
        if (c.id == coach.id) {
          contains= true;
        }
      })
      console.log(contains);
      return contains;
    } else {
      return false;
    }
  };

  function addCoachToCompany(){};

  const buttonToShow = (checkCompanyHasCoach, coach) => {
    if (checkCompanyHasCoach) {
      return <Button className="coaches-cardButton"> Remove </Button>;
    } else {
      return <Button className="coaches-cardButton" onClick={addCoachToCompany(coach)}> Add </Button>;
    }
  };

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
                {buttonToShow(checkCompanyHasCoach(coach), coach)}
              </CoachesCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

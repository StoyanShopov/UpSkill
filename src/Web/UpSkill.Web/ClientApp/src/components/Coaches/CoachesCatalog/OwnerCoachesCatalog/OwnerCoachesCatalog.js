import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import CoachesCard from "../Coaches-Card/Coaches-Card";
import {
  getCoaches,
  removeCoach,
  addCoach,
} from "../../../../services/companyOwnerCoachesService";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";

export default function OwnerCoachesCatalog({
  coaches,
  setCoaches,
  companyCoaches = null,
}) {
  const [onRemove, setOnRemove] = useState(false);
  const [coachId, setCoachId] = useState(0);
  const initialPageCoaches = 0;

  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  };

  const checkCompanyHasCoach = (coach) => {
    if (companyCoaches) {
      let contains = false;
      companyCoaches.map((c) => {
        if (c.id == coach.id) {
          contains = true;
        }
      });
      return contains;
    } else {
      return false;
    }
  };

  const onDelete = (id) => {
    removeCoach(id).then(() =>
      getCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches))
    );
    setOnRemove(false);
    enableBodyScroll();
  };

  const onCloseConfirmRemove = (close) => {
    setOnRemove(close);
    enableBodyScroll();
  };

  function setOnRemoveInternal(id) {
    setCoachId(id);
    setOnRemove(true);
    disableBodyScroll();
  }

  const user = JSON.parse(localStorage.getItem("user"));

  function addCoachToCompany(coachId) {
    addCoach(user.email, coachId).then(() =>
      getCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches))
    );
  }

  const buttonToShow = (checkCompanyHasCoach, coachId) => {
    if (checkCompanyHasCoach) {
      return (
        <Button
          className="coaches-cardButton"
          onClick={(e) => setOnRemoveInternal(coachId)}
        >
          Remove
        </Button>
      );
    } else {
      return (
        <Button
          className="coaches-cardButton"
          onClick={(e) => addCoachToCompany(coachId)}
        >
          Add
        </Button>
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="row list-unstyled coaches-list ">
          {coaches.map((coach) => (
            <div
              className="col-sm-4 space-between-75 text-align-center"
              key={coach.id}
            >
              <CoachesCard
                key={coach.id}
                coachDetails={coach}
                displaySession={false}
                displayPrice={true}
                isInCompany={!checkCompanyHasCoach(coach)}
              >
                {onRemove && (
                  <ConfirmDelete
                    deleteItem={onDelete}
                    closeModal={onCloseConfirmRemove}
                    itemName="coach"
                    id={coachId}
                  />
                )}
                {buttonToShow(checkCompanyHasCoach(coach), coach.id)}
              </CoachesCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

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
import CoachDetails from "../../../Shared/CoachDetails/CoachDetails";

export default function OwnerCoachesCatalog({
  coaches,
  setCoaches,
  companyCoaches = null,
}) {
  const [onRemove, setOnRemove] = useState(false);
  const [coachId, setCoachId] = useState(0);
  const [isOpenCoachDetails, setIsOpenCoachDetails] = useState(false);
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

  // Here only for now will be removed when employee coaches is done
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
        <div className="row list-unstyled coaches-list space-between-75">
          {coaches.map((coach) => (
            <div
              className="col-sm-4 text-align-center"
              key={coach.id}
            >
              <CoachesCard
                key={coach.id}
                coachDetails={coach}
                displaySession={false}
                displayPrice={true}
                isInCompany={!checkCompanyHasCoach(coach)}
                openDetails={onOpenDetails}
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
        {isOpenCoachDetails && (
          <CoachDetails closeModal={onCloseDetails}></CoachDetails>
        )}
      </div>
    </>
  );
}

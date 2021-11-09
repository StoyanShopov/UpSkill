import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import CoachesCard from "../Coaches-Card/Coaches-Card";
import { addCoach } from "../../../../services/coachService";

import { getCoaches, removeCoach } from "../../../../services/coachService";

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
      console.log(contains);
      return contains;
    } else {
      return false;
    }
  };

  const onDelete = (id) => {
    removeCoach(id).then(() =>
      getCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches))
    );
    console.log("Deleted " + id);
    setOnRemove(false);
    enableBodyScroll();
  };

  const onCloseConfirmRemove= (close) =>{
      setOnRemove(close);
      enableBodyScroll();
  }

  function setOnRemoveInternal(id) {
    setCoachId(id);
    setOnRemove(true);
    disableBodyScroll();
  }

  const user = JSON.parse(localStorage.getItem("user"));

  function addCoachToCompany(coachId) {
    console.log("clicked", user.email, coachId);
    addCoach(user.email, coachId).then(() => routeChange("/MyProfile/Coaches"));
  }

  const buttonToShow = (checkCompanyHasCoach, coachId) => {
    if (checkCompanyHasCoach) {
      return (
        <Button
          className="coaches-cardButton"
          onClick={(e) => setOnRemoveInternal(coachId)}
        >
          {" "}
          Remove{" "}
        </Button>
      );
    } else {
      return (
        <Button
          className="coaches-cardButton"
          onClick={(e) => addCoachToCompany(coachId)}
        >
          {" "}
          Add{" "}
        </Button>
      );
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

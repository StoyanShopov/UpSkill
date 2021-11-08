import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import CoachesCard from "../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card";
import RemovePopup from "../../../Shared/RemovePopup/RemovePopup";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";

import "./CompanyCoaches.css";

import { getCoaches, removeCoach } from "../../../../services/coachService";
import { disableBodyScroll } from "../../../../utils/utils";

export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const [onRemove, setOnRemove] = useState(false);
  const [coachId, SetCoachId] = useState(0);
  const initialPageCoaches = 0;

  // const history = useHistory();

  // const routeChange = () =>{
  //   let path = `/coaches`;
  //   history.push(path);
  // }

  useEffect(() => {
    getCoaches(initialPageCoaches).then((coaches) => {
      setCoaches(coaches);
    });
  }, []);

  const onDelete = (id) => {
    removeCoach(id).then(() =>
      getCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches))
    );
    console.log("Deleted " + id);
    setOnRemove(false);
  };

  function setOnRemoveInternal() {
    setOnRemove(true);
    disableBodyScroll();
  }

  return (
    <div className="content main-content">
      {/* <RemovePopup
        trigger={onRemove}
        onRemove={onDelete}
        closeModal={setOnRemove}
        atPage="coaches"
        coachId={coachId}
      /> */}
      <div className={"buttonContainer"}>
        <input
          type="button"
          onClick={(event) => (window.location.href = "/Coaches")}
          className="btn btn-outline-primary px-4 m-4"
          value="Add"
        />
      </div>
      <div className="coachesContainer">
        {coaches.map((coach) => (
          <CoachesCard
            key={coach.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
          >
            <Button
              className="cardButton companyOwner-cardBtn"
              onClick={(e) => setOnRemoveInternal()}
            >
              Remove
            </Button>
            {onRemove && (
              <ConfirmDelete
                deleteItem={onDelete}
                closeModal={setOnRemove}
                itemName="coach"
                id={coach.id}
              />
            )}
          </CoachesCard>
        ))}
      </div>
    </div>
  );
}

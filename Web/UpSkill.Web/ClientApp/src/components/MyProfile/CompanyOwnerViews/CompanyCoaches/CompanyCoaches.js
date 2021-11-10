import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import CoachesCard from "../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card";
import RemovePopup from "../../../Shared/RemovePopup/RemovePopup";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import AddCoachModal from "./AddCoach/AddCoach";
import RequestCoach from "./AddCoach/RequestCoach/RequestCoach";

import "./CompanyCoaches.css";

import { getCoaches, removeCoach } from "../../../../services/coachService";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";

export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const [onRemove, setOnRemove] = useState(false);
  const [coachId, setCoachId] = useState(0);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);

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
    enableBodyScroll();
  };

  function setOnRemoveInternal(id) {
    setCoachId(id);
    setOnRemove(true);
    disableBodyScroll();
  }

  function onCloseModal(close) {
    setOnRemove(close);
    enableBodyScroll();
  }

  return (
    <div className="content main-content">
      <div className={"buttonContainer"}>
        <input
          type="button"
          onClick={(e) => setOpenRequestModal(true)}
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
              onClick={(e) => setOnRemoveInternal(coach.id)}
            >
              Remove
            </Button>
            {onRemove && (
              <ConfirmDelete
                deleteItem={onDelete}
                closeModal={onCloseModal}
                itemName="coach"
                id={coachId}
              />
            )}
            {openRequestModal && (
              <AddCoachModal
                closeModal={setOpenRequestModal}
                setOpenRequest={setOpenRequest}
              ></AddCoachModal>
            )}
            <RequestCoach trigger={openRequest} closeModal={setOpenRequest} />
          </CoachesCard>
        ))}
      </div>
    </div>
  );
}

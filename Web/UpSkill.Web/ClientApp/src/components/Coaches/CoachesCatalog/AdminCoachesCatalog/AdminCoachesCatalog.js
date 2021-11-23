import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import CoachesCard from "../Coaches-Card/Coaches-Card";
import "./AdminCoachesCatalog.css";
import { getAllCoaches } from "../../../../services/coachService";
import { removeCoach } from "../../../../services/adminCoachesService";

import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import CreateCoach from "./CreateCoach/CreateCoach";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";
import UpdateCoach from "./UpdateCoach/UpdateCoach";

export default function AdminCoachesCatalog({ coaches, setCoaches }) {
  const [onRemove, setOnRemove] = useState(false);
  const [openAddCoachModal, setOpenAddCoachModal] = useState(false);
  const [openEditCoachModal, setOpenEditCoachModal] = useState(false);
  const [currentCoach, setCurrentCoach] = useState({});
  const [coachId, setCoachId] = useState(0);
  const initialPageCoaches = 0;

  const defineCoachesCount = () => {
    let coursesCount = (coaches.length + 1) % 3;

    if (coursesCount !== 0) {
      return true;
    }

    return false;
  };

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

  const getValue = (coach) => {
    setData(coach);
    setCurrentCoach(coach);
    onOpenEditCoachModal();
  };

  const onOpenEditCoachModal = () => {
    console.log("hi");
    setOpenEditCoachModal(true);
    disableBodyScroll();
  };

  function onCloseEditCoachModal() {
    setOpenEditCoachModal(false);
    getAllCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches));
    enableBodyScroll();
  }

  const onOpenAddCoachModal = () => {
    setOpenAddCoachModal(true);
    disableBodyScroll();
  };

  function onCloseAddCoachModal() {
    setOpenAddCoachModal(false);
    getAllCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches));
    enableBodyScroll();
  }

  const onDelete = (id) => {
    removeCoach(id).then(() =>
      getAllCoaches(initialPageCoaches).then((coaches) => setCoaches(coaches))
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
                openEdit={getValue}
              >
                {onRemove && (
                  <ConfirmDelete
                    deleteItem={onDelete}
                    closeModal={onCloseConfirmRemove}
                    itemName="coach"
                    id={coachId}
                  />
                )}
                <Button
                  className="coaches-cardButton"
                  onClick={(e) => setOnRemoveInternal(coach.id)}
                >
                  Delete
                </Button>
              </CoachesCard>
            </div>
          ))}
          <UpdateCoach
            trigger={openEditCoachModal}
            closeModal={onCloseEditCoachModal}
            coachDetails={currentCoach}
          ></UpdateCoach>
          <CreateCoach
            trigger={openAddCoachModal}
            closeModal={onCloseAddCoachModal}
          ></CreateCoach>
          <div className="alignAdminCoachesContentBox">
            <div className="addImage" onClick={onOpenAddCoachModal}></div>
          </div>
          {defineCoachesCount() && (
            <div className="alignAdminCoachesContentBox">
              {console.log(defineCoachesCount())}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

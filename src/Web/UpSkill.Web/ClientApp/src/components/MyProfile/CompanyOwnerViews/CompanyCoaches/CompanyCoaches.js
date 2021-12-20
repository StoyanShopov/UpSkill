import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import CoachesCard from "../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card";
import RemovePopup from "../../../Shared/RemovePopup/RemovePopup";
import ConfirmDelete from "../../../Shared/ConfirmDelete/ConfirmDelete";
import AddCoachModal from "./AddCoach/AddCoach";
import RequestCoach from "./AddCoach/RequestCoach/RequestCoach";
import CoachDetails from "../../../Shared/CoachDetails/CoachDetails";

import "./CompanyCoaches.css";

import {
  getCoaches,
  removeCoach,
} from "../../../../services/companyOwnerCoachesService";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";

export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const [onRemove, setOnRemove] = useState(false);
  const [coachId, setCoachId] = useState(0);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [isOpenCoachDetails, setIsOpenCoachDetails] = useState(false);

  const initialPageCoaches = 0;

  // const history = useHistory();

  // const routeChange = () =>{
  //   let path = `/coaches`;
  //   history.push(path);
  // }
  const areCoachesOdd = () => {
    if (coaches.length % 2 !== 0) {
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

  function onOpenDetails(coach, e) {
    e.preventDefault();
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

  useEffect(() => {
    getCoaches(initialPageCoaches).then((coaches) => {
      if (coaches) {
        setCoaches(coaches);
      }
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
          className="btn btn-outline-primary px-4 m-4 owner-manage-btn"
          value="Manage"
        />
      </div>
      <div className="coachesContainer">
        {coaches.map((coach) => (
          <div className="col-sm-5 text-align-center" key={coach.id}>
          <CoachesCard
            key={coach.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
            isInCompany={true}
            openDetails={onOpenDetails}
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
          </div>
        ))}
        {areCoachesOdd() && (
          <div className="alignCompanyCoachesContentBox">
            {console.log("hi")}
          </div>
        )}
      </div>
      <div style={{ position: "fixed", height: "50vh", top: "3%" }}>
        {isOpenCoachDetails && (
          <CoachDetails
            style={{ marginBottom: "20rem" }}
            closeModal={onCloseDetails}
            inProfile={true}
          ></CoachDetails>
        )}
      </div>
    </div>
  );
}

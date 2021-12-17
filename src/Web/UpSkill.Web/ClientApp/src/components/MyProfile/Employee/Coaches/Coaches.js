import { useState, useEffect } from "react";
import { PopupButton } from "react-calendly";
import CoachesCard from "../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card";
import { getCoaches } from "../../../../services/EmployeeCoachService";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";
import CoachDetails from "../../../Shared/CoachDetails/CoachDetails";

export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const [employee, setEmployee] = useState({});
  const [isOpenCoachDetails, setIsOpenCoachDetails] = useState(false);

  const initialPageCoaches = 0;

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

  useEffect(() => {
    getCoaches(initialPageCoaches).then((coaches) => {
      if (coaches) {
        setCoaches(coaches);
      }
    });
    const user = JSON.parse(localStorage.getItem("user"));
    setEmployee(user);
  }, []);

  return (
    <div className="content main-content">
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
              <PopupButton
                className="btn btn-primary button"
                url={coach.coachCalendlyUrl}
                text="Book"
                pageSettings={{
                  backgroundColor: "ffffff",
                  hideEventTypeDetails: true,
                  hideGdprBanner: true,
                  hideLandingPageDetails: true,
                  primaryColor: "00a2ff",
                  textColor: "4d5055",
                }}
                prefill={{
                  email: employee.email,
                  firstName: "",
                  lastName: "",
                  name: employee.unique_name,
                }}
              ></PopupButton>
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

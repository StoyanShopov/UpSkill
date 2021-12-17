import { useState, useEffect } from "react";
import { PopupButton } from "react-calendly";
import CoachesCard from "../../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card";
import {
  getCoaches,
  setCoachNotNew,
} from "../../../../services/EmployeeCoachService";
import { getEnrolledCourses } from "../../../../services/employeeService";
import { disableBodyScroll, enableBodyScroll } from "../../../../utils/utils";
import CoachDetails from "../../../Shared/CoachDetails/CoachDetails";
import { Button } from "react-bootstrap";
import CoursesCard from "../../CompanyOwnerViews/Courses/CoursesCatalog/CoursesCard/CoursesCard";
import DetailsModal from "../../../Shared/CourseDetails/DetailsModal";

export default function Dashboard() {
  const [coaches, setCoaches] = useState([]);
  const [employee, setEmployee] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isOpenCoachDetails, setIsOpenCoachDetails] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const initialPageCoaches = 0;

  const areCoachesOdd = () => {
    if (coaches.length % 2 !== 0) {
      return true;
    }
    return false;
  };

  const setDataCourse = (data) => {
    let { id, fullName, courseTitle, courseDescription } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("FullName", fullName);
    localStorage.setItem("Title", courseTitle);
    localStorage.setItem("Description", courseDescription);
  };

  const checkPopUp = () => {
    if (isDetailsOpen) {
      disableBodyScroll();
    } else {
      localStorage.removeItem("ID");
      localStorage.removeItem("FullName");
      localStorage.removeItem("Title");
      localStorage.removeItem("Description");
      enableBodyScroll();
    }
  };

  const getValue = (course) => {
    setDataCourse(course);
  };

  const setDataCoach = (coach) => {
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
    if (coach.isNew) {
      setCoachNotNew(coach.id);
    }
    setDataCoach(coach);
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

    getCoaches(initialPageCoaches).then((coaches) => {
      let newCoaches = [];
      if (coaches) {
        coaches.map((c) => {
          if (c.isNew) {
            newCoaches.push(c);
          }
        });
        setCoaches(newCoaches);
      }
    });
  }

  useEffect(() => {
    getEnrolledCourses().then((enrolledCourses) => {
      setEnrolledCourses(enrolledCourses);
    });
  }, []);

  useEffect(() => {
    getCoaches(initialPageCoaches).then((coaches) => {
      let newCoaches = [];
      if (coaches) {
        coaches.map((c) => {
          if (c.isNew) {
            newCoaches.push(c);
          }
        });
        setCoaches(newCoaches);
      }
    });
    const user = JSON.parse(localStorage.getItem("user"));
    setEmployee(user);
  }, []);

  return (
    <div className="content main-content">
      {console.log(coaches)}
      <div className="coachesContainer">
        {enrolledCourses.map((course) => (
          <div className="col-sm-5 text-align-center" key={course.id}>
            <CoursesCard
              key={course.id}
              coursesDetails={course}
              isActive={true}
              closeMoadal={setIsDetailsOpen}
              getDetails={getValue}
            >
              <a href={`/Course/${course.id}`}>
                <Button className="button">
                  <p className="cardButtonText">Continue</p>
                </Button>
              </a>
            </CoursesCard>
          </div>
        ))}
        {coaches.map((coach) => (
          <div className="col-sm-5 text-align-center" key={coach.id}>
            <CoachesCard
              key={coach.id}
              coachDetails={coach}
              displaySession={false}
              displayPrice={true}
              openDetails={onOpenDetails}
            >
              <Button className="button">
                <p
                  className="cardButtonText"
                  onClick={(e) => onOpenDetails(coach, e)}
                >
                  New Slot
                </p>
              </Button>
            </CoachesCard>
          </div>
        ))}
        {areCoachesOdd() && (
          <div className="alignCompanyCoachesContentBox"></div>
        )}
      </div>
      <div>
        {checkPopUp()}
        {isDetailsOpen && (
          <DetailsModal closeModal={setIsDetailsOpen} inProfile={true}>
            <button className="btn btn-primary">Enroll</button>
          </DetailsModal>
        )}
        {isOpenCoachDetails && (
          <CoachDetails
            style={{ marginBottom: "20rem" }}
            closeModal={onCloseDetails}
            inProfile={false}
          ></CoachDetails>
        )}
      </div>
    </div>
  );
}

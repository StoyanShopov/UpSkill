import React, { useState } from "react";

import CourseDetailsResourcesContext from "../../../../../Context/CourseDetailsResourcesContext";
import Details from "./Details/Details";

import "./SidebarResources.css";

const SidebarResources = (props) => {
  const {
    courseResources: {
      courseFileFilePath,
      courseCoachFirstName,
      courseCoachLastName,
      courseLectures,
    },
  } = props;

  console.log(props.courseResources.courseLectures);
  const [initialLecture, setInitialLecture] = useState(courseLectures[0]);
  const [currentLecture, setCurrentLecture] = useState({});

  return (
    <CourseDetailsResourcesContext.Provider
      value={[
        initialLecture,
        currentLecture,
        courseFileFilePath,
        courseCoachFirstName,
        courseCoachLastName,
      ]}
    >
      <Details />
      <div className="courseResoursesSidebar">
        <span style={{ display: "block", verticalAlign: "middle" }}>
          Lectures
        </span>
        <div className="accordion" id="myAccordion">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              {courseLectures.map((lecture) => (
                <div key={lecture.id}>
                  <div
                    value={lecture}
                    onClick={() => setCurrentLecture({ lecture })}
                  >
                    <button
                      type="button"
                      class="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                    >
                      {lecture.lectureName}
                    </button>
                  </div>
                </div>
              ))}
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#myAccordion"
            ></div>
            <span className="nav-link viewMore">View More</span>
          </div>
        </div>
      </div>
    </CourseDetailsResourcesContext.Provider>
  );
};

export default SidebarResources;

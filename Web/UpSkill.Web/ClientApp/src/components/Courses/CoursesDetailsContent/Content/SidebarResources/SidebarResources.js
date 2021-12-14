import React, { useState, useEffect } from "react";

import CourseDetailsResourcesContext from "../../../../../Context/CourseDetailsResourcesContext";
import Details from "./Details/Details";
import Accordion from "react-bootstrap/Accordion";

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
  const lecturesPerPage = 6;
  let arrayForHoldingLectures = [];

  const [lecturesToView, setLecturesToView] = useState([]);
  const [next, setNext] = useState(6);
  const [flagForBackButton, setFlagForBackButton] = useState(false);

  const loopWithSlice = (start, end) => {
    const slicedLectures = courseLectures.slice(start, end);
    arrayForHoldingLectures = [...arrayForHoldingLectures, ...slicedLectures];
    console.log(arrayForHoldingLectures);
    setLecturesToView(arrayForHoldingLectures);
  };

  useEffect(() => {
    loopWithSlice(0, lecturesPerPage);
  }, []);

  const handleViewMoreLectures = () => {
    loopWithSlice(next, next + lecturesPerPage);
    setNext(next + lecturesPerPage);
  };

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
        <Accordion defaultActiveKey="0">
          {lecturesToView.map((lecture) => (
            <Accordion.Item eventKey={lecture.id}>
              <Accordion.Header onClick={() => setCurrentLecture({ lecture })}>
                 {lecture.lectureName}
              </Accordion.Header>
              {lecture.lectureLessons.map((lesson) => (
                <Accordion.Body eventKey={lesson.id}>
                  <a href={lesson.lessonUrl}>Resourses</a>
                </Accordion.Body>
              ))}
            </Accordion.Item>
          ))}
        </Accordion>
        <button onClick={handleViewMoreLectures}>View more</button>
      </div>
    </CourseDetailsResourcesContext.Provider>
  );
};

export default SidebarResources;

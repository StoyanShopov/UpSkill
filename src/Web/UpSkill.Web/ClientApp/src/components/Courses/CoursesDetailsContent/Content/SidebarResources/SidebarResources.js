import React, { useState, useEffect } from "react";

import CourseDetailsResourcesContext from "../../../../../Context/CourseDetailsResourcesContext";
import Details from "./Details/Details";
import Accordion from "react-bootstrap/Accordion";
import CountUp from "react-countup";

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
  const [lecturesPerPage, setLecturesPerPage] = useState(6);
  let arrayForHoldingLectures = [];

  const [lecturesToView, setLecturesToView] = useState([]);

  const loopWithSlice = (start, end) => {
    const slicedLectures = courseLectures.slice(start, end);
    arrayForHoldingLectures = [...arrayForHoldingLectures, ...slicedLectures];
    console.log(arrayForHoldingLectures);
    if(arrayForHoldingLectures.length > 0) {
        setLecturesToView(arrayForHoldingLectures);
    }   
  };

  useEffect(() => {
    setLecturesPerPage();
    loopWithSlice(0, lecturesPerPage);   
  }, []);

  const handleViewMoreLectures = () => {
    setLecturesPerPage(6 + lecturesPerPage);
    loopWithSlice(0, lecturesPerPage);
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
        <div className="lectures-title">
          Lectures
        </div>
        <Accordion className="accordion" defaultActiveKey="0">
          {lecturesToView.map((lecture, index) => (
            <Accordion.Item eventKey={lecture.id}>
              <Accordion.Header onClick={() => setCurrentLecture({ lecture })}>
                {index + 1}. {lecture.lectureName}
              </Accordion.Header>
              {lecture.lectureLessons.map((lesson) => (
                <Accordion.Body eventKey={lesson.id}>
                  <a href={lesson.lessonUrl}>Resourses</a>
                </Accordion.Body>
              ))}
            </Accordion.Item>
          ))}
        </Accordion>

        <button className="lectures-button" onClick={handleViewMoreLectures}>View more</button>
      </div>
    </CourseDetailsResourcesContext.Provider>
  );
};

export default SidebarResources;

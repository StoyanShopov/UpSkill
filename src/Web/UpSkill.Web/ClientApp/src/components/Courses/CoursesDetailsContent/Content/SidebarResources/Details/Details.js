import React, { useContext, useState, useEffect } from "react";
import { ReactReduxContext } from "react-redux";
import { ReactVideo } from 'reactjs-media';
import { Editor } from '@tinymce/tinymce-react';

import sanitizeHtml from 'sanitize-html';

import CourseDetailsResourcesContext from "../../../../../../Context/CourseDetailsResourcesContext";

import './Details.css';

const Details = () => {
  const [initialLecture, currentLecture, courseFileFilePath, courseCoachFirstName, courseCoachLastName] = useContext(CourseDetailsResourcesContext);
  const [text, setText] = useState("");
  const { store } = useContext(ReactReduxContext);
  const [flag, setFlag] = useState(false);
  var { isAdmin } = store.getState().auth;

  console.log(currentLecture);

  useEffect(() => {
    if (currentLecture.lecture != null) {
      setFlag(true);
     }
  }, [currentLecture])

  console.log(flag);

    return(
      <>
      {flag ? (
      <div className="container" key={currentLecture.lecture?.id}>
        <h2 className="courseTitleContent">{currentLecture.lecture?.lectureName}</h2>
        {currentLecture.lecture?.lectureLessons.map((lesson) => (
          <ReactVideo
          key={lesson.id}
          className="courseVideoContent"
          src={lesson.lessonUrl}
          poster={courseFileFilePath}
          primaryColor="red" />))}<br/>
        <h4 className="lectureDescriptionContent">Lecture Description</h4>
          {isAdmin ? (
            <Editor
              initialValue={sanitizeHtml(currentLecture.lecture?.lectureDescription)}
              onEditorChange={(newText) => setText(newText)}
              init={{
                height: 180,
                width: 700,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'font: normal normal bold 22px/27px Montserrat;' +
                  'letter-spacing: 1.1px; color: #000000; opacity: 1;'
              }} />) : (
            <p className="descriptionContent">{sanitizeHtml(currentLecture.lecture?.lectureDescription)}</p>
          )}<br />
        <h4 className="instructorContent">Instructor</h4><p>{courseCoachFirstName + " " + courseCoachLastName}</p>        
      </div>
        ):(
          <div className="container" key={initialLecture?.id}>
              <h2 className="courseTitleContent">{initialLecture?.lectureName}</h2>
              {initialLecture?.lectureLessons.map((lesson) => (
                <ReactVideo
                key={lesson.id}
                className="courseVideoContent"
                src={lesson.lessonUrl}
                poster={courseFileFilePath}
                primaryColor="red" />))}<br/>
              <h4 className="lectureDescriptionContent">Lecture Description</h4>
                {isAdmin ? (
                  <Editor
                    initialValue={sanitizeHtml(initialLecture?.lectureDescription)}
                    onEditorChange={(newText) => setText(newText)}
                    init={{
                      height: 180,
                      width: 700,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'font: normal normal bold 22px/27px Montserrat;' +
                        'letter-spacing: 1.1px; color: #000000; opacity: 1;'
                    }} />) : (
                  <p className="descriptionContent">{sanitizeHtml(initialLecture?.lectureDescription)}</p>
                )}<br />
              <h4 className="instructorContent">Instructor</h4><p>{courseCoachFirstName + " " + courseCoachLastName}</p>        
        </div>
        )}
      </>
    )
}

export default Details;
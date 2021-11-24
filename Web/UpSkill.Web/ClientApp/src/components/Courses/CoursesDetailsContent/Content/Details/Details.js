import React, { useContext, useState } from "react";
import { ReactReduxContext } from "react-redux";
import { ReactVideo } from 'reactjs-media';
import { Editor } from '@tinymce/tinymce-react';

import sanitizeHtml from 'sanitize-html';

import CourseDetailsResourcesContext from "../../../../../Context/CourseDetailsResourcesContext";

import './Details.css';

const Details = (props) => { 
  const {
    lecture: {lecture, lectureLessons}
  }=props;

  // const [currentLecture, setCurrentLecture] = useContext(CourseDetailsResourcesContext);
  const [text, setText] = useState("");
  const { store } = useContext(ReactReduxContext);
  var { isAdmin } = store.getState().auth;

  console.log(lecture);

    return(
        <div className="container" key={lecture.id}>
            <>
              <h2 className="courseTitleContent">{lecture.lectureName}</h2>
              {lectureLessons.map((lesson) => (
                <>
                <ReactVideo
                className="courseVideoContent"
                src={lesson.lessonUrl}
                primaryColor="red" /><br/>
                </>
              ))}
              <h4 className="lectureDescriptionContent">Lecture Description</h4>
              <>
                {isAdmin ? (
                  <Editor
                    initialValue={sanitizeHtml(lecture.lectureDescription)}
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
                  <p className="descriptionContent">{sanitizeHtml(lecture.lectureDescription)}</p>
                )}<br />
             </>
              {/* <h4 className="instructorContent">Instructor</h4><p>{courseCoachFirstName + " " + courseCoachLastName}</p>  */}
            </>       
      </div>
  )
}

export default Details;

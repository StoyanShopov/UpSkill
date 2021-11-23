import React, { useContext ,useState } from "react";
import { ReactReduxContext } from "react-redux";
import { ReactVideo } from 'reactjs-media';
import { Editor } from '@tinymce/tinymce-react';

import sanitizeHtml from 'sanitize-html';

import CourseDetailsResourcesContext from "../../../../../Context/CourseDetailsResourcesContext";

import './Details.css';

const Details = (props) => { 
  const {   
    courseDetails: 
    {
      id,
      courseFileFilePath, 
      courseCoachFirstName,
      courseCoachLastName,
      courseLectures,
    },
  } = props;

  const[lecture, setLecture] = useState("");

    const [text, setText] = useState("");
    const { store } = useContext(ReactReduxContext);
    var { isAdmin } = store.getState().auth;

    return(
    <>
    <CourseDetailsResourcesContext.Provider
    value={[lecture, setLecture]}>
        <div className="container" key={id}>
            <>
              <h2 className="courseTitleContent">{lecture.lectureName}</h2>
              {lecture.lectureLessons.map((lesson) => (
                <>
                <ReactVideo
                className="courseVideoContent"
                src={lesson.lessonUrl}
                poster={courseFileFilePath}
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
              <h4 className="instructorContent">Instructor</h4><p>{courseCoachFirstName + " " + courseCoachLastName}</p>
            </>           
        </div>
        </CourseDetailsResourcesContext.Provider>
    </>
    )
}

export default Details;

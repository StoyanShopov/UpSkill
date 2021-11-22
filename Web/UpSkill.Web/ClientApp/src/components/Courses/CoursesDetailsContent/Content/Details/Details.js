import React, { useState } from "react";
import { ReactVideo } from 'reactjs-media';
import { Editor } from '@tinymce/tinymce-react';

import sanitizeHtml from 'sanitize-html';

import './Details.css';

const Details = (props) => {
  const {   
    courseDetails: 
    { 
      id,
      courseTitle, 
      courseFileFilePath, 
      courseDescription,
      courseCoachFirstName,
      courseCoachLastName,
    },
  } = props;

    const [text, setText] = useState(courseDescription);

    const sanitizeText = sanitizeHtml(text, {
      allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
      allowedAttributes: {
        'a': [ 'href' ]
      },
      allowedIframeHostnames: ['www.youtube.com']
    });

    return(
    <>
        <div className="container" key={id}>
                <h2 className="courseTitleContent">{courseTitle}</h2>
                <ReactVideo
                className="courseVideoContent"
                src="https://youtu.be/Y2a16HAsHBE"
                poster={courseFileFilePath}
                primaryColor="red"
                /><br/>
                <h4 className="lectureDescriptionContent">Lecture Description</h4>
                <Editor
                initialValue={sanitizeText}
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
                }}
                /><br/>
                <h4 className="instructorContent">Instructor</h4>
                <p>{courseCoachFirstName + " " + courseCoachLastName}</p>                
        </div>
    </>
    )
}

export default Details;

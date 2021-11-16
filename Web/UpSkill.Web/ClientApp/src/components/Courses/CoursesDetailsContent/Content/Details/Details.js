import React, { useState } from "react";
import { ReactVideo } from 'reactjs-media';
import { Editor } from '@tinymce/tinymce-react';

import './Details.css';

import marketingImg from '../../../../../assets/img/courses/Marketing.png';

const Details = (props) => {
    const {  
        courseDetails: { courseTitle, courseVideo, courseLecturer, courseDescription },
    } = props;

    const [text, setText] = useState(courseDescription);

    return(
        <div className="container">
                <h2 className="courseTitleContent">{courseTitle}</h2>
                <ReactVideo
                className="courseVideoContent"
                src={courseVideo}
                poster={marketingImg}
                primaryColor="red"
                /><br/>
                <h4 className="lectureDescriptionContent">Lecture Description</h4>
                <Editor
                initialValue={text}
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
                {/* <p className="descriptionContent">{courseDescription}</p> */}
                <h4 className="instructorContent">Instructor</h4>
                <p>{courseLecturer}</p>                
        </div>   
    )
}

export default Details;

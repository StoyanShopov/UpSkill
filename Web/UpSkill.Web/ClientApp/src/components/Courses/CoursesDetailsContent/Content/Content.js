import React from 'react';

import VideoPlayer from './VideoPlayer/VideoPlayer';
import LectureDescription from './LectureDescription/LectureDescription';

import './Content.css'

const Content = () => {
    return(
        <div>
            <VideoPlayer/>
            <LectureDescription/>
        </div>
    );
}

export default Content;

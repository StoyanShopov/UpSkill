import React, { useRef } from "react";

import useVideoPlayer from '../../../../../Hooks/useVideoPlayer';

import './VideoPlayer.css';

const VideoPlayer = () => {
    const video = useRef(null)
    const {
        playerState,
        togglePlay,
        handleTimeUpdate,
        handleProgressVideo,
        handleVideoSpeed,
        toggleMute,
    } = useVideoPlayer(video);

    return(
        <div className="container">
            <div className="video-wrapper">
                <video
                src={"https://www.youtube.com/embed/IcPHsbeXaiM"}
                ref={video}
                onTimeUpdate={handleTimeUpdate}
                />
                <div className="controls">
                    <div className="actions">
                    <button onClick={togglePlay}>
                    {!playerState.isPlaying ? (
                          <i className="bx bx-play"></i>
                          ) : (
                            <i className="bx bx-pause"></i>
                          )}
                        </button>
                        <div>
                            <input
                            type="range"
                            min=""
                            max="100"
                            value={playerState.progress}
                            onChange={(e) => handleProgressVideo(e)}
                            />
                            <select
                            className="displaySpeed"
                            value={playerState.speed}
                            onChange={(e) => handleVideoSpeed(e)}
                            >
                                <option value="0.50">0.50x</option>
                                <option value="1">1x</option>
                                <option value="1.25">1.25x</option>
                                <option value="2">2x</option>
                            </select>
                            <button className="mute-btn" onClick={toggleMute}>
                            {!playerState.isMuted ? (
                                <i className="bx bxs-volume-full"></i>
                                ) : (
                                    <i className="bx bxs-volume-mute"></i>
                               )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default VideoPlayer;

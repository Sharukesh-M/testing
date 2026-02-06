import React, { useEffect, useRef } from "react";
import "./VideoBackground.css";

const VideoBackground = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const selectedVideo = videoSrc || "/videos/Harry_Potter_Hall_Animation_Generated.mp4";

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }
    }, [selectedVideo]);

    return (
        <div className="video-background-container">
            <video
                ref={videoRef}
                autoPlay
                loop
                playsInline
                key={selectedVideo} // Force re-render on src change
                className="video-background-content"
            >
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="video-background-overlay"></div>
        </div>
    );
};

export default VideoBackground;

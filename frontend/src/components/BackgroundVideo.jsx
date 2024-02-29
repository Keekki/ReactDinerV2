import React, { useState, useEffect, useRef } from "react";
import "../styling/BackgroundVideo.css";

const BackgroundVideo = () => {
  const videos = ["salmon.mp4", "steak1.mp4", "steak2.mp4", "pizza.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVideo((currentVideo + 1) % videos.length);
        setIsTransitioning(false);
      }, 1000); // Change video after 1 second (during fade-out)
    }, 6000); // Change video every 6 seconds
    return () => clearTimeout(timer);
  }, [currentVideo, videos.length]);

  return (
    <div className="background-video">
      <video
        ref={videoRef}
        src={`https://reactdinebackend.onrender.com/assets/videos/${videos[currentVideo]}`}
        autoPlay
        loop
        muted
        className={`video ${isTransitioning ? "fade-out" : "fade-in"}`}
      />
    </div>
  );
};

export default BackgroundVideo;

"use client";

import { useEffect, useRef, useState } from "react";
import AvatarCanvas from "./AvatarCanvas";
import FaceLandmarkManager from "../class/FaceLandmarkManager";

const FaceLandmarkCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);
  const [avatarView, setAvatarView] = useState(true);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);

  const [modelUrl, setModelUrl] = useState(
    "../assets/glb/animal_face_pack.gltf"
  );

  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();

  const toggleAvatarView = () => setAvatarView((prev) => !prev);
  const toggleAvatarCreatorView = () => setShowAvatarCreator((prev) => !prev);


  const animate = () => {
    if (
      videoRef.current &&
      videoRef.current.currentTime !== lastVideoTimeRef.current
    ) {
      lastVideoTimeRef.current = videoRef.current.currentTime;
      try {
        const faceLandmarkManager = FaceLandmarkManager.getInstance();
        faceLandmarkManager.detectLandmarks(videoRef.current, Date.now());
      } catch (e) {
        console.log(e);
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setVideoSize({
              width: videoRef.current!.offsetWidth,
              height: videoRef.current!.offsetHeight,
            });
            videoRef.current!.play();

            // Start animation once video is loaded
            requestRef.current = requestAnimationFrame(animate);
          };
        }
      } catch (e) {
        console.log(e);
        alert("Failed to load webcam!");
      }
    };
    getUserCamera();

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-10 mt-5 mb-10">
        <button
          className="self-end bg-purple-700 hover:bg-purple-600 transition text-white px-2 py-1 rounded mb-2 shadow-md text-sm sm:text-base"
          onClick={toggleAvatarView}
        >
          {avatarView ? "Switch to Landmark View" : "Switch to Avatar View"}
        </button>
        <button
          className="self-end bg-purple-700 hover:bg-purple-600 transition text-white px-2 py-1 rounded mb-2 shadow-md text-sm sm:text-base"
          onClick={toggleAvatarCreatorView}
        >
          {"Customize your Avatar!"}
        </button>
      </div>
      <div className="flex justify-center" style={{ position: "relative" }}>
          <video
            className="w-full h-auto"
            ref={videoRef}
            loop={true}
            muted={true}
            autoPlay={true}
            playsInline={true}
            style={{transform : "rotateY(180deg)"}}
          ></video>
          {videoSize && (
            <>
              {
                <AvatarCanvas
                  width={videoSize.width}
                  height={videoSize.height}
                  url={modelUrl}
                />
              }
              
            </>
          )}
        
      </div>
    </div>
  );
};

export default FaceLandmarkCanvas;

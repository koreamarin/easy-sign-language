/**
 * 여기 FaceLandmarkCanvas.tsx 에서는 최종적으로
 * <video> 태그 (카메라로 촬영된 영상) 와
 * <AvatarCanvas> 컴포넌트를 return합니다.
 * 
 * 즉, 출력되는 영상에 아바타 모델 이미지가 씌워졌다기 보단,
 * 출력되는 영상 <video> 태그가 따로 있고,
 * 아바타 모델만을 출력하는 <AvatarCanvas> 가 따로 존재하는데
 * <video> 위에 <AvatarCanvas>를 position = "absolute" 로 겹쳐서 출력하는 것입니다.
 * 
 */
"use client";

import { useEffect, useRef, useState } from "react";
import AvatarCanvas from "./AvatarCanvas";
import FaceLandmarkManager from "../class/FaceLandmarkManager";

const FaceLandmarkCanvas = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef(-1);
  const requestRef = useRef(0);

  const [modelUrl, setModelUrl] = useState(
    "../assets/glb/animal_face_pack.gltf"
  );

  const [avatar, setAvatar] = useState("Chicken");

  const [videoSize, setVideoSize] = useState<{
    width: number;
    height: number;
  }>();

  const changeAvatar = (avatar: string) => setAvatar((avatar));

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
                  avatar_name={avatar}
                />
              }
              
            </>
          )}
          <button onClick={() => changeAvatar("Cat")}>고양이로 변신</button>
          <button onClick={() => changeAvatar("Bear")}>곰으로 변신</button>
          <button onClick={() => changeAvatar("Chicken")}>닭으로 변신</button>
        
      </div>
    </div>
  );
};

export default FaceLandmarkCanvas;

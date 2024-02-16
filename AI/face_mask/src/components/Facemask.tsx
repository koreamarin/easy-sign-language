import React from 'react';
import FaceLandmarkCanvas  from "./FaceLandmarkCanvas";

function Facemask() {
  return (
    <div className="flex flex-col items-center px-2 pt-10 bg-gradient-to-r from-purple-500 to-blue-800 min-h-screen text-white">

        <title>Face mask demo</title>
        <meta
          name="description"
          content="A demo application showcasing facemask"
        />
        <meta
          name="keywords"
          content="Mediapie, FaceLandmarker, Threejs, Canvas, React"
        />

      <h1>
        Facemask 기능 데모입니다.
      </h1>
      <p>
        현재 띄워지고 있는 페이지는 "src/components/Facemask.tsx" 파일로, 
        <br/>(영상+모델)을 출력하는 컴포넌트는 "src/components/FaceLandmarkCanvas.tsx" 파일 입니다.
      </p>
        <FaceLandmarkCanvas />
    </div>
  );
}

export default Facemask;

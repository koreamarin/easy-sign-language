import React from 'react';
import FaceLandmarkCanvas  from "./FaceLandmarkCanvas";

function Facemask() {
  return (
    <div className="flex flex-col items-center px-2 pt-10 bg-gradient-to-r from-purple-500 to-blue-800 min-h-screen text-white">

        <title>Mediapie FaceLandmarker Demo</title>
        <meta
          name="description"
          content="A demo application showcasing Mediapie FaceLandmarker's real-time facial landmark and blendshape score estimation."
        />
        <meta
          name="keywords"
          content="Mediapie, FaceLandmarker, AR Filter, ReadyPlayerMe, Facial landmarks, tensorflow-js"
        />

      <h1 className="text-xl md:text-4xl font-bold mb-2 text-shadow text-center">
        Mediapie FaceLandmarker Demo
      </h1>
      <p className="mt-4 mb-4 text-center px-4 md:text-lg text-sm">
        Detect the most prominent face from an input image, then estimate 478 3D
        facial landmarks and 52 facial blendshape scores in real-time.
      </p>
        <FaceLandmarkCanvas />
    </div>
  );
}

export default Facemask;

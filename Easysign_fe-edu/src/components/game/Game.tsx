import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import Nav from "../nav/Nav";
import { token } from "../../pages/Main";

import Sonagi from "../Sonagi/Sonagi";

export type trainingDataType = {
  signId: number;
  content: string;
  imagePath: string;
  videoPath: string;
  success: boolean;
};

const Lecture = () => {
  return (
    <div
      style={{
        border: "1px solid #b8b8b8",
        width: "1300px",
        height: "900px",
        display: "flex", // 추가
        flexDirection: "row", // 추가
      }}
    >
      {/* <Nav Progress2Visibility={false} /> */}
      <Sonagi />
    </div>
  );
};

export default Lecture;

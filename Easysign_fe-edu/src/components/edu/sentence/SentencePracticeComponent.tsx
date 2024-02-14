import { useOutletContext } from "react-router-dom";
import BracketButton from "../../Button/BracketButton";
import SentenceProgressBar from "./SentenceProgressBar";
import { trainingDataType } from "../Lecture";
import EndModal from "../../common/EndModal";
import { useRef, useState } from "react";
import MediumButton from "../../Button/MediumButton";
import Progress from "../../nav/Progress";
import styled from "styled-components";
import CameraComponent from "../../poseModelComponents/CameraComponent";
import WideCameraComponent from "../../poseModelComponents/WideCameraComponent";

const Div = styled.div`
  font-family: "Black Han Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const SentencePracticeComponent = () => {
  interface IFollowersContext {
    trainingData: trainingDataType[];
    setTrainingData: (trainingData: trainingDataType[]) => void;
    currentNum: number;
    setCurrentNum: (currentNum: number) => void;
    addSticker: number;
    ShownEndModalStatus: boolean;
    ShownEndModal: () => void;
    category: string;
    gubun: string;
  }
  const { trainingData, currentNum, setCurrentNum, addSticker, ShownEndModalStatus } =
    useOutletContext<IFollowersContext>();

  const totalNum = trainingData.length;

  const recognizingWord = "";

  const percentage = 0;

  const finResult = useRef<boolean>(false);

  // trainingData의 모든 리스트에서 success가 true인 것의 개수를 세어서 100으로 나눈 값을 반환

  const currentNumModify = (currentNum: number) => {
    if (currentNum > 0 && currentNum < totalNum + 1) {
      setCurrentNum(currentNum);
    }
  };

  // 골격 숨기기
  const [ishidden, sethidden] = useState<boolean>(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1080px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SentenceProgressBar
          trainingData={trainingData}
          currentNum={currentNum}
          currentNumModify={currentNumModify}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "1080px",
          height: "510px",
          position: "relative",
          top: "50px",
        }}
      >
        {currentNum === 1 ? (
          <div
            style={{
              width: "80px",
              height: "116px",
            }}
          />
        ) : (
          <BracketButton
            direction="left"
            currentNum={currentNum}
            currentNumModify={currentNumModify}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: "1080px",
            height: "510px",
          }}
        >
          <WideCameraComponent finResult={finResult} ishidden={ishidden} stopComp={undefined} />
        </div>

        {currentNum === trainingData.length ? (
          <div
            style={{
              width: "80px",
              height: "116px",
            }}
          />
        ) : (
          <BracketButton
            direction="right"
            currentNum={currentNum}
            currentNumModify={currentNumModify}
          />
        )}
      </div>
      <div
        style={{
          position: "relative",
          top: "100px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "1110px",
        }}
      >
        <MediumButton
          text={ishidden ? "골격숨기기" : "골격보기"}
          color={"blue"}
          onClick={() => {
            sethidden(!ishidden);
          }}
        />
        <Div
          style={{
            border: "1px solid black",
            width: "500px",
            height: "100px",
            fontSize: "40px",
            textAlign: "center",
            lineHeight: "100px",
            borderRadius: "40px",
            backgroundColor: "white",
            color: "rgb(0, 143, 107)",
            marginRight: "70px",
          }}
        >
          {recognizingWord}
        </Div>
        <Progress percentage={percentage} text={"인식률"} />
      </div>

      <EndModal
        trainingData={trainingData}
        ShownEndModalStatus={ShownEndModalStatus}
        addSticker={addSticker}
      />
    </div>
  );
};

export default SentencePracticeComponent;

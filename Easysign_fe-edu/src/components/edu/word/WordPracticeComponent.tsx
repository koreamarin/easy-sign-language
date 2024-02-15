import { useOutletContext } from "react-router-dom";
import BracketButton from "../../Button/BracketButton";
import WordProgressBar from "./WordProgressBar";
import { trainingDataType } from "../Lecture";
import { useDispatch } from "react-redux";
import { LearningProgressSet } from "../../../redux/modules/ProgressSlice";
import EndModal from "../../common/EndModal";
import PracticeLandmarkerCanvas from "../../poseModelComponents/PracticeLandmarkerCanvas";
import { useEffect, useRef, useState } from "react";
import { followStatusFalse } from "../../../redux/modules/LectureSlice";
import MediumButton from "../../Button/MediumButton";
import Progress from "../../nav/Progress";
import styled from "styled-components";
import { token } from "../../../pages/Main";
import API from "../../../config";

const Div = styled.div`
  font-family: "TTHakgyoansimJiugaeR", sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const WordPracticeComponent = () => {
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
  const {
    trainingData,
    setTrainingData,
    currentNum,
    setCurrentNum,
    addSticker,
    ShownEndModalStatus,
    ShownEndModal,
    category,
    gubun,
  } = useOutletContext<IFollowersContext>();
  const ADDSticker = async () => {
    console.log("스티커를" + addSticker + "개 추가합니다.");
    const response = await fetch(`${API.ADDSTICKER}?count=${addSticker}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
    });
    console.log(response);
  };

  const disPatch = useDispatch();

  const totalNum = trainingData.length;

  const [recognizingWord, setRecongnizingWord] = useState<string>("");

  const [percentage, setPercentage] = useState(0);

  // trainingData의 모든 리스트에서 success가 true인 것의 개수를 세어서 100으로 나눈 값을 반환
  const LearningProgress = () => {
    let successCount = 0;
    trainingData.map((item) => {
      if (item.success) successCount++;
    });
    return Math.floor((successCount / totalNum) * 100);
  };

  const ClearWord = () => {
    console.log("클리어 했으므로 ", currentNum, "번째 학습데이터의 success를 true로 변경합니다.");
    trainingData[currentNum - 1].success = true;
    setTrainingData(trainingData);
    disPatch(LearningProgressSet(LearningProgress()));
    currentNumModify(currentNum + 1);
    ADDSticker();
    if (currentNum === totalNum) {
      ShownEndModal();
    }
  };

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
        <WordProgressBar
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
          <PracticeLandmarkerCanvas
            ishidden={ishidden}
            currentWord={trainingData[currentNum - 1].content}
            ClearWord={ClearWord}
            setRecongnizingWord={setRecongnizingWord}
            category={category}
            gubun={gubun}
            setPercentage={setPercentage}
          />
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
        <Progress
          percentage={percentage}
          text={percentage > 0 ? "<div style='font-size:25px'>유지하세요!</div>" : "&nbsp"}
        />
      </div>

      <EndModal
        trainingData={trainingData}
        ShownEndModalStatus={ShownEndModalStatus}
        addSticker={addSticker}
      />
    </div>
  );
};

export default WordPracticeComponent;

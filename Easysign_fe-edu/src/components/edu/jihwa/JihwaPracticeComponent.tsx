import { useOutletContext } from "react-router-dom";
import BracketButton from "../../Button/BracketButton";
import Sticker from "../../../assets/images/sticker.png";
import ResultModal from "../../common/ResultModal";
import JihwaProgressBar from "./JihwaProgressBar";
import { trainingDataType } from "../Lecture";
import { useDispatch } from "react-redux";
import { LearningProgressSet } from "../../../redux/modules/ProgressSlice";
import EndModal from "../../common/EndModal";
import PracticeLandmarkerCanvas from "../../poseModelComponents/PracticeLandmarkerCanvas";
import { useRef, useState } from "react";
import { followStatusFalse } from "../../../redux/modules/LectureSlice";

const JihwaPracticeComponent = () => {
  interface IFollowersContext {
    followStatus: Boolean;
    trainingData: trainingDataType[];
    setTrainingData: (trainingData: trainingDataType[]) => void;
    currentNum: number;
    setCurrentNum: (currentNum: number) => void;
    addSticker: number;
    success: boolean;
    setSuccess: (success: boolean) => void;
    modalShown: boolean;
    setModalShown: (modalShown: boolean) => void;
    ShownEndModal: () => void;
    ShownEndModalStatus: boolean;
    category: string;
    gubun: string;
  }
  const {
    followStatus,
    trainingData,
    setTrainingData,
    currentNum,
    setCurrentNum,
    addSticker,
    success,
    setSuccess,
    modalShown,
    setModalShown,
    ShownEndModal,
    ShownEndModalStatus,
    category,
    gubun,
  } = useOutletContext<IFollowersContext>();
  const disPatch = useDispatch();

  const totalNum = trainingData.length;

  // trainingData의 모든 리스트에서 success가 true인 것의 개수를 세어서 100으로 나눈 값을 반환
  const LearningProgress = () => {
    let successCount = 0;
    trainingData.map((item) => {
      if (item.success) successCount++;
    });
    return Math.floor((successCount / totalNum) * 100);
  };

  const successModal = () => {
    setModalShown(!modalShown);
    trainingData[currentNum - 1].success = true;
    setTrainingData(trainingData);
    setSuccess(true);
    disPatch(LearningProgressSet(LearningProgress()));
  };

  const failModal = () => {
    setModalShown(!modalShown);
    setSuccess(false);
  };

  const replay = () => {
    setModalShown(false);
    midiapipeReset();
    disPatch(followStatusFalse());
  };

  const currentNumModify = (currentNum: number) => {
    if (currentNum > 0 && currentNum < totalNum + 1) {
      setModalShown(false);
      setCurrentNum(currentNum);
      disPatch(followStatusFalse());
      midiapipeReset();
    }
  };

  // 모델 관련 변수

  const finResult = useRef<boolean>(false);

  const [second, setSecond] = useState<number>(10);
  // 골격 숨기기
  const [ishidden, sethidden] = useState<boolean>(false);
  const stopComp = useRef<boolean>(false);

  const midiapipeReset = () => {
    setSecond(10);
    stopComp.current = false;
    finResult.current = false;
  };

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
        <JihwaProgressBar
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
            finResult={finResult}
            setSecond={setSecond}
            ishidden={ishidden}
            stopComp={stopComp}
            currentWord={trainingData[currentNum - 1].content}
            successModal={successModal}
            failModal={failModal}
            sethidden={sethidden}
            category={category}
            gubun={gubun}
          />
        </div>
        <div
          style={{
            height: "0px",
            position: "relative",
            top: "30px",
            left: "0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              sethidden(!ishidden);
            }}
          >
            {ishidden ? "숨기기" : "보기"}
          </button>
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
      <EndModal
        trainingData={trainingData}
        ShownEndModalStatus={ShownEndModalStatus}
        addSticker={addSticker}
      />
    </div>
  );
};

export default JihwaPracticeComponent;

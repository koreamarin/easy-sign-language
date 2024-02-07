import { useOutletContext } from "react-router-dom";
import Spinner from "../../common/Spinner";
import BracketButton from "../../Button/BracketButton";
import Sticker from "../../../assets/images/sticker.png";
import ResultModal from "../../common/ResultModal";
import JihwaProgressBar from "./JihwaProgressBar";
import { trainingDataType } from "../Lecture";
import { useDispatch } from "react-redux";
import { LearningProgressSet } from "../../../redux/modules/ProgressSlice";
import EndModal from "../../common/EndModal";

const JihwaComponent = () => {
  interface IFollowersContext {
    followStatus: Boolean;
    trainingData: trainingDataType[];
    setTrainingData: (trainingData: trainingDataType[]) => void;
    currentNum: number;
    currentNumModify: (currentNum: number) => void;
    addSticker: number;
    success: boolean;
    setSuccess: (success: boolean) => void;
    modalShown: boolean;
    setModalShown: (modalShown: boolean) => void;
    ShownEndModal: () => void;
    ShownEndModalStatus: boolean;
  }
  const {
    followStatus,
    trainingData,
    setTrainingData,
    currentNum,
    currentNumModify,
    addSticker,
    success,
    setSuccess,
    modalShown,
    setModalShown,
    ShownEndModal,
    ShownEndModalStatus,
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

      {followStatus ? (
        <>
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
            <div
              style={{
                width: "533px",
                height: "510px",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "40px",
                fontWeight: "bold",
                border: "1px solid black",
              }}
            >
              지화 모델
            </div>
            <img
              style={{
                width: "533px",
                height: "510px",
                borderRadius: "40px",
              }}
              src={trainingData[currentNum - 1].imagePath}
              alt="jihwa"
            />
          </div>
          <div
            style={{
              height: "0px",
              position: "relative",
              top: "90px",
              left: "70px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
            <span
              style={{
                position: "relative",
                left: "350px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Sticker} alt="sticker" />
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                X {addSticker}
              </span>
              <div>
                <div>
                  <button onClick={successModal}>성공 모달 테스트</button>
                </div>
                <button onClick={failModal}>실패 모달 테스트</button>
              </div>
            </span>
          </div>
          <ResultModal
            success={success}
            modalShown={modalShown}
            setModalShown={setModalShown}
            BookmarkButton={true}
            stickerNum={addSticker}
            currentNum={currentNum}
            currentNumModify={currentNumModify}
            trainingData={trainingData}
            ShownEndModal={ShownEndModal}
          />
        </>
      ) : (
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
          <img
            style={{
              width: "907px",
              height: "510px",
              borderRadius: "40px",
            }}
            src={trainingData[currentNum - 1].imagePath}
            alt="jihwa"
          />
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
      )}
      <EndModal
        trainingData={trainingData}
        ShownEndModalStatus={ShownEndModalStatus}
        addSticker={addSticker}
      />
    </div>
  );
};

export default JihwaComponent;

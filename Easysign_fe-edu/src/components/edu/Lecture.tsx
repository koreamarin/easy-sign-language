import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import LargeButton from "../Button/LargeButton";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { followStatusTrue, followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";

const Lecture = () => {
  const followStatus = useSelector((state: rootState) => state.lecture.follow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LearningProgressSet(0));
    dispatch(IncorrectAnswerRateSet(0));
  }, []);
  const [readSearchParams] = useSearchParams();
  const category = readSearchParams.get("category");

  type trainingDataType = {
    signid: number;
    word: string;
    image: string;
    video: string;
    stiker: number;
  }[];

  const trainingData: trainingDataType = [
    {
      signid: 1,
      word: "ㄱ",
      image: "https://via.placeholder.com/320x100?text=1",
      video: "",
      stiker: 1,
    },
    {
      signid: 2,
      word: "ㄴ",
      image: "https://via.placeholder.com/320x100?text=2",
      video: "",
      stiker: 2,
    },
    {
      signid: 3,
      word: "ㄷ",
      image: "https://via.placeholder.com/320x100?text=3",
      video: "",
      stiker: 3,
    },
    {
      signid: 4,
      word: "ㄹ",
      image: "https://via.placeholder.com/320x100?text=4",
      video: "",
      stiker: 4,
    },
    {
      signid: 5,
      word: "ㅁ",
      image: "https://via.placeholder.com/320x100?text=5",
      video: "",
      stiker: 5,
    },
    {
      signid: 6,
      word: "ㅂ",
      image: "https://via.placeholder.com/320x100?text=6",
      video: "",
      stiker: 6,
    },
    {
      signid: 7,
      word: "ㅅ",
      image: "https://via.placeholder.com/320x100?text=7",
      video: "",
      stiker: 7,
    },
    {
      signid: 8,
      word: "ㅇ",
      image: "https://via.placeholder.com/320x100?text=8",
      video: "",
      stiker: 8,
    },
    {
      signid: 9,
      word: "ㅈ",
      image: "https://via.placeholder.com/320x100?text=9",
      video: "",
      stiker: 9,
    },
    {
      signid: 10,
      word: "ㅊ",
      image: "https://via.placeholder.com/320x100?text=10",
      video: "",
      stiker: 10,
    },
    {
      signid: 11,
      word: "ㅋ",
      image: "https://via.placeholder.com/320x100?text=11",
      video: "",
      stiker: 11,
    },
    {
      signid: 12,
      word: "ㅌ",
      image: "https://via.placeholder.com/320x100?text=12",
      video: "",
      stiker: 12,
    },
    {
      signid: 13,
      word: "ㅍ",
      image: "https://via.placeholder.com/320x100?text=13",
      video: "",
      stiker: 13,
    },
    {
      signid: 14,
      word: "ㅎ",
      image: "https://via.placeholder.com/320x100?text=14",
      video: "",
      stiker: 14,
    },
  ];
  // const currentNum: number = 14;
  const [currentNum, setCurrentNum] = useState<number>(1);
  const totalNum: number = trainingData.length;
  const currentNumModify = (currentNum: number) => {
    if (currentNum > 0 && currentNum < totalNum + 1) {
      setCurrentNum(currentNum);
      dispatch(LearningProgressSet(Math.round(((currentNum - 1) / totalNum) * 100)));
      dispatch(followStatusFalse());
    }
  };

  useEffect(() => {
    return () => {
      dispatch(followStatusFalse());
    };
  }, []);

  const outletProps = {
    followStatus: followStatus,
    trainingData: trainingData,
    currentNum: currentNum,
    currentNumModify: currentNumModify,
  };

  return (
    <div
      style={{
        backgroundColor: "#faf7f7",
        width: "1140px",
        height: "900px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "-20px",
          width: "1080px",
          height: "710px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet context={outletProps} />
      </div>
      <div
        style={{
          position: "relative",
          top: "10px",
          height: "123.98px",
        }}
      >
        {followStatus ? (
          ""
        ) : (
          <LargeButton
            text={"따라해보기"}
            color={"pink"}
            onClick={() => {
              dispatch(followStatusTrue());
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Lecture;

import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import LargeButton from "../Button/LargeButton";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { followStatusTrue, followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import API from "../../config";

export type trainingDataType = {
  signId: number;
  content: string;
  imagePath: string;
  videoPath: string;
  success: boolean;
};

const Lecture = () => {
  const followStatus = useSelector((state: rootState) => state.lecture.follow);
  const dispatch = useDispatch();
  const [readSearchParams] = useSearchParams();
  const category = readSearchParams.get("category");
  const gubunPath = useLocation().pathname.split("/");
  const gubun = gubunPath[gubunPath.length - 1];

  const [addSticker, setAddSticker] = useState<number>(0);

  type jsonType = {
    content: string;
    imagePath: string;
    signId: number;
    videoPath: string;
  };

  const token = localStorage.getItem("token") || "";

  const getSignCategory = async () => {
    const response = await fetch(`${API.CATEGORY}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    console.log(json);
    setAddSticker(json.filter((item: any) => item.categoryName === category)[0].addSticker);
    console.log(addSticker);
  };

  const getSignInfo = async () => {
    const response = await fetch(`${API.SIGNINFO}/${gubun}?categoryname=${category}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json: jsonType[] = await response.json();
    const trainingData: trainingDataType[] = json.map((item: jsonType) => {
      return {
        signId: item.signId,
        content: item.content,
        imagePath: item.imagePath,
        videoPath: item.videoPath,
        success: false,
      };
    });
    setTrainingData(trainingData);
  };

  useEffect(() => {
    dispatch(LearningProgressSet(0));
    dispatch(IncorrectAnswerRateSet(0));
    getSignInfo();
    getSignCategory();
    return () => {
      dispatch(followStatusFalse());
    };
  }, []);

  const [trainingData, setTrainingData] = useState<trainingDataType[]>([
    {
      signId: 0,
      content: "",
      imagePath: "",
      videoPath: "",
      success: false,
    },
  ]);

  const [currentNum, setCurrentNum] = useState<number>(1);
  const totalNum: number = trainingData.length;

  const currentNumModify = (currentNum: number) => {
    if (currentNum > 0 && currentNum < totalNum + 1) {
      setCurrentNum(currentNum);
      dispatch(followStatusFalse());
    }
  };

  const outletProps = {
    followStatus: followStatus,
    trainingData: trainingData,
    setTrainingData: setTrainingData,
    currentNum: currentNum,
    currentNumModify: currentNumModify,
    addSticker: addSticker,
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

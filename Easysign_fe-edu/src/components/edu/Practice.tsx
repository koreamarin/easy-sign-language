import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import API from "../../config";
import Nav from "../nav/Nav";
import { token } from "../../pages/Main";

export type trainingDataType = {
  signId: number;
  content: string;
  imagePath: string;
  videoPath: string;
  success: boolean;
};

const Practice = () => {
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

  const [ShownEndModalStatus, setShownEndModalStatus] = useState<boolean>(false);
  const ShownEndModal = () => {
    setShownEndModalStatus(true);
  };

  const getSignCategory = async () => {
    const response = await fetch(`${API.CATEGORY}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    setAddSticker(json.filter((item: any) => item.categoryName === category)[0].addSticker);
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

  const outletProps = {
    trainingData: trainingData,
    setTrainingData: setTrainingData,
    currentNum: currentNum,
    setCurrentNum: setCurrentNum,
    addSticker: addSticker,
    ShownEndModalStatus: ShownEndModalStatus,
    ShownEndModal: ShownEndModal,
    category: category,
    gubun: gubun,
  };

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
      <Nav Progress2Visibility={false} />
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
        ></div>
      </div>
    </div>
  );
};

export default Practice;

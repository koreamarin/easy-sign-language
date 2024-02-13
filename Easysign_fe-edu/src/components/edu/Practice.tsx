import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import LargeButton from "../Button/LargeButton";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { followStatusTrue, followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import API from "../../config";
import Nav from "../nav/Nav";
import { token } from "../../pages/Main";
import SmallButton from "../Button/SmallButton";

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
  const [modalShown, setModalShown] = useState<boolean>(false);

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
    console.log("카테고리를 불러와서 스티커 정보 추출중....");
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
    console.log("카테고리에 해당하는 학습 정보를 불러오는 중....");
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
    currentNum: currentNum,
    setCurrentNum: setCurrentNum,
    addSticker: addSticker,
    modalShown: modalShown,
    setModalShown: setModalShown,
    ShownEndModalStatus: ShownEndModalStatus,
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

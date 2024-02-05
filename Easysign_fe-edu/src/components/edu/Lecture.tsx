import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import LargeButton from "../Button/LargeButton";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { followStatusTrue, followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect, useState } from "react";
import { IncorrectAnswerRateSet, LearningProgressSet } from "../../redux/modules/ProgressSlice";
import API from "../../config";

const Lecture = () => {
  const followStatus = useSelector((state: rootState) => state.lecture.follow);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LearningProgressSet(0));
    dispatch(IncorrectAnswerRateSet(0));
  }, []);
  const [readSearchParams] = useSearchParams();
  const category = readSearchParams.get("category");

  const gubunPath = useLocation().pathname.split("/");
  const gubun = gubunPath[gubunPath.length - 1];

  console.log(category);
  console.log(gubun);

  type trainingDataType = {
    signId: number;
    content: string;
    imagePath: string;
    videoPath: string;
    addSticker: number;
  }[];

  type jsonType = {
    category: {
      addSticker: number;
      categoryId: number;
      categoryName: string;
      gubun: string;
    };
    content: string;
    imagePath: string;
    signId: number;
    videoPath: string;
  };

  const token = localStorage.getItem("token") || "";

  const getSignInfo = async () => {
    const response = await fetch(`${API.SIGNINFO}/${gubun}?categoryname=${category}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json: jsonType[] = await response.json();
    console.log(json);
    const trainingData: trainingDataType = json.map((item: jsonType) => {
      return {
        signId: item.signId,
        content: item.content,
        imagePath: item.imagePath,
        videoPath: item.videoPath,
        addSticker: item.category.addSticker,
      };
    });
    // trainingData의 반환된 type을 출력
    console.log(trainingData);

    setTrainingData(trainingData);
  };

  useEffect(() => {
    getSignInfo();
    return () => {
      dispatch(followStatusFalse());
    };
  }, []);

  const [trainingData, setTrainingData] = useState<trainingDataType>([
    {
      signId: 0,
      content: "",
      imagePath: "",
      videoPath: "",
      addSticker: 0,
    },
  ]);

  // const trainingData: trainingDataType = [
  //   {
  //     signid: 1,
  //     word: "ㄱ",
  //     image: "https://via.placeholder.com/320x100?text=1",
  //     video: "",
  //     stiker: 1,
  //   },
  //   {
  //     signid: 2,
  //     word: "ㄴ",
  //     image: "https://via.placeholder.com/320x100?text=2",
  //     video: "",
  //     stiker: 2,
  //   },
  //   {
  //     signid: 3,
  //     word: "ㄷ",
  //     image: "https://via.placeholder.com/320x100?text=3",
  //     video: "",
  //     stiker: 3,
  //   },
  //   {
  //     signid: 4,
  //     word: "ㄹ",
  //     image: "https://via.placeholder.com/320x100?text=4",
  //     video: "",
  //     stiker: 4,
  //   },
  //   {
  //     signid: 5,
  //     word: "ㅁ",
  //     image: "https://via.placeholder.com/320x100?text=5",
  //     video: "",
  //     stiker: 5,
  //   },
  //   {
  //     signid: 6,
  //     word: "ㅂ",
  //     image: "https://via.placeholder.com/320x100?text=6",
  //     video: "",
  //     stiker: 6,
  //   },
  //   {
  //     signid: 7,
  //     word: "ㅅ",
  //     image: "https://via.placeholder.com/320x100?text=7",
  //     video: "",
  //     stiker: 7,
  //   },
  //   {
  //     signid: 8,
  //     word: "ㅇ",
  //     image: "https://via.placeholder.com/320x100?text=8",
  //     video: "",
  //     stiker: 8,
  //   },
  //   {
  //     signid: 9,
  //     word: "ㅈ",
  //     image: "https://via.placeholder.com/320x100?text=9",
  //     video: "",
  //     stiker: 9,
  //   },
  //   {
  //     signid: 10,
  //     word: "ㅊ",
  //     image: "https://via.placeholder.com/320x100?text=10",
  //     video: "",
  //     stiker: 10,
  //   },
  //   {
  //     signid: 11,
  //     word: "ㅋ",
  //     image: "https://via.placeholder.com/320x100?text=11",
  //     video: "",
  //     stiker: 11,
  //   },
  //   {
  //     signid: 12,
  //     word: "ㅌ",
  //     image: "https://via.placeholder.com/320x100?text=12",
  //     video: "",
  //     stiker: 12,
  //   },
  //   {
  //     signid: 13,
  //     word: "ㅍ",
  //     image: "https://via.placeholder.com/320x100?text=13",
  //     video: "",
  //     stiker: 13,
  //   },
  //   {
  //     signid: 14,
  //     word: "ㅎ",
  //     image: "https://via.placeholder.com/320x100?text=14",
  //     video: "",
  //     stiker: 14,
  //   },
  // ];

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

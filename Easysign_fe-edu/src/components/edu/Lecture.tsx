import { Outlet } from "react-router-dom";
import LargeButton from "../Button/LargeButton";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { followStatusTrue, followStatusFalse } from "../../redux/modules/LectureSlice";
import { useEffect } from "react";

const Lecture = () => {
  const followStatus = useSelector((state: rootState) => state.lecture.follow);
  const dispatch = useDispatch();
  const words: string[] = [];
  const stikerNum: number = 0;
  const imageSrc: string = "";
  const videoSrc: string = "";

  useEffect(() => {
    console.log(followStatus);
    return () => {
      dispatch(followStatusFalse());
    };
  }, []);

  const outletProps = {
    followStatus: followStatus,
    words: words,
    stikerNum: stikerNum,
    imageSrc: imageSrc,
    videoSrc: videoSrc,
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
        border: "1px solid black",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "-20px",
          border: "1px solid black",
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

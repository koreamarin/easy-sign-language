import API from "../../config";
import { useEffect, useState } from "react";
import { trainingDataType } from "../edu/Lecture";
import { token } from "../../pages/Main";
import LargeButton from "../Button/LargeButton";
import confetti from "../../assets/images/confetti.png";
import { useNavigate } from "react-router-dom";

interface EndModalProps {
  trainingData: trainingDataType[];
  ShownEndModalStatus: boolean;
  addSticker: number;
}

const EndModal = ({ trainingData, ShownEndModalStatus, addSticker }: EndModalProps) => {
  const navigate = useNavigate();
  const totalNum = trainingData.length;
  const LearndNum = trainingData.filter((item) => item.success === true).length;
  const skipNum = totalNum - LearndNum;
  const AcquiredStickers = LearndNum * addSticker;

  const [backgroundSrc, setbackgroundSrc] = useState<string | undefined>(undefined);
  const [CharacterSrc, setCharacterSrc] = useState<string | undefined>(undefined);

  const getUserinfo = async () => {
    const response = await fetch(`${API.USERINFO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const json = await response.json();
    setCharacterSrc(json.profileCharacterPath);
    setbackgroundSrc(json.profileBackgroundPath);
  };
  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "7px",
        left: "10px",
        width: "1060px",
        height: "850px",
        backgroundColor: "#FFF5E7",
        borderRadius: "60px",
        display: ShownEndModalStatus ? "flex" : "none",
        boxShadow: "5px 5px 5px 5px gray",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "980px",
          position: "relative",
          left: "40px",
          top: "130px",
        }}
      >
        <img
          style={{
            position: "absolute",
            top: "-175px",
            zIndex: -1,
          }}
          src={confetti}
          width="1050px"
          height={"650px"}
          alt="confetti"
        />
        <img
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundImage: `url(${backgroundSrc})`,
            position: "relative",
            top: "-90px",
          }}
          src={CharacterSrc}
          alt="profile"
        />
        <div
          style={{
            position: "relative",
            top: "-90px",
            fontSize: "40px",
            fontWeight: "bold",
            color: "#00d6c0",
          }}
        >
          도전 단계 성공!
        </div>
        <div
          style={{
            position: "relative",
            top: "-50px",
            fontSize: "40px",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          <div>학습한 단어의 수 : {LearndNum}</div>
          <div>건너뛴 단어의 수: {skipNum}</div>
          <div>총 스티커 획득 개수: {AcquiredStickers}</div>
        </div>
        <div>
          <LargeButton text={"메인메뉴로 이동"} color={"pink"} onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
};

export default EndModal;

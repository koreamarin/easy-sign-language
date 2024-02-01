import logo_blue from "../assets/images/logo_blue.png";
import hand1 from "../assets/images/hand1.jpg";
import hand2 from "../assets/images/hand2.jpg";
import hand3 from "../assets/images/hand3.jpg";
import hand4 from "../assets/images/hand4.jpg";
import hand5 from "../assets/images/hand5.jpg";
import EduButtons from "../components/main/EduButtons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Main = () => {
  const navigate = useNavigate();
  const JihwaSubtitle = [
    "모음 강의",
    "모음 연습",
    "자음 강의",
    "자음 연습",
    "숫자 강의",
    "숫자 연습",
  ];
  const WordSubtitle = [
    "동물 강의",
    "동물 연습",
    "사물 강의",
    "사물 연습",
    "과일 강의",
    "과일 연습",
  ];
  const SentenceSubtitle = ["짧은글연습", "긴글연습"];
  const GameSubtitle = ["스피드퀴즈", "캐치마인드", "소나기", "끝말잇기"];
  const JihwaSubtitleOnClick = [
    () => {
      navigate("../edu/vowel/lecture");
    },
    () => {
      navigate("../edu/vowel/practice");
    },
    () => {
      navigate("../edu/consonant/lecture");
    },
    () => {
      navigate("../edu/consonant/practice");
    },
    () => {
      navigate("../edu/number/lecture");
    },
    () => {
      navigate("../edu/number/practice");
    },
  ];
  const WordSubtitleOnClick = [
    () => {
      navigate("../edu/animal/lecture");
    },
    () => {
      navigate("../edu/animal/practice");
    },
    () => {
      navigate("../edu/object/lecture");
    },
    () => {
      navigate("../edu/object/practice");
    },
    () => {
      navigate("../edu/fruit/lecture");
    },
    () => {
      navigate("../edu/fruit/practice");
    },
  ];
  const SentenceSubtitleOnClick = [
    () => {
      navigate("../edu/shortsentence/practice");
    },
    () => {
      navigate("../edu/longsentence/practice");
    },
  ];
  const GameSubtitleOnClick = [
    () => {
      navigate("../edu/game/speedquiz");
    },
    () => {
      navigate("../edu/game/catchmind");
    },
    () => {
      navigate("../edu/game/rain");
    },
    () => {
      navigate("../edu/game/wordchain");
    },
  ];
  const [imageSrc, setImageSrc] = useState(hand5);

  const onMouseEnter = (a: any) => {
    console.log(a);
    setImageSrc(a);
  };

  const onMouseLeave = () => {
    console.log("onMouseLeave");
    setImageSrc(hand5);
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
      <img
        src={logo_blue}
        alt="logo_blue"
        style={{
          margin: "auto auto",
          width: "23%",
          marginTop: "20px",
        }}
      />
      <img src={imageSrc} alt="메인 이미지" width="17%" />
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-around",
          width: "81%",
          height: "240px",
        }}
      >
        <div onMouseEnter={(hand1) => onMouseEnter(hand1)} onMouseLeave={onMouseLeave}>
          {" "}
          <EduButtons
            title={"지화공부"}
            subtitle={JihwaSubtitle}
            subtitleOnClick={JihwaSubtitleOnClick}
          />
        </div>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"단어공부"}
            subtitle={WordSubtitle}
            subtitleOnClick={WordSubtitleOnClick}
          />
        </div>
        <EduButtons
          title={"문장공부"}
          subtitle={SentenceSubtitle}
          subtitleOnClick={SentenceSubtitleOnClick}
        />
        <EduButtons
          title={"게임하기"}
          subtitle={GameSubtitle}
          subtitleOnClick={GameSubtitleOnClick}
        />
      </div>
    </div>
  );
};

export default Main;

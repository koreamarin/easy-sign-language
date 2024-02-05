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
  const SentenceSubtitle = ["문장 강의", "문장 연습"];
  const GameSubtitle = ["스피드퀴즈", "캐치마인드", "소나기", "끝말잇기"];

  const JihwaSubtitleOnClick = [
    () => {
      navigate("../edu/learn/lecture/jihwa?category=vowel");
    },
    () => {
      navigate("../edu/learn/practice/jihwa?category=vowel");
    },
    () => {
      navigate("../edu/learn/lecture/jihwa?category=consonant");
    },
    () => {
      navigate("../edu/learn/practice/jihwa?category=consonant");
    },
    () => {
      navigate("../edu/learn/lecture/jihwa?category=number");
    },
    () => {
      navigate("../edu/learn/practice/jihwa?category=number");
    },
  ];

  const WordSubtitleOnClick = [
    () => {
      navigate("../edu/learn/lecture/word?category=animal");
    },
    () => {
      navigate("../edu/learn/practice/word?category=animal");
    },
    () => {
      navigate("../edu/learn/lecture/word?category=object");
    },
    () => {
      navigate("../edu/learn/practice/word?category=object");
    },
    () => {
      navigate("../edu/learn/lecture/word?category=fruit");
    },
    () => {
      navigate("../edu/learn/practice/word/fruit");
    },
  ];
  const SentenceSubtitleOnClick = [
    () => {
      navigate("../edu/learn/lecture/setence");
    },
    () => {
      navigate("../edu/learn/practice/setence");
    },
  ];
  const GameSubtitleOnClick = [
    () => {
      navigate("../edu/learn/game/speedquiz");
    },
    () => {
      navigate("../edu/learn/game/catchmind");
    },
    () => {
      navigate("../edu/learn/game/shower");
    },
    () => {
      navigate("../edu/learn/game/wordchain");
    },
  ];
  const [imageSrc, setImageSrc] = useState(hand5);

  const onMouseEnter1 = (a: any) => {
    setImageSrc(hand1);
  };

  const onMouseEnter2 = (a: any) => {
    setImageSrc(hand2);
  };

  const onMouseEnter3 = (a: any) => {
    setImageSrc(hand3);
  };

  const onMouseEnter4 = (a: any) => {
    setImageSrc(hand4);
  };

  const onMouseLeave = () => {
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
        <div onMouseEnter={onMouseEnter1} onMouseLeave={onMouseLeave}>
          {" "}
          <EduButtons
            title={"지화공부"}
            subtitle={JihwaSubtitle}
            subtitleOnClick={JihwaSubtitleOnClick}
          />
        </div>
        <div onMouseEnter={onMouseEnter2} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"단어공부"}
            subtitle={WordSubtitle}
            subtitleOnClick={WordSubtitleOnClick}
          />
        </div>
        <div onMouseEnter={onMouseEnter3} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"문장공부"}
            subtitle={SentenceSubtitle}
            subtitleOnClick={SentenceSubtitleOnClick}
          />
        </div>
        <div onMouseEnter={onMouseEnter4} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"게임하기"}
            subtitle={GameSubtitle}
            subtitleOnClick={GameSubtitleOnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;

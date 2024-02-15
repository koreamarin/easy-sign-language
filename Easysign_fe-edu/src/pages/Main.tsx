import logo_blue from "../assets/images/logo_blue.png";
import hand1 from "../assets/images/hand1.jpg";
import hand2 from "../assets/images/hand2.jpg";
import hand3 from "../assets/images/hand3.jpg";
import hand4 from "../assets/images/hand4.jpg";
import hand5 from "../assets/images/hand5.jpg";
import EduButtons from "../components/main/EduButtons";
import { useEffect, useState } from "react";
import API from "../config";
import axios from "axios";

export const token = localStorage.getItem("token") || "";

const Main = () => {
  const socket = new WebSocket("wss://edu.easysign.shop");
  socket.onerror = function (event) {
    console.error("WebSocket error observed:", event);
  };
  const [category, setCategory] = useState<any>([]);

  const getSignCategory = async () => {
    const response = await fetch(`${API.CATEGORY}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    setCategory(json);
  };

  const Login = async () => {
    const response = axios(`${API.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        loginId: "ssafy",
        password: "1234",
      },
    });
    const authToken = await (await response).headers.authorization;
    localStorage.setItem("token", authToken);
  };

  useEffect(() => {
    getSignCategory();
    Login();
  }, []);

  const JihwaSubtitle = category
    .filter((item: any) => item.gubun === "jihwa")
    .map((item: any) => item.categoryName) // 각 name마다 강의, 연습 붙이기
    .flatMap((item: any) => [item + " 강의", item + " 연습"]);

  const WordSubtitle = category
    .filter((item: any) => item.gubun === "word")
    .map((item: any) => item.categoryName)
    .flatMap((item: any) => [item + " 강의", item + " 연습"]);

  const SentenceSubtitle = category
    .filter((item: any) => item.gubun === "sentence")
    .map((item: any) => item.categoryName)
    .flatMap((item: any) => [item + " 강의", item + " 연습"]);

  const GameSubtitle = ["스피드퀴즈", "캐치마인드", "소나기", "끝말잇기"];

  const JihwaSubtitleURL = category
    .filter((item: any) => item.gubun === "jihwa")
    .map((item: any) => item.categoryName)
    .flatMap((item: any) => [
      "../learn/lecture/jihwa?category=" + item,
      "../learn/practice/jihwa?category=" + item,
    ]);

  const WordSubtitleURL = category
    .filter((item: any) => item.gubun === "word")
    .map((item: any) => item.categoryName)
    .flatMap((item: any) => [
      "../learn/lecture/word?category=" + item,
      "../learn/practice/word?category=" + item,
    ]);

  const SentenceSubtitleURL = category
    .filter((item: any) => item.gubun === "sentence")
    .map((item: any) => item.categoryName)
    .flatMap((item: any) => [
      "../learn/lecture/sentence?category=" + item,
      "../learn/practice/sentence?category=" + item,
    ]);

  const GameSubtitleURL = [
    "../learn/game/speedquiz",
    "../learn/game/catchmind",
    "../learn/game/shower",
    "../learn/game/wordchain",
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
          <EduButtons
            title={"지화공부"}
            subtitle={JihwaSubtitle}
            subtitleOnClick={JihwaSubtitleURL}
          />
        </div>
        <div onMouseEnter={onMouseEnter2} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"단어공부"}
            subtitle={WordSubtitle}
            subtitleOnClick={WordSubtitleURL}
          />
        </div>
        <div onMouseEnter={onMouseEnter3} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"문장공부"}
            subtitle={SentenceSubtitle}
            subtitleOnClick={SentenceSubtitleURL}
          />
        </div>
        <div onMouseEnter={onMouseEnter4} onMouseLeave={onMouseLeave}>
          <EduButtons
            title={"게임하기"}
            subtitle={GameSubtitle}
            subtitleOnClick={GameSubtitleURL}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;

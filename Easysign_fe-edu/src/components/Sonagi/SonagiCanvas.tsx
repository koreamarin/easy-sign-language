import React, { useRef, useEffect, useState } from "react";
import SonagiEngine from "./SonagiEngine";
import GameResultModal from "../common/GameResultModal";
import { LifeCount } from "./SonagiConfig";
import LandmarkerCanvas from "./Result";
import SSmallButton from "../Button/SSmallButton";
import API from "../../config";
import { token } from "../../pages/Main";
import { useLocation, useNavigate } from "react-router-dom";

interface SonagiCanvasProps {
  life: number;
  score: number;
  isGameOver: boolean;
  isClear: boolean;
  setLife: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setIsClear: React.Dispatch<React.SetStateAction<boolean>>;
}

function SonagiCanvas({
  life,
  score,
  isGameOver,
  isClear,
  setIsGameOver,
  setScore,
  setLife,
  setIsClear,
}: SonagiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const Sonagi = useRef<SonagiEngine | null>(null);
  const [words, setWords] = useState<string[] | null>(null);
  const [inputWord, setInputWord] = useState<string>("");
  const [submitWord, setSubmitWord] = useState<string>("");
  const [isLoadingWord, setIsLoadingWord] = useState<boolean>(false);

  const navigate = useNavigate();

  // let submitWord :string = "";

  const canvasWidth = 1140;
  const canvasHeight = 600;

  const getSonagiWord = async () => {
    const response = await fetch(`${API.SONAGIWORD}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const json = await response.json();
    const SonagiWord = json.map((item: any) => item.content);
    setWords(SonagiWord);
  };

  useEffect(() => {
    //단어 Api 호출 및 단어 세팅.
    //이건 더미 단어
    //await load()
    //temp_words = []
    //setWords([temp_words])

    //그런데 useState는 비동기라서 바로 반영 안됨. 체크 들어올때를 체크해야함./
    if(isLoadingWord === false){
      setIsLoadingWord(true);
      getSonagiWord();
      setIsLoadingWord(false);
    }
    // setWords(["ㄱ","ㅂ","ㄴ","ㅇ","ㅈ","ㅁ","ㅋ", "ㅎ", "ㅊ", "ㅍ"]);
  }, []);

  useEffect(() => {
    if (words === null) {
      return;
    }

    if (canvasRef.current === null) {
      throw new Error("canvas is not created/used");
    }
    canvasRef.current.width = canvasWidth;
    canvasRef.current.height = canvasHeight;
    context.current = canvasRef.current!.getContext("2d");

    //초기화
    setLife(LifeCount);
    setScore(0);
    setIsGameOver(false);
    setIsClear(false);

    if (context.current) {
      const ctx = context.current;
      Sonagi.current = new SonagiEngine(
        ctx,
        canvasWidth,
        canvasHeight,
        words!,
        isGameOver,
        setIsGameOver,
        LifeCount,
        setLife,
        0,
        setScore,
        setIsClear
      );
      // ctx.font = '30px 고딕'
      // ctx.fillText("홀리모올리??", 400, 50);
      // Sonagi.current.initializeGame();

      // ctx.fillText("홀리모올리??", 0, 0);
      Sonagi.current.initializeGame();
      Sonagi.current.animate();
    }
    return () => {
      context.current = null;
    };
  }, [words]);

  useEffect(() => {
    if (Sonagi.current) {
      Sonagi.current.checkWord(submitWord);
    }
    setInputWord(submitWord);
  }, [submitWord]);

  // 키보드 입력으로 처리.   모션 입력으로 처리하는 부분 추가 필요.
  const saveInputWord = (event: { target: { value: React.SetStateAction<string> } }) => {
    // submitWord = event.target.value;
    setInputWord(event.target.value);
  };

  const enterEvent = (e: { key: string }) => {
    if (e.key === "Enter") {
      setSubmitWord(inputWord);
      setInputWord("");
    }
  };

  const quitGame = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        marginTop: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas id="game-canvas" ref={canvasRef}></canvas>

      <div
        style={{
          marginTop: "10px",
          width: "300px",
          height: "200px",
          borderRadius: "40px",
          padding: "0px 40px",
          backgroundColor: "#D9D9D9",

          fontSize: "50px",
          fontWeight: "bold",
          color: "#636363",
          position: "relative",
          // 폰트 밝기 조절
        }}
      >
        {/* 카메라 부분 */}
        <LandmarkerCanvas setSubmitWord={setSubmitWord} />

        {/* input 칸 */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "20%",
            left: "500px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputWord}
            onChange={saveInputWord}
            onKeyDown={enterEvent}
            style={{
              width: "200px",
              height: "100px",
              marginBottom: "10px",
              fontSize: "30px",
              fontFamily: "Inter",
              fontWeight: "500",
              textAlign: "center",
              backgroundColor: "#8CCFFF",
              color: "#006EBD",
              boxShadow: "1px 1px 1px 1px gray",
              border: "none",
              borderRadius: "40px",
            }}
          ></input>
          <SSmallButton text={"게임종료"} onClick={quitGame} />
        </div>
      </div>

      <GameResultModal
        success={isClear}
        setSuccess={setIsClear}
        shown={isGameOver}
        setModalShown={setIsGameOver}
        stickerNum={100}
        words={words}
        setWords={setWords}
      />
    </div>
  );
}

export default SonagiCanvas;

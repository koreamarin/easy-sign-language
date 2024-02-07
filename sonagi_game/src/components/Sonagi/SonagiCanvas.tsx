import React, { useRef, useEffect, useState } from "react";
import SonagiEngine from "./SonagiEngine";
import GameResultModal from "../common/GameResultModal";
import SonagiCamera from "./SonagiCamera";
import { LifeCount } from "./SonagiConfig";
import backgroundImg from "../../assets/images/boy_on_the_ocean_skateboard.png";
import background_green from "../../assets/images/background_green.png";
import LandmarkerCanvas from "./Result";




interface SonagiCanvasProps {
	life : number;
	score : number;
	isGameOver : boolean;
	isClear : boolean;
	setLife : React.Dispatch<React.SetStateAction<number>>;
	setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
	setScore : React.Dispatch<React.SetStateAction<number>>;
	setIsClear : React.Dispatch<React.SetStateAction<boolean>>;
}

function SonagiCanvas(
	{
		life,
		score, 
		isGameOver,
		isClear, 
		setIsGameOver, 
		setScore, 
		setLife, 
		setIsClear
	} : SonagiCanvasProps) {

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const Sonagi = useRef<SonagiEngine|null>(null);
	const [words, setWords] = useState<string[] | null>(null);
	const [inputWord, setInputWord] = useState<string>("");
	const [submitWord, setSubmitWord] = useState<string>("");
	
	// let submitWord :string = "";
	

	const canvasWidth = 640;
	const canvasHeight = 360;

	useEffect(() => {
		//단어 Api 호출 및 단어 세팅.
		//이건 더미 단어
		//await load()
		//temp_words = []
		//setWords([temp_words])
		
		//그런데 useState는 비동기라서 바로 반영 안됨. 체크 들어올때를 체크해야함.
		// setWords(["쥐","소","호랑이","토끼","용","뱀","말","양","원숭이","닭","개","돼지"]);
		setWords(["ㄱ","ㅂ","ㄴ","ㅇ","ㅈ","ㅁ","ㅋ", "ㅎ", "ㅊ", "ㅍ"]);
	},[])

	useEffect(() => {
		if(words === null){
			return;
		}

		if (canvasRef.current === null){
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
				setIsClear,
			)
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
	}, [words])

	useEffect(() => {
		if(Sonagi.current) {
			Sonagi.current.checkWord(submitWord);
		}
		setInputWord(submitWord);
	}, [submitWord])




	// 키보드 입력으로 처리.   모션 입력으로 처리하는 부분 추가 필요.
	const saveInputWord = (event: { target: { value: React.SetStateAction<string>; }; }) => {
		// submitWord = event.target.value;
		setInputWord(event.target.value);
	}

	const enterEvent = (e: { key: string; }) => {
		if (e.key === "Enter"){
			setSubmitWord(inputWord);
			setInputWord("");
		}
		
	}
	

    return(
			<div style={{backgroundImage : `url(${backgroundImg})`, backgroundSize : "cover"}}>
				<canvas id="game-canvas" ref={canvasRef}></canvas>
				<div >
					<input type="text" value={inputWord} onChange={saveInputWord} onKeyDown={enterEvent}></input>
				</div>
				{/* <SonagiCamera></SonagiCamera> */}
				<LandmarkerCanvas
					setSubmitWord={setSubmitWord}
				/>

				<GameResultModal
					success={isClear}
					setSuccess={setIsClear}
					shown={isGameOver}
					setModalShown={setIsGameOver}
					BookmarkButton={false}
					stickerNum={100}
					signId={10}
					Sonagi={Sonagi.current!}
					setWords={setWords}
				/>
				
			</div>
    )

}

export default SonagiCanvas;
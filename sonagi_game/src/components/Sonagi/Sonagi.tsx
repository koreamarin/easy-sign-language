import SonagiCanvas from "./SonagiCanvas";
import React, { useState } from "react";
import GameResultModal from "../common/GameResultModal";
import { LifeCount } from "./SonagiConfig";
import backgroundImg from "../../assets/images/boy_on_the_ocean_skateboard.png";
import background_green from "../../assets/images/background_green.png";

function HeartIcon() {
  return(
		<span>
			<img src="./assets/Life.png" alt="" />
		</span>
	)
};

function Sonagi() {
	const [life, setLife] = useState(LifeCount);
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isClear, setIsClear] = useState<boolean>(false);

	return(
		<div>
			<div>소나기</div>
			{/* <div><img src={backgroundImg} alt="" /></div> */}
			<div style={{display : "flex", justifyContent : "flex-end"}}>{score}점</div>
			<div style={{display : "flex", justifyContent : "flex-end"}}>
				<span style={{opacity: "0%"}}> <HeartIcon></HeartIcon></span>
				{
					Array.from({length: life}, (_, index) => (
							<HeartIcon key={index}></HeartIcon>
					))
				}
				
			</div>
			<SonagiCanvas
				life = {life}
				score = {score}
				isGameOver = {isGameOver}
				isClear = {isClear}
				setIsGameOver={setIsGameOver}
				setScore={setScore}
				setLife={setLife}
				setIsClear={setIsClear}
			/>
			
		</div>
	)

}

export default Sonagi;
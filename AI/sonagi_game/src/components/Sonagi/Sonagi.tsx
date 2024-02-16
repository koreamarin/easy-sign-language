import SonagiCanvas from "./SonagiCanvas";
import React, { useState } from "react";
import GameResultModal from "../common/GameResultModal";
import { LifeCount } from "./SonagiConfig";
import backgroundImg from "../../assets/images/boy_on_the_ocean_skateboard.png";
import background_green from "../../assets/images/background_green.png";
import { relative } from "path";

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
		<div style={{
			backgroundColor: "#faf7f7",
			width: "1140px",
			height: "900px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			backgroundImage : `url(${backgroundImg})`, 
			backgroundSize : "cover",
			position: "relative"
			}}>
			<div style={{
						display: "flex",
						justifyContent: "flex-end", // 오른쪽으로 아이템을 정렬합니다.
						alignItems: "flex-start", // 상단으로 아이템을 정렬합니다.
						position: "absolute",
						top: 0,
						right : 0
				}}>
				<span style={{opacity: "0%"}}> <HeartIcon/></span>
				{
					Array.from({length: life}, (_, index) => (
						<span>
							<img src="./assets/Life.png" alt="" />
						</span>
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
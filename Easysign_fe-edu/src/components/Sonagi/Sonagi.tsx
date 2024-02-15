import SonagiCanvas from "./SonagiCanvas";
import React, { useState } from "react";
import { LifeCount } from "./SonagiConfig";
import backgroundImg from "../../assets/images/boy_on_the_ocean_skateboard.png";
import Life from "../../assets/images/Life.png";

function Sonagi() {
  const [life, setLife] = useState(LifeCount);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isClear, setIsClear] = useState<boolean>(false);

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
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // 오른쪽으로 아이템을 정렬합니다.
          alignItems: "flex-start", // 상단으로 아이템을 정렬합니다.
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        {Array.from({ length: life }, (_, index) => (
          <span>
            <img src={Life} alt="" />
          </span>
        ))}
      </div>
      <SonagiCanvas
        isGameOver={isGameOver}
        isClear={isClear}
        setIsGameOver={setIsGameOver}
        setScore={setScore}
        setLife={setLife}
        setIsClear={setIsClear}
      />
    </div>
  );
}

export default Sonagi;

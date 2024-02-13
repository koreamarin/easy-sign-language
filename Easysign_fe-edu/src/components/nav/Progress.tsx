// React Circular Progressbar
// URL : https://www.npmjs.com/package/react-circular-progressbar

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressProps {
  text: string;
  percentage: number;
  wrong_answer?: boolean;
}

const Progress = ({ text, percentage, wrong_answer = false }: ProgressProps) => {
  const pathColor = wrong_answer ? "red" : "turquoise";
  const textMarginTop = wrong_answer ? -7 : -17;
  const percentMarginTop = wrong_answer ? 5 : -9;
  const trailColor = wrong_answer ? "#FFCFD8" : "#D8FFFB";
  return (
    <div style={{ width: 140 }}>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={15}
        background={true}
        styles={buildStyles({
          pathColor: pathColor,
          trailColor: trailColor,
          backgroundColor: "white",
        })}
      >
        <div
          style={{
            fontSize: 17,
            marginTop: textMarginTop,
            fontWeight: 700,
            color: "#833F00",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div
            style={{
              fontSize: 33,
              marginTop: percentMarginTop,
              fontWeight: 700,
            }}
          >
            {percentage}%
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Progress;

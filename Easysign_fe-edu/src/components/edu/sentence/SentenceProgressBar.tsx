import { styled } from "styled-components";
import { trainingDataType } from "../Lecture";

interface SpanProps {
  backgroundColor?: string;
}

const Div = styled.div<SpanProps>`
  width: 800px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px -20px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
  margin: 3px 0px;
  cursor: pointer;
`;

interface SentenceProgressBarProps {
  trainingData: trainingDataType[];
  currentNum: number;
  currentNumModify: (currentNum: number) => void;
}

const SentenceProgressBar = ({
  trainingData,
  currentNum,
  currentNumModify,
}: SentenceProgressBarProps) => {
  const totalNum = trainingData.length;
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const idNumber = parseInt((e.target as HTMLInputElement).id);
    if (idNumber < totalNum + 1 && idNumber > 0) currentNumModify(idNumber);
  };

  return (
    <>
      <div>
        <span>
          <span
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            {currentNum}
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            /{totalNum}
          </span>
        </span>
      </div>
      <div
        style={{
          width: "900px",
          height: "156px",
          borderRadius: "70px",
          padding: "0px 40px",
          backgroundColor: "#FFEAEE",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#636363",
          // 폰트 밝기 조절
        }}
      >
        <Div
          id={(currentNum + 3).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum < totalNum - 2) {
              if (trainingData[currentNum + 2].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum > totalNum - 3) {
              return "";
            }
            return trainingData[currentNum + 2].content;
          })(currentNum)}
        </Div>
        <Div
          id={(currentNum + 2).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum < totalNum - 1) {
              if (trainingData[currentNum + 1].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum > totalNum - 2) {
              return "";
            }
            return trainingData[currentNum + 1].content;
          })(currentNum)}
        </Div>
        <Div
          id={(currentNum + 1).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum < totalNum) {
              if (trainingData[currentNum].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum > totalNum - 1) {
              return "";
            }
            return trainingData[currentNum].content;
          })(currentNum)}
        </Div>
        <span
          style={{
            width: "800px",
            height: "108px",
            borderRadius: "30px",
            backgroundColor: "#C2FFF0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: "25px",
            margin: "3px 0px",
          }}
        >
          <span
            style={{
              position: "relative",
              top: "-5px",
            }}
          >
            {trainingData[currentNum - 1].content}
          </span>
        </span>
      </div>
    </>
  );
};

export default SentenceProgressBar;

import { styled } from "styled-components";
import { trainingDataType } from "../Lecture";

interface SpanProps {
  backgroundColor?: string;
}

const Span = styled.span<SpanProps>`
  width: 80px;
  height: 70px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px -20px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 30%;
  cursor: pointer;
  font-family: "TTHakgyoansimJiugaeR", sans-serif;
  font-weight: 100;
`;

interface JihwaProgressBarProps {
  trainingData: trainingDataType[];
  currentNum: number;
  currentNumModify: (currentNum: number) => void;
}

const JihwaProgressBar = ({
  trainingData,
  currentNum,
  currentNumModify,
}: JihwaProgressBarProps) => {
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
          width: "793px",
          height: "136px",
          borderRadius: "70px",
          padding: "0px 40px",
          backgroundColor: "#FFEAEE",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          fontSize: "50px",
          fontWeight: "bold",
          color: "#636363",
          // 폰트 밝기 조절
        }}
      >
        <Span
          id={(currentNum - 3).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum > 3) {
              if (trainingData[currentNum - 4].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum < 4) {
              return "";
            }
            return trainingData[currentNum - 4].content;
          })(currentNum)}
        </Span>
        <Span
          id={(currentNum - 2).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum > 2) {
              if (trainingData[currentNum - 3].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum < 3) {
              return "";
            }
            return trainingData[currentNum - 3].content;
          })(currentNum)}
        </Span>
        <Span
          id={(currentNum - 1).toString()}
          onClick={onClick}
          backgroundColor={((currentNum: number): string => {
            if (currentNum > 1) {
              if (trainingData[currentNum - 2].success) return "#9ac9ff";
              else return "#ff8686";
            }
            return "#FFEAEE";
          })(currentNum)}
        >
          {((currentNum: number) => {
            if (currentNum < 2) {
              return "";
            }
            return trainingData[currentNum - 2].content;
          })(currentNum)}
        </Span>
        <span
          style={{
            width: "180px",
            height: "108px",
            borderRadius: "30px",
            backgroundColor: "#C2FFF0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: "80px",
            margin: "0px -15px",
          }}
        >
          <span
            style={{
              position: "relative",
              top: "10px",
              fontFamily: "TTHakgyoansimJiugaeR",
              fontWeight: 100,
            }}
          >
            {trainingData[currentNum - 1].content}
          </span>
        </span>
        <Span
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
        </Span>
        <Span
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
        </Span>
        <Span
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
        </Span>
      </div>
    </>
  );
};

export default JihwaProgressBar;

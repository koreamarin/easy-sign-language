import React from "react";
import styled from "styled-components";
import RightBracketButton from "../../assets/images/RightBracketButton.svg";
import RightBracketLargeButton from "../../assets/images/RightBracketLargeButton.svg";
import LeftBracketButton from "../../assets/images/LeftBracketButton.svg";
import LeftBarcketLargeButton from "../../assets/images/LeftBracketLargeButton.svg";

interface ContainerProps {
  svgSrc: string[];
  direction: "left" | "right";
}

const Containers = styled.button<ContainerProps>`
  width: 80px;
  height: 116px;
  text-align: center;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.svgSrc[0]});
  background-repeat: no-repeat;
  background-position: ${(props) => (props.direction === "left" ? "10px" : "15px")};
  background-color: #faf7f7;
  color: {
  }
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  word-wrap: break-word;
  border: none;
  &:hover {
    background-image: url(${(props) => props.svgSrc[1]});
    background-position: ${(props) => (props.direction === "left" ? "1px" : "6px")};
  }
  cursor: pointer;
`;

interface LeftBracketButtonProps {
  direction: "left" | "right";
  currentNum: number;
  currentNumModify: (currentNum: number) => void;
}

const BracketButton = ({ direction, currentNum, currentNumModify }: LeftBracketButtonProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (direction === "left") currentNumModify(currentNum - 1);
    else currentNumModify(currentNum + 1);
  };

  if (direction === "left") {
    return (
      <Containers
        onClick={onClick}
        svgSrc={[LeftBracketButton, LeftBarcketLargeButton]}
        direction="left"
      />
    );
  }
  return (
    <Containers
      onClick={onClick}
      svgSrc={[RightBracketButton, RightBracketLargeButton]}
      direction="right"
    />
  );
};

export default BracketButton;

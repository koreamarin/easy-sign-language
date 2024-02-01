import React from "react";
import styled from "styled-components";
import { ButtonProps, ContainersProps } from "./SSmallButton";
import Arrow_brown from "../../assets/images/Arrow_brown.png";
import Arrow_blue from "../../assets/images/Arrow_blue.png";
import Arrow_skyblue from "../../assets/images/Arrow_skyblue.png";
import Arrow_red from "../../assets/images/Arrow_red.png";

const Containers = styled.button<ContainersProps>`
  width: 116px;
  height: 116px;
  text-align: center;
  background: ${(props) => {
    switch (props.color) {
      case "mint":
        return "#A7EEC3";
      case "skyblue":
        return "#C2EAF3";
      case "orange":
        return "#FBC36E";
      case "pink":
        return "#FFCFD8";
      default:
        return "#8CCFFF";
    }
  }};
  border-radius: 9999px;
  color: ${(props) => {
    switch (props.color) {
      case "mint":
        return "#833F00";
      case "skyblue":
        return "#00D0FF";
      case "orange":
        return "#833F00";
      case "pink":
        return "#FF0030";
      default:
        return "#006EBD";
    }
  }};
  font-size: 18px;
  font-family: Inter;
  font-weight: 700;
  line-height: 25px;
  word-wrap: break-word;
  border: none;
  box-shadow: 3px 3px 3px 3px gray;
  &:hover {
    background: ${(props) => {
      switch (props.color) {
        case "mint":
          return "linear-gradient(180deg, #A7EEC3 0%, rgba(167, 238, 195, 0) 100%)";
        case "skyblue":
          return "linear-gradient(180deg, #C2EAF3 0%, rgba(194, 234, 243, 0) 100%)";
        case "orange":
          return "linear-gradient(180deg, #FBC36E 0%, rgba(251, 195, 110, 0) 100%)";
        case "pink":
          return "linear-gradient(180deg, #FFCFD8 0%, rgba(255, 207, 216, 0) 100%)";
        default:
          return "linear-gradient(180deg, #8CCFFF 0%, rgba(140, 207, 255, 0) 100%)";
      }
    }};
  }
  cursor: pointer;
`;

const BackButton = ({ text, color, onClick, onMouseEnter, onMouseLeave }: ButtonProps) => {
  const ArrowColor = (color: string | undefined): string => {
    switch (color) {
      case "mint":
        return Arrow_brown;
      case "skyblue":
        return Arrow_skyblue;
      case "orange":
        return Arrow_brown;
      case "pink":
        return Arrow_red;
      default:
        return Arrow_blue;
    }
  };
  return (
    <Containers
      color={color}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={ArrowColor(color)} alt="arrow" width={"50%"} />
      <br />
      {text}
    </Containers>
  );
};

export default BackButton;

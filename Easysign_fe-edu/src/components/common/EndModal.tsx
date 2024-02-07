import GoodSteamp from "../../assets/images/GoodStamp.png";
import Sticker from "../../assets/images/sticker.png";
import MediumButton from "../Button/MediumButton";
import CryingEmoji from "../../assets/images/CryingEmoji.png";
import API from "../../config";
import { useEffect, useState } from "react";
import check from "../../assets/images/check.png";
import { trainingDataType } from "../edu/Lecture";
import { token } from "../../pages/Main";

interface EndModalProps {
  trainingData: trainingDataType[];
  ShownEndModalStatus: boolean;
}

const EndModal = ({ trainingData, ShownEndModalStatus }: EndModalProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const totalNum = trainingData.length;

  return (
    <div
      style={{
        position: "absolute",
        top: "7px",
        left: "10px",
        width: "1060px",
        height: "850px",
        backgroundColor: "#FFF5E7",
        borderRadius: "60px",
        display: ShownEndModalStatus ? "flex" : "none",
        boxShadow: "5px 5px 5px 5px gray",
      }}
    ></div>
  );
};

export default EndModal;

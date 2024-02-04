import React from "react";
import SSmallButton from "../components/Button/SSmallButton";
import SmallButton from "../components/Button/SmallButton";
import MediumButton from "../components/Button/MediumButton";
import LargeButton from "../components/Button/LargeButton";
import BackButton from "../components/Button/BackButton";
import logo_mint from "../assets/images/logo_mint.png";
import logo_skyblue from "../assets/images/logo_skyblue.png";
import logo_orange from "../assets/images/logo_orange.png";
import logo_blue from "../assets/images/logo_blue.png";
import logo_pink from "../assets/images/logo_pink.png";
import Logo from "../components/nav/NavLogo";
import ProfileImg from "../components/nav/ProfileImg";
import Progress from "../components/nav/Progress";
import Nav from "../components/nav/Nav";
import { useNavigate } from "react-router-dom";
import JihwaProgressBar from "../components/edu/jihwa/JihwaProgressBar";
import BracketButton from "../components/Button/BracketButton";
import ResultModal from "../components/common/ResultModal";

const AllComponentsContainer = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>Button</h1>
      <div>
        <img src={logo_mint} alt="logo_mint" width={"20%"} />
        <img src={logo_skyblue} alt="logo_skyblue" width={"20%"} />
        <img src={logo_orange} alt="logo_orange" width={"20%"} />
        <img src={logo_blue} alt="logo_blue" width={"20%"} />
        <img src={logo_pink} alt="logo_pink" width={"20%"} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <SSmallButton text={"ss스몰버튼"} color={"mint"} onClick={onClick} />
        <SSmallButton text={"s스몰버튼"} color={"skyblue"} onClick={() => ""} />
        <SSmallButton text={"s스몰버튼"} color={"orange"} onClick={() => ""} />
        <SSmallButton text={"s스몰버튼"} color={"blue"} onClick={() => ""} />
        <SSmallButton text={"s스몰버튼"} color={"pink"} onClick={() => ""} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <SmallButton text={"스몰버튼"} color={"mint"} onClick={() => ""} />
        <SmallButton text={"스몰버튼"} color={"skyblue"} onClick={() => ""} />
        <SmallButton text={"스몰버튼"} color={"orange"} onClick={() => ""} />
        <SmallButton text={"스몰버튼"} color={"blue"} onClick={() => ""} />
        <SmallButton text={"스몰버튼"} color={"pink"} onClick={() => ""} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <MediumButton text={"중간버튼"} color={"mint"} onClick={() => ""} />
        <MediumButton text={"중간버튼"} color={"skyblue"} onClick={() => ""} />
        <MediumButton text={"중간버튼"} color={"orange"} onClick={() => ""} />
        <MediumButton text={"중간버튼"} color={"blue"} onClick={() => ""} />
        <MediumButton text={"중간버튼"} color={"pink"} onClick={() => ""} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <LargeButton text={"라지버튼"} color={"mint"} onClick={() => ""} />
        <LargeButton text={"라지버튼"} color={"orange"} onClick={() => ""} />
        <LargeButton text={"라지버튼"} color={"blue"} onClick={() => ""} />
        <LargeButton text={"라지버튼"} color={"skyblue"} onClick={() => ""} />
        <LargeButton text={"라지버튼"} color={"pink"} onClick={() => ""} />
      </div>
      <br />
      <br />
      <br />
      <div>
        <BackButton text={"뒤로가기"} color={"mint"} onClick={() => ""} />
        <BackButton text={"뒤로가기"} color={"orange"} onClick={() => ""} />
        <BackButton text={"뒤로가기"} color={"blue"} onClick={() => ""} />
        <BackButton text={"뒤로가기"} color={"skyblue"} onClick={() => ""} />
        <BackButton text={"뒤로가기"} color={"pink"} onClick={() => ""} />
      </div>

      <div></div>
      <br />
      <br />
      <br />
      <hr />
      <h1>Nav Bar</h1>
      <div>
        <Logo />
        <ProfileImg />
        <ProfileImg
          src={
            "https://kookbang.dema.mil.kr/newspaper/tmplat/upload/20170515/thumb1/BBS_201705150542235040.jpeg"
          }
        />
        <Progress percentage={76} wrong_answer={true} />
        <Progress percentage={76} wrong_answer={false} />
        <Progress percentage={76} />
        <Nav />
        <JihwaProgressBar />
      </div>
    </div>
  );
};

export default AllComponentsContainer;

import { useNavigate } from "react-router-dom";
import BackButton from "../Button/BackButton";
import NavLogo from "./NavLogo";
import ProfileImg from "./ProfileImg";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { useEffect, useState } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const progress = useSelector((state: rootState) => state.progress);
  const [backgroundSrc, setbackgroundSrc] = useState<string | undefined>(undefined);
  const [CharacterSrc, setCharacterSrc] = useState<string | undefined>(undefined);
  const getUserinfo = async () => {
    const response = await fetch("https://i10c202.p.ssafy.io/api/v1/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzIwMTIwNCwiaWQiOjYsImxvZ2luSWQiOiJzc2FmeSJ9.RY5jj_VYsOD-pxxoDOR715G6av3l_z-7d66Gh3xRSuvLqTQGbLxOuSEZ7-GU88CrxXLnFEGnvbzgoH2UcH0WpA",
      },
    });
    const json = await response.json();
    setCharacterSrc(json.profileCharacterPath);
    setbackgroundSrc(json.profileBackgroundPath);
  };
  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "160px", // 비율 단위로 변경
        height: "900px", // 비율 단위로 변경
        background:
          "linear-gradient(180deg, rgba(243.41, 44.46, 46.17, 0.09) 0%, rgba(194, 234, 243, 0.39) 68%)",
      }}
    >
      <a
        style={{
          padding: "20px",
          borderBottom: "3px solid pink",
        }}
        href="/"
        target="_blank"
      >
        <NavLogo />
      </a>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <a href="/mypage" target="_blank">
          <ProfileImg backgroundSrc={backgroundSrc} CharacterSrc={CharacterSrc} />
        </a>
      </div>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <Progress percentage={progress.LearningProgress} />
      </div>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <Progress percentage={progress.IncorrectAnswerRate} wrong_answer={true} />
      </div>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <BackButton text={"뒤로가기"} color={"pink"} onClick={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default Nav;

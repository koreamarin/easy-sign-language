import { useNavigate } from "react-router-dom";
import BackButton from "../Button/BackButton";
import NavLogo from "./NavLogo";
import ProfileImg from "./ProfileImg";
import Progress from "./Progress";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/modules";
import { useEffect, useState } from "react";
import API from "../../config";
import { token } from "../../pages/Main";
import { setAvatar } from "../../redux/modules/avatarSlice";

interface NavProps {
  Progress2Visibility: boolean;
}

const Nav = ({ Progress2Visibility }: NavProps) => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const progress = useSelector((state: rootState) => state.progress);
  const [backgroundSrc, setbackgroundSrc] = useState<string | undefined>(undefined);
  const [CharacterSrc, setCharacterSrc] = useState<string | undefined>(undefined);
  const getUserinfo = async () => {
    const response = await fetch(`${API.USERINFO}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const json = await response.json();
    setCharacterSrc(json.profileCharacterPath);
    setbackgroundSrc(json.profileBackgroundPath);
    disPatch(setAvatar(json.mask));
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
        href="https://easysign.shop"
        target="_blank"
        rel="noreferrer"
      >
        <NavLogo />
      </a>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <a href="https://easysign.shop/mypage" target="_blank" rel="noreferrer">
          <ProfileImg backgroundSrc={backgroundSrc} CharacterSrc={CharacterSrc} />
        </a>
      </div>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <Progress
          percentage={progress.LearningProgress}
          text={"<div>학습</div><div>진행도</div>"}
        />
      </div>
      <div
        style={{
          paddingTop: "30px",
          visibility: Progress2Visibility ? "visible" : "hidden",
        }}
      >
        <Progress
          percentage={progress.IncorrectAnswerRate}
          text={"<div>오답률</div>"}
          wrong_answer={true}
        />
      </div>
      <div
        style={{
          paddingTop: "30px",
        }}
      >
        <BackButton text={"뒤로가기"} color={"pink"} onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default Nav;

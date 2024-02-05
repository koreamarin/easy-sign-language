import { useNavigate } from "react-router-dom";
import BackButton from "../Button/BackButton";
import NavLogo from "./NavLogo";
import ProfileImg from "./ProfileImg";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/modules";

const Nav = () => {
  const navigate = useNavigate();
  const progress = useSelector((state: rootState) => state.progress);
  const getMovies = async () => {
    const response = await fetch("https://i10c202.p.ssafy.io/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        loginId: "ssafy",
        password: "1234",
      }),
    });
    console.log(response);
  };
  getMovies();

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
          <ProfileImg />
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

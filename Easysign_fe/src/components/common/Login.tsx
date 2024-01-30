import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  // 카카오 로그인 구현
  // 보안상 노출되면 안되는 데이터는 .env에 작성하여 호출한다.
  const kakao_client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakao_redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?scope=account_email&client_id=${kakao_client_id}&redirect_uri=${kakao_redirect_uri}&response_type=code&prompt=login`;

  //cors 이슈로 인해 href 방식으로 호출
  const loginKaKao = () => {
    window.location.href = kakao_url;
  };

  // 네이버 소셜 로그인
  // .env 작성
  const naver_client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naver_redirect_uri = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const naver_state = process.env.REACT_APP_NAVER_STATE;

  const naver_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naver_client_id}&state=${naver_state}&redirect_uri=${naver_redirect_uri}`;

  //cors 이슈로 인해 href 방식으로 호출
  const loginNaver = () => {
    window.location.href = naver_url;
  };

  // 구글 소셜 로그인 구현

  // 일반 로그인 구현

  // User를 기존 db에서 받아올 수 있게 코드 수정해야 함.
  const User = {
    id: "easysign01",
    password: "easysign!123",
  };

  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  // 아이디, 패스워드 유효성 검사 state
  const [idValid, setIDValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setID(e.target.value);
    // 영문, 숫자 조합으로 5~10자
    const regex = /^[a-zA-Z][0-9a-zA-Z]{4,9}$/;
    if (regex.test(e.target.value)) {
      setIDValid(true);
    } else {
      setIDValid(false);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  useEffect(() => {
    if (idValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, passwordValid]);

  const onClickConfirmButton = () => {
    if (id === User.id && password === User.password) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  return (
    <div>
      <span>신규 사용자이신가요?</span>
      <Link className="navbarMenu" to={"/join"}>
        계정 만들기
      </Link>

      <br></br>
      <br></br>
      <div className="normalLogin">
        <div className="inputWrap">
          <TextField
            id="standard-basic"
            type="text"
            label="아이디"
            value={id}
            placeholder="easysign"
            variant="standard"
            onChange={handleID}
          />
          <br></br>
          <div className="errorMessageWrap">
            {!idValid && id.length > 0 && (
              <div>영문, 숫자 조합으로 5~10자로 입력해주세요.</div>
            )}
          </div>
          <TextField
            id="standard-basic"
            value={password}
            type="password"
            label="비밀번호"
            variant="standard"
            onChange={handlePassword}
          />
          <div className="errorMessageWrap">
            {!passwordValid && password.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        <br></br>
        <br></br>

        <br></br>
        <Button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          variant="contained"
        >
          로그인
        </Button>
      </div>

      <br></br>
      <br></br>
      <div>소셜 계정으로 로그인</div>
      <br></br>
      <br></br>
      <Link className="navbarMenu" to={"kakaologin"}>
        <img
          src="../social_login/image/kakaotalk_sharing_btn_small.png"
          onClick={loginKaKao}
          alt="카카오톡 소셜 로그인"
        />
      </Link>
      <Link className="navbarMenu" to={"naverlogin"}>
        <img
          src="../social_login/image/kakaotalk_sharing_btn_small.png"
          onClick={loginNaver}
          alt="네이버 소셜 로그인"
        />
      </Link>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  // 카카오 로그인 구현
  // 보안상 노출되면 안되는 데이터는 .env에 작성하여 호출하였다.
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

  return (
    <div>
      <span>신규 사용자이신가요?</span>
      <Link className="navbarMenu" to={"join"}>
        계정 만들기
      </Link>
      <br></br>
      <br></br>
      <TextField id="standard-basic" label="아이디" variant="standard" />
      <br></br>

      <TextField
        id="standard-basic"
        type="password"
        label="비밀번호"
        variant="standard"
      />
      <br></br>
      <br></br>

      <br></br>
      <Button variant="contained">로그인</Button>
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
      <Link className="navbarMenu" to={"kakaologin"}>
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

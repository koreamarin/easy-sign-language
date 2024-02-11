import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "styled-components";

function Login() {
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
    setIDValid(true);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValid(true);
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

  // css 구현
  // footer가 로그인 화면을 침범하는 문제 발생해서 해결하기 위해 설정
  const ContentBox = styled.div`
    min-height: 130vh;
  `;

  // 로그인 화면 구성하는 박스
  const R29 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 476px;
    height: 680px;
    left: 482px;
    top: 145px;

    background: #ffffff;
    border: 1px solid #cfcfcf;
    box-shadow: 30px 30px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  `;

  // 수어쉬워 로고
  const I62 = styled.div`
    position: absolute;
    width: 318px;
    height: 112px;
    left: 562px;
    top: 209px;
  `;

  // 신규 사용자이신가요?
  const NewUser = styled.div`
    position: absolute;
    width: 130px;
    height: 19px;
    left: 531px;
    top: 371.42px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 21px;
    /* or 162% */
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: rgba(0, 0, 0, 0.6);
  `;

  // 계정 만들기 글씨
  const CreateAccount = styled.div`
    position: absolute;
    width: 94.48px;
    height: 19px;
    left: 659.31px;
    top: 371.42px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 21px;
    /* or 162% */
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: rgba(0, 0, 0, 0.87);
  `;

  // 입력창1 - 아이디
  const Form1 = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 300px;
  `;

  // 입력창2 - 비밀번호
  const Form2 = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 240px;
  `;

  // 로그인 버튼
  const LoginButton = styled.div`
    position: absolute;
    width: 378px;
    left: 531px;
    right: 531px;
    top: 570px;
    // bottom: 421.06px;

    // background: #141414;
    border-radius: 4px;
  `;

  // 아이디 찾기 / 비밀번호 찾기 놓을 자리
  const Form3 = styled.div`
    position: absolute;
    height: 40px;
    left: 531px;
    right: 531px;
    top: 640.94px;
  `;

  // 아이디 찾기
  const FindAccount = styled.div`
    position: absolute;
    width: 79.93px;
    height: 19px;
    left: 0px;
    top: 10.47px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 350;
    font-size: 13px;
    line-height: 21px;
    /* or 162% */
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: #141414;
  `;

  // 비밀번호 찾기
  const FindPassword = styled.div`
    position: absolute;
    width: 112.14px;
    height: 19px;
    left: 95.61px;
    top: 10.47px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 350;
    font-size: 13px;
    line-height: 21px;
    /* or 162% */
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: #141414;
  `;

  return (
    <div>
      <ContentBox>
        <R29></R29>
        <I62>
          <img src="../logo_skyblue.png"></img>
        </I62>
        <NewUser>신규 사용자이신가요?</NewUser>
        <CreateAccount>　계정 만들기</CreateAccount>
        <Form1>
          <TextField
            id="standard-basic"
            type="text"
            // label="아이디"
            value={id}
            placeholder="easysign"
            variant="standard"
            onChange={handleID}
            sx={{ width: "378px" }}
          />
        </Form1>
        <Form2>
          <TextField
            id="standard-basic"
            value={password}
            type="password"
            // label="비밀번호"
            variant="standard"
            onChange={handlePassword}
            sx={{ width: "378px" }}
          />
        </Form2>
        <LoginButton>
          <Button
            variant="contained"
            sx={{ width: "378px", backgroundColor: "#000000" }}
          >
            로그인
          </Button>
        </LoginButton>
        <Form3>
          <FindAccount>아이디 찾기</FindAccount>
          <FindPassword>비밀번호 찾기</FindPassword>
        </Form3>
      </ContentBox>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// css적용
import styled from "styled-components";

// 백-프론트 연결 관련 import
import API from "../../config";
import axios from "axios";

function Join() {
  // 프론트, 백 통신 설정
  const [account, setAccount] = useState<any>([]);

  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzY2MzMzMSwiaWQiOjYsImxvZ2luSWQiOiJzc2FmeSJ9.xkcoHpJEv-kr86OWYkyKKnHGiIihx2H0uNWY-_Wv6f01-BAWpXTiANxh9t7OzdKV9-HPkS56u47d1YBqHpbo6w"
  );

  // 로컬 스토리지에서 토큰을 가져옴
  const token = localStorage.getItem("token") || "";

  const getAccount = async () => {
    const response = await fetch(`${API.JOIN}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        loginId: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    });

    setAccount(response);
    console.log(response);
  };

  useEffect(() => {
    getAccount();
  }, []);

  // 회원 정보를 저장할 상태
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    name: "",
  });

  // 비밀번호 일치 여부 상태
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  // 아이디, 패스워드 유효성 검사 state
  const [idValid, setIDValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  // 아이디 유효성 검사
  const handleID = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      id: value,
    }));
    // 영문, 숫자 조합으로 5~10자
    const regex = /^[a-zA-Z][0-9a-zA-Z]{4,9}$/;
    if (regex.test(value)) {
      setIDValid(true);
    } else {
      setIDValid(false);
    }
  };

  // 이메일 유효성 검사
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      email: value,
    }));
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 비밀번호 유효성 검사
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      password: value,
    }));
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 비밀번호 확인 유효성 검사
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setUser((prevState) => ({
    //   ...prevState,
    //   confirmPassword: value,
    // }));
    if (value === user.password) {
      setPasswordsMatch(true);
      setConfirmPasswordValid(true); // 일치할 때만 유효성 검사 통과로 설정
    } else {
      setPasswordsMatch(false);
      setConfirmPasswordValid(false); // 일치하지 않을 때는 유효성 검사 통과하지 않도록 설정
    }
  };

  // 닉네임 입력
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      name: value,
    }));
    if (value.trim() !== "") {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 유효성 검사 후 회원가입 버튼 활성화/비활성화
  useEffect(() => {
    if (
      idValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      nameValid
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [idValid, emailValid, passwordValid, confirmPasswordValid, nameValid]);

  // 회원가입 버튼 클릭 시 실행될 함수
  const onClickSignUpButton = () => {
    // 여기서는 간단하게 유효성 검사를 통과한 회원 정보를 콘솔에 출력하는 것으로 가정
    console.log("회원가입 정보:", user);
  };

  // css 적용
  // footer가 로그인 화면을 침범하는 문제 발생해서 해결하기 위해 최소 높이 설정
  const ContentBox = styled.div`
    min-height: 130vh;
  `;

  // 회원가입 박스
  const R29 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 476px;
    height: 680px;
    left: 482px;
    top: 172px;

    background: #ffffff;
    border: 1px solid #cfcfcf;
    box-shadow: 30px 30px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  `;

  // 회원가입을 시작합니다.
  const StartSignUp = styled.div`
    /* Link → Create account */

    position: absolute;
    width: 270px;
    height: 55px;
    left: 531px;
    top: 214px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 25px;
    line-height: 84%;
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: rgba(0, 0, 0, 0.87);
  `;

  // 회원정보를 입력하세요.
  const AddInfo = styled.div`
    position: absolute;
    width: 253px;
    height: 55px;
    left: 531px;
    top: 262px;

    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    /* or 132% */
    display: flex;
    align-items: center;
    letter-spacing: 0.122px;

    color: rgba(114, 114, 114, 0.87);
  `;

  // 아이디 form
  const IDForm = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 400px;
  `;

  // 이메일 form
  const EmailForm = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 330px;
  `;

  // 비밀번호 form
  const PasswordForm = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 260px;
  `;

  // 비밀번호 확인 form
  const ConfirmPasswordForm = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 190px;
  `;

  // 닉네임 form
  const NameForm = styled.div`
    box-sizing: border-box;

    position: absolute;
    height: 24px;
    left: 531px;
    right: 531px;
    bottom: 120px;
  `;

  // 회원가입완료 버튼
  const ConfirmButton = styled.div`
    position: absolute;
    width: 378px;
    right: 531px;
    top: 733px;
    bottom: 247px;
  `;
  return (
    <div>
      <ContentBox>
        <R29></R29>
        <StartSignUp>회원가입을 시작합니다.</StartSignUp>
        <AddInfo>회원정보를 입력하세요.</AddInfo>
        <IDForm>
          <TextField
            id="standard-basic"
            type="text"
            label="아이디"
            value={user.id}
            placeholder="easysign"
            variant="standard"
            onChange={handleID}
            sx={{ width: "378px" }}
          />
          {/* <div className="errorMessageWrap">
            {!idValid && user.id.length > 0 && (
              <div>영문, 숫자 조합으로 5~10자로 입력해주세요.</div>
            )}
          </div> */}
        </IDForm>
        <EmailForm>
          <TextField
            id="standard-basic"
            value={user.email}
            type="email"
            label="이메일"
            variant="standard"
            onChange={handleEmail}
            sx={{ width: "378px" }}
          />
          {/* <div className="errorMessageWrap">
            {!emailValid && user.email.length > 0 && (
              <div>이메일 형식에 맞지 않습니다.</div>
            )}
          </div> */}
        </EmailForm>
        <PasswordForm>
          <TextField
            id="standard-basic"
            value={user.password}
            type="password"
            label="비밀번호"
            variant="standard"
            onChange={handlePassword}
            sx={{ width: "378px" }}
          />
          {/* <div className="errorMessageWrap">
            {!passwordValid && user.password.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div> */}
        </PasswordForm>
        <ConfirmPasswordForm>
          <TextField
            id="standard-basic"
            // value={user.confirmPassword}
            type="password"
            label="비밀번호 확인"
            variant="standard"
            onChange={handleConfirmPassword}
            sx={{ width: "378px" }}
          />
          {/* <div className="errorMessageWrap">
            {!passwordsMatch && <div>비밀번호가 일치하지 않습니다.</div>}
          </div> */}
        </ConfirmPasswordForm>
        <NameForm>
          <TextField
            id="standard-basic"
            value={user.name}
            type="text"
            label="닉네임"
            variant="standard"
            onChange={handleNickname}
            sx={{ width: "378px" }}
          />
          <div className="errorMessageWrap">
            {!nameValid && user.name.length > 0 && (
              <div>닉네임을 입력해주세요.</div>
            )}
          </div>
        </NameForm>
        <ConfirmButton>
          <Button
            variant="contained"
            sx={{ width: "378px", backgroundColor: "#000000" }}
          >
            가입완료
          </Button>
        </ConfirmButton>
      </ContentBox>
    </div>
  );
}

export default Join;

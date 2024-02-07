import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Join() {
  // 회원 정보를 저장할 상태
  const [user, setUser] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  // 아이디, 패스워드 유효성 검사 state
  const [idValid, setIDValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
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
    setUser((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
    if (value === user.password) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  };

  // 닉네임 입력
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      nickname: value,
    }));
    if (value.trim() !== "") {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  // 유효성 검사 후 회원가입 버튼 활성화/비활성화
  useEffect(() => {
    if (
      idValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      nicknameValid
    ) {
      setNotAllow(false);
    } else {
      setNotAllow(true);
    }
  }, [idValid, emailValid, passwordValid, confirmPasswordValid, nicknameValid]);

  // 회원가입 버튼 클릭 시 실행될 함수
  const onClickSignUpButton = () => {
    // 여기서는 간단하게 유효성 검사를 통과한 회원 정보를 콘솔에 출력하는 것으로 가정
    console.log("회원가입 정보:", user);
  };

  return (
    <div>
      <div className="joinForm">
        <div className="inputWrap">
          <TextField
            id="standard-basic"
            type="text"
            label="아이디"
            value={user.id}
            placeholder="easysign"
            variant="standard"
            onChange={handleID}
          />
          <br></br>
          <div className="errorMessageWrap">
            {!idValid && user.id.length > 0 && (
              <div>영문, 숫자 조합으로 5~10자로 입력해주세요.</div>
            )}
          </div>
          <TextField
            id="standard-basic"
            value={user.email}
            type="email"
            label="이메일"
            variant="standard"
            onChange={handleEmail}
          />
          <div className="errorMessageWrap">
            {!emailValid && user.email.length > 0 && (
              <div>이메일 형식에 맞지 않습니다.</div>
            )}
          </div>

          <TextField
            id="standard-basic"
            value={user.password}
            type="password"
            label="비밀번호"
            variant="standard"
            onChange={handlePassword}
          />
          <div className="errorMessageWrap">
            {!passwordValid && user.password.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
          <TextField
            id="standard-basic"
            value={user.confirmPassword}
            type="password"
            label="비밀번호 확인"
            variant="standard"
            onChange={handleConfirmPassword}
          />
          <div className="errorMessageWrap">
            {!confirmPasswordValid && user.confirmPassword.length > 0 && (
              <div>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
          <TextField
            id="standard-basic"
            value={user.nickname}
            type="text"
            label="닉네임"
            variant="standard"
            onChange={handleNickname}
          />
          <div className="errorMessageWrap">
            {!nicknameValid && user.nickname.length > 0 && (
              <div>닉네임을 입력해주세요.</div>
            )}
          </div>
        </div>

        <br></br>
        <br></br>

        <br></br>
        <Button
          onClick={onClickSignUpButton}
          disabled={notAllow}
          variant="contained"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}

export default Join;

import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { styled } from "styled-components";
import { token } from "../common/Token";
import API from "../../config";
import axios from "axios";
import styles from "./login.module.css"; // CSS 모듈 import

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`;

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(() => {
    const headers = {
      Authorization: token,
    };

    const body = {
      loginId: loginId,
      password: password,
    };

    axios
      .post(`${API.LOGIN}`, body, { headers })
      .then((res) => {
        alert("로그인에 성공했습니다.");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  }, [loginId, password]);

  return (
    <div>
      <div className={styles.contentBox}>
        <div className={styles.r29}></div>
        <div className={styles.i62}>
          <img src="../logo_skyblue.png" alt="수어쉬워 로고"></img>
        </div>
        <div className={styles.newUser}>신규 사용자이신가요?</div>
        <StyledLink to={"/join"}>
          <div className={styles.createAccount}> 계정 만들기</div>
        </StyledLink>
        <div className={styles.form1}>
          <TextField
            id="standard-basic"
            type="text"
            label="아이디"
            placeholder="아이디"
            variant="standard"
            sx={{ width: "378px" }}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className={styles.form2}>
          <TextField
            id="standard-basic"
            type="password"
            label="비밀번호"
            placeholder="비밀번호"
            variant="standard"
            sx={{ width: "378px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.loginButton}>
          <Button
            variant="contained"
            sx={{ width: "378px", backgroundColor: "#000000", margin: "1vh" }}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </div>
        <div className={styles.form3}>
          <div className={styles.findAccount}>아이디 찾기</div>
          <div className={styles.findPassword}>비밀번호 찾기</div>
        </div>
      </div>
    </div>
  );
}

export default Login;

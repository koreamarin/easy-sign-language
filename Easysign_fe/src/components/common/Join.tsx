import React, { useState, useCallback } from "react";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import API from "../../config";
import { token } from "../common/Token";
import styles from "./join.module.css"; // CSS 모듈 import

function Join() {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleJoin = useCallback(() => {
    const headers = {
      Authorization: token,
    };

    const body = {
      loginId: loginId,
      email: email,
      password: password,
      name: name,
    };

    axios
      .post(`${API.JOIN}`, body, { headers })
      .then((res) => {
        console.log(body);
        alert("회원가입에 성공했습니다.");

        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입에 실패했습니다.");
      });
  }, [loginId, email, password, name]);

  return (
    <div>
      <div className={styles.contentBox}>
        <div className={styles.r29}></div>
        <div className={styles.startSignUp}>회원가입을 시작합니다.</div>
        <div className={styles.addInfo}>회원정보를 입력하세요.</div>
        <div className={styles.idForm}>
          <TextField
            id="standard-basic"
            type="text"
            label="아이디"
            placeholder="easysign"
            variant="standard"
            sx={{ width: "378px" }}
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <div className="errorMessageWrap">
            {loginId.length > 0 && loginId.length < 8 && (
              <div>아이디를 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        <div className={styles.emailForm}>
          <TextField
            id="standard-basic"
            type="email"
            label="이메일"
            variant="standard"
            sx={{ width: "378px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="errorMessageWrap">
            {email.length > 0 && !/\S+@\S+\.\S+/.test(email) && (
              <div>올바른 이메일 형식이 아닙니다.</div>
            )}
          </div>
        </div>
        <div className={styles.passwordForm}>
          <TextField
            id="standard-basic"
            type="password"
            label="비밀번호"
            variant="standard"
            sx={{ width: "378px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="errorMessageWrap">
            {password.length > 0 && password.length < 8 && (
              <div>비밀번호를 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        <div className={styles.confirmPasswordForm}>
          <TextField
            id="standard-basic"
            type="password"
            label="비밀번호 확인"
            variant="standard"
            value={confirmPassword}
            sx={{ width: "378px" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="errorMessageWrap">
            {password !== confirmPassword && (
              <div>비밀번호가 일치하지 않습니다.</div>
            )}
          </div>
        </div>
        <div className={styles.nameForm}>
          <TextField
            id="standard-basic"
            type="text"
            label="닉네임"
            variant="standard"
            sx={{ width: "378px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="errorMessageWrap">
            {name.length > 0 && name.length < 4 && (
              <div>닉네임은 4자 이상 입력해주세요.</div>
            )}
          </div>
        </div>
        <div className={styles.confirmButton}>
          <Button
            variant="contained"
            sx={{ width: "378px", backgroundColor: "#000000" }}
            onClick={handleJoin}
          >
            가입완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Join;

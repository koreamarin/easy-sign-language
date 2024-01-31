import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "@mui/material/Button";
import React from "react";

// styled components 적용

const NavbarMenu = styled.div`
  height: 150px;
  background-color: #ffd9fa;
`;

// 코드 적용

function Navbar() {
  return (
    <div>
      <NavbarMenu>
        <div>
          현재는 임시로 작업 중입니다. 추후 로그인 이전 / 로그인 이후로 나누어
          구현될 예정.
        </div>
        <div className="navbar">
          <Link className="navbarMenu" to={"/"}>
            MainPage
          </Link>
          수어연습
          <Link className="navbarMenu" to={"/store"}>
            상점
          </Link>
          <Link className="navbarMenu" to={"join"}>
            회원가입
          </Link>
          <Link className="navbarMenu" to={"login"}>
            로그인
          </Link>
          <Link className="navbarMenu" to={"mypage"}>
            마이페이지
          </Link>
        </div>
      </NavbarMenu>
    </div>
  );
}

export default Navbar;

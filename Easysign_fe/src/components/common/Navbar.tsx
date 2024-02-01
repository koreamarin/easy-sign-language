import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";

// styled components 적용

const NavbarMenu = styled.div`
  height: 100px;
  background-color: #ffd9fa;
`;

// 코드 적용

function Navbar() {
  return (
    <div>
      <NavbarMenu>
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

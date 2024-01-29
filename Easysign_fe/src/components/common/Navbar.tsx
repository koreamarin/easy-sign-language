import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";

function Navbar() {
  return (
    <div>
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
      </div>
    </div>
  );
}

export default Navbar;

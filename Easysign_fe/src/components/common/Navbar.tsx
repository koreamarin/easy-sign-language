import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";

// styled components 적용

// navbar 전체 코드
const NavbarMenu = styled.div`
  height: 70px;
  // 색상은 임시로 설정한 것에 불과함.
  background-color: #ffd9fa;
  display: flex;
  align-items: center;
`;

// 왼쪽에 배치할 것들 감싸는 것
const LeftMenu = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

// 오른쪽에 배치할 것들 감싸는 것
const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

// 코드 적용

function Navbar() {
  return (
    <div>
      <NavbarMenu>
        <LeftMenu>
          <Link to={"/"}>
            {/* 원래의 이미지 경로 img src="../../../public/images/signeasy_logo.png" */}
            <img src="../images/signeasy_logo.png" alt="수어쉬워 로고" />
          </Link>
          <span>수어연습</span>
          <Link to={"/store"}>상점</Link>
        </LeftMenu>
        <RightMenu>
          <Link to={"join"}>회원가입</Link>
          <Link to={"login"}>로그인</Link>
          <Link to={"mypage"}>마이페이지</Link>
        </RightMenu>
      </NavbarMenu>
    </div>
  );
}

export default Navbar;

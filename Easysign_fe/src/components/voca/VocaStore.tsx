import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 백-프론트 연동 관련 import
import { useState, useEffect } from "react";
import API from "../../config";

// 무한 스크롤 구현 라이브러리
// https://www.npmjs.com/package/react-intersection-observer
import React from "react";
import { useInView } from "react-intersection-observer";

// Speed Dial 관련 import
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

// mui icon import
import {
  AccessAlarm,
  BookmarksOutlined,
  Settings,
  Logout,
} from "@mui/icons-material";

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px; /* 각 항목 간의 간격을 조절 */
  width: 100%; /* 너비를 100%로 설정 */
`;

const MainContainer = styled.div`
  min-height: calc(
    100vh - 200px
  ); /* footer 높이를 고려하여 화면의 높이를 조정 */
  padding-bottom: 200px; /* footer 높이 만큼의 여백을 추가하여 footer가 화면 내에 보이도록 함 */
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */

  background: #ededed;
  border-radius: 50px;
  position: relative; /* 추가 */
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 단어장 글자
const Text1 = styled.div`
  width: 260px;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`;

// 단어장 박스
const WordComponent = styled.div`
  text-align: center;
  background: #fff9f9;
  border: 1px solid #adadad;
  border-radius: 30px;
  height: 350px;
  width: 80%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #833f00;
`;

// 단어 표시하는 박스
const ContentBox = styled.div`
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
  position: absolute;
  width: 300px;
  height: 40px;
  background: #eff8ff;
  border: 1px solid #e4e4e4;
  border-radius: 10px;
  padding: 5px;
  margin: 20px;
`;

// Speed dial 관련 데이터(action)
const actions = [
  { icon: <AccessAlarm />, name: "상점 모달 테스트" },
  { icon: <BookmarksOutlined />, name: "단어장" },
  { icon: <Settings />, name: "환경설정" },
  { icon: <Logout />, name: "로그아웃" },
];

function VocaStore() {
  const navigate = useNavigate(); // useNavigate 훅을 이용해 navigate 함수를 가져옴

  const handleActionClick = (name: string) => {
    if (name === "상점 모달 테스트") {
      navigate("/store_test"); // 클릭한 액션에 따라 특정 링크로 이동
    } else if (name === "단어장") {
      navigate("/voca");
    } else if (name === "환경설정") {
      navigate("/mypage");
    } else if (name === "logout") {
      navigate("/");
    }
  };
  const [bookmark, setBookmark] = useState([]);

  localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzY2MzMzMSwiaWQiOjYsImxvZ2luSWQiOiJzc2FmeSJ9.xkcoHpJEv-kr86OWYkyKKnHGiIihx2H0uNWY-_Wv6f01-BAWpXTiANxh9t7OzdKV9-HPkS56u47d1YBqHpbo6w"
  );

  const token = localStorage.getItem("token") || "";

  const getBookmark = async () => {
    try {
      const response = await fetch(`${API.BOOKMARK}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const data = await response.json();
      setBookmark(data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  const { ref, inView, entry } = useInView({ threshold: 0 });

  return (
    <div>
      <br />
      <Text1>
        <BookmarksOutlined fontSize="large" />
        　단어장
      </Text1>
      <br />
      <MainContainer>
        {/* 무한 스크롤 구현 */}
        <div ref={ref}>
          <ItemContainer>
            {bookmark.map((item: any) => (
              <CenteredDiv
                key={item.signId}
                style={{
                  flex: "0 0 30%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                {/* <p>Sign ID: {item.signId}</p> */}
                <WordComponent>
                  <br />
                  <ContentBox>{item.content}</ContentBox>
                  <br></br>
                  <br />
                  <br />
                  <img
                    src={item.imagePath}
                    alt={item.content}
                    width="200px"
                    height="200px"
                  />
                </WordComponent>
              </CenteredDiv>
            ))}
          </ItemContainer>
        </div>
        {/* mui speed dial 적용 */}
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleActionClick(action.name)}
            />
          ))}
        </SpeedDial>
      </MainContainer>
    </div>
  );
}
export default VocaStore;

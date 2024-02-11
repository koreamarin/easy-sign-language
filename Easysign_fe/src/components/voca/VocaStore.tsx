import { Link } from "react-router-dom";
import styled from "styled-components";

// 백-프론트 연결 관련 import
import API from "../../config";
import { useState, useEffect } from "react";

// 무한 스크롤 구현 라이브러리
// https://www.npmjs.com/package/react-intersection-observer
import React from "react";
import { useInView } from "react-intersection-observer";

// css 관련
const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 297px;
  height: 357px;
  gap: 20px; /* 각 항목 간의 간격을 조절 */
  width: 100%; /* 너비를 100%로 설정 */
  max-width: 900px; /* 최대 너비를 설정하여 반응형 디자인을 위한 제한을 둠 */
`;

// 개별 단어 박스 css
// const VocaContainer = styled.div`
//   position: absolute;
//   width: 297px;
//   height: 357px;
// `;

function VocaStore() {
  // 프론트 - 백 통신 설정
  const [bookmark, setBookmark] = useState<any>([]);

  // 토큰을 로컬 스토리지에 저장
  localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzY2MzMzMSwiaWQiOjYsImxvZ2luSWQiOiJzc2FmeSJ9.xkcoHpJEv-kr86OWYkyKKnHGiIihx2H0uNWY-_Wv6f01-BAWpXTiANxh9t7OzdKV9-HPkS56u47d1YBqHpbo6w"
  );

  // 로컬 스토리지에서 토큰을 가져옴
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

      const data = await response.json(); // JSON 변환
      setBookmark(data); // 변환된 데이터 설정
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    getBookmark();
  }, []);

  // css 관련

  const { ref, inView, entry } = useInView({ threshold: 0 });

  return (
    <div>
      {/* 임시로 넣어놓은 모달 테스트 링크 */}
      <Link to={"/store_test"}>모달 테스트</Link>;<br></br>
      <div ref={ref}>
        <ItemContainer>
          {/* <VocaContainer> */}
          {bookmark.map((item: any) => (
            <div
              key={item.signId}
              style={{ flex: "0 0 30%", marginBottom: "20px" }}
            >
              <p>Sign ID: {item.signId}</p>
              <p>Content: {item.content}</p>
              <img
                src={item.imagePath}
                alt={item.content}
                width="200px"
                height="200px"
              />
            </div>
          ))}
          {/* </VocaContainer> */}
        </ItemContainer>
      </div>
    </div>
  );
}
export default VocaStore;

import { Link } from "react-router-dom";
import styled from "styled-components";

// mui import
// 이용하려는 것: https://mui.com/material-ui/react-card/#media

// 무한 스크롤 구현 라이브러리
// https://www.npmjs.com/package/react-intersection-observer
import React from "react";
import { useInView } from "react-intersection-observer";

function VocaStore() {
  const Container = styled.div`
    min-height: 120vh;
    width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
  `;

  //   const { ref, inView, entry } = useInView(options);

  return (
    <Container>
      {/* 임시로 넣어놓은 모달 테스트 링크 */}
      <Link to={"/store_test"}>모달 테스트</Link>;
    </Container>
  );
}
export default VocaStore;

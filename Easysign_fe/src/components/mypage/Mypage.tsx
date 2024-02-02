import React from "react";
import styled from "styled-components";

// 이미지 pagination 적용을 위한 mui 요소 import
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// 큰 상자 이름 - container
// 캐릭터 모음 - Characters
// 배경 모음 - Backgrounds

function Mypage() {
  const Content = styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
  `;

  const Container = styled.div`
    padding: 5px;
    background-color: #ececec;
    text-align: center;
  `;

  const Characters = styled.div`
    padding: 5px;
    background-color: pink;
  `;

  const Backgrounds = styled.div`
    padding: 5px;
    background-color: skyblue;
  `;

  return (
    <Content>
      <Container>
        <Characters>
          <div>캐릭터 모음</div>

          <div className="character_images">
            {/* 이미지 1 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/IKkr4iBZuvQf-KLHmMqhQdYE97y5h2jJJeXctEFajXlfgeMjsCLeVHNYWg2S3XfKH1e-ate3Y0pPiuSe_amahOE1bkSyogpX9noegqyY2Z2g1s2zXM_bdqDM2AMBqKOZ7p_d9KJdETJZSc9chgHhIw.webp"
              alt="데모 이미지"
            />
            {/* 이미지 2 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/ZcsfHiQg8vdZ_kbdsVcbX6iwKi1Wu4J2qFCfI5JbAfOtlLuSMdbz4qQSf9wLGRuBxKu82AWVgCK_64C_Zw3mIsPYpenGWHLmr4Q5RcRGbXtXrcRHroMgOIvSF3PD5rFoDCAORiSjarRX3FE20mMLWA.webp"
              alt="데모 이미지"
            />
            {/* 이미지 3 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/VFVuUVsqNGZIw83SK2OXkvrQptxchVI-i7IbtwRY1GB6H45nqlxmQ5Bf0oYUQUwdkMLt0pwYIRpVsSx48MFA08wVxNNuYUJdI1uDK_LvgRJUGCAKKDwSX2Hu_8useYEAg-VyJqAsgN5REB0bFkEUVQ.webp"
              alt="데모 이미지"
            />
            {/* 이미지 4 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/b7PJPdpYzBF4FxSmckxbpweDiuDa2_JARCh5GxsmQ0Ll4rQB6zmRggi59ujbKnC1D6Qnt-T2YvLhbngcaj3PzNfK8Xh4QiGPDUpqi4_AXCzCx2r3c3wJsney8kqnOWv9mPXWka_cOzt8tff5zqLYpA.webp"
              alt="데모 이미지"
            />
          </div>
        </Characters>
        <Backgrounds>
          <div>배경 모음</div>
          <div className="bg_images">
            {/* 이미지 1 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/IKkr4iBZuvQf-KLHmMqhQdYE97y5h2jJJeXctEFajXlfgeMjsCLeVHNYWg2S3XfKH1e-ate3Y0pPiuSe_amahOE1bkSyogpX9noegqyY2Z2g1s2zXM_bdqDM2AMBqKOZ7p_d9KJdETJZSc9chgHhIw.webp"
              alt="데모 이미지"
            />
            {/* 이미지 2 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/ZcsfHiQg8vdZ_kbdsVcbX6iwKi1Wu4J2qFCfI5JbAfOtlLuSMdbz4qQSf9wLGRuBxKu82AWVgCK_64C_Zw3mIsPYpenGWHLmr4Q5RcRGbXtXrcRHroMgOIvSF3PD5rFoDCAORiSjarRX3FE20mMLWA.webp"
              alt="데모 이미지"
            />
            {/* 이미지 3 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/VFVuUVsqNGZIw83SK2OXkvrQptxchVI-i7IbtwRY1GB6H45nqlxmQ5Bf0oYUQUwdkMLt0pwYIRpVsSx48MFA08wVxNNuYUJdI1uDK_LvgRJUGCAKKDwSX2Hu_8useYEAg-VyJqAsgN5REB0bFkEUVQ.webp"
              alt="데모 이미지"
            />
            {/* 이미지 4 */}
            <img
              width="200px"
              height="200px"
              src="https://i.namu.wiki/i/b7PJPdpYzBF4FxSmckxbpweDiuDa2_JARCh5GxsmQ0Ll4rQB6zmRggi59ujbKnC1D6Qnt-T2YvLhbngcaj3PzNfK8Xh4QiGPDUpqi4_AXCzCx2r3c3wJsney8kqnOWv9mPXWka_cOzt8tff5zqLYpA.webp"
              alt="데모 이미지"
            />
          </div>
        </Backgrounds>
      </Container>
    </Content>
  );
}

export default Mypage;

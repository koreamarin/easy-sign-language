import React from "react";

import styled from "styled-components";

// 이미지 pagination 적용을 위한 react library import
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Mypage() {
  const ContentContainer = styled.div`
    flex-direction: column;
    justify-content: center; // 수정된 부분
    display: flex;
  `;

  const Characters = styled.div`
    padding: 5px;
    max-height: 35vh;
    width: 60vw;
    background-color: pink;
    flex-grow: 1; /* 컨테이너의 높이를 채우기 위해 flex-grow 설정 */
  `;

  const Backgrounds = styled.div`
    padding: 5px;
    max-height: 35vh;
    width: 60vw;
    background-color: skyblue;
    flex-grow: 1; /* 컨테이너의 높이를 채우기 위해 flex-grow 설정 */
  `;

  // 이미지 저장하는 배열
  // 이후 작업 시에는 배경/캐릭터를 분리해서 배열 이용
  // https://www.npmjs.com/package/react-image-gallery 이 라이브러리 이용
  const images = [
    {
      original:
        "https://i.namu.wiki/i/IKkr4iBZuvQf-KLHmMqhQdYE97y5h2jJJeXctEFajXlfgeMjsCLeVHNYWg2S3XfKH1e-ate3Y0pPiuSe_amahOE1bkSyogpX9noegqyY2Z2g1s2zXM_bdqDM2AMBqKOZ7p_d9KJdETJZSc9chgHhIw.webp",
      originalHeight: 150,
      originalWidth: 150,
    },
    {
      original:
        "https://i.namu.wiki/i/ZcsfHiQg8vdZ_kbdsVcbX6iwKi1Wu4J2qFCfI5JbAfOtlLuSMdbz4qQSf9wLGRuBxKu82AWVgCK_64C_Zw3mIsPYpenGWHLmr4Q5RcRGbXtXrcRHroMgOIvSF3PD5rFoDCAORiSjarRX3FE20mMLWA.webp",
      originalHeight: 150,
      originalWidth: 150,
    },
    {
      original:
        "https://i.namu.wiki/i/VFVuUVsqNGZIw83SK2OXkvrQptxchVI-i7IbtwRY1GB6H45nqlxmQ5Bf0oYUQUwdkMLt0pwYIRpVsSx48MFA08wVxNNuYUJdI1uDK_LvgRJUGCAKKDwSX2Hu_8useYEAg-VyJqAsgN5REB0bFkEUVQ.webp",
      originalHeight: 150,
      originalWidth: 150,
    },
    {
      original:
        "https://i.namu.wiki/i/b7PJPdpYzBF4FxSmckxbpweDiuDa2_JARCh5GxsmQ0Ll4rQB6zmRggi59ujbKnC1D6Qnt-T2YvLhbngcaj3PzNfK8Xh4QiGPDUpqi4_AXCzCx2r3c3wJsney8kqnOWv9mPXWka_cOzt8tff5zqLYpA.webp",
      originalHeight: 150,
      originalWidth: 150,
    },
  ];

  return (
    <ContentContainer>
      {/* <Container> */}
      <Characters>
        <div>캐릭터 모음</div>
        <ImageGallery
          items={images}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      </Characters>
      <br></br>
      <Backgrounds>
        <div>배경 모음</div>
        {/* 추후 onClick: Function, callback(event) 이용해서 설정이 바뀔 수 있게 해줘야 한다.  */}
        <ImageGallery
          items={images}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
        />
      </Backgrounds>
      {/* </Container> */}
    </ContentContainer>
  );
}

export default Mypage;

import styled from "styled-components";
import { Link } from "react-router-dom";

// 이미지 pagination 적용을 위한 react library import
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function MainStore() {
  const Container = styled.div`
    min-height: 120vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ContentBox = styled.div`
    width: 90vw;
    height: 80vh;
    background-color: #bf7c45;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // 이미지 저장하는 배열
  // 이후 작업 시에는 배경/캐릭터를 분리해서 배열 이용
  // https://www.npmjs.com/package/react-image-gallery 이 라이브러리 이용
  const images = [
    {
      original:
        "https://i.namu.wiki/i/1kIPm1SmDVLePbATyVEvTaiDC2YzLzDJWGonMFJyVggBtERGUYl9prypeQD1VSMFwAah1O6eh48pMgjPLeZsBuyyrnAM6VKwsbFsluEXAQ6Gn_mXt4nQLjEva08ym8WqpAj3PFrl889oTzBeGCTmjA.webp",
      thumbnail:
        "https://i.namu.wiki/i/1kIPm1SmDVLePbATyVEvTaiDC2YzLzDJWGonMFJyVggBtERGUYl9prypeQD1VSMFwAah1O6eh48pMgjPLeZsBuyyrnAM6VKwsbFsluEXAQ6Gn_mXt4nQLjEva08ym8WqpAj3PFrl889oTzBeGCTmjA.webp",
      originalHeight: 300,
      originalWidth: 300,
      thumbnailHeight: 75,
      thumbnailWidth: 75,
    },
    {
      original:
        "https://i.namu.wiki/i/ZcsfHiQg8vdZ_kbdsVcbX6iwKi1Wu4J2qFCfI5JbAfOtlLuSMdbz4qQSf9wLGRuBxKu82AWVgCK_64C_Zw3mIsPYpenGWHLmr4Q5RcRGbXtXrcRHroMgOIvSF3PD5rFoDCAORiSjarRX3FE20mMLWA.webp",
      thumbnail:
        "https://i.namu.wiki/i/IKkr4iBZuvQf-KLHmMqhQdYE97y5h2jJJeXctEFajXlfgeMjsCLeVHNYWg2S3XfKH1e-ate3Y0pPiuSe_amahOE1bkSyogpX9noegqyY2Z2g1s2zXM_bdqDM2AMBqKOZ7p_d9KJdETJZSc9chgHhIw.webp",
      originalHeight: 300,
      originalWidth: 300,
      thumbnailHeight: 75,
      thumbnailWidth: 75,
    },
    {
      original:
        "https://i.namu.wiki/i/VFVuUVsqNGZIw83SK2OXkvrQptxchVI-i7IbtwRY1GB6H45nqlxmQ5Bf0oYUQUwdkMLt0pwYIRpVsSx48MFA08wVxNNuYUJdI1uDK_LvgRJUGCAKKDwSX2Hu_8useYEAg-VyJqAsgN5REB0bFkEUVQ.webp",
      thumbnail:
        "https://i.namu.wiki/i/VFVuUVsqNGZIw83SK2OXkvrQptxchVI-i7IbtwRY1GB6H45nqlxmQ5Bf0oYUQUwdkMLt0pwYIRpVsSx48MFA08wVxNNuYUJdI1uDK_LvgRJUGCAKKDwSX2Hu_8useYEAg-VyJqAsgN5REB0bFkEUVQ.webp",
      originalHeight: 300,
      originalWidth: 300,
      thumbnailHeight: 75,
      thumbnailWidth: 75,
    },
    {
      original:
        "https://i.namu.wiki/i/b7PJPdpYzBF4FxSmckxbpweDiuDa2_JARCh5GxsmQ0Ll4rQB6zmRggi59ujbKnC1D6Qnt-T2YvLhbngcaj3PzNfK8Xh4QiGPDUpqi4_AXCzCx2r3c3wJsney8kqnOWv9mPXWka_cOzt8tff5zqLYpA.webp",
      thumbnail:
        "https://i.namu.wiki/i/b7PJPdpYzBF4FxSmckxbpweDiuDa2_JARCh5GxsmQ0Ll4rQB6zmRggi59ujbKnC1D6Qnt-T2YvLhbngcaj3PzNfK8Xh4QiGPDUpqi4_AXCzCx2r3c3wJsney8kqnOWv9mPXWka_cOzt8tff5zqLYpA.webp",
      originalHeight: 300,
      originalWidth: 300,
      thumbnailHeight: 75,
      thumbnailWidth: 75,
    },
    {
      original:
        "https://i.namu.wiki/i/5RVBqXBXl2_ARTt4gQHM40JcZq4rjYqCiXElHVLFEw9x0C67-s-TCrLszmzYvOho_LxtEXChr9CAyu-T7mrxQ_jnyOSDzb6_sRWDJForeyLZ1NKuYJuoZeD-wm8YYMSryZVev2hFGAyn7ahu8ppakQ.webp",
      thumbnail:
        "https://i.namu.wiki/i/5RVBqXBXl2_ARTt4gQHM40JcZq4rjYqCiXElHVLFEw9x0C67-s-TCrLszmzYvOho_LxtEXChr9CAyu-T7mrxQ_jnyOSDzb6_sRWDJForeyLZ1NKuYJuoZeD-wm8YYMSryZVev2hFGAyn7ahu8ppakQ.webp",
      originalHeight: 300,
      originalWidth: 300,
      thumbnailHeight: 75,
      thumbnailWidth: 75,
    },
  ];

  return (
    <div>
      <Container>
        <ContentBox>
          <ImageGallery
            items={images}
            showBullets={true}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </ContentBox>
      </Container>
    </div>
  );
}
export default MainStore;

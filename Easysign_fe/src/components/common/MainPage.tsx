import styled from "styled-components";

// 사용한 라이브러리
// https://swiperjs.com/demos#effect-cards

// card library 관련 import
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import styles from "./mainpage_styles.module.css";

// import required modules
import { EffectCards } from "swiper/modules";

function MainPage() {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: #eee;
  `;

  return (
    <div>
      <Container>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className={`${styles.swiper} mySwiper`}
        >
          <SwiperSlide>
            <img
              src="../mainpage_image/jihwa_practice.JPG"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/word_practice.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/sentence_practice.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/rain_game.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/line_game.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/speedquiz_game.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="../mainpage_image/catchmind_game.jpg"
              width="576px"
              height="480px"
            />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}

export default MainPage;

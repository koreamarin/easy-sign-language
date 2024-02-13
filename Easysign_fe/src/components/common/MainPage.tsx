import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { styled } from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  top: 4vh;
  background-color: #eee;
`;

function MainPage() {
  return (
    <div>
      <Container>
        <br></br>
        <br></br>
        <br></br>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="../mainpage_image/jihwa_practice.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/word_practice.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/sentence_practice.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/rain_game.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/line_game.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/speedquiz_game.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../mainpage_image/catchmind_game.jpg" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </div>
  );
}

export default MainPage;

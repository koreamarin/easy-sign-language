import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

// swiper 이용
// https://swiperjs.com/
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./mypage_styles.module.css";

// import required modules
import { Pagination } from "swiper/modules";

function Mypage() {
  const navigate = useNavigate(); // useNavigate 훅을 이용해 navigate 함수를 가져옴

  const handleActionClick = (name: string) => {
    if (name === "상점 모달 테스트") {
      navigate("/store_test"); // 클릭한 액션에 따라 특정 링크로 이동
    } else if (name === "단어장") {
      navigate("/voca");
    } else if (name === "환경설정") {
      navigate("/mypage");
    } else if (name === "로그아웃") {
      navigate("/");
    }
  };

  // Speed dial 관련 데이터(action)
  const actions = [
    { icon: <AccessAlarm />, name: "상점 모달 테스트" },
    { icon: <BookmarksOutlined />, name: "단어장" },
    { icon: <Settings />, name: "환경설정" },
    { icon: <Logout />, name: "로그아웃" },
  ];

  // style 관련

  const BigView = styled.div`
    min-height: 150vh;
    // 배경색이 적용되지 않는 문제 발생
    background: #f6faf4;
  `;

  const R56 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 76vw;
    height: 80vh;
    top: 30vh;
    left: 12vw;

    background: #ffffff;
    border: 1px solid #c4c4c4;
    box-shadow: 15px 25px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
  `;

  // 캐릭터 모음 글자
  const Text1 = styled.div`
    position: absolute;
    top: 30px;
    left: 30px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #833f00;
  `;

  // 캐릭터 모음 담는 박스
  const SmallBox1 = styled.div`
    position: absolute;
    top: 13vh;
    left: 2.5vw;
    height: 20.5vh;
    width: 74vw;
  `;

  // 각각의 캐릭터나 배경 담는 박스
  const ContainerBox = styled.div`
    width: 13vw;
    height: 20vh;
    border-radius: 20px;
    background: #fff6f6;
  `;

  // 배경 모음 글자
  const Text2 = styled.div`
    position: absolute;
    top: 40vh;
    left: 30px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    color: #833f00;
  `;

  // 배경 모음 담는 박스
  const SmallBox2 = styled.div`
    position: absolute;
    top: 50vh;
    left: 2.5vw;
    height: 210px;
    width: 74vw;
  `;
  return (
    <div>
      <BigView>
        <R56>
          <Text1>캐릭터 모음</Text1>
          <SmallBox1>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className={`${styles.swiper} mySwiper`}
            >
              <SwiperSlide>
                <ContainerBox>slide 1</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 2</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 3</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 4</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 5</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 6</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 7</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 8</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 9</ContainerBox>
              </SwiperSlide>
            </Swiper>
          </SmallBox1>
          <Text2>배경 모음</Text2>
          <SmallBox2>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <ContainerBox>slide 1</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 2</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 3</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 4</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 5</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 6</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 7</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 8</ContainerBox>
              </SwiperSlide>
              <SwiperSlide>
                <ContainerBox>slide 9</ContainerBox>
              </SwiperSlide>
            </Swiper>
          </SmallBox2>
        </R56>
      </BigView>
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
    </div>
  );
}

export default Mypage;

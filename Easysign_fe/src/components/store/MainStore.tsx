// css 적용을 위한 import
import styled from "styled-components";

// 백-프론트 API 통신을 위한 import
import { token } from "../common/Token";
import API from "../../config";

// swiper 이용
// https://swiperjs.com/
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./store_styles.module.css";

// import required modules
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const BigView = styled.div`
  min-height: 150vh;
  width: 100vw;
`;

// 진한 갈색의 큰 상자
const Container = styled.div`
  position: absolute;
  display: flex;
  width: 90vw;
  height: 72vh;
  left: 5vw;
  top: 60vh;
  background: rgba(191, 124, 69, 0.79);
  border-radius: 50px;
  border: 1.5px solid #000000;
`;

// 베이지색의 중간크기 상자
const F57 = styled.div`
  position: absolute;
  width: 75vw;
  height: 50vh;
  left: 7vw;
  top: 11vh;
  background: #ebd8c0;
`;

// swiper가 들어올 박스
const SmallBox = styled.div`
  position: absolute;
  top: 5vh;
  left: 7.5vw;
  width: 60vw;
  height: 40vh;
`;

// 개별 상품사진들이 들어갈 박스
const PhotoBox = styled.div`
  position: absolute;
  width: 10.4vw;
  height: 20vh;
  left: 1.2vw;
  top: 2vh;

  background: #e2d0b2;
  border-radius: 15px;
`;

// 구매완료 들어갈 박스
const F66 = styled.div`
  position: absolute;
  width: 8.6vw;
  height: 4vh;
  left: 2vw;
  top: 28vh;

  background: #0999a0;
  border: 1.5px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
`;

// 구매했을 경우 구매완료 / 구매하지 않았을 경우 가격 표시하는 텍스트
const Text1 = styled.div`
  position: absolute;
  width: 107px;
  height: 50px;
  left: calc(50% - 107px / 2);
  top: calc(50% - 50px / 2 + 0.5px);

  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 50px;
  /* identical to box height, or 333% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;

interface Product {
  itemId: number;
  categoryName: string;
  price: number;
  description: string;
  imagePath: string;
  itemName: string;
  isLike: boolean;
}

function MainStore() {
  // 백-프론트 연결 통신(get)
  const [store, setStore] = useState<Product[] | null>(null);

  const getStore = async () => {
    try {
      const response = await fetch(`${API.STORE_LIST}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch store");
      }

      const data = await response.json();
      setStore(data);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div>
      <BigView>
        {/* 저작권 걱정 없는 임시로 삽입한 이미지 */}
        <img src="../storebg.jpg" width="100%" height="253px"></img>
        <Container>
          <F57>
            <SmallBox>
              {store !== null && (
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className={`${styles.swiper} mySwiper`}
                >
                  {store.map((item) => (
                    <SwiperSlide key={item.itemId}>
                      <PhotoBox>
                        {item.imagePath ? (
                          <img
                            src={item.imagePath}
                            alt={item.itemName}
                            width="100%"
                            height="100%"
                          />
                        ) : (
                          <img
                            src="../normal_profileimage.png"
                            alt="대체이미지"
                            width="100%"
                            height="100%"
                          />
                        )}
                      </PhotoBox>
                      <F66>
                        <Text1>구매완료</Text1>
                      </F66>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </SmallBox>
          </F57>
        </Container>
      </BigView>
    </div>
  );
}
export default MainStore;

// 잔액 부족 모달 창

import styled from "styled-components";

function ShortageSticker() {
  const PopUp = styled.div`
    width: 371px;
    height: 279px;
    background-color: #a47a46;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 30px;
  `;

  const InnerBox = styled.div`
    width: 302px;
    height: 208px;
    background-color: #362311;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 30px;
    flex-direction: column;
    padding: 10px;
  `;

  const ShortagePurchase = styled.div`
    color: white;
    width: 254px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  `;

  const Sticker = styled.div`
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    border-radius: 30px;
    width: 259px;
    height: 32px;
    margin-bottom: 10px;
    margin-top: 10px;
  `;

  const StickerChange = styled.div`
    width: 85px;
    height: 25px;
    display: flex;
    justify-content: center;
    color: black;
    border-radius: 10px;
    background-color: #fdbd08;
  `;

  const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  `;

  const Button = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 113px;
    height: 40px;
    background-color: #eda311;
    border-radius: 10px;
    box-shadow: 0 0 0 5px white;
  `;

  return (
    <div>
      <PopUp>
        <InnerBox>
          <ShortagePurchase>잔액이 부족합니다</ShortagePurchase>
          <Sticker>
            {/* 필요한 스티커 부분은 나중에 db와 연결해서 받아와야 하는 부분 */}
            현재 보유한 스티커:<StickerChange>10, 000</StickerChange>
          </Sticker>
          <ButtonDiv>
            <Button>뒤로가기</Button>
          </ButtonDiv>
        </InnerBox>
      </PopUp>
    </div>
  );
}

export default ShortageSticker;

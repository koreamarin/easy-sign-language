// 구매 모달 창

import styled from "styled-components";

function Purchase() {
  // 정의된 이름은 figma를 따름
  // G - group, E - Ellipse, R - Rectangle
  const G226 = styled.div`
    width: 371px;
    height: 308px;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  `;

  //Group 1
  const G224 = styled.div`
    position: absolute;
    left: 18.6%;
    right: 16.11%;
    top: 3.9%;
    bottom: 74.72%;
  `;

  // Group 1 - 1
  const G223 = styled.div`
    position: absolute;
    left: 0%;
    right: 75.96%;
    top: 98.48%;
    bottom: -96.96%;
  `;

  // Group 1 - 1 - 1
  const E359_1 = styled.div`
    position: absolute;
    left: 85.46%;
    right: 9.53%;
    top: 40.99%;
    bottom: 40.6%;

    background: #e2e2e2;
  `;

  // Group 1 - 1 - 2
  const G198_1 = styled.div`
    position: absolute;
    left: 80.92%;
    right: 5.06%;
    top: 24.29%;
    bottom: 24.16%;
  `;

  // Group 1 - 1 - 2 - 1
  const E357_1 = styled.div`
    position: absolute;
    left: 80.92%;
    right: 5.06%;
    top: 24.29%;
    bottom: 24.16%;

    background: #523818;
  `;

  // const 1 - 1 - 3
  const E355_1 = styled.div`
    position: absolute;
    left: 75.96%;
    right: 0%;
    top: 1.52%;
    bottom: 0%;

    background: #a47a46;
  `;

  // Group 1 - 2
  const G222 = styled.div`
    position: absolute;
    left: 75.96%;
    right: 0%;
    top: 1.52%;
    bottom: 0%;
  `;

  // Group 1 - 2 - 1
  const E359_2 = styled.div`
    position: absolute;
    left: 9.5%;
    right: 85.5%;
    top: 59.01%;
    bottom: 22.57%;

    background: #e2e2e2;
    transform: matrix(1, 0, 0, -1, 0, 0);
  `;

  // Group 1 - 2 - 2
  const G198_2 = styled.div`
    position: absolute;
    left: 4.95%;
    right: 81.02%;
    top: 75.71%;
    bottom: -27.27%;

    transform: matrix(1, 0, 0, -1, 0, 0);
  `;

  // Group 1 - 2 - 2 - 1
  const E357_2 = styled.div`
    position: absolute;
    left: 4.95%;
    right: 81.02%;
    top: 75.71%;
    bottom: -27.27%;

    background: #523818;
    transform: matrix(1, 0, 0, -1, 0, 0);
  `;

  // Group 1 - 2 - 3
  const E355_2 = styled.div`
    position: absolute;
    left: 0%;
    right: 75.96%;
    top: 98.48%;
    bottom: -96.96%;

    background: #a47a46;
    transform: matrix(1, 0, 0, -1, 0, 0);
  `;

  // Group 1 - 3
  const G221 = styled.div`
    position: absolute;
    left: 9.5%;
    right: 10.41%;
    top: 22.77%;
    bottom: 25.62%;
  `;

  // Group 1 - 3 - 1
  const R105 = styled.div`
    position: absolute;
    left: 9.5%;
    right: 10.41%;
    top: 22.77%;
    bottom: 25.62%;

    background: #6e4f36;
  `;

  // Group 1- 3 - 2
  const PurchaseText1 = styled.div`
    position: absolute;
    left: 37.16%;
    right: 37.81%;
    top: 36.43%;
    bottom: 39.63%;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 50px;
    /* or 385% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #f7d202;

    // border: 1px solid #000000;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `;

  // Group 2
  const G212 = styled.div`
    position: absolute;
    left: 18.6%;
    right: 50.94%;
    top: 82.14%;
    bottom: 4.87%;
  `;

  // Group 2 - 1
  const F68 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #ffffff;
    border-radius: 50px;
  `;

  // Group 2 - 1 - 1
  const F67 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #eda311;
    border-radius: 50px;
    margin: 5px;
  `;

  // Group 2 - 1 - 1 - 1
  const PurchaseText2 = styled.div`
    position: absolute;
    width: 48px;
    height: 17px;
    left: calc(50% - 48px / 2);
    top: calc(50% - 17px / 2 + 0.5px);

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 50px;
    /* or 385% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
  `;

  // Group 3
  const G210 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  `;

  // Group 3 - 1
  const G209 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  `;

  // Group 3 - 1 - 1
  const F52 = styled.div`
    box-sizing: border-box;

    position: absolute;
    width: 191px;
    left: calc(50% - 191px / 2);
    top: 67.86%;
    bottom: 23.38%;

    background: #f1f1f1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
  `;

  // Group  3 - 1 - 1 -1
  const HaveStickers = styled.div`
    position: absolute;
    width: 149px;
    height: 50px;
    left: calc(50% - 149px / 2);
    top: calc(50% - 50px / 2 + 0.5px);

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 50px;
    /* identical to box height, or 500% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `;

  // Group 3 - 1 - 2
  const G213 = styled.div`
    position: absolute;
    left: 51.48%;
    right: 18.06%;
    top: 82.14%;
    bottom: 4.87%;
  `;

  // Group 3 - 1 - 2 - 1 - 1
  const G208 = styled.div`
    position: absolute;
    width: 100px;
    height: 30px;
    left: calc(50% - 100px / 2 + 0.5px);
    top: calc(50% - 30px / 2);
  `;

  // Group 3 - 1 -
  const F67_2 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #eda311;
    border-radius: 50px;
    margin: 5px;
  `;

  // 입술이 매우매우 큰 귀여운 오리 텍스트
  const DuckCute = styled.div`
    position: absolute;
    width: 240px;
    left: calc(50% - 240px / 2 + 0.5px);
    bottom: 100%;

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    // 다 완성된 후 line-height를 조정해서 css를 수정하면 된다.
    line-height: 250px;
    /* or 500% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  `;

  // Group 3 - 1 - 3
  const G207 = styled.div`
    position: absolute;
    left: 49.06%;
    right: 28.03%;
    top: 39.94%;
    bottom: 51.95%;
  `;

  // 3 - 1 - 3 - 1
  const G192 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  `;

  // 3 - 1 - 3 - 1 - 1
  const G190 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
  `;

  // 3 - 1 - 3 - 1 - 1 - 1
  const F66 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    background: #fdbd08;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
  `;

  // 잔액 표시하기 위한 동전 사진
  const Coin = styled.div`
    position: absolute;
    left: calc(50% - 23px / 2 - 35px);
    top: calc(50% - 23px / 2);
  `;

  // 현재 잔액 표시하기
  const NowMoney = styled.div`
    position: absolute;
    width: 107px;
    height: 50px;
    left: calc(50% - 107px / 2 + 19px);
    top: calc(50% - 50px / 2 + 0.5px);

    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 50px;
    /* identical to box height, or 500% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;

    // border: 1.3px solid #000000;
  `;

  // Group 3 - 4
  const G205 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 9.42%;
    bottom: 0%;
  `;

  // Group 3 - 4 - 1
  const G203 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 9.42%;
    bottom: 0%;
  `;

  // R101 안에 위치하는 진한 갈색의 작은 사각형
  const R102 = styled.div`
    position: absolute;
    left: 6.54%;
    right: 6.5%;
    top: 14.47%;
    bottom: 11.5%;

    background: #362311;
    border-radius: 30px;
  `;

  // 가장 바깥에 위치하는 큰 사각형
  const R101 = styled.div`
    position: absolute;
    left: 0%;
    right: 0%;
    top: 9.42%;
    bottom: 0%;

    background: #a47a46;
    border-radius: 30px;
  `;

  // 샘플 프로필 이미지
  const ProfileSample = styled.div`
    position: absolute;
    left: 17.25%;
    right: 65.23%;
    top: 26.95%;
    bottom: 51.95%;
  `;

  // 이미지 배경
  const R103 = styled.div`
    position: absolute;
    left: 16.71%;
    right: 64.42%;
    top: 26.95%;
    bottom: 50.32%;

    background: #d9d9d9;
    border-radius: 15px;
  `;

  return (
    <div>
      <G224>
        {/* 왼쪽 눈*/}
        <G223>
          <E359_1></E359_1>
          <G198_1>
            <E357_1></E357_1>
          </G198_1>
          <E355_1></E355_1>
        </G223>
        {/* 오른쪽눈 */}
        <G222>
          <E359_2></E359_2>
          <G198_2>
            <E357_2></E357_2>
          </G198_2>
          <E355_2></E355_2>
        </G222>
        {/* 상단 구매 텍스트 */}
        <G221>
          <PurchaseText1>구매</PurchaseText1>
          <R105></R105>
        </G221>
      </G224>
      {/* G224 끝(상단 눈알 및 구매 나오는 부분) */}
      <G226>
        <R101>
          <R102>
            <R103></R103>
            <ProfileSample>
              <img src="../images/character_sample.png"></img>
            </ProfileSample>

            {/* Group 2 */}
            <G212>
              <F68>
                <F67>
                  <PurchaseText2>구매</PurchaseText2>
                </F67>
              </F68>
            </G212>
            {/* Group 3 */}
            <G210>
              {/* Group 3 - 1 */}
              <G209>
                {/* Group 3 - 1 - 1부터 시작 */}
                <F52>
                  <HaveStickers>10,003 스티커를 보유 중입니다.</HaveStickers>
                </F52>
                {/* Group 3 - 2 */}
                <G213>
                  <F68>
                    <G208>
                      <F67_2>
                        <PurchaseText2>취소</PurchaseText2>
                      </F67_2>
                    </G208>
                  </F68>
                  <DuckCute>입술이 매우매우 큰 귀여운 오리이다.</DuckCute>
                </G213>
                {/* Group 3 - 3 */}
                <G207>
                  <G192>
                    <G190>
                      <F66>
                        <Coin>
                          <img
                            src="../images/coin.png"
                            width="15px"
                            height="15px"
                          ></img>
                        </Coin>
                        <NowMoney>10,000</NowMoney>
                      </F66>
                    </G190>
                  </G192>
                </G207>
                {/* Group 3 - 4 */}
                <G205>
                  <G203></G203>
                </G205>
              </G209>
            </G210>
          </R102>
        </R101>
      </G226>
    </div>
  );
}

export default Purchase;

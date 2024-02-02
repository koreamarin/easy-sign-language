import styled from "styled-components";

function Footer() {
  const FooterTextBox1 = styled.div`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    align-items: flex-start;
    padding: 15px;
    display: flex;
    align-items: center;

    /* 좌우 간격 설정 */
    & > div:not(:last-child) {
      margin-right: 10px;
      margin-left: 10px;
    }
  `;

  const FooterTextBox2 = styled.div`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    align-items: flex-start;
    padding: 15px;
    display: flex;
    align-items: center;

    /* 좌우 간격 설정 */
    & > div:not(:last-child) {
      margin-right: 50px;
      margin-left: 10px;
    }
  `;
  return (
    <div>
      <FooterTextBox1>
        <div>이용약관</div>{" "}
        <div>
          <b>
            개인정보<br></br>처리방침
          </b>
        </div>
        <div>고객센터</div>
        <div>문의하기</div>
      </FooterTextBox1>
      <FooterTextBox2>
        <div>
          (주) 팀장만E조<br></br>광주 광산구 하남산단6번로 107
        </div>
        <div>
          사업자등록번호: 123-45-67890<br></br>고객지원: 평일
          9시~18시(1234-5678)
        </div>
      </FooterTextBox2>
    </div>
  );
}
export default Footer;

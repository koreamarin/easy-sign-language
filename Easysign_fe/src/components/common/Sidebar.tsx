import { Link } from "react-router-dom";
import styled from "styled-components";

// mui 아이콘 관련 import
import {
  BookmarksOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

function Sidebar() {
  // 스타일 적용
  const Title = styled.div`
    font-family: "Inter", sans-serif;
    font-weight: 800;
    font-size: 24px;
  `;

  // 프로필 이미지 url인데 백엔드에서 등록된 사진을 가져오는 것으로 추후 변경해야 함.
  // 왜 webp 파일이면 이미지가 잘 뜨는데 jpg 파일이면 이미지가 안 뜨는지 모르겠음
  const imageUrl =
    "https://i.namu.wiki/i/qVIBxIh_6TrrLgAT9M3pEyr6RkY-032svYwFRxnVMBwk4zkrsSHfjSHd19QNZ1n6XbRX2KRUlR-kFEvZjLWOtFTZFgBat-1_34BSsz1SSjmcNa-ZMRQoyWsuaJfT85DMQQvkCttlTWPOTF2rIIAmjg.webp";

  const ProfileImage = styled.div`
    background-image: url(${imageUrl});
    background-size: cover;
    background-position: center;
    width: 25vw;
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    margin: 0 auto;
    aspect-ratio: 1/1;
  `;

  const MenuBox = styled.div`
    min-height: 40vh;
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
    font-family: "Inter", sans-serif;
    display: flex;
    justify-content: center;
  `;

  const TableBox = styled.div`
    align-items: center;

    td {
      border-top: 1px solid #000; /* 상단 경계선 추가 */
      border-bottom: 1px solid #000; /* 하단 경계선 추가 */
      padding: 5px; /* 내부 여백 설정 */
    }

    tr:not(:last-child) td {
      border-bottom: 1px solid #000; /* 중간 행들에만 하단 경계선 추가 */
    }
  `;

  // 하이퍼링크 보라색으로 변하는 것을 막기 위한 코드
  const StyledLink = styled(Link)`
    color: inherit; /* 기존 텍스트 색상 상속 */
    text-decoration: none; /* 밑줄 제거 */

    &:hover {
      color: inherit; /* 호버 시 텍스트 색상 상속 */
    }
  `;

  return (
    <div>
      <br></br>
      <Title>마이페이지</Title>
      <br></br>
      <ProfileImage />
      <br />
      <MenuBox>
        <TableBox>
          <table>
            <tr>
              <td>
                <StyledLink to={"/voca"}>
                  <BookmarksOutlined /> 　단 어 장　　
                </StyledLink>
              </td>
            </tr>
            <tr>
              <td>
                <SettingsOutlined /> 　계정설정　　
              </td>
            </tr>
            <tr>
              <td>
                <StyledLink to={"/"}>
                  <LogoutOutlined /> 　로그아웃　　
                </StyledLink>
              </td>
            </tr>
          </table>
        </TableBox>
      </MenuBox>
    </div>
  );
}

export default Sidebar;

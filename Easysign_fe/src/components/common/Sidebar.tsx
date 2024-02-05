// import { Menu } from "@mui/material";
import styled from "styled-components";

// mui 아이콘 관련 import
import {
  BookmarksOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
// import { SvgIconComponent } from "@mui/icons-material";
// import { IconProps } from "@mui/material/Icon";

// mui 테이블 관련 import
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { create } from "domain";

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
                <BookmarksOutlined /> 단 어 장
              </td>
            </tr>
            <tr>
              <td>
                <SettingsOutlined /> 계정 설정
              </td>
            </tr>
            <tr>
              <td>
                <LogoutOutlined /> 로그아웃
              </td>
            </tr>
          </table>
        </TableBox>
      </MenuBox>
    </div>
  );
}

export default Sidebar;

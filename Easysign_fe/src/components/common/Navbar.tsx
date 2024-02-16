import { Link } from "react-router-dom";
import styled from "styled-components";
import React from "react";

// account menu 표현을 위한 mui 관련 import
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

// styled components 적용

// navbar 전체 코드
const NavbarMenu = styled.div`
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
`;

// 왼쪽에 배치할 것들 감싸는 것
const LeftMenu = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  > * {
    margin-left: 10px;
    margin-right: 10px;
`;

// 오른쪽에 배치할 것들 감싸는 것
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-left: 10px;
    margin-right: 10px;
`;

// 하이퍼링크 보라색으로 변하는 것을 막기 위한 코드
const StyledLink = styled(Link)`
  color: inherit; /* 기존 텍스트 색상 상속 */
  text-decoration: none; /* 밑줄 제거 */

  &:hover {
    color: inherit; /* 호버 시 텍스트 색상 상속 */
  }
`;

// 코드 적용

function Navbar() {
  // account menu 관련 정의
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <NavbarMenu>
        <LeftMenu>
          <Link to={"/"}>
            {/* 원래의 이미지 경로 img src="../../../public/images/signeasy_logo.png" */}
            <img src="../images/signeasy_logo.png" alt="수어쉬워 로고" />
          </Link>
          <StyledLink to="https://edu.easysign.shop/" target="_blank">
            <span> 수어연습</span>
          </StyledLink>
          <StyledLink to={"/store"}>상점</StyledLink>
        </LeftMenu>
        <RightMenu>
          {/* accountmenu */}
          <Tooltip title="Account settings">
            {/* 아이콘 부분 */}
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {/* signeasy_logo.png를 제외한 나머지 이미지가 전부 엑박뜨는 현상이 발생. 원인을 모르겠음. */}
              <Avatar src="../../../public/images/normal_profileimage.png" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          <StyledLink to={"join"}>회원가입</StyledLink>
          <StyledLink to={"login"}>로그인</StyledLink>
          <StyledLink to={"mypage"}>마이페이지</StyledLink>
        </RightMenu>
      </NavbarMenu>
    </div>
  );
}

export default Navbar;

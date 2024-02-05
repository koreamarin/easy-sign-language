import React from "react";
import Sidebar from "../common/Sidebar";
import MyContent from "./MyContent";
import styled from "styled-components";

function Mypage() {
  const Content = styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    min-height: 80vh;
  `;

  const SidebarContainer = styled.div`
    text-align: center;
    width: 25%;
    flex-direction: column;
  `;

  return (
    <Content>
      <SidebarContainer>
        {/* Sidebar import한 부분 */}
        <Sidebar />
      </SidebarContainer>
      {/* sidebar 이외의 본 content 부분 */}
      <MyContent />
    </Content>
  );
}

export default Mypage;

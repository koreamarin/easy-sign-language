import { Link } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../common/Sidebar";
import VocaStore from "./VocaStore";

function VocaBox() {
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
        <Sidebar />
      </SidebarContainer>
      <VocaStore />
    </Content>
  );
}

export default VocaBox;

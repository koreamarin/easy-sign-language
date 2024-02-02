import React from "react";

// 다른 페이지 import
import MainPage from "./components/common/MainPage";
import Login from "./components/common/Login";
import Join from "./components/common/Join";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import StoreMain from "./components/store/StoreMain";
import Mypage from "./components/mypage/Mypage";
import Footer from "./components/common/Footer";

// react에 필요한 것들 import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const SidebarContainer = styled.div`
  text-align: center;
  width: 25%;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  width: 75%;
  flex: 1;
`;

const FooterContainer = styled.div`
  height: 200px;
  // 색상은 임시 적용. 추후 완성 시 뺍니다.
  background-color: #cefbc9;
  bottom: 0;
  width: 100%; /* 가로 전체를 차지하도록 설정 */
  // position: relative;
  // transform: translateY(-100%);
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <MainContent>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <div>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/store" element={<StoreMain />} />
              <Route path="/mypage" element={<Mypage />} />
            </Routes>
          </div>
        </MainContent>
      </AppContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </BrowserRouter>
  );
}

export default App;

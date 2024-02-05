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
import MainStore from "./components/store/MainStore";

// react에 필요한 것들 import
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 80vh;
`;

const FooterContainer = styled.div`
  height: 200px;
  border-top: 1px solid gray;
  bottom: 0;
  width: 100%; /* 가로 전체를 차지하도록 설정 */
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <MainContent>
          <div>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/store_test" element={<StoreMain />} />
              <Route path="/store" element={<MainStore />} />
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

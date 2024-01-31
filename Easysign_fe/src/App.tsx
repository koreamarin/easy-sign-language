import React from "react";
import MainPage from "./components/common/MainPage";
import Login from "./components/common/Login";
import Join from "./components/common/Join";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import StoreMain from "./components/store/StoreMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import styled from "styled-components";
import "./App.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  text-align: center;
  width: 357px;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
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
            </Routes>
          </div>
        </MainContent>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

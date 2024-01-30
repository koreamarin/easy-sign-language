import React from "react";
import MainPage from "./components/common/MainPage";
import Login from "./components/common/Login";
import Join from "./components/common/Join";
import Navbar from "./components/common/Navbar";
import StoreMain from "./components/store/StoreMain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/store" element={<StoreMain />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import AllComponentsContainer from "./containers/AllComponentsContainer";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/allcomponent", // 루트 경로
    element: <AllComponentsContainer />, // 루트 컴포넌트
  },
]);

export default router;

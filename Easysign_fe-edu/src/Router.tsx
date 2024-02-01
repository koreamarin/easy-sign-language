import { createBrowserRouter } from "react-router-dom";
import AllComponentsContainer from "./pages/AllComponentsContainer";
import Main from "./pages/Main";
import Edu from "./pages/Edu";

const router = createBrowserRouter([
  {
    path: "/edu-all",
    element: <AllComponentsContainer />,
  },
  {
    path: "/edu-main",
    element: <Main />,
  },
  {
    path: "/edu",
    element: <Edu />,
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Edu from "./pages/Edu";
import { Outlet } from "react-router-dom";
import Lecture from "./components/edu/Lecture";
import JihwaComponent from "./components/edu/jihwa/JihwaComponent";
import LandmarkerCanvas2 from "./components/poseModelComponents/LandmarkerCanvas2";
import Result from "./components/Sonagi/Result";
import Game from "./components/game/Game";
import Sonagi from "./components/Sonagi/Sonagi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/learn",
    element: <Edu />,
    children: [
      {
        path: "lecture",
        element: <Lecture />,
        children: [
          {
            path: "jihwa",
            element: <JihwaComponent />,
          },
          {
            path: "word",
            element: (
              <div>
                <div>
                  <Outlet />
                </div>
                <div>단어 사진/영상</div>
              </div>
            ),
            children: [
              {
                path: "animal",
                element: <div>동물</div>,
              },
              {
                path: "object",
                element: <div>사물</div>,
              },
              {
                path: "fruit",
                element: <div>과일</div>,
              },
            ],
          },
          {
            path: "sentence",
            element: <div>문장</div>,
          },
        ],
      },
      {
        path: "practice",
        element: (
          <div>
            연습
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "jihwa",
            element: (
              <div>
                지화
                <Outlet />
              </div>
            ),
            children: [
              {
                path: "vowel",
                element: <div>모음</div>,
              },
              {
                path: "consonant",
                element: <div>자음</div>,
              },
              {
                path: "number",
                element: <div>숫자</div>,
              },
            ],
          },
          {
            path: "word",
            element: (
              <div>
                단어
                <Outlet />
              </div>
            ),
            children: [
              {
                path: "animal",
                element: <div>동물</div>,
              },
              {
                path: "object",
                element: <div>사물</div>,
              },
              {
                path: "fruit",
                element: <div>과일</div>,
              },
            ],
          },
          {
            path: "setence",
            element: <div>문장</div>,
          },
        ],
      },
      {
        path: "game",
        element: (
          <div>
            <Game />
          </div>
        ),
        children: [
          {
            path: "speedquiz",
            element: <div>스피드퀴즈</div>,
          },
          {
            path: "catchmind",
            element: <div>캐치마인드(미구현)</div>,
          },
          {
            path: "shower",
            element: <Sonagi />,
          },
          {
            path: "wordchain",
            element: <div>끝말잇기(미구현)</div>,
          },
        ],
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Edu from "./pages/Edu";
import { Outlet } from "react-router-dom";
import Lecture from "./components/edu/Lecture";
import Game from "./components/game/Game";
import Sonagi from "./components/Sonagi/Sonagi";
import JihwaComponent from "./components/edu/jihwa/JihwaComponent";
import WordComponent from "./components/edu/word/WordComponent";
import SentenceComponent from "./components/edu/sentence/SentenceComponent";
import Practice from "./components/edu/Practice";
import JihwaPracticeComponent from "./components/edu/jihwa/JihwaPracticeComponent";
import WordPracticeComponent from "./components/edu/word/WordPracticeComponent";

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
            element: <WordComponent />,
          },
          {
            path: "sentence",
            element: <SentenceComponent />,
          },
        ],
      },
      {
        path: "practice",
        element: <Practice />,
        children: [
          {
            path: "jihwa",
            element: <JihwaPracticeComponent />,
          },
          {
            path: "word",
            element: <WordPracticeComponent />,
          },
          {
            path: "setence",
            element: <div>문장</div>,
          },
        ],
      },
      {
        path: "game",
        element: <Game />,
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

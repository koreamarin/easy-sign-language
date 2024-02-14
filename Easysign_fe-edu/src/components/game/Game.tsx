import { useDispatch } from "react-redux";
import Nav from "../nav/Nav";
import { Outlet } from "react-router-dom";
import { LearningProgressSet } from "../../redux/modules/ProgressSlice";

export type trainingDataType = {
  signId: number;
  content: string;
  imagePath: string;
  videoPath: string;
  success: boolean;
};

const Game = () => {
  const dispatch = useDispatch();
  dispatch(LearningProgressSet(0));
  console.log("Game");
  return (
    <div
      style={{
        border: "1px solid #b8b8b8",
        width: "1300px",
        height: "900px",
        display: "flex", // 추가
        flexDirection: "row", // 추가
      }}
    >
      <Nav Progress2Visibility={false} />
      <Outlet />
    </div>
  );
};

export default Game;

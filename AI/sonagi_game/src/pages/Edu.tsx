import Nav from "../components/nav/Nav";
import { Outlet } from "react-router-dom";

const Edu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #b8b8b8",
          width: "1300px",
          height: "900px",
          display: "flex", // 추가
          flexDirection: "row", // 추가
        }}
      >
        <Nav />
        <Outlet />
      </div>
    </div>
  );
};
export default Edu;

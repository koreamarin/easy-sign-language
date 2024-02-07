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
      <Outlet />
    </div>
  );
};
export default Edu;

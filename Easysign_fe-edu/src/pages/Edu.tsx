import Nav from "../components/nav/Nav";

const Edu = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        width: "98vw",
        height: "98vh",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: "90%",
          height: "100%",
        }}
      >
        <Nav />
      </div>
    </div>
  );
};
export default Edu;

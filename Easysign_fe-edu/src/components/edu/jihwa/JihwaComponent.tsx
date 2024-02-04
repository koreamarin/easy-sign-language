import { Outlet, useOutletContext } from "react-router-dom";

const JihwaComponent = () => {
  interface IFollowersContext {
    followStatus: Boolean;
    words: string[];
  }
  const { followStatus, words } = useOutletContext<IFollowersContext>();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          width: "1080px",
          height: "200px",
        }}
      >
        <Outlet context={words} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          width: "1080px",
          height: "510px",
          border: "1px solid black",
        }}
      >
        {followStatus ? (
          <>
            <img
              style={{
                width: "533px",
                height: "510px",
                borderRadius: "40px",
              }}
              src="http://kookbang.dema.mil.kr/newspaper/tmplat/upload/20170515/thumb1/BBS_201705150542235040.jpeg"
              alt="jihwa"
            />
            <img
              style={{
                width: "533px",
                height: "510px",
                borderRadius: "40px",
              }}
              src="http://kookbang.dema.mil.kr/newspaper/tmplat/upload/20170515/thumb1/BBS_201705150542235040.jpeg"
              alt="jihwa"
            />
          </>
        ) : (
          <img
            style={{
              width: "907px",
              height: "510px",
              borderRadius: "40px",
            }}
            src="https://i.ibb.co/7tjHwHv/jihwa.png"
            alt="jihwa"
          />
        )}
      </div>
    </div>
  );
};

export default JihwaComponent;

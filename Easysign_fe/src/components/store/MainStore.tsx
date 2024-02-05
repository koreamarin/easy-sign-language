import styled from "styled-components";
import { Link } from "react-router-dom";

function MainStore() {
  return (
    <div>
      <h1>Store</h1>
      {/* 모든 요소들을 좌우 center에 놓게끔 지정해야 한다. */}
      <Link to={"/store_test"}>모달 테스트</Link>
    </div>
  );
}
export default MainStore;

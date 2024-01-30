//상태값 count,

import React from "react";

//상태 업데이트 해주는 함수 onIncrease, onDecrease
type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
};
const Counter = ({ count, onIncrease, onDecrease }: CounterProps) => {
  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
};

export default Counter;

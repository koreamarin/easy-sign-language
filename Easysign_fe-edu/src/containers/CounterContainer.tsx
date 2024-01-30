import { useDispatch, useSelector } from "react-redux";
import Counter from "../components/Counter";
import { rootState } from "../redux/modules";
import { decrease, increase } from "../redux/modules/counter";
import React from "react";

const CounterContainer = () => {
  //상태조회
  const count = useSelector((state: rootState) => state.counter.count);
  const dispatch = useDispatch();

  //디스패치 함수
  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  return (
    <div>
      <Counter count={count} onDecrease={onDecrease} onIncrease={onIncrease} />
    </div>
  );
};

export default CounterContainer;

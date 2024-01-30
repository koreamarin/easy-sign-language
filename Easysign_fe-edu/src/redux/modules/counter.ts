import { createSlice } from "@reduxjs/toolkit";

// 상태에 대한 타입 설정하고 초기상태 설정
type CounterState = { count: number };

// 초기상태
const initialState: CounterState = { count: 0 };

// createSlice를 사용하여 리듀서, 액션 생성 함수를 한 번에 생성
const counterSlice = createSlice({
  name: "aa",
  initialState,
  reducers: {
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;
export default counterSlice.reducer;

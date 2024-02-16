import { createSlice } from "@reduxjs/toolkit";

// 상태에 대한 타입 설정하고 초기상태 설정
type ProgressState = {
  IncorrectAnswerRate: number;
  LearningProgress: number;
};

// 초기상태
const initialState: ProgressState = {
  IncorrectAnswerRate: 0,
  LearningProgress: 0,
};

// createSlice를 사용하여 리듀서, 액션 생성 함수를 한 번에 생성
const ProgressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    IncorrectAnswerRateSet: (state, action) => {
      state.IncorrectAnswerRate = action.payload;
    },
    LearningProgressSet: (state, action) => {
      state.LearningProgress = action.payload;
    },
  },
});

export const { IncorrectAnswerRateSet, LearningProgressSet } = ProgressSlice.actions;
export default ProgressSlice.reducer;

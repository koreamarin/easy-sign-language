import { createSlice } from "@reduxjs/toolkit";

// 상태에 대한 타입 설정하고 초기상태 설정
type LectureState = { follow: boolean };

// 초기상태
const initialState: LectureState = { follow: false };

// createSlice를 사용하여 리듀서, 액션 생성 함수를 한 번에 생성
const LectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    followStatusTrue: (state) => {
      state.follow = true;
    },
    followStatusFalse: (state) => {
      state.follow = false;
    },
  },
});

export const { followStatusTrue, followStatusFalse } = LectureSlice.actions;
export default LectureSlice.reducer;

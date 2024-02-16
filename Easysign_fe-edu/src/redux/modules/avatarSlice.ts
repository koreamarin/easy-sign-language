import { createSlice } from "@reduxjs/toolkit";

// 상태에 대한 타입 설정하고 초기상태 설정
type avatarState = { avatar: string };

// 초기상태
const initialState: avatarState = { avatar: "none" };

// createSlice를 사용하여 리듀서, 액션 생성 함수를 한 번에 생성
const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;

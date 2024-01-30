import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  number: number;
}

const initialState: CounterState = { number: 0 };

const CounterSlice = createSlice({
  name: "CounterSlice",
  initialState,
  reducers: {
    up: (state, action: PayloadAction<number>) => {
      state.number += action.payload;
    },
    down: (state, action: PayloadAction<number>) => {
      state.number -= action.payload;
    },
  },
});
export const { up, down } = CounterSlice.actions;
export default CounterSlice.reducer;

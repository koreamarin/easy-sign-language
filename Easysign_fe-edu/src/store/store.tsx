import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

interface ToDo {
  text: string;
  id: number;
}

const toDos = createSlice({
  name: "toDosReducer",
  initialState: [] as ToDo[],
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter((toDo) => toDo.id !== action.payload),
  },
});

export default configureStore({ reducer: toDos.reducer });

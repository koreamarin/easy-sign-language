import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 상태에서 사용할 할일 항목의 타입정의
export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

// 상태에 대한 타입
export type TodoState = Todo[];

// 초기상태 선언
const initialState: TodoState = [];

let nextId = 1;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<{ id: number; text: string }>) => {
        state.push({ id: action.payload.id, text: action.payload.text, isDone: false });
      },
      prepare: (text: string) => ({ payload: { id: nextId++, text } }),
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;

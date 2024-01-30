import { useDispatch, useSelector } from "react-redux";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoLists";
import { rootState } from "../redux/modules";
import { addTodo, removeTodo, toggleTodo } from "../redux/modules/todos";
import React from "react";

const TodosContainer = () => {
  const todos = useSelector((state: rootState) => state.todos);
  const dispatch = useDispatch();
  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };
  const onInsert = (text: string) => {
    dispatch(addTodo(text));
  };
  const onRemove = (id: number) => {
    dispatch(removeTodo(id));
  };
  return (
    <div>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </div>
  );
};

export default TodosContainer;

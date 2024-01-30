import React from "react";
import { Todo } from "../redux/modules/todos";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};

//스타일 따로 뺄려고 함수 만듬
function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const removeStyle: React.CSSProperties = {
    textDecoration: todo.isDone ? "line-through" : "none",
  };
  const onTodoToggle = () => {
    onToggle(todo.id);
  };
  const onTodoRemove = () => {
    onRemove(todo.id);
  };
  return (
    <li style={removeStyle}>
      <span onClick={onTodoToggle}>{todo.text}</span>
      <button onClick={onTodoRemove}>삭제</button>
    </li>
  );
}
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
};
const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

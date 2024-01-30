import React, { useState } from "react";

//props 타입 지정 인터페이스
type TodoInsertProps = {
  onInsert: (text: string) => void;
};

const TodoInsert = ({ onInsert }: TodoInsertProps) => {
  //input 입력값 상태관리
  const [inputText, setInputText] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const onClick = () => {
    onInsert(inputText);
    setInputText("");
  };
  return (
    <div>
      <input placeholder="할일을 등록하세요" value={inputText} onChange={onChange} />
      <button onClick={onClick}>등록</button>
    </div>
  );
};

export default TodoInsert;

import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rootReducer = combineReducers({ counter, todos });

export default rootReducer;

//리듀서 호출 리턴?? 상태!!!
//rootReducer가 실행되면 state리턴함
//ReturnType<typeof rootReducer> 특정함수의 리턴 타입을 추론
//useSelector(state => state.todos)
//스토어의 상태값의 타입을 추론

export type rootState = ReturnType<typeof rootReducer>;
//특정함수의 리턴하는 값의 타입을 반환. state의 타입 돌려줌

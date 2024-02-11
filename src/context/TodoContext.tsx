import {
  createContext,
  useReducer,
  Dispatch,
  ReactElement,
} from "react";
import { toDoItems } from "../utils/todos";
import {
  todoReducer,
  initialState,
  TodoStateType,
  ReducerAction,
} from "../reducers/todoReducer";

interface TodoContextProps {
  state: TodoStateType;
  dispatch: Dispatch<ReducerAction>;
}

type ChildrenType = {
  children?: ReactElement | ReactElement[] | undefined;
};

const TodoContext = createContext<TodoContextProps | null>(null);

const TodoProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };

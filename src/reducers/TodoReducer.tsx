import { createContext, ReactNode, useReducer } from "react";
import { Todo } from "../components/model";

export const INITIAL_STATE = {
  todos: [],
  todoDispatch: () => null,
};

interface State {
  todos: Todo[];
  todoDispatch: React.Dispatch<Actions>;
}

type Actions =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "done"; payload: number }
  | { type: "edit"; payload: { id: number; todo: string } };

const TodoReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), todo: action.payload, isDone: false },
        ],
      };
    case "remove":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "done":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "edit":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, todo: action.payload.todo }
            : todo
        ),
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

export const TodoContext = createContext<State>(INITIAL_STATE);

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [todoState, todoDispatch] = useReducer(TodoReducer, INITIAL_STATE);
  return (
    <TodoContext.Provider value={{ todos: todoState.todos, todoDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

import React, { useContext } from "react";
import { TodoContext } from "../reducers/TodoReducer";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css";

// interface Props {
//   todos: Todo[];
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

const TodoList: React.FC /*<Props>*/ = () => {
  const { todoDispatch, todos } = useContext(TodoContext);
  return (
    <div>
      {todos.map((todo) => (
        <SingleTodo
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;

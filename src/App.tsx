import React, { useContext, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import { TodoContext } from "./reducers/TodoReducer";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]);
  const { todoDispatch, todos } = useContext(TodoContext);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      // setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      todoDispatch({ type: "add", payload: todo });
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Tasks</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList />
    </div>
  );
};

export default App;

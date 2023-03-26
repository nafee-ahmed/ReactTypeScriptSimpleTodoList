import React, { useState, useRef, useEffect, useContext } from "react";
import { Todo } from "./model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { TodoContext } from "../reducers/TodoReducer";

interface Props {
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);
  const { todoDispatch, todos } = useContext(TodoContext);

  const handleDone = (id: number) => {
    todoDispatch({ type: "done", payload: id });
  };

  const handleDelete = (id: number) => {
    todoDispatch({ type: "remove", payload: id });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    todoDispatch({ type: "edit", payload: { id, todo: editTodo } });

    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            !edit && !todo.isDone && setEdit(!edit);
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;

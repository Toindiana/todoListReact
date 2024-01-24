import { useState } from "react";
import styles from "./TodoForm.module.css";

/* eslint-disable react/prop-types */
function TodoForm({ addTodo, user }) {
  const [text, setText] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    addTodo(text);
    setText("");
  }

  return (
    <>
      {!user ? null : (
        <div className={styles.todoFormContainer}>
          <form onSubmit={onSubmitHandler}>
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              placeholder="новая задача"
            />
            <button type="submit">Добавить</button>
          </form>
        </div>
      )}{" "}
    </>
  );
}

export default TodoForm;

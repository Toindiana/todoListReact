/* eslint-disable react/prop-types */
import { RiTodoFill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { ImCheckboxChecked } from "react-icons/im";
import styles from "./Todo.module.css";

function Todo(props) {
  const { text, id, completed, removeTodo, completedTodo } = props;
  return (
    <li className={`${styles.todo} ${completed ? styles.todoCompleted : ""}`}>
      <RiTodoFill className={styles.todoIcon} />
      <span className={styles.todoText}>{text}</span>
      <IoIosCloseCircle
        onClick={() => removeTodo(id)}
        className={styles.removeBtn}
      />
      <ImCheckboxChecked
        onClick={() => completedTodo(id)}
        className={styles.completedBtn}
      />
    </li>
  );
}

export default Todo;

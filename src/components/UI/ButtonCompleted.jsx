/* eslint-disable react/prop-types */
import { ImCheckboxChecked } from 'react-icons/im';
import styles from './Button.module.css';
function ButtonCompleted({ completedTodo, id }) {
  return (
    <ImCheckboxChecked
      onClick={() => completedTodo(id)}
      className={styles.completedBtn}
    />
  );
}

export default ButtonCompleted; 

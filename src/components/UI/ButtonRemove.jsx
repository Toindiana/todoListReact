/* eslint-disable react/prop-types */
import { IoIosCloseCircle } from 'react-icons/io';
import styles from './Button.module.css';
function ButtonRemove({ removeTodo, id }) {
  return (
    <IoIosCloseCircle
      onClick={() => removeTodo(id)}
      className={styles.removeBtn}
    />
  );
}

export default ButtonRemove;

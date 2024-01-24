/* eslint-disable react/prop-types */

import Todo from "./Todo";
function Todos({ todos, removeTodo, completedTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          removeTodo={removeTodo}
          completedTodo={completedTodo}
        />
      ))}
    </ul>
  );
}

export default Todos;

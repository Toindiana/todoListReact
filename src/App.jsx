import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";
import User from "./components/User/User";

function App() {
  let countCompletedTodos = 0;
  const [todos, setTodos] = useState([]);

  function addTodoHandler(text) {
    const newTodo = {
      text: text,
      id: uuidv4(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  function removeTodoHandler(id) {
    setTodos(todos.filter((todoEl) => todoEl.id !== id));
  }

  function completedTodoHandler(id) {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, completed: !todo.completed }
          : { ...todo };
      })
    );
  }

  function controlCompletedTodos() {
    todos.forEach((todo) => {
      if (todo.completed) countCompletedTodos++;
    });
  }

  controlCompletedTodos();

  const [user, setUser] = useState("");
  return (
    <div className="App">
      <h1>Список задач</h1>
      {!user ? (
        <User changeUser={setUser} />
      ) : (
        <span className="hiUser">{`Hi, ${user}`}</span>
      )}
      <hr />
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          removeTodo={removeTodoHandler}
          completedTodo={completedTodoHandler}
        />
      ) : (
        <h5>список пуст...</h5>
      )}

      {countCompletedTodos > 0 ? (
        <h4>завершенных задач: {countCompletedTodos}</h4>
      ) : null}
    </div>
  );
}

export default App;

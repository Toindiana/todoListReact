import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";
import User from "./components/User/User";
import Error from "./components/Error/Error";

const URL_ALL_TODOS = "https://yakovenko-aleksandr.ru/todoReact/php/todos.php";
const URL_ADD_TODO = "https://yakovenko-aleksandr.ru/todoReact/php/addTodo.php";
const URL_REMOVE_TODO =
  "https://yakovenko-aleksandr.ru/todoReact/php/removeTodo.php";
const URL_COMPLETED_TODO =
  "https://yakovenko-aleksandr.ru/todoReact/php/completed.php";

function App() {
  let countCompletedTodos = 0;

  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(false);

  function showError() {
    outUserHandler();
    setError(true);
  }

  function fetchAllTodos(nameUser) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", nameUser);
    axios
      .post(URL_ALL_TODOS, bodyFormData)
      .then(function (response) {
        const arrFetchTodos = response.data.data;
        if (!arrFetchTodos) {
          setTodos([]);
          return;
        }
        const arrTodos = arrFetchTodos.map((todo) => {
          return {
            text: todo.textTodo,
            id: todo.idTodo,
            completed: todo.completed === "0" ? false : true,
          };
        });
        setTodos(arrTodos);
      })
      .catch(function (error) {
        console.log(error);
        showError();
      });
  }

  function addTodoHandler(text) {
    let bodyFormData = new FormData();
    bodyFormData.append("name", user);
    bodyFormData.append("id", uuidv4());
    bodyFormData.append("text", text);
    bodyFormData.append("completed", false);

    axios
      .post(URL_ADD_TODO, bodyFormData)
      .then(function (response) {
        console.log(response.data);
        fetchAllTodos(user);
      })
      .catch(function (error) {
        console.log(error);
        showError();
      });
  }

  function removeTodoHandler(id) {
    let bodyFormData = new FormData();
    bodyFormData.append("id", id);
    axios
      .post(URL_REMOVE_TODO, bodyFormData)
      .then(function (response) {
        console.log(response.data);
        fetchAllTodos(user);
      })
      .catch(function (error) {
        console.log(error);
        showError();
      });
  }

  function completedTodoHandler(id) {
    let bodyFormData = new FormData();
    bodyFormData.append("id", id);
    axios
      .post(URL_COMPLETED_TODO, bodyFormData)
      .then(function (response) {
        console.log(response.data);
        fetchAllTodos(user);
      })
      .catch(function (error) {
        console.log(error);
        showError();
      });
  }

  (function controlCompletedTodos() {
    todos.forEach((todo) => {
      if (todo.completed) countCompletedTodos++;
    });
  })();

  function outUserHandler() {
    setUser("");
    setTodos([]);
  }

  return !error ? (
    <div className="App">
      <h1>Список задач</h1>
      {!user ? (
        <User changeUser={setUser} showTodos={fetchAllTodos} />
      ) : (
        <>
          <span className="hiUser">{`Привет, ${user}`}</span>
          <button className="outBtn" onClick={outUserHandler}>
            Выйти
          </button>
        </>
      )}
      <hr />
      <TodoForm addTodo={addTodoHandler} user={user} />
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
  ) : (
    <Error />
  );
}

export default App;

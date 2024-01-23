import axios from "axios";
import { useState } from "react";
import styles from "./User.module.css";

// eslint-disable-next-line react/prop-types
function User({ changeUser }) {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [loading, setLoading] = useState(false);

  function fetchUrl() {
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append("name", userName);
    bodyFormData.append("pass", userPass);
    axios
      .post(
        "https://yakovenko-aleksandr.ru/todoReact/php/controlUser.php",
        bodyFormData
      )
      .then(function (response) {
        if (response.data.result === "userVerified") {
          changeUser(userName);
          setLoading(false);
          setUserName("");
          setUserPass("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const formSumbitHandler = (e) => {
    e.preventDefault();
    fetchUrl();
    // changeUser(userName);
  };
  return (
    <>
      <form className={styles.form} onSubmit={formSumbitHandler}>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          type="text"
          placeholder="имя пользователя"
        />
        <input
          onChange={(e) => {
            setUserPass(e.target.value);
          }}
          value={userPass}
          type="password"
          placeholder="пароль"
        />
        <button type="submit">Войти / Зарегестрироваться</button>
      </form>

      {!loading ? null : (
        <div className="load">
          <span>load...</span>
        </div>
      )}
    </>
  );
}

export default User;

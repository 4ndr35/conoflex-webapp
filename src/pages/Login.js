import React, { useState, useEffect } from "react";
import Axios from "axios";

import "../styles/Login.css";

export default function Login(props) {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    Axios.get("https://centralconoflex.herokuapp.com/users").then((response) => {
      setUsers(response.data);
    });
  };

  const handleLogin = (userName, password) => {
    users.map((user) => {
      if (user.username === userName && user.password === password) {
        props.setLoginStatus(true);
        props.setRole(user.role);
        console.log("click");
      }
    });
  };

  useEffect(() => {
    getUsers();
    console.log(props.loginStatus);
  }, [props.loginStatus]);

  return (
    <div className="container-login">
      <div className="login">
        {!props.loginStatus ? (
          <div className="form">
            <h4>Inicio de sesión</h4>
            <label>Usuario</label>
            <input
              type="text"
              name="name"
              onChange={(event) => {
                props.setUserName(event.target.value);
              }}
            />
            <label>Contraseña</label>
            <input
              type="text"
              name="lastname"
              onChange={(event) => {
                props.setPassword(event.target.value);
              }}
            />
            <button onClick={() => handleLogin(props.userName, props.password)}>
              Ingresar
            </button>
          </div>
        ) : (
          <div className="welcome">
            Bienvenido {props.userName}
            <br />
            Tu rol de usuario es <strong>{props.role}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
